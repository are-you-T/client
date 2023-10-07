import { useState } from "react";
import {
  ModalBg,
  ModalWrap,
  ModalDetail,
  InputForm,
  ConfirmBtn
} from "./PwCheckModal.styles";

interface PwCheckModalProps {
  onClose: () => void;
}

//비밀번호 확인 모달
const PwCheckModal = ({ onClose }: PwCheckModalProps) => {
  //모달 외부영역 클릭시 모달 닫힘
  const handleClickBg = () => {
    onClose();
  };

  return (
    <>
      <ModalBg onClick={handleClickBg} />

      <ModalWrap>
        <h2 className="text-[24px] font-semibold">비밀번호를 입력하세요</h2>
        <ModalDetail>
          <InputForm type="password" placeholder="비밀번호 입력" />
          <ConfirmBtn>확인</ConfirmBtn>
        </ModalDetail>
      </ModalWrap>
    </>
  );
};

export default PwCheckModal;
