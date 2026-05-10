"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MuteToggle } from "@/components/MuteToggle";
import { siteCopy } from "@/lib/siteCopy";

type MusicContextValue = {
  isMuted: boolean;
  /** True after tap/click/key (or unmute toggle) — required before browsers allow audible playback. */
  playbackUnblocked: boolean;
  toggleMuted: () => void;
  setMuted: (muted: boolean) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

const STORAGE_KEY = "grandma-legacy:isMuted";
const YT_VIDEO_ID = "3mecNrIaWOA"; // Sweet Mother - Prince Nico Mbarga (video id)

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") return;
  const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
  if (existing) return;
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;
  document.head.appendChild(script);
}

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [ready, setReady] = useState(false);
  /** Allows audible YouTube playback after autoplay policies are satisfied */
  const [playbackUnblocked, setPlaybackUnblocked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "0") setIsMuted(false);
      if (stored === "1") setIsMuted(true);
    } catch {
      // ignore
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (!muted) setPlaybackUnblocked(true);
    try {
      localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  const toggleMuted = useCallback(() => setMuted(!isMuted), [isMuted, setMuted]);

  useEffect(() => {
    loadYouTubeIframeApi();

    const ensureContainer = () => {
      let el = document.getElementById("yt-music");
      if (!el) {
        el = document.createElement("div");
        el.id = "yt-music";
        el.style.position = "fixed";
        el.style.width = "1px";
        el.style.height = "1px";
        el.style.left = "-9999px";
        el.style.top = "-9999px";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        document.body.appendChild(el);
      }
      return el;
    };

    const init = () => {
      if (!window.YT?.Player) return;
      const container = ensureContainer();
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(container, {
        height: "1",
        width: "1",
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: YT_VIDEO_ID
        },
        events: {
          onReady: () => {
            try {
              // Muted autoplay succeeds on virtually all browsers; sound turns on after first gesture / unmute toggle.
              playerRef.current?.mute?.();
              playerRef.current?.playVideo?.();
            } catch {
              // ignore
            }
            setReady(true);
          },
          onStateChange: (e: any) => {
            // Re-kick playback if it gets paused (common without user gesture).
            if (e?.data === window.YT?.PlayerState?.PAUSED) {
              try {
                playerRef.current?.playVideo?.();
              } catch {
                // ignore
              }
            }
          }
        }
      });
    };

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      init();
    };

    const interval = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(interval);
        init();
      }
    }, 120);

    return () => {
      window.clearInterval(interval);
      window.onYouTubeIframeAPIReady = prev;
    };
  }, []);

  useEffect(() => {
    if (!ready || !playerRef.current) return;
    try {
      const p = playerRef.current;
      if (isMuted) {
        p.mute?.();
        p.setVolume?.(0);
      } else if (!playbackUnblocked) {
        p.mute?.();
        p.setVolume?.(0);
      } else {
        p.unMute?.();
        p.setVolume?.(65);
      }
      p.playVideo?.();
    } catch {
      // ignore
    }
  }, [isMuted, playbackUnblocked, ready]);

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    const unlock = () => {
      setPlaybackUnblocked(true);
      ac.abort();
    };

    window.addEventListener("pointerdown", unlock, { signal, passive: true });
    window.addEventListener("keydown", unlock, { signal });
    window.addEventListener("wheel", unlock, { signal, passive: true });
    window.addEventListener("touchstart", unlock, { signal, passive: true, capture: true });

    return () => ac.abort();
  }, []);

  const value = useMemo<MusicContextValue>(
    () => ({ isMuted, playbackUnblocked, toggleMuted, setMuted }),
    [isMuted, playbackUnblocked, toggleMuted, setMuted]
  );

  const showGestureHint = ready && !isMuted && !playbackUnblocked;

  return (
    <MusicContext.Provider value={value}>
      {children}
      <MuteToggle />
      {showGestureHint ? (
        <div className="fixed bottom-4 left-4 z-50 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-pearl/70 shadow-glow backdrop-blur">
          {siteCopy.soundGesture}
        </div>
      ) : null}
    </MusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useBackgroundMusic must be used within BackgroundMusicProvider");
  return ctx;
}

