import { CareerFamily } from 'src/common/enum/career-family.enum';
import { InterestBucket } from 'src/common/enum/interest-bucket.enum';
import { PersonalityTrait } from 'src/common/enum/personality-trait.enum';

type CareerRule = {
  interests: InterestBucket[];
  traits: PersonalityTrait[];
  strengths: string[];
  skills: string[];
};

const CAREER_RULES: Record<CareerFamily, CareerRule> = {
  [CareerFamily.STEM_TECH]: {
    interests: [InterestBucket.LOGICAL, InterestBucket.PRACTICAL],
    traits: [PersonalityTrait.PLANNED],
    strengths: ['Logical thinking', 'Problem solving'],
    skills: ['Basic coding', 'Math practice', 'STEM projects'],
  },

  [CareerFamily.CREATIVE_MEDIA]: {
    interests: [InterestBucket.CREATIVE],
    traits: [PersonalityTrait.FLEXIBLE],
    strengths: ['Imagination', 'Visual creativity'],
    skills: ['Drawing', 'Canva', 'Content creation'],
  },

  [CareerFamily.EDUCATION_HELPING]: {
    interests: [InterestBucket.SOCIAL],
    traits: [PersonalityTrait.PEOPLE_FRIENDLY],
    strengths: ['Empathy', 'Communication'],
    skills: ['Explaining concepts', 'Helping peers'],
  },

  [CareerFamily.SKILLED_ACTION]: {
    interests: [InterestBucket.PRACTICAL],
    traits: [PersonalityTrait.INDEPENDENT],
    strengths: ['Hands-on ability', 'Focus'],
    skills: ['Sports practice', 'DIY building'],
  },

  [CareerFamily.BUSINESS_LEADERSHIP]: {
    interests: [InterestBucket.LEADERSHIP],
    traits: [PersonalityTrait.PLANNED],
    strengths: ['Leadership', 'Decision making'],
    skills: ['Public speaking', 'Event organizing'],
  },
};

export function generateExplorerPass(
  interestScores: Record<InterestBucket, number>,
  traits: PersonalityTrait[],
) {
  const ranked = Object.entries(CAREER_RULES)
    .map(([family, rule]) => {
      let score = 0;

      // Interest weight (60%)
      rule.interests.forEach((i) => {
        score += (interestScores[i] || 0) * 0.6;
      });

      // Personality weight (40%)
      rule.traits.forEach((t) => {
        if (traits.includes(t)) score += 0.4;
      });

      return { family, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const rule = CAREER_RULES[best.family as CareerFamily];

  return {
    status: 'APPROVED',
    explorerType: best.family
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),

    careerPath: best.family,
    strengths: rule.strengths,
    skills: rule.skills,

    message: 'You’ve unlocked entry into RITverse 🌌',
  };
}
