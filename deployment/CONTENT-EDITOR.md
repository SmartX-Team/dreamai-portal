# DreamAI 편집기 배포

## 시험판 사용

1. `dreamai.mobilex.kr`에서 `password.txt`에 있는 비밀번호로 로그인합니다. 기존 사용자가 편집 중이면 **기존 사용자 로그아웃**을 눌러 작업을 이어받을 수 있습니다.
2. 화면의 연필을 눌러 문구나 파일을 수정합니다. 파일은 탐색기에서 끌어 놓거나 업로드 영역에 붙여넣습니다. **편집 항목**에서 링크와 과정도 수정할 수 있습니다.
3. **편집 항목 → 배치할 영역**에서 위젯을 고릅니다. 순서 손잡이를 끌거나 위·아래 버튼으로 배열을 바꿀 수 있습니다. 제목, 문구, 이미지, 동영상, 링크, 구분선, 여백을 추가할 수 있습니다.
4. 변경은 시험판에 자동 저장됩니다. 우측 상단 **배포하기**는 저장이 완료되면 전체 포털을 `demo.dreamai.kr`에 게시합니다.

## 첫 배포

- 두 Deployment가 동시에 접근할 수 있는 **`dreamai-editor-content` PVC**를 준비합니다. 파일 잠금용 디렉터리 생성과 원자적 이름 변경을 지원해야 합니다. 시험판 컨테이너의 UID 1001에는 쓰기 권한이 필요합니다. 데모는 읽기 전용으로 마운트합니다.
- `dreamai` 네임스페이스에 로컬 `password.txt`를 파일 키로 사용하는 **`dreamai-editor-password` Secret**을 만듭니다. 비밀번호 파일을 Git이나 컨테이너 이미지에 넣지 않습니다.
- 시험판 Harbor 이미지 경로는 기존 이미지 경로 뒤에 `-trial`을 붙입니다. 다른 경로가 필요하면 GitHub 저장소의 `DREAMAI_TRIAL_IMAGE` 변수로 지정합니다. 레지스트리 접속에는 기존 Harbor 자격 증명을 사용합니다.
- GitHub `trial`과 `demo` 환경의 전용 자격 증명은 `DREAMAI_RELEASE_K8S_CONFIG` Secret에 보관합니다. 처음 시험판을 연결할 때는 기존 GitHub Actions의 `K8S_CONFIG`를 시험판 확인과 배포에 사용할 수 있습니다. 데모 컨테이너 이름은 `frontend`입니다. 해당 자격 증명에는 각 환경에 필요한 최소 Kubernetes 권한을 부여합니다.
- `codex/dreamai-visual-editor` 브랜치의 변경은 시험판 배포를 시작합니다. 시험판 배포는 기존 `dreamai-test`에 저장소 마운트와 로그인 설정을 적용합니다. Release job 요약에서 올라간 다이제스트를 확인합니다.
- `demo` 배포는 시험판과 같은 다이제스트로 별도 Deployment, Service 및 `demo.dreamai.kr` Ingress를 준비합니다. 시험판 Ingress의 업로드 한도는 이미지 8 MiB와 동영상 40 MiB를 수용해야 합니다.

## 사용자가 검수하는 절차

사용자가 실제 `dreamai.mobilex.kr`에 접속해 각 페이지를 엽니다. 해당 페이지의 **배치할 영역**에서 기존 요소를 비운 뒤 순서대로 다시 추가해 배치, 기존 링크, 동영상 재생, 교육 과정과 신청 기능을 확인합니다. 텍스트 수정과 포스터 업로드가 자동 저장되는지, 두 브라우저에서 새 로그인이 이전 편집자를 로그아웃하는지, 배포하기가 데모 게시본을 갱신하는지 확인합니다.

## 운영 승격과 저장소 정리

기존 화면의 실제 시험판 검수와 사용자의 운영 승인 전에는 `DREAMAI_PRODUCTION_RELEASE_ENABLED`를 켜지 않습니다. 승인 후 GitHub `production` 환경을 `main`과 지정 GitHub 승인자 한 명으로 제한하고 승인 우회를 끕니다. 다이제스트가 승인 대상 시험판의 현재 실행 이미지와 같은 경우에만 승격합니다. 운영 전용 이미지 경로는 `DREAMAI_PRODUCTION_IMAGE`로 지정하고, 시험판 경로와 운영판 경로에는 모두 `latest`만 사용합니다.

운영 포털 편집기 기능을 여는 단계에서는 운영판에 같은 PVC를 읽기 전용으로 마운트하고 `DREAMAI_CONTENT_MODE=published`를 설정합니다. 이후 직접 운영 게시를 연결할 때는 시험판에서 `DREAMAI_EDITOR_RELEASE_TARGET=production`을 설정하고 GitHub OAuth 앱과 지정 계정의 검증된 이메일 및 숫자 ID를 연결합니다. 콜백 주소는 `https://dreamai.mobilex.kr/api/portal-content/callback`입니다.

콘텐츠 저장소는 동일한 업로드를 한 번만 저장합니다. 초안, 데모, 운영판에 필요하지 않은 업로드는 보관 유예 후 정리합니다. Harbor에서는 실행 중인 모든 컨테이너와 롤아웃이 참조하는 다이제스트를 확인한 뒤 참조가 끝난 미태그 이미지와 사용하지 않는 레이어를 정리합니다.
