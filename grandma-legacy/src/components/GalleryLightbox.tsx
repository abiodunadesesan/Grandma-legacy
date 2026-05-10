"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GalleryVideo } from "@/components/GalleryVideo";

export type LightboxMedia = {
  url: string;
  alt: string;
  isVideo: boolean;
};

export function GalleryLightbox({
  active,
  onClose
}: {
  active: LightboxMedia | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose]);

  if (!mounted || !active) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-label={active.isVideo ? "Fullscreen video" : "Fullscreen photo"}
      className="fixed inset-0 z-[320] flex flex-col bg-black/[0.93]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-[330] rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm font-medium text-pearl transition hover:bg-black/78 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
      >
        Close
      </button>

      <div
        className="flex flex-1 items-center justify-center p-6 pt-20 sm:p-10 sm:pt-16"
        onClick={(e) => e.stopPropagation()}
      >
        {active.isVideo ? (
          <GalleryVideo
            className="max-h-[calc(100dvh-8rem)] w-full max-w-[min(100%,1200px)] rounded-lg object-contain shadow-2xl"
            src={active.url}
            controls
            playsInline
            preload="auto"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- lightbox loads remote/public URLs dynamically
          <img
            src={active.url}
            alt={active.alt}
            className="max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            decoding="async"
          />
        )}
      </div>

      {!active.isVideo ? (
        <p className="pointer-events-none border-t border-white/10 px-6 py-4 text-center text-xs text-pearl/50 sm:text-sm">
          {active.alt}
        </p>
      ) : (
        <p className="border-t border-white/10 px-6 py-3 text-center text-[11px] text-pearl/45">
          Click outside or press Esc to close
        </p>
      )}
    </div>,
    document.body
  );
}
