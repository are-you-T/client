export interface Comment {
  boardId: string;
  depthCommentId: string | null;
  depth: number;
  password: string;
  content: string;
  color: string;
  like: number;
  createdAt: string;
}

export interface CommentPostData {
  boardId: string;
  depthCommentId: string | null;
  password: string;
  content: string;
  color: string;
}
