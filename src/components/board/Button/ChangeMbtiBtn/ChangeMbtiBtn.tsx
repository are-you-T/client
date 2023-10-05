import { ChangeMbti } from "./ChangeMbtiBtn.styles";
import { ReactComponent as ChangeMbtiBtnSvg } from "@/assets/img/change_mbti_button.svg";

interface ChangeMbtiBtnProps {
  setOpenMbtiModal: (value: boolean) => void;
}
export default function ChangeMbtiBtn({
  setOpenMbtiModal
}: ChangeMbtiBtnProps) {
  return (
    <ChangeMbti
      onClick={() => {
        setOpenMbtiModal(true);
      }}
    >
      <ChangeMbtiBtnSvg />
    </ChangeMbti>
  );
}
