import { AppShell, Flex, Center, Box } from "@mantine/core";
import React from "react";

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
      <AppShell
        header={{ height: 72 }}
        footer={{ height: 60 }}
        maw={720}
        miw={340}
        w="100%"
        h="100%"
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
