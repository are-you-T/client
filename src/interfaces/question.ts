export interface question {
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

export interface testCardProps {
  answer?: string;
  index: number;
  onClick: (choiceIndex: number) => () => void;
  animate: boolean;
  animationStart: () => void;
}

export interface userAnswer {
  // [key: string]: string;
  mbtiType: string;
  text?: string;
}

export interface MBTIData {
  idx: number;
  subject: string;
  answer: userAnswer;
  mbtiType: string;
  selected: string | number;
  proportion: number;
}

export interface userResponseProps {
  userResponse: {
    parent: string;
    mbtiData: MBTIData[];
  };
  visible: boolean;
}

export interface questionText {
  idx: number | string;
  subject: string;
  animate: boolean;
  animationStart: () => void;
}
