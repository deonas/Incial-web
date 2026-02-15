# Folder Structure Documentation

## Overview

This project follows Next.js 16 App Router best practices with a clear separation between routes and shared code.

## Directory Structure

```
incial-web/
├── app/                          # Next.js App Router - ROUTES ONLY
│   ├── (marketing)/             # Route group (no URL segment)
│   │   ├── about/               # /about route
│   │   ├── blogs/               # /blogs route
│   │   ├── careers/             # /careers route
│   │   └── case-studies/        # /case-studies route
│   ├── api/                     # API routes
│   │   └── contact/             # POST /api/contact
│   ├── products/                # /products route
│   ├── error.tsx                # Error boundary
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Loading UI
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home page /
│
├── components/                   # Shared React components
│   ├── features/                # Feature-specific components
│   │   ├── home/                # Home page features
│   │   │   ├── BackgroundCircle.tsx
│   │   │   ├── FinalReveal.tsx
│   │   │   ├── LogoScreen.tsx
│   │   │   ├── RotatingText.tsx
│   │   │   └── index.ts         # Barrel export
│   │   ├── services/            # Services features
│   │   │   ├── BrandingSlide.tsx
│   │   │   ├── ExperienceSlide.tsx
│   │   │   ├── TechnologySlide.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── layout/                  # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── NavMenu.tsx
│   │   └── index.ts
│   ├── sections/                # Page sections
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── GreetingsOverlay.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ScrollSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TrustSection.tsx
│   │   └── index.ts
│   ├── ui/                      # Reusable UI components
│   │   ├── ClientMarquee.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   └── index.ts                 # Main barrel export
│
├── config/                      # Configuration files
│   ├── site.config.ts           # Site metadata
│   └── index.ts
│
├── hooks/                       # Custom React hooks
│   └── index.ts                 # (Future: custom hooks)
│
├── lib/                         # Library code and utilities
│   ├── constants.ts             # App constants
│   └── index.ts
│
├── providers/                   # React context providers
│   └── index.ts                 # (Future: theme, auth providers)
│
├── public/                      # Static assets
│   ├── assets/
│   │   └── icons/               # SVG icons
│   ├── logo/                    # Brand logos
│   └── favicon.ico
│
├── types/                       # TypeScript definitions
│   ├── components.ts            # Component prop types
│   ├── constants.ts             # Constants types
│   ├── sections.ts              # Section prop types
│   └── index.ts
│
├── utils/                       # Utility functions
│   ├── cn.ts                    # className merger
│   └── index.ts
│
└── Configuration files
    ├── .gitignore
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    └── README.md
```

## Import Patterns

### Using Barrel Exports

```typescript
// ✅ Recommended - Clean imports using barrel exports
import { Header, Footer, NavMenu } from '@/components/layout';
import { AboutSection, HeroSection } from '@/components/sections';
import { BackgroundCircle, LogoScreen } from '@/components/features/home';

// ❌ Avoid - Direct imports (harder to refactor)
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
```

### Path Aliases

Configured in `tsconfig.json`:

```typescript
@/*              → ./
@/components/*   → ./components/*
@/lib/*          → ./lib/*
@/hooks/*        → ./hooks/*
@/types/*        → ./types/*
@/utils/*        → ./utils/*
@/config/*       → ./config/*
@/providers/*    → ./providers/*
```

## Component Organization

### Features vs Sections vs UI

**Features** (`components/features/`)
- Domain-specific components
- Tied to specific pages or features
- Example: `home/LogoScreen.tsx`, `services/BrandingSlide.tsx`

**Sections** (`components/sections/`)
- Large page sections
- Can be reused across multiple pages
- Example: `HeroSection.tsx`, `ContactSection.tsx`

**UI** (`components/ui/`)
- Small, highly reusable components
- No business logic
- Example: `SocialLinks.tsx`, `ClientMarquee.tsx`

**Layout** (`components/layout/`)
- Global layout components
- Header, Footer, Navigation
- Used across all pages

## Adding New Components

### 1. Choose the Right Folder

