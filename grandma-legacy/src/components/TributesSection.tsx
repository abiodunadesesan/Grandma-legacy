import { memorialTributes } from "@/lib/tributes";

export function TributesSection() {
  return (
    <section
      className="relative border-t border-white/[0.07] bg-gradient-to-b from-[#06060a] via-ink to-[#08080c] pb-28 pt-24"
      aria-labelledby="tributes-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16 flex gap-6 sm:gap-8 lg:mb-20">
          <div
            className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-gold-400 via-gold-500/85 to-gold-900/35 sm:w-2"
            aria-hidden
          />
          <div className="min-w-0 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300/88">
              Letters from the family
            </p>
            <h2
              id="tributes-heading"
              className="mt-4 font-serif text-3xl font-normal tracking-tight text-pearl sm:text-4xl lg:text-[2.45rem] lg:leading-[1.12]"
            >
              Tributes to Mama
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-pearl/52 sm:text-base">
              Words from her grandson, her daughter, and her granddaughter — each written in their own
              voice.
            </p>
          </div>
        </div>

        <div className="space-y-14 lg:space-y-[4.75rem]">
          {memorialTributes.map((item, tributeIndex) => (
            <article
              key={item.id}
              className="scroll-mt-28 rounded-[1.65rem] border border-white/[0.085] bg-[#0b0b10]/90 p-6 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)] sm:p-10 lg:p-12"
              aria-labelledby={`tribute-heading-${item.id}`}
            >
              <header className="border-b border-white/[0.07] pb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300/72">
                  Tribute {String(tributeIndex + 1).padStart(2, "0")}
                </p>
                <h3
                  id={`tribute-heading-${item.id}`}
                  className={[
                    "mt-3 font-serif text-2xl font-normal leading-snug tracking-tight text-pearl sm:text-[1.85rem]",
                    item.id === "susan-daughter" ? "italic" : ""
                  ]
                    .join(" ")
                    .trim()}
                >
                  {item.heading}
                </h3>
                {item.subheading?.trim() ? (
                  <p className="mt-2 text-sm italic text-pearl/45">{item.subheading}</p>
                ) : null}
              </header>

              <div className="mt-8 max-w-3xl">
                <div className="space-y-6 text-[0.98rem] leading-[1.75] text-pearl/78 sm:text-base">
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <footer className="mt-12 border-t border-white/[0.06] pt-8">
                <p className="text-sm font-medium tracking-wide text-gold-200/90">{item.signature}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
