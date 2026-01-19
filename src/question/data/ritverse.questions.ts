import { InterestBucket } from 'src/common/enum/interest-bucket.enum';
import { PersonalityTrait } from 'src/common/enum/personality-trait.enum';
import { Question } from '../interface/question.interface';

export const RITVERSE_QUESTIONS: Question[] = [
  // 🧠 PLANET 2 — NEUTRON (How You Think – FUN VERSION)
  {
    id: 1,
    planet: 'NEUTRON',
    text: '🧩 You get a new gadget with NO instructions. What do you do?',
    multiSelect: true,
    maxSelect: 2,
    options: {
      A: {
        text: '🔍 Press buttons and explore',
        mapsTo: [InterestBucket.LOGICAL],
      },
      B: {
        text: '📺 Watch a video about it',
        mapsTo: [PersonalityTrait.PEOPLE_FRIENDLY],
      },
      C: { text: '🤝 Ask someone to explain', mapsTo: [InterestBucket.SOCIAL] },
      D: {
        text: '😄 Try randomly and have fun',
        mapsTo: [PersonalityTrait.FLEXIBLE],
      },
    },
  },

  {
    id: 2,
    planet: 'NEUTRON',
    text: '🧠 A puzzle feels impossible at first. You usually…',
    multiSelect: false,
    options: {
      A: {
        text: '🤔 Try again in a different way',
        mapsTo: [InterestBucket.LOGICAL],
      },
      B: { text: '🙋 Ask someone for help', mapsTo: [InterestBucket.SOCIAL] },
      C: {
        text: '😄 Take a break and come back later',
        mapsTo: [PersonalityTrait.FLEXIBLE],
      },
      D: { text: '🎮 Turn it into a game', mapsTo: [InterestBucket.CREATIVE] },
    },
  },

  // 🎨 PLANET 3 — TALENT NEBULA (What You LOVE Doing ⭐)
  {
    id: 3,
    planet: 'TALENT',
    text: '🎉 You get a full day with NO homework. What sounds the most fun?',
    multiSelect: false,
    options: {
      A: {
        text: '🎨 Drawing, crafting, creating',
        mapsTo: [InterestBucket.CREATIVE],
      },
      B: {
        text: '⚽ Playing games or sports',
        mapsTo: [InterestBucket.PRACTICAL],
      },
      C: {
        text: '🎮 Games, puzzles, or tech fun',
        mapsTo: [InterestBucket.LOGICAL],
      },
      D: {
        text: '🎤 Talking, performing, leading',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
    },
  },

  {
    id: 4,
    planet: 'TALENT',
    text: '⏳ Which activities make you forget time completely?',
    multiSelect: true,
    maxSelect: 2,
    options: {
      A: {
        text: '🎨 Creating or designing things',
        mapsTo: [InterestBucket.CREATIVE],
      },
      B: {
        text: '🧠 Strategy games or puzzles',
        mapsTo: [InterestBucket.LOGICAL],
      },
      C: {
        text: '🤝 Helping friends or people',
        mapsTo: [InterestBucket.SOCIAL],
      },
      D: {
        text: '🛠 Building or fixing stuff',
        mapsTo: [InterestBucket.PRACTICAL],
      },
      E: {
        text: '🧑‍🚀 Organising or leading groups',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
    },
  },

  // 🧩 PLANET 4 — ORBIT-X (How You Act)
  {
    id: 5,
    planet: 'ORBIT',
    text: '🎮 In a group game, you usually…',
    multiSelect: false,
    options: {
      A: {
        text: '👑 Take charge and lead',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
      B: {
        text: '🤝 Support and help others',
        mapsTo: [InterestBucket.SOCIAL],
      },
      C: {
        text: '💭 Think quietly and focus',
        mapsTo: [PersonalityTrait.INDEPENDENT],
      },
      D: {
        text: '🎉 Keep the energy high',
        mapsTo: [PersonalityTrait.PEOPLE_FRIENDLY],
      },
    },
  },

  {
    id: 6,
    planet: 'ORBIT',
    text: '⚡ Plans suddenly change. How do you feel?',
    multiSelect: false,
    options: {
      A: {
        text: '😄 Excited – let’s go!',
        mapsTo: [PersonalityTrait.FLEXIBLE],
      },
      B: { text: '😐 Okay, I can manage', mapsTo: [] },
      C: {
        text: '😟 Uncomfortable, I need time',
        mapsTo: [PersonalityTrait.PLANNED],
      },
    },
  },

  // 🌟 PLANET 5 — FUTURIA (Dream Galaxy)
  {
    id: 7,
    planet: 'FUTURIA',
    text: '🚀 If you were sent on a space mission, which role sounds coolest?',
    multiSelect: false,
    options: {
      A: { text: '🛠 Build cool things', mapsTo: [InterestBucket.PRACTICAL] },
      B: {
        text: '🤍 Help people on the mission',
        mapsTo: [InterestBucket.SOCIAL],
      },
      C: {
        text: '🎥 Create videos or stories',
        mapsTo: [InterestBucket.CREATIVE],
      },
      D: {
        text: '🧠 Explore new technology',
        mapsTo: [InterestBucket.LOGICAL],
      },
      E: {
        text: '👑 Lead the whole team',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
    },
  },

  {
    id: 8,
    planet: 'FUTURIA',
    text: '💌 Your future self sends you a message. Which one do you like most?',
    multiSelect: false,
    options: {
      A: {
        text: '“You never stopped learning.”',
        mapsTo: [InterestBucket.LOGICAL],
      },
      B: {
        text: '“You created amazing things.”',
        mapsTo: [InterestBucket.CREATIVE],
      },
      C: { text: '“You helped many people.”', mapsTo: [InterestBucket.SOCIAL] },
      D: {
        text: '“You led great teams.”',
        mapsTo: [InterestBucket.LEADERSHIP],
      },
    },
  },
];
