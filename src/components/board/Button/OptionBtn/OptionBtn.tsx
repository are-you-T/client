import { ReactComponent as OptionIcon } from "@/assets/img/option_button.svg";
import { DropdownWrap, ButtonWrap, MenuList, MenuEl } from "./OptionBtn.styles";

export default function OptionBtn() {
  return (
    <DropdownWrap>
      <ButtonWrap tabIndex={0}>
        <OptionIcon />
      </ButtonWrap>
      <MenuList tabIndex={0} className="dropdown-content">
        <li>
          <MenuEl>수정</MenuEl>
        </li>
        <li>
          <MenuEl>삭제</MenuEl>
        </li>
      </MenuList>
    </DropdownWrap>
  );
}
