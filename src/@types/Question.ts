export interface Question {
  idx: number;
  subject: string;
  parent: string;
  answer: {
    I?: string;
    E?: string;
    S?: string;
    N?: string;
    T?: string;
    F?: string;
    J?: string;
    P?: string;
  };
  mbtiType: string;
  proportion: number;
  text?: string;
}

export interface TestCardProps {
  answer?: string;
  index: number;
  onClick: (choiceIndex: number) => () => void;
  animate: boolean;
  animationStart: () => void;
}

export interface UserAnswer {
  // [key: string]: string;
  mbtiType: string;
  text?: string;
}

export interface MBTIData {
  idx: number;
  subject: string;
  answer: UserAnswer;
  mbtiType: string;
  selected: string | number;
  proportion: number;
}

export interface UserResponseProps {
  userResponse: {
    parent: string;
    mbtiData: MBTIData[];
  };
  visible: boolean;
}

export interface UpdatedUserResponseProps {
  mbtiType: string;
  parent: string;
  mbtiData: MBTIData[];
}

export interface QuestionText {
  idx: number | string;
  subject: string;
  animate: boolean;
  animationStart: () => void;
}
