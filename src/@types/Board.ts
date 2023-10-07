export interface Board {
  _id: string;
  category: string;
  title: string;
  content: string;
  color: string;
  like: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardPostData {
  category: string;
  title: string;
  content: string;
  color: string;
}

export interface BoardPassword extends Board {
  password: string;
}
