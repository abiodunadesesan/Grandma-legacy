import { CinematicHero } from "@/components/CinematicHero";
import { TributesSection } from "@/components/TributesSection";
import { Timeline } from "@/components/Timeline";
import type { Memory } from "@/lib/types";
import { siteCopy } from "@/lib/siteCopy";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

async function fetchMemories(): Promise<Memory[]> {
  // If env isn't set yet, fall back to an empty timeline (avoids dev crashes).
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return [];

  try {
    const supabase = createSupabaseServerClient();
    // Some projects may not have `date_occurred` yet. Try the "full" shape first,
    // then gracefully fall back to a minimal shape.
    const full = await supabase
      .from("memories")
      .select("id,created_at,title,story_text,media_url,date_occurred,category")
      .order("date_occurred", { ascending: true, nullsFirst: true });

    if (!full.error) return (full.data ?? []) as Memory[];

    const msg = full.error.message ?? "";
    if (/date_occurred/i.test(msg)) {
      const fallback = await supabase
        .from("memories")
        .select("id,created_at,title,story_text,media_url,category")
        .order("created_at", { ascending: true });

      if (fallback.error) {
        console.error("Failed to fetch memories:", fallback.error.message);
        return [];
      }

      return ((fallback.data ?? []) as Omit<Memory, "date_occurred">[]).map((m) => ({
        ...m,
        date_occurred: null
      })) as Memory[];
    }

    console.error("Failed to fetch memories:", msg);
    return [];
  } catch (e) {
    // Offline / CI / DNS: don't fail prerender
    console.warn("fetchMemories skipped (network):", e instanceof Error ? e.message : e);
    return [];
  }
}

type StorageItem = {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  last_accessed_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

async function listAllStorageFiles(params: {
  bucket: string;
  prefix: string;
  limit?: number;
}): Promise<string[]> {
  const { bucket, limit = 500 } = params;
  // Supabase expects folder paths without a trailing slash.
  const prefix = (params.prefix || "").replace(/\/+$/, "");
  const supabase = createSupabaseAdminClient();

  const results: string[] = [];

  const walk = async (folder: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" }
    });

    if (error) throw error;
    const items = (data ?? []) as StorageItem[];

    for (const item of items) {
      if (results.length >= limit) return;
      const isFolder = !item.metadata; // folders come back with null metadata
      const childPath = folder ? `${folder}/${item.name}` : item.name;
      if (isFolder) await walk(childPath);
      else results.push(childPath);
    }
  };

  await walk(prefix);
  return results;
}

/**
 * Build a correct public object URL. `getPublicUrl()` can emit unencoded spaces in path
 * segments (e.g. "Grandma legacy/.../Screenshot ... PM.png"), which breaks <img src> in Safari.
 */
function supabaseStoragePublicUrl(bucket: string, objectPath: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  if (!base) return null;
  const trimmed = objectPath.replace(/^\/+/, "").replace(/\/+$/, "");
  const encodedPath = trimmed
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  if (!encodedPath) return null;
  const safeBucket = encodeURIComponent(bucket);
  return `${base}/storage/v1/object/public/${safeBucket}/${encodedPath}`;
}

async function fetchMemoriesFromStorage(): Promise<Memory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];

  try {
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "memories-media";
    const prefix = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_PREFIX || "";

    const supabase = createSupabaseAdminClient();
    const paths = await listAllStorageFiles({ bucket, prefix, limit: 500 });

    return paths.map((path) => {
      const publicUrl =
        supabaseStoragePublicUrl(bucket, path) ?? supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
      return {
        id: `storage:${path}`,
        created_at: new Date().toISOString(),
        title: "",
        story_text: null,
        media_url: publicUrl,
        date_occurred: null,
        category: null
      } satisfies Memory;
    });
  } catch (e) {
    console.warn("fetchMemoriesFromStorage skipped (network):", e instanceof Error ? e.message : e);
    return [];
  }
}

function hasMediaUrl(m: { media_url: string | null }) {
  return Boolean(m.media_url?.trim());
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const memories = await fetchMemories();
  const gallery = await fetchMemoriesFromStorage();
  // Prefer Storage gallery when it has files; otherwise only DB rows that include a media URL.
  const timelineItems =
    gallery.length > 0 ? gallery : memories.filter(hasMediaUrl);
  return (
    <main className="relative">
      <CinematicHero
        titleTop={siteCopy.heroEyebrow}
        titleMain={siteCopy.heroTitle}
        subtitle={siteCopy.heroSubtitle}
        imageSrc="/hero-portrait.png"
      />
      <section
        className="relative border-t border-white/[0.07] bg-gradient-to-b from-ink via-[#06060a] to-ink"
        aria-labelledby="gallery-heading"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_70%_80%_at_50%_-20%,rgba(234,168,27,0.07),transparent_65%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 sm:px-8 lg:px-12">
          <div className="mb-14 grid gap-10 lg:mb-20 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
            <div className="flex gap-6 sm:gap-8">
              <div
                className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-gold-400 via-gold-500/85 to-gold-900/35 sm:w-2"
                aria-hidden
              />
              <div className="film-grain min-w-0 max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300/88">
                  {siteCopy.galleryEyebrow}
                </p>
                <h2
                  id="gallery-heading"
                  className="mt-4 font-serif text-3xl font-normal tracking-tight text-pearl sm:text-4xl lg:text-[2.45rem] lg:leading-[1.12]"
                >
                  {siteCopy.galleryHeading}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-pearl/52 sm:text-[0.95rem]">
                  {siteCopy.galleryIntro}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-pearl/48 lg:text-right lg:text-base lg:leading-relaxed">
              {siteCopy.gallerySupporting}
            </p>
          </div>

          <div
            className="mb-12 h-px w-full bg-gradient-to-r from-gold-500/15 via-gold-400/28 to-transparent lg:mb-14"
            aria-hidden
          />

          {timelineItems.length ? (
            <Timeline memories={timelineItems} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0e] p-8 text-center text-sm text-pearl/60 leading-relaxed">
              {siteCopy.emptyGallery}
            </div>
          )}
        </div>
      </section>

      <TributesSection />

      <section
        className="relative border-t border-white/[0.07] bg-gradient-to-b from-ink via-[#08080c] to-ink pb-28 pt-20"
        aria-labelledby="services-heading"
      >
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 flex gap-6 sm:gap-8">
            <div
              className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-gold-400 via-gold-500/85 to-gold-900/35 sm:w-2"
              aria-hidden
            />
            <div className="min-w-0 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300/88">
                {siteCopy.servicesEyebrow}
              </p>
              <h2
                id="services-heading"
                className="mt-4 font-serif text-3xl font-normal tracking-tight text-pearl sm:text-4xl"
              >
                {siteCopy.servicesHeading}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pearl/55 sm:text-base">
                {siteCopy.servicesIntro}
              </p>
              {siteCopy.servicesNotice?.trim() ? (
                <p className="mt-4 rounded-xl border border-gold-400/20 bg-gold-500/[0.06] px-4 py-3 text-sm text-pearl/80">
                  {siteCopy.servicesNotice}
                </p>
              ) : null}
            </div>
          </div>

          <ul className="grid list-none gap-6 sm:grid-cols-2 lg:gap-8" role="list">
            {siteCopy.serviceItems.map((item) => (
              <li key={item.title}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0a0e] p-6 lg:p-7">
                  <h3 className="font-serif text-lg text-pearl">{item.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-pearl/58">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

