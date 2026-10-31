/*
 * ─────────────────────────────────────────────────────────────
 *  WALK¤VER · centralized content
 *  Every piece of copy, link and product on the page lives here.
 *  Edit this file to replace content; components only render it.
 *
 *  Sources (researched Oct 2026):
 *  - Channel: youtube.com/channel/UCsdr6i_XXypnD_9FiL0dylg  (handle @swalkover, "walkover")
 *  - Channel description (tagline + philosophy quoted verbatim below)
 *  - Creator's public Telegram (t.me/saeed_walkover): video titles + youtu.be IDs
 *  - Keoxer collab uploads crediting "@swalkover" / "سعید والکوور"
 *  Verified items carry `verified: true`. Anything marked SAMPLE must be replaced.
 * ─────────────────────────────────────────────────────────────
 */

const hallway = "/assets/hallway.webp";
const box = "/assets/box.webp";
const mic = "/assets/mic.webp";
const redbook = "/assets/redbook.webp";
const meninblack = "/assets/meninblack.webp";
const mirror = "/assets/mirror.webp";
const house = "/assets/house.webp";
const hotel = "/assets/hotel.webp";
const phone = "/assets/phone.webp";

/** @typedef {{ id:string, title:string, teaser:string, tag:string, image:string, url:string, host?:string, verified:boolean }} Video */

const yt = (id) => `https://www.youtube.com/watch?v=${id}`;

export const CHANNEL_URL = "https://www.youtube.com/channel/UCsdr6i_XXypnD_9FiL0dylg";

export const creator = {
  brand: "walkover",
  wordmark: "WALK¤VER", // stylization used on the creator's own Telegram ("Walk¤ver")
  displayName: "سعید والکور", // as credited in collab uploads ("سعید والکوور" / "Saeed Walkover")
  handle: "@swalkover",
  // Channel description, verbatim:
  tagline: ["من آنم که در تاریکی", "با چشمانی باز و خیره", "اطرافم را می‌نگرم"],
  welcome: "به قسمت تاریک یوتیوب خوش آمدید",
  philosophy:
    "قصد من این هستش که بتونم با اندک مهارت و اندک دانشی که دارم حس ترس رو بهتون القا کنم",
  philosophyCoda: "سبک ترسناک یک سبک خاص است؛ با مخاطبانی خاص‌تر",
  topics: ["خیالی", "هیجانی", "ماورایی", "جنایی", "چالشی", "معمایی"], // from channel description
  // Stats intentionally omitted: none were supplied. Add { label, value } pairs here if wanted.
  stats: [],
  portrait: mic,
};

export const links = {
  channel: CHANNEL_URL,
  videos: "https://www.youtube.com/@swalkover/videos",
  subscribe: `${CHANNEL_URL}?sub_confirmation=1`,
  telegram: "https://t.me/saeed_walkover",
  memoryBot: "https://t.me/WalkoverMainBot", // pinned on the Telegram channel for submitting scary memories
};

export const nav = [
  { label: "ویدیوها", href: "#screening" },
  { label: "آرشیو", href: "#archive" },
  { label: "فروشگاه", href: "#merch" },
  { label: "درباره", href: "#voice" },
];

export const socials = [
  { label: "یوتیوب", href: CHANNEL_URL },
  { label: "تلگرام", href: links.telegram },
  // Instagram etc. not added: not verified from an official source.
];

/* Real uploads (IDs + titles from the creator's own Telegram posts). Durations unknown, so not shown. */
export const videos = /** @type {Video[]} */ ([
  {
    id: "pIPo9EPjHnU",
    title: "بازدید از خانه‌ی جن‌زده",
    teaser: "چند بار در خانه باز و بسته شد و صداهای وحشتناکی از توی خانه می‌آمد.",
    tag: "تجربه شخصی",
    image: "/images/videos/be-carefull.jpg",
    url: yt("pIPo9EPjHnU"),
    verified: true,
  },
  {
    id: "o6UH0erBnf0",
    title: "این جعبه هرگز نباید باز می‌شد",
    teaser: "ماجرای شخصی که یک جعبه پیدا کرد و وقتی بازش کرد…",
    tag: "جنایی",
    image: "/images/videos/clock.jpg",
    url: yt("o6UH0erBnf0"),
    verified: true,
  },
  {
    id: "cCFROOoOaks",
    title: "ماجرای وحشتناک مردان سیاه‌پوش",
    teaser: "اگر این مردان سیاه‌پوش را توی خیابان دیدید، سریعاً فرار کنید.",
    tag: "پرونده مرموز",
    image: "/images/videos/moment-of-truth.jpg",
    url: yt("cCFROOoOaks"),
    verified: true,
  },
  {
    id: "Qt3zhXtz3vw",
    title: "چالش شیطانی کتاب قرمز",
    teaser: "کتابی که می‌گویند با آن می‌شود با ارواح حرف زد. هرگز انجامش ندهید.",
    tag: "ماورایی",
    image: "/images/videos/NT.jpg",
    url: yt("Qt3zhXtz3vw"),
    verified: true,
  },
  {
    id: "Xa0_JsHM-CM",
    title: "احضار روح بلادی مری، تنها در خانه",
    teaser: "تنهایی، جلوی آینه چیزهایی افتاد که نزدیک بود سکته کنم",
    tag: "ماورایی",
    image: "/images/videos/sahar-tabar.jpg",
    url: yt("Xa0_JsHM-CM"),
    verified: true,
  },
]);

