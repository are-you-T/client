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
}

export interface question2 {
  aaa: number;
}

export interface testCardProps {
  answer: string;
  index: number;
  onClick: (choiceIndex: number) => () => void;
  animate: boolean;
  animationStart: () => void;
}

export interface answer {
  [key: string]: string;
}

export interface MBTIData {
  idx: number;
  subject: string;
  answer: answer;
  mbtiType: string;
  selection: string | number;
  proportion: number;
}

export interface userResponseProps {
  userResponse: {
    parent: string;
    mbtiData: MBTIData[];
  };
  visible: boolean;
}

export interface currentChoiceList {
  mbtiType: string;
  text: string;
}
