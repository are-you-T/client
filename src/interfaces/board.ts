export interface board {
  _id: string;
  category: string;
  title: string;
  content: string;
  color: string;
  like: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface boardPost {
  category: string;
  title: string;
  content: string;
  color: string;
}
