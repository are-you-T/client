import React from "react";
import { Button, Flex, Text } from "@mantine/core";

interface ConfirmProps {
  message: string | JSX.Element;
  yesMessage?: string;
  noMessage?: string;
  yesCallback: () => void;
  noCallback: () => void;
  commonCallback?: () => void;
}

export const Confirm: React.FC<ConfirmProps> = ({
  message,
  yesMessage = "예",
  noMessage = "아니오",
  yesCallback,
  noCallback,
  commonCallback = () => {},
}) => {
  const callback = async (callbackFn: () => void) => {
    await commonCallback();
    await callbackFn();
  };

  return (
    <Flex w="80vw" direction="column" gap="sm" justify="space-between">
      <Text style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}>
        {message}
      </Text>
      <Flex gap="md" justify="flex-end">
        <Button color="gray" onClick={() => callback(noCallback)}>
          {noMessage}
        </Button>
        <Button onClick={() => callback(yesCallback)}>{yesMessage}</Button>
      </Flex>
    </Flex>
  );
};
