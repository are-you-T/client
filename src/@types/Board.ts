export interface Board {
  _id: string;
  category: string;
  title: string;
  content: string;
  color: string;
  like: number;
  comment: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardPostData {
  category: string;
  title: string;
  content: string;
  color: string;
  password: string;
}

export interface BoardPassword extends Board {
  password: string;
}
export interface BoardPatchMsg {
  msg: string;
}
