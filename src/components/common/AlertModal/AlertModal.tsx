import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";

import { ModalBg, ModalWrapCenter, Main } from "./AlertModal.styles";

interface AlertModalProps {
  error: string;
  onClose: () => void;
}

function AlertModal({ error, onClose }: AlertModalProps) {
  //모달 외부영역 클릭시 모달 닫힘
  const handleClickBg = () => {
    onClose();
  };

  return (
    <>
      <ModalBg onClick={handleClickBg} />
      <ModalWrapCenter>
        <Main>
          <AlertIcon className="w-4 mr-1" />
          <span>{error}</span>
        </Main>
      </ModalWrapCenter>
    </>
  );
}

export default AlertModal;
