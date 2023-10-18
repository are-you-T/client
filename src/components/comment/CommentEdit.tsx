import { useState } from "react";
import axiosRequest from "@/api";
import {
  CommentEditModalWrap,
  CommentEditModalDetail
} from "@/components/comment/CommentEdit.styles";
import { ResData, Comment } from "@/@types";
import { CommentModalBg } from "./CommentContent.styles";

export function CommentEdit({
  onClose,
  _id
}: {
  onClose: () => void;
  _id: string;
}) {
  //비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  //댓글 수정 내용
  const [newComment, setNewComment] = useState<{
    content: string;
    password: string;
  }>({ content: "", password: "" });
  const [selectedCharacterColor, setSelectedCharacterColor] = useState("");

  //모달
  const [showModal, setShowModal] = useState<string>("");

  //댓글 등록 모달 만들기
  const CommentPostModal = () => {
    return <div>dadsad</div>;
  };

  //댓글 수정 관련 api
  const handleEdit = async () => {
    const { content, password } = newComment;
    try {
      //비밀번호 확인
      const passwordResponse = await axiosRequest.requestAxios<
        ResData<Comment>
      >("post", `/comment/${_id}`, {
        pw: passwordConfirm
      });

      //비밀번호 확인 후 댓글 수정
      // if (passwordResponse.data.password === "success") {
      //   const response = await axiosRequest.requestAxios<ResData<Comment>>(
      //     "patch",
      //     `/comment/${_id}`,
      //     {
      //       password: password,
      //       content: content,
      //       color: selectedCharacterColor
      //     }
      //   );
      //   if (response.data.password === "수정 완료") {
      //     console.log("댓글 수정 완료");
      //     onClose();
      //   } else {
      //     console.error("댓글 수정 실패");
      //   }
      // }
    } catch (error) {
      console.log("sfsf", _id);
      console.log(error);
    }
  };
  return (
    <>
      <CommentEditModalWrap>
        <h2 className="text-[26px]">비밀번호를 입력하세요</h2>
        <CommentEditModalDetail>
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="w-[60%]  h-[30px] rounded-[10px] bg-black p-[10px] text-[12px] text-white"
            value={passwordConfirm}
            onChange={(evt) => setPasswordConfirm(evt.target.value)}
          />
          <button
            className="w-[25%] h-[30px] bg-black rounded-[10px] text-white text-[14px]"
            onClick={handleEdit}
          >
            확인
          </button>
        </CommentEditModalDetail>
      </CommentEditModalWrap>
      {showModal !== "" && (
        <>
          <CommentModalBg onClick={() => setShowModal("")} />
          {showModal === "CommentEditModal" && <CommentPostModal />}
        </>
      )}
    </>
  );
}
