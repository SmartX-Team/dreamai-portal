#!/usr/bin/env bash
set -euo pipefail
umask 077

host=dreamai.mobilex.kr
name=dreamai-editor-registry
auth_secret=dreamai-editor-registry-auth
pull_secret=dreamai-editor-registry-pull

routes=$(kubectl -n dreamai get ingress -o json)
conflicts=$(jq -r --arg host "$host" --arg name "$name" '
  .items[] | select(.metadata.name != $name) | .metadata.name as $owner |
  .spec.rules[]? | select(.host == $host) | .http.paths[]? |
  select(.path == "/v2" or .path == "/v2/") | $owner' <<< "$routes")
if [[ -n "$conflicts" ]]; then
  echo "::error::The trial host already has a registry route."
  exit 1
fi
primary=$(jq -c --arg host "$host" --arg name "$name" '
  first(.items[] | select(.metadata.name != $name and any(.spec.rules[]?; .host == $host))) // {}' <<< "$routes")
ingress_class=$(jq -r '.spec.ingressClassName // .metadata.annotations["kubernetes.io/ingress.class"] // "mobilex.kr"' <<< "$primary")
tls=$(jq -r --arg host "$host" 'first(.spec.tls[]? | select(any(.hosts[]?; . == $host)) | .secretName) // ""' <<< "$primary")

if [[ -z "$(kubectl -n dreamai get secret "$auth_secret" --ignore-not-found -o name)" ]]; then
  if ! command -v htpasswd >/dev/null; then
    sudo apt-get update -qq
    sudo apt-get install -y -qq apache2-utils
  fi
  password=$(openssl rand -hex 24)
  password_hash=$(printf '%s\n' "$password" | htpasswd -Bin trial-release)
  kubectl -n dreamai create secret generic "$auth_secret" \
    --from-literal=password="$password" --from-literal=htpasswd="$password_hash" \
    --from-literal=http-secret="$(openssl rand -hex 32)"
else
  password=$(kubectl -n dreamai get secret "$auth_secret" -o jsonpath='{.data.password}' | base64 -d)
fi
echo "::add-mask::$password"
if [[ -z "$(kubectl -n dreamai get secret "$pull_secret" --ignore-not-found -o name)" ]]; then
  kubectl -n dreamai create secret docker-registry "$pull_secret" \
    --docker-server="$host" --docker-username=trial-release --docker-password="$password"
fi

kubectl -n dreamai apply -f deployment/kubernetes/editor-registry.yaml
revision=$(sha256sum deployment/kubernetes/editor-registry.yaml | cut -d ' ' -f 1)
patch=$(jq -n --arg revision "$revision" '{spec:{template:{metadata:{annotations:{"dreamai.kr/registry-config":$revision}}}}}')
kubectl -n dreamai patch deployment/"$name" --type merge -p "$patch"
jq -n --arg name "$name" --arg host "$host" --arg class "$ingress_class" --arg tls "$tls" '{
  apiVersion:"networking.k8s.io/v1",kind:"Ingress",
  metadata:{name:$name,namespace:"dreamai",annotations:{
    "nginx.ingress.kubernetes.io/proxy-body-size":"0",
    "nginx.ingress.kubernetes.io/proxy-request-buffering":"off",
    "nginx.ingress.kubernetes.io/proxy-read-timeout":"600",
    "nginx.ingress.kubernetes.io/proxy-send-timeout":"600"
  }},
  spec:({ingressClassName:$class,rules:[{host:$host,http:{paths:[{
    path:"/v2",pathType:"Prefix",backend:{service:{name:$name,port:{number:5000}}}
  }]}}]} + (if $tls == "" then {} else {tls:[{hosts:[$host],secretName:$tls}]} end))
}' | kubectl -n dreamai apply -f -
if ! kubectl -n dreamai rollout status deployment/"$name" --timeout=2m; then
  kubectl -n dreamai get pods -l "app=$name" -o wide
  kubectl -n dreamai get events --field-selector "involvedObject.kind=Pod" --sort-by=.lastTimestamp |
    grep -F "$name" | tail -n 15 || true
  kubectl -n dreamai logs deployment/"$name" --previous --tail=65 ||
    kubectl -n dreamai logs deployment/"$name" --tail=65 || true
  exit 1
fi

for attempt in {1..15}; do
  result=$(curl -sS --max-time 5 -D - -o /dev/null "https://$host/v2/" 2>/dev/null || true)
  if grep -qi '^Docker-Distribution-API-Version: registry/2.0' <<< "$result" && grep -q ' 401' <<< "$result"; then
    break
  fi
  if [[ "$attempt" == 15 ]]; then
    echo "::error::The trial registry route did not answer over HTTPS with authentication enabled."
    exit 1
  fi
  sleep 3
done

config="$RUNNER_TEMP/dreamai-trial-registry-config"
mkdir -m 700 "$config"
printf '%s\n' "$password" | docker --config "$config" login "$host" --username trial-release --password-stdin
{
  printf 'DOCKER_CONFIG=%s\n' "$config"
  printf 'TRIAL_IMAGE=%s/dreamai-portal-trial\n' "$host"
  printf 'TRIAL_PULL_SECRET=%s\n' "$pull_secret"
} >> "$GITHUB_ENV"
