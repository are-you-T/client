import { useEffect, useState } from "react";
import {
  ModalBg,
  ModalWrap,
  Content,
  Title,
  Instruction,
  InputForm,
  ConfirmWrap,
  CancelBtn,
  OkBtn
} from "./PwCheckModal.styles";

interface PwCheckModalProps {}

//비밀번호 확인 모달
const PwCheckModal = ({}: PwCheckModalProps) => {
  return (
    <>
      <ModalBg />

      <ModalWrap>
        <Content>
          <Title>게시글 비밀번호</Title>
          <Instruction>비밀번호</Instruction>
          <InputForm>
            <input type="password" placeholder="비밀번호를 입력해주세요 :)" />
          </InputForm>
        </Content>
        <ConfirmWrap>
          <CancelBtn>취소</CancelBtn>
          <OkBtn>확인</OkBtn>
        </ConfirmWrap>
      </ModalWrap>
    </>
  );
};

export default PwCheckModal;
