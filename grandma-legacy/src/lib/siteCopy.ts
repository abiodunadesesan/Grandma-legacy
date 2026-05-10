/**
 * Memorial wording for Late Madam Adianu Ighodalo.
 * Dates and venues below are easy to edit in one place.
 */

/** Life dates (1921 + age 105 aligns with family poster, 2026) */
const BORN_DISPLAY = "1921";
/** Shown beside “Called home” on the hero (funeral programme dates stay in Burial section below). */
const PASSED_DISPLAY = "September 2025";

export const siteCopy = {
  metaTitle: "In loving memory · Madam Adianu Ighodalo",
  metaDescription:
    "Photos and burial details our family gathered for Grandma—Madam Adianu Ighodalo.",

  heroEyebrow: "In loving memory",
  heroTitle: "Madam Adianu Ighodalo",
  /** Short hero line — keep it spoken, not slogan-y */
  heroSubtitle:
    "We made this little site for Grandma: for her children, her grandchildren, and the little ones coming after.",

  /** Shown plainly under the intro */
  heroBornLabel: "Born",
  heroBorn: BORN_DISPLAY,
  /** Matches printed poster: maiden name and age */
  heroBornDetail: "Née Ukpebor Iyase · aged 105 years",
  heroPassedLabel: "Called home",
  heroPassed: PASSED_DISPLAY,

  heroScrollCue: "Scroll for photos",

  galleryEyebrow: "Photos",
  galleryHeading: "Light gathered softly",
  galleryIntro:
    "Pulled together from tins, envelopes, stray chats—the real chair stays empty—but every frame recalls Madam Adianu visibly: gele true, wrists glinting, elbows deep coaxing peels toward guests who nibbled shyly.",
  gallerySupporting:
    "Roots cross Ukpebor’s quarter toward Francis homesteads; songs lift out of Idumogo toward steaming pots across Ewossa—pause where those threads knot into one unmistakable grin.",

  memoryKickers: [
    "Daughters widened brittle envelopes gently",
    "Grandchildren eased snapshots across warm supper planks",
    "Cousins coasted glossies over supper boards",
    "Idumu-Iyase kin retraced barefoot Sunday soils",
    "Choir robes once brushed cobalt beside matriarch cloth",
    "Meal napkins cradled teaching between plates"
  ] as const,

  galleryKickerFallback:
    "From children, grandchildren, and great-great-grandchildren's albums",

  rowClosingDefault: "Always treasured",

  storagePhotoAlt: "Madam Adianu Ighodalo portrait—kinsfolk vault",

  untitledMemoryHeadlines: [
    "Low anthem ahead of preacher’s ascent",
    "Ujielu veranda amber once laughter thinned",
    "Supper steadied once voices cooled",
    "Ignition eased while gravel swallowed tyres",
    "Braid slipped free beside kerosene bowl",
    "Vapour veiled pots deliberately slow"
  ] as const,

  memoryCaptionsFallBack: [
    "Pain outpaces tidy captions—later breath steadies sharper lines.",
    "Two calendars feud; tenderness keeps no score sheets.",
    "Sometimes pixels speak louder than editors altogether.",
    "Blank rows await whoever holds detail clearest today.",
    "Lean sentences matched disposition—economy honours that habit.",
    "Land your clause gently whenever bravery surfaces."
  ] as const,

  mutePlaying: "Sound on",
  muteMuted: "Sound off",
  /** Shown until the page gets a gesture; music is already playing muted in the browser. */
  muteWarmup: "Playing · tap for sound",
  soundGesture: "Tap anywhere if you can't hear Sweet Mother",

  heroImageAlt: "Madam Adianu Ighodalo",

  emptyGallery:
    "No photos are loading yet—check the bucket, or drop a written memory into the memories table when you're ready.",

  servicesEyebrow: "Burial & programmes",
  servicesHeading: "Funeral arrangements",
  servicesIntro:
    "Celebration of life and funeral ceremonies for Late Madam Adianu Ighodalo (Née Ukpebor Iyase)—beloved mother, grandmother, great-grandmother, daughter, wife, sister, and aunt. Announced by the families of Late Mr. Francis Ighodalo of Ujielu Quarters, Ewossa, and Late Mr. Ukpebor Iyase of Idumagbor Quarters, Ewossa, Igueben L.G.A., Edo State.",

  servicesNotice: "May her gentle soul rest in perfect peace. Amen.",

  serviceItems: [
    {
      title: "Friday · 15 May 2026 · lying in state & interment",
      detail:
        "9:00 AM — Body leaves Irrua Specialist Hospital for her husband’s compound at Ujielu Ewossa, for a brief lying in state.\n\n12:00 PM — Body leaves for her father’s compound for interment at Idumu-Iyase Quarters, Idumagbor Ewossa."
    },
    {
      title: "Saturday · 16 May 2026 · gathering",
      detail: "12:00 PM — Social dance and entertainment of guests at Ujielu Ewossa."
    },
    {
      title: "Sunday · 17 May 2026 · thanksgiving",
      detail: "10:00 AM — Thanksgiving service at Eternal Hope Gospel Mission, Idumogo Ewossa."
    },
    {
      title: "Directions & travel",
      detail:
        "All locations are in Ewossa area, Igueben L.G.A., Edo State. If you’re coming from out of town, please coordinate with family for the safest route and where to park—village timings can slip a little on the day."
    }
  ] as const
};

