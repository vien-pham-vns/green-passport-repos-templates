"use client";

import Image, { type ImageProps as NextImageProps } from "next/image";
import { type FC, useState } from "react";
import { getAssetUrl, getInternalAssetUrl } from "@/utils";

type Props = NextImageProps & {
  internalAsset?: boolean; // default false
  onFallback?: () => void;
};

const Index: FC<Props> = ({
  internalAsset,
  src: srcProp,
  onFallback,
  ...props
}) => {
  const [src, setSrc] = useState(() => {
    if (internalAsset) {
      return typeof srcProp === "string"
        ? getInternalAssetUrl(srcProp)
        : srcProp;
    }
    return getAssetUrl(srcProp as string);
  });

  const handleImageError = () => {
    setSrc(getInternalAssetUrl("/thumbnail.png"));
    if (onFallback) onFallback();
  };

  return (
    <Image
      {...props}
      alt={props.alt || ""}
      src={src}
      onError={handleImageError}
    />
  );
};

export default Index;
