import { Flex } from "@mantine/core";
import ChangeMbtiBtnSvg from "@/assets/img/change_mbti_button.svg";

interface ChangeMbtiBtnProps {
  setOpenMbtiModal: (value: boolean) => void;
}
export default function ChangeMbtiBtn({ setOpenMbtiModal }: ChangeMbtiBtnProps) {
  return (
    <Flex
      onClick={() => {
        setOpenMbtiModal(true);
      }}
    >
      <ChangeMbtiBtnSvg />
    </Flex>
  );
}
