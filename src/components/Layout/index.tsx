import { AppShell } from "@mantine/core";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: 72 }}>
      <AppShell.Header>layout header</AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>layout footer</AppShell.Footer>
    </AppShell>
  );
};
