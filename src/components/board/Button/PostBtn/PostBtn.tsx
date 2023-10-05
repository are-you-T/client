import { Post } from "./PostBtn.styles";
import { ReactComponent as PostBtnSvg } from "@/assets/img/post_button.svg";

interface PostBtnProps {
  setOpenBoardPost: (value: boolean) => void;
}
export default function PostBtn({ setOpenBoardPost }: PostBtnProps) {
  return (
    <Post
      onClick={() => {
        setOpenBoardPost(true);
      }}
    >
      <PostBtnSvg />
    </Post>
  );
}
