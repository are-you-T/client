import { MantineTheme } from "@mantine/core";
import { customThemeColor } from "./color";

export const globalTheme = {
  components: {
    AppShell: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.violet[2], // 원하는 배경색 설정
        },
        header: {
          borderBottom: "none",
        },
      }),
    },
    Button: {
      styles: () => ({
        root: {
          outline: "none",
        },
      }),
    },
    Drawer: {
      styles: () => ({
        content: {
          backgroundColor: customThemeColor.bodyColor, // 원하는 배경색 설정
        },
      }),
    },
  },
};
