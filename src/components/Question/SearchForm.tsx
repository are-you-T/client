import { Button, Flex, Group, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModal } from "@/hooks/useModal";
import { MBTI_TYPES_OPTIONS } from "@/constants/MBTIOptions";

export const SearchForm = () => {
  const form = useForm({
    initialValues: {
      subject: "",
      mbtiTypes: [] as string[],
    },
  });

  const { closeModal } = useModal();

  return (
    <Flex w="80vw" direction="column" gap="sm">
      <TextInput
        placeholder="제목(쉼표 , 로 여러 개)"
        size="lg"
        {...form.getInputProps("subject")}
      />
      <MultiSelect
        placeholder="유형을 여러 개 선택하세요."
        data={MBTI_TYPES_OPTIONS}
        size="lg"
        {...form.getInputProps("mbtiTypes")}
      />
      <Group grow gap="xs">
        <Button color="gray" onClick={() => closeModal(null)}>
          취소
        </Button>
        <Button
          onClick={() => {
            const subjects = (form.values.subject || "")
              .split(/[,\s]+/)
              .map((s) => s.trim())
              .filter(Boolean);
            const mbtiTypes = (form.values.mbtiTypes || []) as string[];
            closeModal({ subjects, mbtiTypes });
          }}
        >
          입력
        </Button>
      </Group>
    </Flex>
  );
};
