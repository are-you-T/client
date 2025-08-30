import { AppShell, Flex, Center } from "@mantine/core";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const fixedBoxStyle = {
  left: "50%",
  right: "auto", // Mantine 기본 right 제거
  transform: "translateX(-50%)", // 가운데 정렬
  width: "100%",
  maxWidth: 820,
  minWidth: 340,
} as const;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex w="100%" h="100vh">
      <AppShell
        header={{ height: 72 }}
        footer={{ height: 60 }}
        maw={820}
        miw={340}
        w="100%"
        h="100%"
        withBorder
      >
        <AppShell.Header bg="lime" style={fixedBoxStyle}>
          layout header
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
        <AppShell.Footer bg="green" style={fixedBoxStyle}>
          layout footer
        </AppShell.Footer>
      </AppShell>
    </Flex>
  );
};
