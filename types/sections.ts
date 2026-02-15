// Section component prop types
export interface HeroSectionProps {
  onStart: () => void;
}

export interface ScrollSectionProps {
  onScrollComplete: () => void;
}

export interface ServicesSectionProps {
  initialSlide: number;
  onComplete: () => void;
  onBack: () => void;
}

export interface TrustSectionProps {
  onComplete: () => void;
  onBack: () => void;
}

export interface AboutSectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export interface ContactSectionProps {
  onBack: () => void;
}

export interface GreetingsOverlayProps {
  greetingIndex: number;
}
