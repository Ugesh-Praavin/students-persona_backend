import { CareerFamily } from 'src/common/enum/career-family.enum';

export const CAREER_DISPLAY_MAP: Record<
  CareerFamily,
  {
    title: string;
    tagline: string;
    badge: string;
  }
> = {
  [CareerFamily.STEM_TECH]: {
    title: 'Tech Explorer 🚀',
    tagline: 'Loves discovering how things work',
    badge: '🧠',
  },

  [CareerFamily.CREATIVE_MEDIA]: {
    title: 'Creative Star 🎨',
    tagline: 'Turns imagination into amazing ideas',
    badge: '✨',
  },

  [CareerFamily.EDUCATION_HELPING]: {
    title: 'Kind Hero 🤍',
    tagline: 'Enjoys helping and supporting others',
    badge: '🤝',
  },

  [CareerFamily.SKILLED_ACTION]: {
    title: 'Action Champ 🛠',
    tagline: 'Learns best by doing and building',
    badge: '⚡',
  },

  [CareerFamily.BUSINESS_LEADERSHIP]: {
    title: 'Team Leader 👑',
    tagline: 'Likes guiding teams and making plans',
    badge: '🌟',
  },
};
