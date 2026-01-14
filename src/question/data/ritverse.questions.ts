import { InterestBucket } from 'src/common/enum/interest-bucket.enum';
import { PersonalityTrait } from 'src/common/enum/personality-trait.enum';
import { Question } from '../interface/question.interface';

export const RITVERSE_QUESTIONS: Question[] = [
  // 🧠 PLANET 2 — NEUTRON (Brain Planet)
  {
    id: 1,
    planet: 'NEUTRON',
    text: '🚀 Which subjects do you enjoy learning?',
    multiSelect: true,
    maxSelect: 3,
    options: {
      A: { text: '➗ Maths', mapsTo: [InterestBucket.LOGICAL] },
      B: { text: '🔬 Science', mapsTo: [InterestBucket.LOGICAL] },
      C: { text: '💻 Computers', mapsTo: [InterestBucket.LOGICAL] },
      D: { text: '📚 English ', mapsTo: [InterestBucket.CREATIVE] },
      E: { text: '✨ Social', mapsTo: [InterestBucket.CREATIVE] },
      F: { text: '🏅 Sports', mapsTo: [InterestBucket.CREATIVE] },
    },
  },

  {
    id: 2,
    planet: 'NEUTRON',
    text: '📘 How do you learn best?',
    multiSelect: false,
    options: {
      A: {
        text: '🎮 By trying it myself',
        mapsTo: [PersonalityTrait.INDEPENDENT],
      },
      B: {
        text: '👀 By watching videos',
        mapsTo: [PersonalityTrait.PEOPLE_FRIENDLY],
      },
      C: { text: '📖 By reading books', mapsTo: [PersonalityTrait.PLANNED] },
      D: {
        text: '👂 By listening to explanations',
        mapsTo: [PersonalityTrait.PEOPLE_FRIENDLY],
      },
    },
  },

  // 🎨 PLANET 3 — TALENT NEBULA (Highest Weight ⭐)
  {
    id: 3,
    planet: 'TALENT',
    text: '🎨 What do you enjoy doing the MOST in your free time?',
    multiSelect: false,
    options: {
      A: { text: '🎨 Drawing or creating', mapsTo: [InterestBucket.CREATIVE] },
      B: { text: '⚽ Playing sports', mapsTo: [InterestBucket.PRACTICAL] },
      C: { text: '💻 Using tech or games', mapsTo: [InterestBucket.LOGICAL] },
      D: { text: '🎤 Talking or leading', mapsTo: [InterestBucket.LEADERSHIP] },
    },
  },

  {
    id: 4,
    planet: 'TALENT',
    text: '⏳ Which activities make you forget time?',
    multiSelect: true,
    maxSelect: 3,
    options: {
      A: { text: '🎨 Creating things', mapsTo: [InterestBucket.CREATIVE] },
      B: { text: '🎮 Strategy or puzzles', mapsTo: [InterestBucket.LOGICAL] },
      C: { text: '🤝 Helping people', mapsTo: [InterestBucket.SOCIAL] },
      D: { text: '🛠 Building or fixing', mapsTo: [InterestBucket.PRACTICAL] },
      E: {
        text: '🧑‍🚀 Organising or leading',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
    },
  },

  // 🧩 PLANET 4 — ORBIT-X (Personality Layer)
  {
    id: 5,
    planet: 'ORBIT',
    text: '🤝 You prefer working…',
    multiSelect: false,
    options: {
      A: { text: '👥 With a team', mapsTo: [PersonalityTrait.PEOPLE_FRIENDLY] },
      B: { text: '👤 On my own', mapsTo: [PersonalityTrait.INDEPENDENT] },
      C: { text: '🔁 Both', mapsTo: [] },
    },
  },

  {
    id: 6,
    planet: 'ORBIT',
    text: '📋 When something new starts, you usually…',
    multiSelect: false,
    options: {
      A: {
        text: '📋 Plan everything first',
        mapsTo: [PersonalityTrait.PLANNED],
      },
      B: { text: '⚡ Jump in and adapt', mapsTo: [PersonalityTrait.FLEXIBLE] },
    },
  },

  // 🌟 PLANET 5 — FUTURIA (Dream Galaxy)
  {
    id: 7,
    planet: 'FUTURIA',
    text: '🌟 Which future mission excites you the MOST?',
    multiSelect: false,
    options: {
      A: { text: '🛠 Building things', mapsTo: [InterestBucket.PRACTICAL] },
      B: { text: '🤍 Helping people', mapsTo: [InterestBucket.SOCIAL] },
      C: { text: '🎥 Creating content', mapsTo: [InterestBucket.CREATIVE] },
      D: { text: '🧠 Exploring technology', mapsTo: [InterestBucket.LOGICAL] },
      E: { text: '👑 Leading teams', mapsTo: [InterestBucket.LEADERSHIP] },
    },
  },

  {
    id: 8,
    planet: 'FUTURIA',
    text: '💬 What do you want your future self to say?',
    multiSelect: false,
    options: {
      A: {
        text: '“I never stopped learning.”',
        mapsTo: [InterestBucket.LOGICAL],
      },
      B: {
        text: '“I created amazing things.”',
        mapsTo: [InterestBucket.CREATIVE],
      },
      C: { text: '“I helped many people.”', mapsTo: [InterestBucket.SOCIAL] },
      D: { text: '“I led great teams.”', mapsTo: [InterestBucket.LEADERSHIP] },
    },
  },
];
