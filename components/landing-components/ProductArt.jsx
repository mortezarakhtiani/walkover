/* Product renders drawn in SVG so the storefront ships without stock photography.
   Replace with real product photos by giving a product an `photo` field in data/site.js. */

const BONE = "#EAE6DF";
const BLOOD = "#dc2626";

function Defs({ uid }) {
  return (
    <defs>
      <linearGradient id={`cloth-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1d1c1c" />
        <stop offset="0.55" stopColor="#121111" />
        <stop offset="1" stopColor="#0a0a0a" />
      </linearGradient>
      {/* luminance → bone-white ink with alpha: reads as a screen print on black */}
      <filter id={`ink-${uid}`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.875  0.9 1.6 0.3 0 -0.06" />
      </filter>
      <filter id={`duo-${uid}`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.9 0.5 0.1 0 0.02  0.15 0.15 0.05 0 0  0.12 0.12 0.05 0 0  0 0 0 1 0" />
      </filter>
    </defs>
  );
}

/** `idPrefix` keeps SVG gradient/filter ids unique when the same product renders more than once on a page. */
export default function ProductArt({ product, className = "", idPrefix = "" }) {
  const uid = `${idPrefix}${product.slug}`;
  const cloth = `url(#cloth-${uid})`;
  const seam = { fill: "none", stroke: "#2a2828", strokeWidth: 1.4 };
  return (
    <svg viewBox="0 0 400 480" className={className} role="img" aria-label={`نمای طراحی ${product.name}`}>
      <Defs uid={uid} />
      <ellipse cx="200" cy="452" rx="150" ry="12" fill="#000" opacity="0.6" />

      {product.kind === "tee" && (
        <g>
          <path d="M122 72 L162 50 Q200 80 238 50 L278 72 L348 122 L316 180 L284 162 L284 432 L116 432 L116 162 L84 180 L52 122 Z" fill={cloth} stroke="#262424" strokeWidth="1.5" />
          <path d="M162 50 Q200 94 238 50" {...seam} strokeWidth="3" />
          <path d="M116 162 L116 140 M284 162 L284 140" {...seam} />
          <path d="M150 380 Q200 395 250 378 M140 250 Q160 300 150 350" {...seam} opacity="0.5" />
          <image href={product.art} x="138" y="140" width="124" height="160" preserveAspectRatio="xMidYMid slice" filter={`url(#ink-${uid})`} />
        </g>
      )}

      {product.kind === "hoodie" && (
        <g>
          <path d="M136 104 Q132 44 200 40 Q268 44 264 104 Q232 92 200 92 Q168 92 136 104 Z" fill={cloth} stroke="#2a2828" strokeWidth="1.5" />
          <path d="M150 100 Q200 70 250 100" fill="none" stroke="#050505" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
          <path d="M132 96 L98 112 L48 300 L46 420 L88 426 L106 300 L112 440 L288 440 L294 300 L312 426 L354 420 L352 300 L302 112 L268 96 Q236 128 200 128 Q164 128 132 96 Z" fill={cloth} stroke="#262424" strokeWidth="1.5" />
          <path d="M150 104 Q200 150 250 104" {...seam} strokeWidth="2.5" />
          <path d="M186 132 L184 196 M214 132 L216 196" stroke={BONE} strokeOpacity="0.55" strokeWidth="1.6" />
          <path d="M148 344 L252 344 L268 414 L132 414 Z" {...seam} />
          <path d="M112 440 L112 424 L288 424 L288 440" {...seam} />
          <rect x="226" y="176" width="30" height="48" fill="none" stroke={BONE} strokeWidth="1.8" />
          <line x1="251" y1="178" x2="251" y2="222" stroke={BLOOD} strokeWidth="3" />
        </g>
      )}

      {product.kind === "mug" && (
        <g>
          <path d="M288 196 C350 196 350 318 288 318" fill="none" stroke="#151414" strokeWidth="24" />
          <path d="M288 196 C350 196 350 318 288 318" fill="none" stroke="#242222" strokeWidth="1.2" />
          <path d="M112 160 L112 384 Q112 410 200 410 Q288 410 288 384 L288 160 Z" fill={cloth} stroke="#262424" strokeWidth="1.5" />
          <ellipse cx="200" cy="160" rx="88" ry="20" fill="#1b1a1a" />
          <ellipse cx="200" cy="162" rx="78" ry="15" fill={BLOOD} opacity="0.85" />
          <ellipse cx="200" cy="166" rx="70" ry="10" fill="#3a060b" />
          <path d="M158 278 Q200 244 242 278 Q200 312 158 278 Z" fill="none" stroke={BONE} strokeWidth="2" />
          <circle cx="200" cy="278" r="10" fill={BONE} />
          <circle cx="200" cy="278" r="3.5" fill="#0b0b0b" />
          <g stroke={BONE} strokeOpacity="0.18" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M180 130 Q170 105 182 85 Q194 65 184 40" />
            <path d="M214 132 Q226 108 214 88 Q204 68 216 50" />
          </g>
        </g>
      )}

      {product.kind === "cap" && (
        <g>
          <path d="M108 284 Q110 160 206 146 Q306 150 312 284 Z" fill={cloth} stroke="#262424" strokeWidth="1.5" />
          <path d="M206 146 Q200 210 196 284 M206 146 Q256 200 262 284 M206 146 Q150 200 146 284" {...seam} />
          <circle cx="206" cy="148" r="6" fill="#1b1a1a" stroke="#2c2a2a" />
          <path d="M78 290 Q206 254 334 286 L350 314 Q214 290 66 322 Z" fill="#141313" stroke="#262424" strokeWidth="1.5" />
          <g stroke={BLOOD} strokeWidth="3.2" fill="none"><circle cx="228" cy="228" r="9" /><path d="M214.95 214.95L221.52 221.52M241.05 214.95L234.48 221.52M214.95 241.05L221.52 234.48M241.05 241.05L234.48 234.48" /></g>
        </g>
      )}

      {product.kind === "poster" && (
        <g>
          <rect x="88" y="40" width="224" height="320" fill="#050505" stroke="#2a2828" strokeWidth="1.5" transform="rotate(-2 200 200)" />
          <g transform="rotate(-2 200 200)">
            <image href={product.art} x="100" y="52" width="200" height="296" preserveAspectRatio="xMidYMid slice" filter={`url(#duo-${uid})`} />
          </g>
          <line x1="40" y1="372" x2="360" y2="372" stroke="#1d1c1c" strokeWidth="1" />
        </g>
      )}

      {product.kind === "stickers" && (
        <g>
          <clipPath id={`clip-${uid}`}><circle cx="140" cy="170" r="74" /></clipPath>
          <circle cx="140" cy="170" r="80" fill={BONE} transform="rotate(-6 140 170)" />
          <image href={product.art} x="60" y="90" width="160" height="160" clipPath={`url(#clip-${uid})`} preserveAspectRatio="xMidYMid slice" />
          <g transform="rotate(8 280 150)">
            <rect x="214" y="100" width="136" height="96" rx="12" fill="#0d0d0d" stroke={BONE} strokeWidth="5" />
            <text x="270" y="160" fontFamily="IBM Plex Mono, monospace" fontSize="30" fill={BONE} textAnchor="middle">REC</text>
            <circle cx="322" cy="150" r="8" fill={BLOOD} />
          </g>
          <g transform="rotate(-10 150 340)">
            <rect x="92" y="282" width="118" height="118" rx="14" fill={BLOOD} />
            <g stroke={BONE} strokeWidth="5" fill="none"><circle cx="151" cy="341" r="16" /><path d="M127.8 317.8L139.48 329.48M174.2 317.8L162.52 329.48M127.8 364.2L139.48 352.52M174.2 364.2L162.52 352.52" /></g>
          </g>
          <g transform="rotate(5 290 330)">
            <rect x="222" y="298" width="150" height="62" rx="31" fill={BONE} />
            <text x="297" y="337" fontFamily="IBM Plex Mono, monospace" fontSize="17" letterSpacing="3" fill="#0b0b0b" textAnchor="middle">WALKOVER</text>
          </g>
        </g>
      )}
    </svg>
  );
}
