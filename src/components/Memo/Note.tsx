import { createMemo, getMemoById, MemoInsertDto, memoQueryKey } from "@/actions/memo.actions";
// MBTI 옵션은 Supabase Enum에서 파생해 사용합니다.
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import { themeColor } from "@/styles/color";
import { Constants, Database } from "@/types/supabase";
import {
  Flex,
  TextInput,
  Text,
  Textarea,
  PasswordInput,
  SegmentedControl,
  ColorSwatch,
  CheckIcon,
  rem,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type MbtiType = Database["public"]["Enums"]["Mbti_Type"];
const MBTI_TYPES = Constants.public.Enums.Mbti_Type as readonly MbtiType[];

type MbtiParts = {
  energy: "E" | "I";
  awareness: "S" | "N";
  judgement: "T" | "F";
  life: "J" | "P";
};

type NoteFormValues = Omit<MemoInsertDto, "mbtiType"> & { mbtiType: MbtiParts };

const cardColors = Object.entries(themeColor)
  .filter(([key]) => key !== "dark") // dark 제외
  .map(([, colors]) => colors[6]); // 6번째 인덱스 가져오기

// 랜덤 index 값을 가져오는 함수
const getRandomIndex = (array: string[]) => Math.floor(Math.random() * array.length);

// 랜덤한 색상 가져오기
const randomColor = cardColors[getRandomIndex(cardColors)];

// Enum에서 파생한 옵션과 랜덤 초기값
const energyOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[0])));
const awarenessOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[1])));
const judgementOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[2])));
const lifeOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[3])));

const initialEnergy = energyOptions[getRandomIndex(energyOptions)] as MbtiParts["energy"];
const initialAwareness = awarenessOptions[
  getRandomIndex(awarenessOptions)
] as MbtiParts["awareness"];
const initialJudgement = judgementOptions[
  getRandomIndex(judgementOptions)
] as MbtiParts["judgement"];
const initialLife = lifeOptions[getRandomIndex(lifeOptions)] as MbtiParts["life"];

interface NoteProps {
  id?: string;
}

export const Note = ({ id }: NoteProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const { data: memo } = useQuery({
    queryKey: ["memo", id],
    queryFn: () => getMemoById(id as string),
    enabled: !!id,
  });

  if (id && !memo) return null;

  const { mutate: createMemoMutate, isPending: isCreatingMemo } = useMutation({
    mutationFn: createMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [memoQueryKey] }); // 리스트 자동 갱신
    },
  });
  const [e, a, j, l] = (memo?.mbtiType ?? MBTI_TYPES[0]).split("") as [
    MbtiParts["energy"],
    MbtiParts["awareness"],
    MbtiParts["judgement"],
    MbtiParts["life"],
  ];

  const form = useForm<NoteFormValues>({
    validateInputOnChange: true,
    initialValues: {
      title: id ? (memo?.title ?? "") : "",
      content: id ? (memo?.content ?? "") : "",
      password: "",
      nickname: id ? (memo?.nickname ?? "") : "",
      mbtiType: id
        ? { energy: e, awareness: a, judgement: j, life: l }
        : {
            energy: initialEnergy,
            awareness: initialAwareness,
            judgement: initialJudgement,
            life: initialLife,
          },
      cardColor: id && memo ? memo.cardColor : randomColor,
    },
  });

  const validationCheck = () => {
    const { title, content, nickname, password } = form.values;
    if (!title) {
      notifications.show({
        title: "메모 작성 실패",
        message: "제목을 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (title.length > 20) {
      notifications.show({
        title: "메모 작성 실패",
        message: "제목을 20자 이내로 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (!content) {
      notifications.show({
        title: "메모 작성 실패",
        message: "내용을 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (content.length > 200) {
      notifications.show({
        title: "메모 작성 실패",
        message: "내용을 200자 이내로 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (!nickname) {
      notifications.show({
        title: "메모 작성 실패",
        message: "닉네임을 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (nickname.length > 6) {
      notifications.show({
        title: "메모 작성 실패",
        message: "닉네임을 6자 이내로 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (!password) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "비밀번호를 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    return true;
  };

  // 제출 버튼 클릭 시 실행될 함수
  const handleSubmit = () => {
    if (!validationCheck()) {
      return;
    }
    const composed = `${form.values.mbtiType.energy}${form.values.mbtiType.awareness}${form.values.mbtiType.judgement}${form.values.mbtiType.life}`;

    if (!MBTI_TYPES.includes(composed as MbtiType)) {
      notifications.show({
        title: "메모 작성 실패",
        message: "유효하지 않은 MBTI 유형입니다. 다시 선택해 주세요.",
        color: "red",
      });
      return;
    }

    createMemoMutate(
      { ...form.values, mbtiType: composed as MbtiType },
      {
        onSuccess: (data) => {
          notifications.show({
            title: `메모지 ${!id ? "작성" : "수정"} 성공`,
            message: `메모가 ${!id ? "작성" : "수정"}되었어요! 🌟`,
            color: "green",
          });
          form.reset();
          closeModal(data);
        },
        onError: (error) => {
          notifications.show({
            title: `메모지 ${!id ? "작성" : "수정"} 실패`,
            message: `메모 ${!id ? "작성" : "수정"} 중 오류가 발생했어요. 😥`,
            color: "red",
          });
          setError(error);
        },
      }
    );
  };

  return (
    <Flex direction="column" w="16rem" gap="sm">
      <TextInput
        key={form.key("title")}
        label="제목"
        placeholder="제목을 입력하세요."
        withAsterisk
        {...form.getInputProps("title")}
      />
      <Textarea
        label="내용"
        placeholder="내용을 입력하세요."
        withAsterisk
        {...form.getInputProps("content")}
      />
      <TextInput
        label="닉네임"
        placeholder="닉네임을 입력하세요."
        withAsterisk
        {...form.getInputProps("nickname")}
        disabled={!!id}
      />
      <PasswordInput
        label="비밀번호"
        placeholder="메모 비밀번호를 입력하세요."
        withAsterisk
        {...form.getInputProps("password")}
      />
      <Text>MBTI 유형 선택</Text>
      <Flex gap="sm">
        <SegmentedControl
          w="100%"
          data={energyOptions}
          {...form.getInputProps("mbtiType.energy")}
        />
        <SegmentedControl
          w="100%"
          data={awarenessOptions}
          {...form.getInputProps("mbtiType.awareness")}
        />
      </Flex>
      <Flex gap="sm">
        <SegmentedControl
          w="100%"
          data={judgementOptions}
          {...form.getInputProps("mbtiType.judgement")}
        />
        <SegmentedControl w="100%" data={lifeOptions} {...form.getInputProps("mbtiType.life")} />
      </Flex>
      <Text>배경색 선택</Text>
      <Flex w="100%" gap="xs" wrap="wrap">
        {cardColors.map((color) => {
          return (
            <ColorSwatch
              key={color}
              component="button"
              color={color}
              size="2.7rem"
              radius="xs"
              withShadow
              onClick={() => form.setFieldValue("cardColor", color)}
            >
              {form.values.cardColor === color && (
                <CheckIcon style={{ width: rem(12), height: rem(12) }} />
              )}
            </ColorSwatch>
          );
        })}
      </Flex>
      <Button onClick={() => handleSubmit()}>등록</Button>
    </Flex>
  );
};