const STORAGE_SIDE_COPY = [
  {
    title: "Evening cadence crowned with Amen",
    caption:
      "Handsets seldom cooled before petitions floated upward—even errands earned whispers upstairs. Today's ringtone still recalls that tenderness.",
    closing: "Cherished dearly"
  },
  {
    title: "Sabbath mantle folded immaculate",
    caption:
      "Geles aligned with steadiness; sleeves pressed smooth while fragrance wandered the car—a ride toward Eternal Hope humming before sermon rose.",
    closing: "Sacred remembrance"
  },
  {
    title: "Orchards offered without prelude",
    caption:
      "Melon arcs, chilled citrus wedges, steaming corn—all appeared before inquiries formed; abundance preached quietly through sugar.",
    closing: "Sweet hospitality"
  },
  {
    title: "O sab’ ere above porcelain rhythm",
    caption:
      "Faucets hummed, enamel answered—“He accomplishes”—no crowd gathered, marrow steadied each cousin elbow-deep in soapsuds.",
    closing: "Steadfast softness"
  },
  {
    title: "Courtyards widening at Francis threshold",
    caption:
      "Pavers swallowed sundown footprints; allowances arrived paired with whispered wisdom; dusk settled without quarrels clinging humid.",
    closing: "Ujielu keeps longing"
  },
  {
    title: "Branches unfurled toward Idumagbor kin",
    caption:
      "Suitcases exhaled saturated colour; cousins orbited anecdotes; motorway horns waited politely beyond compound gates.",
    closing: "Kindred heirloom"
  },
  {
    title: "Salutations brushed with Edo balm",
    caption:
      "Egbe fure rhe Owhime misted nieces at sunrise—dictionaries stagger yet warmth outweighs glossary gaps; pixels archive vowels tenderly.",
    closing: "Sheltering benediction"
  },
  {
    title: "Susan’s plate beside tithe hymn",
    caption:
      "Mango arced beside stewardship lessons disciplined yet forgiving—sweetness braided rigour minus bruises or bite.",
    closing: "Instruction woven gently"
  },
  {
    title: "Cousins leaned prints beneath lamplight",
    caption:
      "Glass scattered yellow rectangles; giggles scratched varnish beneath sleeves; narration paused courteously awaiting slower pens.",
    closing: "Chronicles unfurl slowly"
  },
  {
    title: "Dew traced slippers toward roadside sellers",
    caption:
      "Baskets swung yams skyward while passing blessings silenced hagglers half a breath—transactions softened mid-air.",
    closing: "Morning hallowed"
  },
  {
    title: "Sudden drizzle drummed iron rooftops",
    caption:
      "Harmonies climbed soggy stairwells anyway—humidity clung to choir cotton yet melodies never thinned toward complaint.",
    closing: "Cadence unbeaten"
  },
  {
    title: "Nieces tethered ribbons around album hinges",
    caption:
      "Adhesive curled gold leaf; giggles sugared fingerprints; custodianship passed thumb to thumb quietly.",
    closing: "Trust handed down"
  }
] as const;

export function albumRowCopy(storageIndex: number) {
  return STORAGE_SIDE_COPY[storageIndex % STORAGE_SIDE_COPY.length]!;
}

export function memoryKickerByIndex(index: number) {
  const list = siteCopy.memoryKickers;
  return list[index % list.length]!;
}

export function untitledMemoryHeadline(index: number) {
  return siteCopy.untitledMemoryHeadlines[index % siteCopy.untitledMemoryHeadlines.length]!;
}

export function memoryCaptionFallback(index: number) {
  return siteCopy.memoryCaptionsFallBack[index % siteCopy.memoryCaptionsFallBack.length]!;
}
