import {Noto_Kufi_Arabic} from 'next/font/google';

/**
 * Walkover website typeface: Noto Kufi Arabic (SIL Open Font License, Google Fonts).
 *
 * A Kufic-structured Persian/Arabic face with full Persian coverage (پ چ ژ گ ی ک, Persian digits)
 * and a variable weight axis from 100 to 900, so the landing page keeps every existing weight
 * (regular body copy up to the font-black hero title) without synthesised bold.
 *
 * next/font self-hosts the files at build time (no runtime request to Google) and exposes the
 * family through the `--font-landing` CSS variable. The variable is only attached to the
 * website shells that opt in (see `.landing-font` in globals-landing.css), so the storefront
 * at `/landing-v2` and the other store/account pages keep their existing typography.
 */
export const landingFont = Noto_Kufi_Arabic({
    subsets: ['arabic'],
    display: 'swap',
    variable: '--font-landing',
});
