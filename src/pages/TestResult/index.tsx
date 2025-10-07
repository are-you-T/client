import { useLocation } from "react-router-dom";
import { handleShareClick } from "@/components/Common/ShareLink";
import { Flex } from "@mantine/core";

export default function TestResult() {
  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const mbtiType: string | null = searchParms.get("mbti");

  const handleShareButtonClick = () => {
    handleShareClick();
  };

  return <Flex>결과</Flex>;
}
