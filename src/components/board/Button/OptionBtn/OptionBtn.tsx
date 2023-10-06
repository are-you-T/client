import { ReactComponent as OptionIcon } from "@/assets/img/option_button.svg";
import {
  DropdownWrap,
  ButtonWrap,
  MenuList,
  EditBtn,
  DeleteBtn
} from "./OptionBtn.styles";
import axiosRequest from "@/api/index";
import { ResData, Board } from "@/@types/index";

interface OptionBtnProps {
  selectedId: string;
}
export default function OptionBtn({ selectedId }: OptionBtnProps) {
  //게시글 delete요청
  async function deletePosting() {
    try {
      const response: ResData<Board[]> = await axiosRequest.requestAxios<
        ResData<Board[]>
      >("delete", `/board/${selectedId}`);
      // console.log("게시글삭제", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickEditBtn = () => {};
  const handleClickDeleteBtn = () => {
    deletePosting();
    window.history.back();
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
