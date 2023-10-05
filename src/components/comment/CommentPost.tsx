import {
  CommentPostWrap,
  CommentPostBox,
  CommentPostTop,
  CommentPostBottom,
  CommentPostBottomDetail
} from "@/components/comment/CommentPost.styles";
import { ReactComponent as Profile } from "@/assets/img/profile.svg";

export function CommentPostContent() {
  return (
    <>
      <CommentPostWrap>
        <CommentPostBox>
          <CommentPostTop>
            <Profile />
            <input
              type="text"
              placeholder="댓글 달기"
              className="w-[75%] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
            />
          </CommentPostTop>
          <CommentPostBottom>
            <p>비밀번호</p>
            <CommentPostBottomDetail>
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="w-[40%]  h-[30px] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
              />
              <button className="w-[30%] h-[30px] bg-black rounded-[10px] text-white text-[14px]">
                등록
              </button>
            </CommentPostBottomDetail>
          </CommentPostBottom>
        </CommentPostBox>
      </CommentPostWrap>
    </>
  );
}
