import { Button, Flex, Group, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModal } from "@/hooks/useModal";

export const PasswordForm = () => {
  const form = useForm({
    initialValues: {
      password: "",
    },
  });

  const { closeModal } = useModal();

  return (
    <Flex w="80vw" direction="column" gap="sm">
      <PasswordInput
        placeholder="비밀번호를 입력하세요."
        size="lg"
        {...form.getInputProps("password")}
      />
      <Group grow gap="xs">
        <Button color="gray" onClick={() => closeModal(null)}>
          취소
        </Button>
        <Button
          onClick={() => {
            closeModal(form.values.password);
          }}
        >
          입력
        </Button>
      </Group>
    </Flex>
  );
};
