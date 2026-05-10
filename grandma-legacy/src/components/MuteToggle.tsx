"use client";

import { useBackgroundMusic } from "@/components/BackgroundMusicProvider";
import { siteCopy } from "@/lib/siteCopy";

export function MuteToggle() {
  const { isMuted, playbackUnblocked, toggleMuted } = useBackgroundMusic();
  const soundAudible = !isMuted && playbackUnblocked;

  return (
    <button
      type="button"
      onClick={toggleMuted}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-pearl/80 shadow-glow backdrop-blur transition hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
      aria-label={
        isMuted
          ? "Unmute tribute hymn for Madam Ighodalo"
          : playbackUnblocked
            ? "Mute tribute hymn"
            : "Tribute hymn is muted until you interact with the page"
      }
    >
      <span
        className={[
          "inline-block h-2 w-2 rounded-full",
          soundAudible ? "bg-gold-300 shadow-[0_0_18px_rgba(234,168,27,0.55)]" : "bg-white/35"
        ].join(" ")}
      />
      <span className="select-none">
        {isMuted ? siteCopy.muteMuted : playbackUnblocked ? siteCopy.mutePlaying : siteCopy.muteWarmup}
      </span>
    </button>
  );
}

