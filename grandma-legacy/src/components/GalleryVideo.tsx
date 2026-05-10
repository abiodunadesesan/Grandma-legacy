"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useMemo, useRef } from "react";
import { videoSrcWithFirstFrameCue } from "@/lib/videoSrc";

type VideoProps = ComponentPropsWithoutRef<"video">;

/** Inline gallery / lightbox <video>; cues an early decoded frame instead of staying black until play. */
export function GalleryVideo({
  src,
  className,
  style,
  preload = "auto",
  ...rest
}: Omit<VideoProps, "preload"> & { preload?: VideoProps["preload"]; src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const keyedSrc = useMemo(() => videoSrcWithFirstFrameCue(src), [src]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const cueFirstFrame = () => {
      try {
        const seekMax = v.seekable?.length ? v.seekable.end(0) : 0;
        const t =
          Number.isFinite(v.duration) && v.duration > 0
            ? Math.min(0.1, Math.max(v.duration * 0.002, 0.02))
            : 0.06;
        if (Number.isFinite(seekMax) && seekMax > 0 && t < seekMax) {
          v.currentTime = Math.min(t, seekMax - 1e-3);
        } else if (v.readyState >= HTMLMediaElement.HAVE_METADATA && !Number.isFinite(seekMax)) {
          v.currentTime = t;
        }
      } catch {
        /* not seekable yet */
      }
    };

    v.addEventListener("loadedmetadata", cueFirstFrame);
    v.addEventListener("loadeddata", cueFirstFrame);
    v.addEventListener("canplay", cueFirstFrame);
    return () => {
      v.removeEventListener("loadedmetadata", cueFirstFrame);
      v.removeEventListener("loadeddata", cueFirstFrame);
      v.removeEventListener("canplay", cueFirstFrame);
    };
  }, [keyedSrc]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption -- family memorial clips — no captions file
    <video ref={ref} src={keyedSrc} className={className} style={style} preload={preload} {...rest} />
  );
}
