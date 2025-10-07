import { handleShareClick } from "@/components/ShareLink";
import { ActionIcon, Badge, Button, Card, Flex, Progress, Text } from "@mantine/core";
import useStatController from "@/controllers/useStatController";
import { MBTIElementOption, MbtiType } from "@/types";
import useRouter from "@/hooks/useRouter";
import { MBTIProportions } from "@/utils/mbtiCalculate";
import { IconLink } from "@tabler/icons-react";
import Character from "@/components/Character";
import { MBTI_TYPE_COLORS, MBTI_TYPE_COLORS_PAIRS, mbtiTypeColor } from "@/constants/MBTIColors";
import { MBTI_TYPES_OPTIONS, MBTI_TYPES_VALUE } from "@/constants/MBTIOptions";
import { themeColor } from "@/styles/color";

const TestResult = () => {
  const { navigateTo, params, location } = useRouter();
  const { mbti } = params as { mbti: MbtiType };

  const bgColor = MBTI_TYPE_COLORS[mbti] ?? MBTI_TYPE_COLORS["XXXX"];
  const color = MBTI_TYPE_COLORS_PAIRS[mbti] ?? MBTI_TYPE_COLORS_PAIRS["XXXX"];

  const { getMbtiStat } = useStatController();

  const { data: mbtiResult } = getMbtiStat(mbti);

  if (!mbtiResult) return null;

  const stateResult = (location.state as { resultData?: MBTIProportions } | null)?.resultData;

  const handleShareButtonClick = () => {
    handleShareClick();
  };

  const firstRowTags = mbtiResult?.tags?.slice(0, 2); // 상단 태그
  const secondRowTags = mbtiResult?.tags?.slice(2); // 하단 태그

  return (
    <Flex direction="column">
      <Flex justify="space-between" p="md" align="center">
        <Text size="3rem">{mbtiResult?.mbtiType}</Text>
        <ActionIcon radius="100%" size="4rem" color={color} onClick={handleShareButtonClick}>
          <IconLink />
        </ActionIcon>
      </Flex>
      <Character bgColor={bgColor} color={color} />
      <Flex direction="column" w="100%" h="100%" bg={bgColor} gap="lg" p="md">
        <Flex direction="column" gap="lg" justify="center">
          <Text size="1.5rem" fw={700} ta="center">
            {mbtiResult?.summary}
          </Text>
          <Text size="1rem" style={{ lineHeight: "1.5rem" }}>
            {mbtiResult?.content}
          </Text>
          <Flex w="100%" direction="column" gap="md">
            <Flex w="100%" justify="center" gap="xl">
              {firstRowTags?.map((tag) => {
                return (
                  <Badge key={tag} w="8rem" color={color}>
                    #{tag}
                  </Badge>
                );
              })}
            </Flex>
            <Flex w="100%" justify="center" gap="xl">
              {secondRowTags?.map((tag) => {
                return (
                  <Badge key={tag} w="8rem" color={color}>
                    #{tag}
                  </Badge>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
        {stateResult && (
          <Flex direction="column" gap="md">
            <Text size="1.5rem" fw={700} ta="center">
              내 검사 결과
            </Text>
            <Flex direction="column" gap="md">
              {MBTI_TYPES_OPTIONS.map((mbti) => {
                return (
                  <Flex key={mbti} direction="column" gap="xs">
                    <Text size="lg" fw={700} ta="center">
                      {MBTI_TYPES_VALUE[mbti].label}
                    </Text>
                    <Flex gap="xs" align="center">
                      <Text fw={700} w="3rem">
                        {stateResult[mbti][0].rate}%
                      </Text>
                      <Progress.Root w="100%" size="2rem">
                        {stateResult[mbti]?.map((state: { type: string; rate: number }) => {
                          return (
                            <Progress.Section
                              key={state.type}
                              value={state.rate}
                              color={mbtiTypeColor[state.type as MBTIElementOption]}
                            >
                              <Progress.Label>{state.type}</Progress.Label>
                            </Progress.Section>
                          );
                        })}
                      </Progress.Root>
                      <Text fw={700} w="3rem">
                        {stateResult[mbti][1].rate}%
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        )}
        <Flex direction="column" gap="lg" p="md">
          <Text size="1.5rem" fw={700} ta="center">
            유형별 관계성
          </Text>
          {mbtiResult?.MbtiFit?.map((mbti) => {
            return (
              <Card
                key={mbti.description}
                bg={mbti.fitType === "good" ? themeColor.red[2] : themeColor.blue[2]}
                padding="md"
              >
                <Flex gap="xs" justify="space-between" mb="md">
                  <Text fw={600}>{mbti.fitType === "good" ? "잘" : "안"} 어울리는 유형</Text>
                  <Text fw={600}>{mbti.targetMbtiType}</Text>
                </Flex>
                <Text style={{ whiteSpace: "normal" }}>{mbti.description}</Text>
              </Card>
            );
          })}
        </Flex>
        <Flex direction="column" gap="xs" p="md">
          <Button size="xl" color="yellow.4" onClick={() => navigateTo("/test")}>
            테스트 하러가기
          </Button>
          <Button size="xl" color="lime.4" onClick={() => navigateTo("/question")}>
            문항 보러가기
          </Button>
          <Button size="xl" color="teal.4" onClick={() => navigateTo("/stats")}>
            통계 보러가기
          </Button>
          <Button size="xl" color="cyan.4" onClick={() => navigateTo("/memo")}>
            메모장 보러가기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TestResult;
