# Refactor inventory

## Routing and architecture

- `/` now renders the existing `site-landing` page directly, without a redirect. The home route imports the landing CSS, preserves the site landing metadata, and uses the same `.landing-theme` shell.
- `/site-landing` remains intact with its route layout and metadata.
- `/landing-v2` remains the storefront landing page; its route imports were updated after moving its section components.
- Route URL definitions, the store/account route wrappers, and layouts were otherwise left in place.

## Moved files

Paths below retain their original file names and nested subdirectories. No files were renamed.

### Website landing feature: `components/landing-components/` → `features/site-landing/components/`

- `components/landing-components/Archive.jsx` → `features/site-landing/components/Archive.jsx`
- `components/landing-components/Community.jsx` → `features/site-landing/components/Community.jsx`
- `components/landing-components/FeaturedStory.jsx` → `features/site-landing/components/FeaturedStory.jsx`
- `components/landing-components/Hero.jsx` → `features/site-landing/components/Hero.jsx`
- `components/landing-components/Merch.jsx` → `features/site-landing/components/Merch.jsx`
- `components/landing-components/Overlay.jsx` → `features/site-landing/components/Overlay.jsx`
- `components/landing-components/ProductArt.jsx` → `features/site-landing/components/ProductArt.jsx`
- `components/landing-components/Screening.jsx` → `features/site-landing/components/Screening.jsx`
- `components/landing-components/SiteFooter.jsx` → `features/site-landing/components/SiteFooter.jsx`
- `components/landing-components/SiteNavigation.jsx` → `features/site-landing/components/SiteNavigation.jsx`
- `components/landing-components/Voice.jsx` → `features/site-landing/components/Voice.jsx`
- `components/landing-components/cinema/FilmTimeline.jsx` → `features/site-landing/components/cinema/FilmTimeline.jsx`
- `components/landing-components/cinema/ScreeningSlate.jsx` → `features/site-landing/components/cinema/ScreeningSlate.jsx`
- `components/landing-components/cinema/scene.js` → `features/site-landing/components/cinema/scene.js`
- `components/landing-components/cinematic.css` → `features/site-landing/components/cinematic.css`
- `components/landing-components/motion.jsx` → `features/site-landing/components/motion.jsx`
- `components/landing-components/store/PriceTag.jsx` → `features/site-landing/components/store/PriceTag.jsx`
- `components/landing-components/store/ProductCard.jsx` → `features/site-landing/components/store/ProductCard.jsx`
- `components/landing-components/store/ProductDetail.jsx` → `features/site-landing/components/store/ProductDetail.jsx`
- `components/landing-components/store/StoreContext.jsx` → `features/site-landing/components/store/StoreContext.jsx`
- `components/landing-components/store/product-service.js` → `features/site-landing/components/store/product-service.js`

### Website landing data: `data/site.js` → `features/site-landing/data/site.js`

- `data/site.js` → `features/site-landing/data/site.js`

### Store landing sections: `components/landing/` → `store/landing/components/`

- `components/landing/brand-promotion.tsx` → `store/landing/components/brand-promotion.tsx`
- `components/landing/call-to-action.tsx` → `store/landing/components/call-to-action.tsx`
- `components/landing/connected-carousel.tsx` → `store/landing/components/connected-carousel.tsx`
- `components/landing/faq.tsx` → `store/landing/components/faq.tsx`
- `components/landing/features.tsx` → `store/landing/components/features.tsx`
- `components/landing/footer.tsx` → `store/landing/components/footer.tsx`
- `components/landing/four-banners.tsx` → `store/landing/components/four-banners.tsx`
- `components/landing/hero.tsx` → `store/landing/components/hero.tsx`
- `components/landing/how-it-works.tsx` → `store/landing/components/how-it-works.tsx`
- `components/landing/logo.tsx` → `store/landing/components/logo.tsx`
- `components/landing/popular-categories.tsx` → `store/landing/components/popular-categories.tsx`
- `components/landing/pricing.tsx` → `store/landing/components/pricing.tsx`
- `components/landing/small-images.tsx` → `store/landing/components/small-images.tsx`
- `components/landing/testimonails.tsx` → `store/landing/components/testimonails.tsx`
- `components/landing/two-images.jsx` → `store/landing/components/two-images.jsx`

