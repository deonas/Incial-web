# Pull Request Review Checklist

Use this checklist when reviewing pull requests. Check all applicable items before approving.

## Code Quality

- [ ] Code follows project conventions and style
- [ ] No console errors or warnings in browser console
- [ ] TypeScript types are properly defined (no `any` unless justified)
- [ ] Component props are typed correctly
- [ ] No hardcoded values — uses constants/config where appropriate
- [ ] Functions are pure where possible
- [ ] Proper error handling implemented

## Functionality

- [ ] All acceptance criteria from the linked issue are met
- [ ] New features work as described
- [ ] No regressions in existing functionality
- [ ] Forms validate correctly and show error states
- [ ] Loading states are handled appropriately
- [ ] Edge cases are handled (empty states, long content, etc.)

## Design & UI

- [ ] Matches Figma design specifications
- [ ] Colors match design system (Tailwind classes used correctly)
- [ ] Spacing and typography are consistent
- [ ] Animations are smooth (no jank or stuttering)
- [ ] Hover/focus/active states work correctly
- [ ] Dark backgrounds have proper contrast

## Responsive Design

- [ ] Tested on mobile (≤640px)
- [ ] Tested on tablet (641-1024px)
- [ ] Tested on desktop (≥1025px)
- [ ] No horizontal scrollbar at any breakpoint
- [ ] Text is readable at all sizes
- [ ] Touch targets ≥ 44px on mobile
- [ ] Images scale appropriately

## Accessibility

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators are visible
- [ ] Semantic HTML is used (`<nav>`, `<main>`, `<section>`, `<button>` vs `<div>`)
- [ ] Images have alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader labels where needed (`aria-label`, `aria-hidden`)

## Performance

- [ ] No unnecessary re-renders (React DevTools profiler)
- [ ] Images are optimized (next/image used where possible)
- [ ] No layout shift (CLS) issues
- [ ] Animations use GPU-accelerated properties (`transform`, `opacity`)
- [ ] No memory leaks (event listeners cleaned up, useEffect cleanup)
- [ ] Bundle size is reasonable (`pnpm build` output)

## Testing

- [ ] Component renders without errors
- [ ] Build succeeds (`pnpm build`)
- [ ] No TypeScript errors (`pnpm type-check` or IDE)
- [ ] Tested in at least 2 browsers (Chrome, Safari, Firefox)
- [ ] Tested interactions (clicks, scrolls, swipes)

## Documentation

- [ ] Complex logic has comments explaining why
- [ ] New components have descriptive names
- [ ] Props are documented via TypeScript types
- [ ] README updated if new setup required

## Git Hygiene

- [ ] Commit messages are clear and descriptive
- [ ] No merge conflicts
- [ ] No commented-out code
- [ ] No debugging console.log statements
- [ ] PR description explains what/why clearly

---

## Review Process

1. **Clone & Test Locally**
   ```bash
   git fetch origin
   git checkout <branch-name>
   pnpm install
   pnpm dev
   ```

2. **Test in Browser**
   - Open http://localhost:3000
   - Check DevTools Console for errors
   - Test all breakpoints (use DevTools responsive mode)
   - Test keyboard navigation

3. **Code Review**
   - Read through changed files on GitHub
   - Look for potential bugs, edge cases, or improvements
   - Check for security issues (XSS, validation)

4. **Request Changes or Approve**
   - If issues found: Request Changes with specific feedback
   - If minor nitpicks: Approve + Comment
   - If perfect: Approve + Merge

---

**Severity Guidelines for Review Comments:**

- **Must Fix (Blocking)**: Security issues, broken functionality, regressions
- **Should Fix**: Accessibility issues, performance problems, incorrect design implementation  
- **Consider**: Suggestions for improvement, alternative approaches, future refactors
- **Nitpick**: Stylistic preferences, minor inconsistencies (use sparingly)