/* Collab uploads on Keoxer's channel that feature walkover */
export const collabs = /** @type {Video[]} */ ([
  {
    id: "b9pRPUchu-w",
    title: "یکی از نفرین‌شده‌ترین هتل‌های کانادا",
    teaser: "در جست‌وجوی بانوی قرمزپوش هتل فیرمونت ونکوور",
    tag: "مکان نفرین‌شده",
    image: hotel,
    url: yt("b9pRPUchu-w"),
    host: "کانال Keoxer",
    verified: true,
  },
  {
    id: "MfHtPlJP54Y",
    title: "ممنوعه‌ترین هتل کانادا",
    teaser: "شبی در هتل افسانه‌ای فیرمونت بنف اسپرینگز",
    tag: "مکان نفرین‌شده",
    image: hotel,
    url: yt("MfHtPlJP54Y"),
    host: "کانال Keoxer",
    verified: true,
  },
]);

const byId = (id) => [...videos, ...collabs].find((v) => v.id === id);

/* Series = editorial groupings of the channel's recurring formats. Descriptions are editable copy. */
export const series = [
  {
    code: "RITUAL",
    title: "احضار و چالش‌های ممنوعه",
    blurb: "چالش‌هایی که نباید انجام داد، انجام می‌شوند جلوی دوربین، تنها، در خانه",
    image: redbook,
    episodes: [byId("IM7CTW7WRvU"), byId("0FsBAuNZeaE")],
  },
  {
    code: "PLACES",
    title: "مکان‌های نفرین‌شده",
    blurb: "خانه‌ها و هتل‌هایی که شب‌ها خالی نیستند با دوربین روشن، وارد می‌شویم.",
    image: hotel,
    episodes: [byId("DDhyqZj9zGU"), byId("b9pRPUchu-w"), byId("MfHtPlJP54Y")],
  },
  {
    code: "CASES",
    title: "پرونده‌های جنایی",
    blurb: "پرونده‌هایی که بسته شدند، اما جواب ندادند",
    image: box,
    episodes: [byId("iA7XUKiMwfU")],
  },
  {
    code: "LEGENDS",
    title: "موجودات و افسانه‌ها",
    blurb: "چهره‌هایی که در خیابان دیده می‌شوند و هیچ‌کس نمی‌داند از کجا آمده‌اند",
    image: meninblack,
    episodes: [byId("uNh7em_vPGk")],
  },
  {
    code: "YOURS",
    title: "خاطرات ترسناک شما",
    blurb: "خاطره، عکس یا ویدیوی عجیبی داری؟ بفرست؛ شاید در ویدیوی بعدی روایتش کنیم",
    image: phone,
    episodes: [],
    cta: { label: "ارسال خاطره در تلگرام", href: links.memoryBot },
  },
];

export const featuredStory = {
  label: "پرونده جنایی",
  hashtag: "#جنایت_حل_نشده",
  lines: ["این جعبه", "هرگز نباید", "باز می‌شد"],
  teaser:
    "کسی یک جعبه پیدا کرد. وقتی بازش کرد، با چیزی وحشتناک و باورنکردنی روبه‌رو شد. این ویدیو، دیدنش جرئت می‌خواهد",
  image: box,
  video: byId("iA7XUKiMwfU"),
};

export const heroImage = hallway;

/*
 * SAMPLE MERCH — names/concepts are proposals. No prices, stock or checkout exist yet.
 * Read through components/store/product-service.js, which maps each entry to the previous
 * storefront's product model. Optional fields it understands (leave null until real):
 *   price, originalPrice (Toman) · discount (%) · stock (0 = sold out) · sku · description
 *   colors [{ name, value }] · sizes [..] · images [photo urls] · rating · reviewCount
 */
export const products = [
  { slug: "hoodie-door", kind: "hoodie", name: "هودی «درِ نیمه‌باز»", line: "چاپ قرمز روی سینه · مشکی", art: hallway, price: null, available: null, sample: true,
    colors: [{ name: "مشکی", value: "#111111" }], sizes: ["S", "M", "L", "XL", "XXL"] },
  { slug: "tee-box", kind: "tee", name: "تیشرت اورسایز «جعبه»", line: "چاپ پشت · استخوانی روی مشکی", art: box, price: null, available: null, sample: true,
    colors: [{ name: "مشکی", value: "#111111" }], sizes: ["S", "M", "L", "XL", "XXL"] },
  { slug: "mug-eyes", kind: "mug", name: "ماگ «چشمانِ باز»", line: "سرامیک مات · داخل قرمز", art: mirror, price: null, available: null, sample: true },
  { slug: "cap-mark", kind: "cap", name: "کلاه «¤»", line: "گلدوزی کوچک قرمز", art: null, price: null, available: null, sample: true },
  { slug: "poster-redbook", kind: "poster", name: "پوستر «کتاب قرمز»", line: "چاپ مات · ۵۰×۷۰", art: redbook, price: null, available: null, sample: true },
  { slug: "stickers-files", kind: "stickers", name: "پک استیکر «پرونده‌ها»", line: "۶ برچسب مات", art: meninblack, price: null, available: null, sample: true },
];
