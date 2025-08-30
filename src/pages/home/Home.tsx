import Character from "@/components/Character";
import useRouter from "@/hooks/useRouter";
import { customThemeColor } from "@/styles/color";
import { Button, Flex, Text } from "@mantine/core";

const HomePage = () => {
  const { navigateTo } = useRouter();
  return (
    <Flex direction="column">
      <Flex w="100%" justify="center" direction="column" bg="cyan" pt="lg">
        <Character color={customThemeColor.pointColor} bgColor={customThemeColor.bodyColor} />
      </Flex>
      <Flex direction="column" p="md" bg="violet.2" gap="xs" justify="space-between" h="100%">
        <Text size="2.5rem" fw={700} ta="center">
          ARE YOU T?
        </Text>
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
  );
};

export default HomePage;
