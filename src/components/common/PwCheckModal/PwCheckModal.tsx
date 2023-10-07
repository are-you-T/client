import { useState } from "react";

import axiosRequest from "@/api/index";
import { ResData, BoardPassword } from "@/@types/index";

import {
  ModalBg,
  ModalWrap,
  ModalDetail,
  Title,
  InputForm,
  ConfirmBtn
} from "./PwCheckModal.styles";

interface PwCheckModalProps {
  onClose: () => void;
  selectedId: string;
  checkCorrectPw: (isCorrect: boolean) => void;
}

//비밀번호 확인 모달
const PwCheckModal = ({
  onClose,
  selectedId,
  checkCorrectPw
}: PwCheckModalProps) => {
  //모달 외부영역 클릭시 모달 닫힘
  const handleClickBg = () => {
    onClose();
  };
  //password관리
  const [password, setPassword] = useState<string>("");
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  async function postPassword() {
    try {
      const response: ResData<BoardPassword> = await axiosRequest.requestAxios<
        ResData<BoardPassword>
      >("post", `/board/${selectedId}`, { pw: password });
      // console.log("비밀번호검증", response.data);
      response && checkCorrectPw(true);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postPassword();
  };
  return (
    <>
      <ModalBg onClick={handleClickBg} />

      <ModalWrap onSubmit={handleSubmit}>
        <Title>비밀번호를 입력하세요</Title>
        <ModalDetail>
          <InputForm
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handleChange}
          />
          <ConfirmBtn type="submit">확인</ConfirmBtn>
        </ModalDetail>
      </ModalWrap>
    </>
  );
};

export default PwCheckModal;
