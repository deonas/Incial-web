// Component prop types
export interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export interface SocialLinksProps {
  direction?: 'vertical' | 'horizontal';
  className?: string;
}
