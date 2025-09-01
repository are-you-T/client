import { AppShell, Flex, Anchor, Drawer, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconX } from "@tabler/icons-react";
import React from "react";

import MainLogo from "@/assets/img/mainlogo.svg";
import useRouter from "@/hooks/useRouter";
import { customThemeColor } from "@/styles/color";

interface LayoutProps {
  children: React.ReactNode;
}

const fixedBoxStyle = {
  left: "50%",
  right: "auto", // Mantine 기본 right 제거
  transform: "translateX(-50%)", // 가운데 정렬
  width: "100%",
  maxWidth: 720,
  minWidth: 340,
} as const;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex w="100%" h="100vh" justify="center">
      <AppShell header={{ height: 72 }} maw={720} miw={340} w="100%" h="100%">
        <AppShell.Header bg="lime" style={fixedBoxStyle}>
          <LayoutHeader />
        </AppShell.Header>
        <AppShell.Main display="flex">{children}</AppShell.Main>
      </AppShell>
    </Flex>
  );
};

const LayoutHeader = () => {
  const { navigateTo } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const handleNavigation = (path: string) => {
    navigateTo(path);
    close(); // Drawer 닫기
  };

  return (
    <Flex
      w="100%"
      h="100%"
      p="xs"
      justify="space-between"
      align="center"
      bg={customThemeColor.bodyColor}
    >
      <Anchor
        h="100%"
        onClick={() => {
          navigateTo("/");
        }}
      >
        <MainLogo />
      </Anchor>
      <Drawer opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Flex w="100%" direction="column" gap="md">
          <Flex w="100%" justify="space-between" align="center">
            <Anchor
              h="100%"
              onClick={() => {
                handleNavigation("/");
              }}
            >
              <MainLogo />
            </Anchor>
            <ActionIcon variant="subtle" c="black" size="3rem" onClick={close}>
              <IconX size="2.5rem" />
            </ActionIcon>
          </Flex>
          <Button size="xl" color="yellow.4" onClick={() => handleNavigation("/test")}>
            테스트 하러가기
          </Button>
          <Button size="xl" color="lime.4" onClick={() => handleNavigation("/question")}>
            문항 보러가기
          </Button>
          <Button size="xl" color="teal.4" onClick={() => handleNavigation("/stats")}>
            유형통계 보러가기
          </Button>
          <Button size="xl" color="cyan.4" onClick={() => handleNavigation("/memo")}>
            메모장 보러가기
          </Button>
        </Flex>
      </Drawer>
      <ActionIcon variant="subtle" color="dark" size="3rem" onClick={open}>
        <IconMenu2 size="2.5rem" />
      </ActionIcon>
    </Flex>
  );
};
