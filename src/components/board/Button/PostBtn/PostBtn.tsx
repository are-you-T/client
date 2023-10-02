import { Post } from "./PostBtn.styles";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="46.41"
        height="46.41"
        fill="none"
      >
        <circle cx="23.205" cy="23.205" r="23.205" fill="#fff" />
        <path
          fill="#000"
          d="M21.913 35.217v-9.473H12.49V22.57h9.424v-9.424h3.174v9.424h9.473v3.174h-9.473v9.473h-3.174Z"
        />
      </svg>
    </Post>
  );
}
