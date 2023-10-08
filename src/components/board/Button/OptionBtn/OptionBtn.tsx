import { ReactComponent as OptionIcon } from "@/assets/img/option_button.svg";
import {
  DropdownWrap,
  ButtonWrap,
  MenuList,
  EditBtn,
  DeleteBtn
} from "./OptionBtn.styles";

interface OptionBtnProps {
  selectModal: (modal: string) => void;
  selectMode: (mode: string) => void;
}
export default function OptionBtn({ selectModal, selectMode }: OptionBtnProps) {
  //게시글 수정
  const handleClickEditBtn = () => {
    selectMode("edit");
    selectModal("pwCheckModal"); //비밀번호 확인모달 open
  };
  //게시글 삭제
  const handleClickDeleteBtn = () => {
    selectMode("delete");
    selectModal("pwCheckModal"); //비밀번호 확인모달 open
  };

  return (
    <DropdownWrap>
      <ButtonWrap tabIndex={0}>
        <OptionIcon />
      </ButtonWrap>
      <MenuList tabIndex={0} className="dropdown-content">
        <li onClick={handleClickEditBtn}>
          <EditBtn>수정</EditBtn>
        </li>
        <li onClick={handleClickDeleteBtn}>
          <DeleteBtn>삭제</DeleteBtn>
        </li>
      </MenuList>
    </DropdownWrap>
  );
}
