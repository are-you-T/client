import Character from "@/components/Character";
import useRouter from "@/hooks/useRouter";
import { customThemeColor } from "@/styles/color";
import { Button, Flex, Title } from "@mantine/core";

const HomePage = () => {
  const { navigateTo } = useRouter();
  return (
    <Flex w="100%" direction="column" flex={1}>
      <Flex w="100%" justify="center" direction="column" bg={customThemeColor.bgColor} pt="lg">
        <Character color={customThemeColor.pointColor} bgColor={customThemeColor.bodyColor} />
      </Flex>

      <Flex
        direction="column"
        p="md"
        bg={customThemeColor.bodyColor}
        gap="lg"
        justify="center"
        h="100%"
      >
        <Title size="4rem" fw={700} ta="center">
          ARE YOU T?
        </Title>
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
