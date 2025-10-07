import { useModal } from "@/hooks/useModal";
import { MbtiType } from "@/types";
import { Constants } from "@/types/supabase";
import { Button, Flex, SegmentedControl } from "@mantine/core";
import { useForm } from "@mantine/form";

const MBTI_TYPES = Constants.public.Enums.Mbti_Type as readonly MbtiType[];

// Enum에서 파생한 옵션과 랜덤 초기값
const energyOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[0])));
const awarenessOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[1])));
const judgementOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[2])));
const lifeOptions = Array.from(new Set(MBTI_TYPES.map((t) => t[3])));

// 랜덤 index 값을 가져오는 함수
const getRandomIndex = (array: string[]) => Math.floor(Math.random() * array.length);

const initialEnergy = energyOptions[getRandomIndex(energyOptions)] as MbtiParts["energy"];
const initialAwareness = awarenessOptions[
  getRandomIndex(awarenessOptions)
] as MbtiParts["awareness"];
const initialJudgement = judgementOptions[
  getRandomIndex(judgementOptions)
] as MbtiParts["judgement"];
const initialLife = lifeOptions[getRandomIndex(lifeOptions)] as MbtiParts["life"];

type MbtiParts = {
  energy: "E" | "I";
  awareness: "S" | "N";
  judgement: "T" | "F";
  life: "J" | "P";
};

export const MBTISelect = () => {
  const { closeModal } = useModal();
  const form = useForm<{ mbtiType: MbtiParts }>({
    initialValues: {
      mbtiType: {
        energy: initialEnergy,
        awareness: initialAwareness,
        judgement: initialJudgement,
        life: initialLife,
      },
    },
  });

  return (
    <Flex w="100%" direction="column" gap="sm">
      <Flex w="100%" gap="sm">
        <SegmentedControl
          w="100%"
          size="xl"
          data={energyOptions}
          {...form.getInputProps("mbtiType.energy")}
        />
        <SegmentedControl
          w="100%"
          size="xl"
          data={awarenessOptions}
          {...form.getInputProps("mbtiType.awareness")}
        />
      </Flex>
      <Flex w="100%" gap="sm">
        <SegmentedControl
          w="100%"
          size="xl"
          data={judgementOptions}
          {...form.getInputProps("mbtiType.judgement")}
        />
        <SegmentedControl
          w="100%"
          size="xl"
          data={lifeOptions}
          {...form.getInputProps("mbtiType.life")}
        />
      </Flex>
      <Flex w="100%" gap="sm">
        <Button w="100%" color="gray" onClick={closeModal}>
          취소
        </Button>
        <Button
          w="100%"
          onClick={() => {
            const composed = `${form.values.mbtiType.energy}${form.values.mbtiType.awareness}${form.values.mbtiType.judgement}${form.values.mbtiType.life}`;
            closeModal(composed);
          }}
        >
          저장
        </Button>
      </Flex>
    </Flex>
  );
};
