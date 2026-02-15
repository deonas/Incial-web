# Incial Web - Folder Reorganization Plan

## Current Structure Issues

1. ❌ All components inside `/app` directory (anti-pattern for Next.js 16)
2. ❌ No separation between route-specific and shared components
3. ❌ No dedicated folders for: hooks, types, utils, config
4. ❌ Public assets not organized
5. ❌ Mixed responsibilities (sections are both features and layouts)

## New Folder Structure (Next.js 16 Best Practices)

```
incial-web/
├── .agents/                    # Agent skills and configurations
├── .github/                    # GitHub templates and workflows
├── .next/                     # Next.js build output
├── app/                       # App Router (ROUTES ONLY)
│   ├── (marketing)/          # Route group for marketing pages
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blogs/
│   │   │   └── page.tsx
│   │   ├── careers/
│   │   │   └── page.tsx
│   │   └── case-studies/
│   │       └── page.tsx
│   ├── api/                  # API routes
│   │   └── contact/
│   │       └── route.ts
│   ├── products/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Root loading
│   ├── not-found.tsx         # 404 page
│   ├── error.tsx             # Error boundary
│   ├── page.tsx              # Home page (route only)
│   └── favicon.ico
├── components/               # SHARED COMPONENTS (moved from app/)
│   ├── features/             # Feature-specific components
│   │   ├── home/
│   │   │   ├── BackgroundCircle.tsx
│   │   │   ├── FinalReveal.tsx
│   │   │   ├── LogoScreen.tsx
│   │   │   ├── RotatingText.tsx
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── BrandingSlide.tsx
│   │   │   ├── ExperienceSlide.tsx
│   │   │   ├── TechnologySlide.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── layout/               # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── NavMenu.tsx
│   │   └── index.ts
│   ├── sections/             # Page sections (reusable)
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── GreetingsOverlay.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ScrollSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TrustSection.tsx
│   │   └── index.ts
│   ├── ui/                   # Reusable UI components
│   │   ├── ClientMarquee.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   └── index.ts              # Barrel export
├── config/                   # Configuration files
│   ├── site.config.ts        # Site metadata and configuration
│   ├── navigation.config.ts  # Navigation configuration
│   └── index.ts
├── hooks/                    # Custom React hooks
│   ├── useGreetingsSequence.ts
│   ├── usePhaseManager.ts
│   └── index.ts
├── lib/                      # Library code and utilities
│   ├── constants.ts          # (existing)
│   ├── fonts.ts              # Font configurations
│   ├── animations.ts         # Animation variants
│   └── index.ts
├── providers/                # React context providers
│   ├── ThemeProvider.tsx
│   └── index.ts
├── public/                   # Static assets (reorganized)
│   ├── assets/
│   │   ├── icons/
│   │   │   ├── file.svg
│   │   │   ├── globe.svg
│   │   │   ├── next.svg
│   │   │   ├── vercel.svg
│   │   │   └── window.svg
│   │   └── images/
│   │       └── .gitkeep
│   ├── logo/
│   │   └── Logoo-white.svg
│   └── favicon.ico
├── styles/                   # Global styles (if needed beyond globals.css)
│   └── README.md
├── types/                    # TypeScript type definitions
│   ├── index.ts
│   ├── components.ts
│   ├── sections.ts
│   └── constants.ts
├── utils/                    # Utility functions
│   ├── cn.ts                 # className utility
│   ├── format.ts             # Formatters
│   └── index.ts
├── .env.example
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Key Principles

### 1. **App Directory = Routes Only**
- Only keep route-specific files in `app/`
- Move all shared components to root `/components`
- Route groups `(marketing)` for organization without URL impact

### 2. **Barrel Exports (index.ts)**
- Each component folder gets an `index.ts` for clean imports
- Example: `import { Header, Footer } from '@/components/layout'`

### 3. **Path Aliases**
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"],
      "@/utils/*": ["./utils/*"],
      "@/config/*": ["./config/*"]
    }
  }
}
```

### 4. **Component Organization**
- **features/**: Domain-specific components (home, services, products)
- **sections/**: Large page sections that could be reused
- **layout/**: Header, Footer, Navigation
- **ui/**: Small, reusable UI primitives

### 5. **Type Safety**
- Create TypeScript types for all props
- Shared types in `/types`
- Component-specific types in component files

## Migration Steps

1. ✅ Create new folder structure at root level
2. ✅ Move components from `app/components` to `/components`
3. ✅ Create barrel exports (index.ts) for each folder
4. ✅ Extract types to `/types` directory
5. ✅ Extract custom hooks to `/hooks`
6. ✅ Extract configurations to `/config`
7. ✅ Reorganize public assets
8. ✅ Update all import paths
9. ✅ Update tsconfig.json path aliases
10. ✅ Test all pages and components
11. ✅ Create documentation
12. ✅ Clean up old directories

## Import Path Changes

### Before:
```tsx
import Header from "@/app/components/layout/Header";
import { greetings } from "@/app/lib/constants";
import AboutSection from "@/app/components/sections/AboutSection";
```

### After:
```tsx
import { Header } from "@/components/layout";
import { greetings } from "@/lib/constants";
import { AboutSection } from "@/components/sections";
```

## Benefits

✅ **Cleaner Architecture**: Clear separation of routes vs shared code  
✅ **Better Imports**: Shorter, more semantic import paths  
✅ **Easier Testing**: Components isolated from routes  
✅ **Better Performance**: Next.js can optimize better  
✅ **Scalability**: Easy to add new features/routes  
✅ **Team Collaboration**: Clear folder ownership  
✅ **Type Safety**: Centralized type definitions  
✅ **Reusability**: Components easy to find and reuse  

## Next.js 16 Compliance

- ✅ App Router best practices
- ✅ Route groups for organization
- ✅ Proper use of `app/` for routes only
- ✅ Optimized for Server Components
- ✅ Clear client/server boundaries
- ✅ Follows official Next.js documentation

## Timeline

- **Phase 1** (Setup): Create folders and barrel exports - 15 min
- **Phase 2** (Migration): Move files and update imports - 30 min
- **Phase 3** (Testing): Verify all pages work - 15 min
- **Total**: ~1 hour

## References

- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Component Organization Best Practices](https://nextjs.org/docs/app/building-your-application/routing/colocation)
