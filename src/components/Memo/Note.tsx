import { MemoInsertDto } from "@/actions/memo.actions";
import useMemoController from "@/controllers/useMemoController";
// MBTI 옵션은 Supabase Enum에서 파생해 사용합니다.
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import { themeColor } from "@/styles/color";
import { MbtiType, MemoType } from "@/types";
import { Constants } from "@/types/supabase";
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
import { useEffect } from "react";

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
  id?: MemoType["id"];
}

export const Note = ({ id }: NoteProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { closeModal } = useModal();

  const { createMemo, updateMemo, getMemo } = useMemoController();
  // id가 없을 수 있는 create 모드에서도 훅 호출 규칙을 지키기 위해
  // 빈 문자열을 넘기고, 훅 내부의 enabled로 호출을 막습니다.
  const { data: memo } = getMemo(id ?? "");

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

  // 메모 데이터 조회 후 폼에 반영 (초기 렌더에서 memo가 없어 빈값으로 고정되는 문제 방지)
  // id가 있고 memo가 준비되면 폼 값을 동기화합니다.
  useEffect(() => {
    if (!(id && memo)) return;
    const [me, ma, mj, ml] = (memo.mbtiType ?? MBTI_TYPES[0]).split("") as [
      MbtiParts["energy"],
      MbtiParts["awareness"],
      MbtiParts["judgement"],
      MbtiParts["life"],
    ];
    const nextValues: NoteFormValues = {
      title: memo.title ?? "",
      content: memo.content ?? "",
      password: "",
      nickname: memo.nickname ?? "",
      mbtiType: { energy: me, awareness: ma, judgement: mj, life: ml },
      cardColor: memo.cardColor ?? randomColor,
    };
    const curr = form.values;
    const changed =
      curr.title !== nextValues.title ||
      curr.content !== nextValues.content ||
      curr.nickname !== nextValues.nickname ||
      curr.cardColor !== nextValues.cardColor ||
      curr.mbtiType.energy !== nextValues.mbtiType.energy ||
      curr.mbtiType.awareness !== nextValues.mbtiType.awareness ||
      curr.mbtiType.judgement !== nextValues.mbtiType.judgement ||
      curr.mbtiType.life !== nextValues.mbtiType.life;
    if (changed) form.setValues(nextValues);
  }, [id, memo]);

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

    if (id) {
      // 수정
      updateMemo(
        { id, ...form.values, mbtiType: composed as MbtiType },
        {
          onSuccess: (data) => {
            notifications.show({
              title: "메모지 수정 성공",
              message: "메모가 수정되었어요! 🌟",
              color: "green",
            });
            form.reset();
            closeModal(data);
          },
          onError: (error) => {
            notifications.show({
              title: "메모지 수정 실패",
              message: "메모 수정 중 오류가 발생했어요. 😥",
              color: "red",
            });
            setError(error);
          },
        }
      );
    } else {
      // 작성
      createMemo(
        { ...form.values, mbtiType: composed as MbtiType },
        {
          onSuccess: (data) => {
            notifications.show({
              title: "메모지 작성 성공",
              message: "메모가 작성되었어요! 🌟",
              color: "green",
            });
            form.reset();
            closeModal(data);
          },
          onError: (error) => {
            notifications.show({
              title: "메모지 작성 실패",
              message: "메모 작성 중 오류가 발생했어요. 😥",
              color: "red",
            });
            setError(error);
          },
        }
      );
    }
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
