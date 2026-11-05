# Walkover project architecture

## Route ownership

- `/` renders the main website landing page directly from `app/(app)/site-landing/page.jsx` and keeps the landing page metadata and styles. No redirect is used.
- `/site-landing` remains available with its existing route-level layout, metadata, and CSS.
- `/landing-v2` remains the storefront landing page.
- `app/` owns URL routes and route-level layouts; feature UI and business code stay outside route files where possible.

## Directory guide

```text
app/
  (app)/
    page.tsx                    # root website landing route
    site-landing/               # existing website landing route and its styles
    landing-v2/                 # storefront landing route
  account/                      # account URL routes
  store/                        # storefront URL routes and route-local UI
components/
  ui/                           # shared UI primitives
  common/                       # shared application components
  custom/                       # shared branded text and badge primitives
  magicui/                      # reusable motion/visual primitives
features/
  site-landing/
    components/                 # website landing-only sections and cinematic helpers
    data/site.js                 # website landing content data
store/
  landing/components/            # storefront landing sections
  home/                          # storefront home content and components
  product/                       # product data and service
  checkout/, cart/, account/     # storefront feature areas
  components/                    # storefront-specific components and design primitives
config/                          # app configuration
lib/                             # shared utilities and formatters
partials/                        # shared partials
providers/                       # application-wide providers
hooks/                           # shared React hooks
```

## Ownership rules

- Put reusable primitives in `components/ui`; put application-wide, non-primitive components in `components/common` or a clear sibling directory.
- Keep page-exclusive landing sections under their feature: `features/site-landing/components` or `store/landing/components`.
- Keep storefront business logic and storefront-specific UI inside `store/`; do not promote a store-only component to the global library without a demonstrated second consumer and a compatible API.
- Keep shared site-landing content in `features/site-landing/data`; `data/` is omitted until there is genuinely cross-feature data.
- Keep route modules thin and preserve existing App Router paths and route groups.

## Notes

The global marketing UI and storefront UI primitives have different APIs and visual contracts, so they remain separate rather than being merged mechanically. Consolidating those variants needs a dedicated compatibility review to avoid changing storefront behavior.