```
Is it page-specific? → features/
Is it a large section? → sections/
Is it a small UI element? → ui/
Is it layout-related? → layout/
```

### 2. Create the Component

```typescript
// components/ui/Button.tsx
"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

### 3. Add to Barrel Export

```typescript
// components/ui/index.ts
export { default as Button } from './Button';
export { default as SocialLinks } from './SocialLinks';
// ... other exports
```

### 4. Use in Pages

```typescript
// app/page.tsx
import { Button } from '@/components/ui';

export default function Page() {
  return <Button>Click me</Button>;
}
```

## Adding New Routes

### Static Routes

```bash
# Create new route
app/
  services/
    page.tsx       # /services
```

### Dynamic Routes

```bash
# Create dynamic route
app/
  blog/
    [slug]/
      page.tsx     # /blog/[slug]
```

### Route Groups

```bash
# Group routes without affecting URL
app/
  (marketing)/     # Group name (not in URL)
    about/
      page.tsx     # /about (not /marketing/about)
```

## Best Practices

### ✅ Do

1. **Keep app/ for routes only** - No components, utils, or libs
2. **Use barrel exports** - Cleaner imports, easier refactoring
3. **Type everything** - Define types in `/types` directory
4. **Use "use client"** - Only when needed (interactivity, hooks)
5. **Keep components small** - Single responsibility principle
6. **Name files descriptively** - `UserAvatar.tsx` not `Avatar.tsx`

### ❌ Don't

1. **Mix routes and components** - Keep them separate
2. **Have circular dependencies** - Use dependency injection
3. **Put logic in components** - Extract to hooks/utils
4. **Forget to export** - Update barrel exports when adding files
5. **Hardcode values** - Use constants from `/lib` or `/config`

## File Naming Conventions

- **Components**: PascalCase - `HeroSection.tsx`
- **Utilities**: camelCase - `formatDate.ts`
- **Constants**: camelCase - `constants.ts`
- **Types**: camelCase - `components.ts`
- **Routes**: kebab-case - `case-studies/`

## TypeScript Patterns

### Component Props

```typescript
// types/components.ts
export interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

// components/layout/Header.tsx
import { HeaderProps } from '@/types';

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  // ...
}
```

### Constants

```typescript
// lib/constants.ts
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
] as const;

// types/constants.ts
export interface NavLink {
  label: string;
  href: string;
}
```

## Performance Optimization

### Server vs Client Components

```typescript
// ✅ Server Component (default) - Better performance
export default function ServerComponent() {
  return <div>Static content</div>;
}

// ✅ Client Component (when needed)
"use client";
import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Code Splitting

Barrel exports help with tree-shaking:

```typescript
// Only imports what you use
import { Header } from '@/components/layout';
// Not: import * as Layout from '@/components/layout';
```

## Testing Structure

```
__tests__/
├── components/
│   ├── Header.test.tsx
│   └── Footer.test.tsx
├── utils/
│   └── cn.test.ts
└── hooks/
    └── useGreetings.test.ts
```

## Migration Checklist

When moving from old structure:

- [ ] Move component from `app/components/*` to `/components/*`
- [ ] Update imports in the component
- [ ] Add to barrel export (`index.ts`)
- [ ] Update imports in files that use this component
- [ ] Test the component still works
- [ ] Remove old file from `app/components`

## Troubleshooting

### Import Errors

**Error**: `Module not found: Can't resolve '@/components/layout'`

**Solution**: Check barrel export exists in `components/layout/index.ts`

### Type Errors

**Error**: `Cannot find type 'HeaderProps'`

**Solution**: Import from `@/types` or define inline

### Build Errors

**Error**: `'use client' required`

**Solution**: Add `"use client"` directive to interactive components

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Best Practices](https://www.typescript-lang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Project Structure Guide](./REORGANIZATION_PLAN.md)

## Support

For questions or issues with the folder structure:
1. Check this documentation
2. Review [REORGANIZATION_PLAN.md](./REORGANIZATION_PLAN.md)
3. Open a discussion on GitHub
4. Contact the development team
