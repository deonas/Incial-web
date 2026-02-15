// Site configuration
export const siteConfig = {
  name: 'Incial',
  description: 'Incial is a creative digital agency building brands, experiences, and products.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://incial.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/incial',
    github: 'https://github.com/incial',
  },
  creator: 'Incial Team',
  keywords: [
    'digital agency',
    'branding',
    'web development',
    'design',
    'technology',
  ],
};

export type SiteConfig = typeof siteConfig;