## Updated in place

- `app/(app)/page.tsx`: makes the website landing page the direct `/` route and preserves its metadata/theme shell.
- Imports throughout the moved features and active storefront routes now use valid aliases/locations.
- The checkout my-orders route now imports the existing content component.
- `store/components/common/topbar.tsx`: references existing store components/providers.
- `store/components/ui/code.jsx` now resolves its existing copy action through the added shared `hooks/use-copy-to-clipboard.ts`.
- `app/(app)/site-landing/page.jsx` is now a route wrapper around the shared feature page implementation, which both landing routes use.
- `README.md`, `ARCHITECTURE.md`, and `PROJECT_TREE.txt` document the reorganized project.

## Deleted files

The unused `app/components/partials/topbar/` template bundle was removed: it had no references from route modules or other application code, was not a routable App Router segment, duplicated alternate topbar components, and depended on missing i18n/provider modules.

- `app/components/partials/topbar/apps-dropdown-menu.tsx`
- `app/components/partials/topbar/chat-sheet.tsx`
- `app/components/partials/topbar/dropdown-menu-apps.tsx`
- `app/components/partials/topbar/dropdown-menu-notifications.tsx`
- `app/components/partials/topbar/dropdown-menu-user.tsx`
- `app/components/partials/topbar/notifications-sheet.tsx`
- `app/components/partials/topbar/notifications/item-1.tsx`
- `app/components/partials/topbar/notifications/item-10.tsx`
- `app/components/partials/topbar/notifications/item-11.tsx`
- `app/components/partials/topbar/notifications/item-12.tsx`
- `app/components/partials/topbar/notifications/item-13.tsx`
- `app/components/partials/topbar/notifications/item-14.tsx`
- `app/components/partials/topbar/notifications/item-15.tsx`
- `app/components/partials/topbar/notifications/item-16.tsx`
- `app/components/partials/topbar/notifications/item-17.tsx`
- `app/components/partials/topbar/notifications/item-18.tsx`
- `app/components/partials/topbar/notifications/item-19.tsx`
- `app/components/partials/topbar/notifications/item-2.tsx`
- `app/components/partials/topbar/notifications/item-20.tsx`
- `app/components/partials/topbar/notifications/item-3.tsx`
- `app/components/partials/topbar/notifications/item-4.tsx`
- `app/components/partials/topbar/notifications/item-5.tsx`
- `app/components/partials/topbar/notifications/item-6.tsx`
- `app/components/partials/topbar/notifications/item-7.tsx`
- `app/components/partials/topbar/notifications/item-8.tsx`
- `app/components/partials/topbar/notifications/item-9.tsx`
- `app/components/partials/topbar/sheet-chat.tsx`
- `app/components/partials/topbar/user-dropdown-menu.tsx`

Other removed stale artifacts:
- `project-tree.txt` and `structure.txt`: outdated Windows-generated tree snapshots, replaced by current `PROJECT_TREE.txt`.
- `git`: empty stray file in the archive.
- Empty directories `data/`, `styles/`, and `store/my-orders/`: removed; the site data now has a feature owner, styles are already route/global CSS, and the my-orders content lives under `app/store/my-orders/`.

## Validation and remaining issues

- Static scan: all relative and `@/` imports resolve to files in the project; no import cycles were detected by the static scan.
- Route files confirm direct `/` and `/landing-v2` page ownership; a live HTTP smoke test was not possible because Next.js and the project dependencies are not installed in the sandbox.
- TypeScript and ESLint could not be validated meaningfully for the same reason: project dependencies and React/Next type packages are unavailable. The sandbox TypeScript attempt reports missing framework/types across the baseline project.
- Shared marketing UI and storefront UI primitives remain separate because their props and styles differ; merging them without a compatibility pass risks changing existing storefront behavior.
- No asset files or `.env` templates were present in the supplied archive; no assets or environment templates were removed.
