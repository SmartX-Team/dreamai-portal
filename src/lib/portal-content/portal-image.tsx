import NextImage, { type ImageProps } from "next/image";
import { assetPrefix } from "./registry";

export default function PortalImage({ src, unoptimized, ...props }: ImageProps) {
  const uploaded = typeof src === "string" && src.startsWith(assetPrefix);
  return <NextImage src={src} unoptimized={uploaded || unoptimized} {...props} />;
}
