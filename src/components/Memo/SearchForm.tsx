import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModal } from "@/hooks/useModal";

export const SearchForm = () => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
  });

  const { closeModal } = useModal();

  return (
    <Flex w="80vw" direction="column" gap="sm">
      <TextInput
        placeholder="제목(쉼표 , 또는 공백으로 여러 개)"
        size="lg"
        {...form.getInputProps("title")}
      />
      <TextInput
        placeholder="내용(쉼표 , 또는 공백으로 여러 개)"
        size="lg"
        {...form.getInputProps("content")}
      />
      <Group grow gap="xs">
        <Button color="gray" onClick={() => closeModal(null)}>
          취소
        </Button>
        <Button
          onClick={() => {
            const titles = (form.values.title || "")
              .split(/[\s,]+/)
              .map((s) => s.trim())
              .filter(Boolean);
            const contents = (form.values.content || "")
              .split(/[\s,]+/)
              .map((s) => s.trim())
              .filter(Boolean);
            closeModal({ titles, contents });
          }}
        >
          입력
        </Button>
      </Group>
    </Flex>
  );
};
