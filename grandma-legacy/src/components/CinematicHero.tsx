"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteCopy } from "@/lib/siteCopy";

type Props = {
  titleTop: string;
  titleMain: string;
  subtitle: string;
  imageSrc: string;
};

export function CinematicHero({ titleTop, titleMain, subtitle, imageSrc }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.38, 0.58, 0.8]);

  return (
    <section
      ref={ref}
      className="film-grain relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ y: imgY, scale: imgScale, transformOrigin: "center center" }}
      >
        {/* Full-bleed background (modern, no distortion) */}
        <Image
          key={imageSrc}
          src={imageSrc}
          alt={siteCopy.heroImageAlt}
          fill
          priority
          className="object-cover object-[center_15%]"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
        style={{ opacity: veilOpacity }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(234,168,27,0.18),transparent_45%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.08),transparent_40%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Modern readability layer: left fade + vignette, keeps photo cinematic */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_95%_at_35%_35%,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
        <div className="max-w-2xl rounded-3xl border border-white/12 bg-black/72 p-6 shadow-glow sm:p-7">
          <motion.p
            className="text-xs uppercase tracking-cinematic text-gold-200/85"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {titleTop}
          </motion.p>

          <motion.h1
            className="mt-3 font-serif text-5xl tracking-tight text-pearl [text-shadow:0_10px_45px_rgba(0,0,0,0.65)] sm:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {titleMain}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-sm leading-relaxed text-pearl/80 [text-shadow:0_8px_30px_rgba(0,0,0,0.7)] sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>

          <motion.dl
            className="mt-6 grid gap-2 border-l-2 border-gold-400/45 pl-4 text-sm leading-relaxed text-pearl sm:text-[0.95rem]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200/80">
                {siteCopy.heroBornLabel}
              </dt>
              <dd className="text-pearl/90 [text-shadow:0_6px_24px_rgba(0,0,0,0.65)]">
                {siteCopy.heroBorn}
                {siteCopy.heroBornDetail?.trim() ? (
                  <span className="mt-1 block text-xs font-normal tracking-normal text-pearl/55">
                    {siteCopy.heroBornDetail}
                  </span>
                ) : null}
              </dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200/80">
                {siteCopy.heroPassedLabel}
              </dt>
              <dd className="text-pearl/90 [text-shadow:0_6px_24px_rgba(0,0,0,0.65)]">
                {siteCopy.heroPassed}
              </dd>
            </div>
          </motion.dl>

          <motion.div
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/65 px-4 py-2 text-xs text-pearl/85 shadow-glow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_22px_rgba(234,168,27,0.55)]" />
            <span>{siteCopy.heroScrollCue}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

