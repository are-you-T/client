export interface Comment {
  _id: string;
  boardId: string;
  depthCommentId: string | null;
  depth: number;
  replies: Comment[] | undefined;
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

export interface CommentEditProps {
  content: string | undefined;
  password: string | undefined;
  color: string | undefined;
}
