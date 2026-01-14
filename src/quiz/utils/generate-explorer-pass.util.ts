import { CareerFamily } from 'src/common/enum/career-family.enum';
import { InterestBucket } from 'src/common/enum/interest-bucket.enum';
import { PersonalityTrait } from 'src/common/enum/personality-trait.enum';
import { CAREER_DISPLAY_MAP } from './career-display.map';

type CareerRule = {
  interests: InterestBucket[];
  traits: PersonalityTrait[];
  strengths: string[];
  skills: string[];
};
const SPACE_ROLE_MAP = {
  STEM_TECH: {
    passTitle: 'Tech Explorer 🚀',
    badge: '🧠',
    powerTraits: ['Problem Solver', 'Curious Thinker', 'Builder Mindset'],
    funSkills: ['Solving puzzles', 'Building cool things', 'Exploring tech'],
    signatureLine: 'Powered by curiosity ⚡',
  },

  CREATIVE_MEDIA: {
    passTitle: 'Creative Star 🎨',
    badge: '✨',
    powerTraits: ['Imagination', 'Creativity', 'Expression'],
    funSkills: ['Drawing', 'Designing', 'Creating stories'],
    signatureLine: 'Creativity unlocked 🎨',
  },

  EDUCATION_HELPING: {
    passTitle: 'Kind Hero 🤍',
    badge: '🤝',
    powerTraits: ['Kindness', 'Empathy', 'Support'],
    funSkills: ['Helping friends', 'Guiding others', 'Sharing ideas'],
    signatureLine: 'Heart of the galaxy 💖',
  },

  SKILLED_ACTION: {
    passTitle: 'Action Champ 🛠️',
    badge: '⚡',
    powerTraits: ['Energy', 'Focus', 'Hands-on Power'],
    funSkills: ['Sports', 'Building', 'Fixing things'],
    signatureLine: 'Action mode ON 🔥',
  },

  BUSINESS_LEADERSHIP: {
    passTitle: 'Galaxy Leader 👑',
    badge: '🌟',
    powerTraits: ['Leadership', 'Confidence', 'Decision Maker'],
    funSkills: ['Leading teams', 'Organizing missions', 'Speaking up'],
    signatureLine: 'Leading the universe 🌌',
  },
};

const CAREER_RULES: Record<CareerFamily, CareerRule> = {
  [CareerFamily.STEM_TECH]: {
    interests: [InterestBucket.LOGICAL, InterestBucket.PRACTICAL],
    traits: [PersonalityTrait.PLANNED],
    strengths: ['Thinking clearly', 'Solving problems'],
    skills: ['Simple coding', 'Math practice', 'Experiments'],
  },

  [CareerFamily.CREATIVE_MEDIA]: {
    interests: [InterestBucket.CREATIVE],
    traits: [PersonalityTrait.FLEXIBLE],
    strengths: ['Imagination', 'Creativity'],
    skills: ['Drawing', 'Designing', 'Storytelling'],
  },

  [CareerFamily.EDUCATION_HELPING]: {
    interests: [InterestBucket.SOCIAL],
    traits: [PersonalityTrait.PEOPLE_FRIENDLY],
    strengths: ['Kindness', 'Communication'],
    skills: ['Explaining ideas', 'Helping friends'],
  },

  [CareerFamily.SKILLED_ACTION]: {
    interests: [InterestBucket.PRACTICAL],
    traits: [PersonalityTrait.INDEPENDENT],
    strengths: ['Focus', 'Hands-on skills'],
    skills: ['Sports', 'Building things'],
  },

  [CareerFamily.BUSINESS_LEADERSHIP]: {
    interests: [InterestBucket.LEADERSHIP],
    traits: [PersonalityTrait.PLANNED],
    strengths: ['Confidence', 'Decision making'],
    skills: ['Speaking', 'Organizing events'],
  },
};

export function generateExplorerPass(
  interestScores: Record<InterestBucket, number>,
  traits: PersonalityTrait[],
) {
  const ranked = Object.entries(CAREER_RULES)
    .map(([family, rule]) => {
      let score = 0;

      rule.interests.forEach((i) => {
        score += interestScores[i] || 0;
      });

      rule.traits.forEach((t) => {
        if (traits.includes(t)) score += 0.5;
      });

      return { family: family as CareerFamily, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const display = CAREER_DISPLAY_MAP[best.family];
  const rule = CAREER_RULES[best.family];

  const role = SPACE_ROLE_MAP[best.family];

  return {
    status: 'APPROVED',
    universeRank: 'RITverse Explorer',
    passTitle: role.passTitle,
    badge: role.badge,
    powerTraits: role.powerTraits,
    funSkills: role.funSkills,
    signatureLine: role.signatureLine,
    message: 'You’ve unlocked your RITverse Explorer Pass 🌌',
  };
}
