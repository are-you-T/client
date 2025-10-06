import { MBTI_TYPE_COLORS } from "@/constants/MBTIColors";
import useStatController from "@/controllers/useStatController";
import useRouter from "@/hooks/useRouter";
import { BarChart } from "@mantine/charts";
import { Button, Flex, Loader, Text } from "@mantine/core";

const StatsPage = () => {
  const { navigateTo } = useRouter();
  const { getStats } = useStatController();
  const { data: statsData } = getStats();

  const stats =
    statsData
      ?.map((data) => ({
        mbtiType: data.mbtiType,
        count: data.count,
        color: MBTI_TYPE_COLORS[data.mbtiType], // 색상 매핑
      }))
      .filter((data) => data.count) ?? [];

  return (
    <Flex direction="column" w="100%" bg="dark">
      <Text size="2rem" c="white" p="sm" ta="center">
        MBTI 유형별 통계
      </Text>
      {/* 차트 컨테이너를 상대 위치 + 높은 z-index로 올려 툴팁/호버 보장 */}
      <Flex direction="column" p="md">
        {stats ? (
          <BarChart
            h={500}
            data={stats}
            dataKey="mbtiType" // X축의 데이터를 설정
            orientation="vertical"
            barProps={(data) => ({
              radius: 10,
              fill: data.color, // 데이터에 따라 색상 설정
            })}
            series={[{ name: "count", color: "color" }]} // 데이터를 표시하는 시리즈
            tickLine="none"
            gridAxis="none"
            withXAxis={false}
          />
        ) : (
          <Loader />
        )}
      </Flex>
      <Flex direction="column" gap="xs" p="md">
        <Button size="xl" color="yellow.4" onClick={() => navigateTo("/test")}>
          테스트 하러가기
        </Button>
        <Button size="xl" color="lime.4" onClick={() => navigateTo("/question")}>
          문항 보러가기
        </Button>
        <Button size="xl" color="cyan.4" onClick={() => navigateTo("/memo")}>
          메모장 보러가기
        </Button>
      </Flex>
    </Flex>
  );
};

export default StatsPage;
