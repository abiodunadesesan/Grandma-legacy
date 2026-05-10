"use client";

import clsx from "clsx";
import { motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";
import { GalleryVideo } from "@/components/GalleryVideo";
import type { Memory } from "@/lib/types";
import { GalleryLightbox, type LightboxMedia } from "@/components/GalleryLightbox";
import {
  albumRowCopy,
  memoryCaptionFallback,
  memoryKickerByIndex,
  siteCopy,
  untitledMemoryHeadline
} from "@/lib/siteCopy";

const galleryRow: Variants = {
  hidden: {
    opacity: 0,
    y: 36
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 22,
      mass: 0.9
    }
  }
};

function formatYear(dateIsoOrDate: string) {
  const d = new Date(dateIsoOrDate);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
}

function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url);
}

function Media({
  url,
  alt,
  priority
}: {
  url: string;
  alt: string;
  priority?: boolean;
}) {
  const isVideo = isVideoUrl(url);

  if (isVideo) {
    return (
      <GalleryVideo
        className="absolute inset-0 z-[1] h-full w-full object-cover object-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        src={url}
        controls
        playsInline
        preload="auto"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className="absolute inset-0 z-[1] h-full w-full object-cover object-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      draggable={false}
    />
  );
}

function ProjectRow({
  memory,
  index,
  imageOnLeft,
  onExpandMedia
}: {
  memory: Memory;
  index: number;
  imageOnLeft: boolean;
  onExpandMedia: (media: LightboxMedia) => void;
}) {
  const fromStorage = memory.id.startsWith("storage:");
  const year = memory.date_occurred ? formatYear(memory.date_occurred) : "";

  const title = memory.title?.trim();
  const story = memory.story_text?.trim();

  /** Every Storage image gets varied neighbour text; titles/stories override when supplied in DB later. */
  const albumLine = fromStorage ? albumRowCopy(index) : null;

  const displayTitle = title
    ? title
    : albumLine
      ? albumLine.title
      : untitledMemoryHeadline(index);

  const kicker =
    memory.category?.trim() ||
    (fromStorage ? siteCopy.galleryKickerFallback : memoryKickerByIndex(index));

  const altLabel = title
    ? `${title} — in memory of Madam Adianu Ighodalo`
    : albumLine
      ? `${siteCopy.storagePhotoAlt} — ${albumLine.title}`
      : memory.category?.trim()
        ? `${memory.category.trim()} · Madam Adianu Ighodalo`
        : `${untitledMemoryHeadline(index)} — Madam Adianu Ighodalo`;

  const besideMediaBody = story ?? albumLine?.caption ?? memoryCaptionFallback(index);

  const rowClosingText = albumLine?.closing ?? siteCopy.rowClosingDefault;

  const mediaUrl = memory.media_url!;
  const showVideoExpand = isVideoUrl(mediaUrl);
  const openLightbox = () =>
    onExpandMedia({
      url: mediaUrl,
      alt: altLabel,
      isVideo: showVideoExpand
    });

  const mediaNumber = index + 1;

  return (
    <motion.li
      variants={galleryRow}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some", margin: "0px 0px -48px 0px" }}
      className="border-b border-white/[0.065] pb-16 last:border-b-0 last:pb-0 md:pb-24 md:last:pb-2"
    >
      <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20 xl:gap-24">
        {/* Media — always first on mobile for impact */}
        <div
          className={clsx(
            "order-1 min-w-0",
            imageOnLeft ? "md:order-1" : "md:order-2"
          )}
        >
          {memory.media_url ? (
            <div className="group relative overflow-hidden rounded-2xl bg-neutral-950 shadow-[0_28px_90px_-32px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08]">
              <div className="relative aspect-[5/4] w-full cursor-zoom-in sm:aspect-[4/3]">
                <Media
                  url={mediaUrl}
                  alt={altLabel}
                  priority={index < 4}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[2] opacity-0 ring-1 ring-inset ring-white/10 transition-opacity duration-500 group-hover:opacity-100 group-hover:ring-gold-400/25"
                  aria-hidden
                />
                {!showVideoExpand ? (
                  <button
                    type="button"
                    onClick={openLightbox}
                    aria-label={`View full photo: ${altLabel}`}
                    className="absolute inset-0 z-[6] rounded-2xl border-0 bg-transparent p-0 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/55"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox();
                    }}
                    aria-label={`Open full-screen video`}
                    className="absolute right-3 top-3 z-[8] rounded-full border border-white/15 bg-black/72 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-pearl/92 shadow-xl backdrop-blur-sm transition hover:bg-black/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/55 sm:text-[11px]"
                  >
                    Full screen
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Editorial block — NicePage-style vertical accent + index + title + copy */}
        <div
          className={clsx(
            "order-2 min-w-0",
            imageOnLeft ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="flex gap-6 sm:gap-8 lg:gap-10">
            <div
              className="hidden shrink-0 self-stretch rounded-full sm:block sm:w-1.5 sm:bg-gradient-to-b sm:from-gold-400 sm:via-gold-500/80 sm:to-gold-900/30"
              aria-hidden
            />
            <div className="min-w-0 space-y-5 pt-1">
              <p className="font-serif text-[clamp(2.1rem,4.2vw,3.1rem)] font-light tabular-nums leading-none tracking-tight text-gold-400/92">
                {mediaNumber}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300/90">
                {kicker}
              </p>

              {year ? (
                <p>
                  <span className="inline-block rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs font-medium tabular-nums text-pearl/68">
                    {year}
                  </span>
                </p>
              ) : null}

              <h3 className="font-serif text-[clamp(1.65rem,3.5vw,2.35rem)] font-normal leading-[1.15] tracking-tight text-pearl">
                {displayTitle}
              </h3>

              <p className="max-w-xl text-[0.98rem] leading-relaxed text-pearl/62 sm:text-base">
                {besideMediaBody}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <span
                  className="h-px w-14 bg-gradient-to-r from-gold-400/50 to-transparent"
                  aria-hidden
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-pearl/38">
                  {rowClosingText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export function Timeline({ memories }: { memories: Memory[] }) {
  const [lightbox, setLightbox] = useState<LightboxMedia | null>(null);

  const sorted = useMemo(() => {
    return [...memories].sort((a, b) => {
      const ad = a.date_occurred ? new Date(a.date_occurred).getTime() : 0;
      const bd = b.date_occurred ? new Date(b.date_occurred).getTime() : 0;
      return ad - bd;
    });
  }, [memories]);

  return (
    <div className="relative w-full">
      <GalleryLightbox active={lightbox} onClose={() => setLightbox(null)} />
      {/*
        Per-row whileInView (not one giant motion.ul): a tall list often fails
        intersection ratio checks (e.g. amount 8% of total height), so the whole gallery could stay opacity:0 forever.
      */}
      <ul className="list-none space-y-0" role="list">
        {sorted.map((m, i) => (
          <ProjectRow
            key={m.id}
            memory={m}
            index={i}
            imageOnLeft={i % 2 === 0}
            onExpandMedia={setLightbox}
          />
        ))}
      </ul>
    </div>
  );
}
