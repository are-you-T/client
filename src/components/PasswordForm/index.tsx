import { useModal } from "@/hooks/useModal";
import { Button, Flex, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const PasswordForm = () => {
  const { closeModal } = useModal();
  const form = useForm({
    initialValues: {
      password: "",
    },
  });

  return (
    <Flex direction="column" w="16rem" gap="sm">
      <PasswordInput
        w="100%"
        placeholder="비밀번호를 입력하세요."
        {...form.getInputProps("password")}
      />
      <Button
        onClick={() => {
          closeModal(form.values.password);
        }}
        disabled={!form.values.password}
      >
        입력
      </Button>
    </Flex>
  );
};
