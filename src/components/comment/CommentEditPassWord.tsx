import { ReactNode, useState } from "react";
import axiosRequest from "@/api";
import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
import {
  CommentPassWordModalWrap,
  CommentPassWordModalDetail
} from "@/components/comment/CommentEdit.styles";
import { ResData, Comment, CommentEditProps } from "@/@types";
import { CommentModalBg } from "./CommentContent.styles";
import { ModalBg } from "../common/MbtiTypesModal/MbtiTypesModal.styles";
import { ModalWrapCenter } from "../board/BoardPost/BoardPost.styles";
import { CommentEdit } from "@/components/comment/CommentEdit";

// 모달 배경 닫기(MbtiTypesModal은 제외)
function ModalClose({
  children,
  onClose
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <ModalBg onClick={handleModalBgClick}>{children}</ModalBg>;
}

// 유효성 결과 모달
function AlertModal({
  error,
  onClose
}: {
  error: string;
  onClose: () => void;
}) {
  return (
    <ModalClose onClose={onClose}>
      <ModalWrapCenter>
        <h3 className="text-xl font-black text-center flex items-center justify-center">
          <AlertIcon className="w-4 mr-1" />
          <span>{error}</span>
        </h3>
      </ModalWrapCenter>
    </ModalClose>
  );
}

//댓글 비밀번호 확인
export function CommentEditPassWord({
  onClose,
  _id,
  initialComment
}: {
  onClose: () => void;
  _id: string;
  initialComment: CommentEditProps;
}) {
  //비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  //모달
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [showCommentPassWordModal, setShowCommentPassWordModal] =
    useState(true);
  const [showCommentEditModal, setShowCommentEditModal] = useState(false);

  //에러타입
  const [errorType, setErrorType] = useState<string>("");

  async function passwordConfirmData() {
    const commentId = _id;
    try {
      //비밀번호 확인
      await axiosRequest.requestAxios<ResData<Comment>>(
        "post",
        `/comment/${commentId}`,
        {
          pw: passwordConfirm
        }
      );

      setShowCommentPassWordModal(false);
      setShowCommentEditModal(true);
    } catch (error) {
      setErrorType("비밀번호가 일치하지 않습니다!");
      setShowAlertModal(true);
      console.log(error);
    }
  }

  //댓글 비밀번호 확인 api
  const handleEdit = async () => {
    if (passwordConfirm === "") {
      setErrorType("비밀번호를 입력해주세요!");
      setShowAlertModal(true);
      return;
    }
    passwordConfirmData();
  };
  console.log("비번확인페이지", initialComment);
  //비밀번호 확인 모달
  return (
    <>
      {showCommentPassWordModal === true && (
        <>
          <CommentModalBg onClick={() => setShowCommentPassWordModal(false)} />
          <CommentPassWordModalWrap>
            <h2 className="text-[26px]">비밀번호를 입력하세요</h2>
            <CommentPassWordModalDetail>
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
            </CommentPassWordModalDetail>
          </CommentPassWordModalWrap>
        </>
      )}

      {showCommentEditModal === true && (
        <>
          {/* <CommentModalBg onClick={() => setShowCommentEditModal(false)} /> */}
          <CommentEdit
            onClose={() => setShowCommentEditModal(false)}
            _id={_id}
            initialComment={{
              content: initialComment.content,
              color: initialComment.color,
              password: passwordConfirm
            }}
          />
        </>
      )}
      {showAlertModal !== false && (
        <>
          {/* <CommentModalBg onClick={() => setShowAlertModal(false)} /> */}

          {showAlertModal === true && (
            <AlertModal
              error={errorType}
              onClose={() => setShowAlertModal(false)}
            />
          )}
        </>
      )}
    </>
  );
}
