import {
  CommentEditModalWrap,
  CommentEditModalDetail
} from "@/components/comment/CommentEdit.styles";

export function CommentEdit({ onClose }: { onClose: () => void }) {
  return (
    <>
      <CommentEditModalWrap>
        <h2 className="text-[26px]">비밀번호를 입력하세요</h2>
        <CommentEditModalDetail>
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="w-[60%]  h-[30px] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
          />
          <button className="w-[25%] h-[30px] bg-black rounded-[10px] text-white text-[14px]">
            확인
          </button>
        </CommentEditModalDetail>
      </CommentEditModalWrap>
    </>
  );
}
