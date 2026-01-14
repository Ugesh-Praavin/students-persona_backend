export interface QuestionOption {
  text: string;
  mapsTo: string[]; // InterestBucket | PersonalityTrait
}

export interface Question {
  id: number;
  planet: 'NEUTRON' | 'TALENT' | 'ORBIT' | 'FUTURIA';
  text: string;
  multiSelect: boolean;
  maxSelect?: number;
  options: {
    A?: QuestionOption;
    B?: QuestionOption;
    C?: QuestionOption;
    D?: QuestionOption;
    E?: QuestionOption;
    F?: QuestionOption;
  };
}
