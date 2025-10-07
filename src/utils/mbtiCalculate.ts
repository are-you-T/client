import { AnswerType, MbtiType } from "@/types";

type EnergyKey = "E" | "I";
type AwarenessKey = "S" | "N";
type JudgementKey = "T" | "F";
type LifeKey = "J" | "P";

export type MBTIProportions = {
  energy: Record<EnergyKey, number>;
  awareness: Record<AwarenessKey, number>;
  judgement: Record<JudgementKey, number>;
  life: Record<LifeKey, number>;
};

const createEmptyProportions = (): MBTIProportions => ({
  energy: { E: 0, I: 0 },
  awareness: { S: 0, N: 0 },
  judgement: { T: 0, F: 0 },
  life: { J: 0, P: 0 },
});

const toPercentPair = (a: number, b: number): [number, number] => {
  if (a <= 0 && b <= 0) return [50, 50];
  const total = a + b;
  const aPct = Math.round((a / total) * 100);
  const bPct = Math.round((b / total) * 100);
  // Normalize rounding errors to always sum to 100
  const diff = 100 - (aPct + bPct);
  return [aPct + diff, bPct];
};

export const calculateMbtiProportion = (
  answers: Array<
    Pick<AnswerType, "dimension" | "proportion" | "energy" | "awareness" | "judgement" | "life">
  >
): MBTIProportions => {
  const totals = createEmptyProportions();

  answers.forEach((ans) => {
    switch (ans.dimension) {
      case "energy": {
        if (ans.energy === "E") totals.energy.E += ans.proportion;
        else if (ans.energy === "I") totals.energy.I += ans.proportion;
        break;
      }
      case "awareness": {
        if (ans.awareness === "S") totals.awareness.S += ans.proportion;
        else if (ans.awareness === "N") totals.awareness.N += ans.proportion;
        break;
      }
      case "judgement": {
        if (ans.judgement === "T") totals.judgement.T += ans.proportion;
        else if (ans.judgement === "F") totals.judgement.F += ans.proportion;
        break;
      }
      case "life": {
        if (ans.life === "J") totals.life.J += ans.proportion;
        else if (ans.life === "P") totals.life.P += ans.proportion;
        break;
      }
      default:
        break;
    }
  });

  const [ePct, iPct] = toPercentPair(totals.energy.E, totals.energy.I);
  const [sPct, nPct] = toPercentPair(totals.awareness.S, totals.awareness.N);
  const [tPct, fPct] = toPercentPair(totals.judgement.T, totals.judgement.F);
  const [jPct, pPct] = toPercentPair(totals.life.J, totals.life.P);

  return {
    energy: { E: ePct, I: iPct },
    awareness: { S: sPct, N: nPct },
    judgement: { T: tPct, F: fPct },
    life: { J: jPct, P: pPct },
  };
};

export const determineMBTI = (proportions: MBTIProportions): MbtiType => {
  const energy = proportions.energy.E >= proportions.energy.I ? "E" : "I";
  const awareness = proportions.awareness.S >= proportions.awareness.N ? "S" : "N";
  const judgement = proportions.judgement.T >= proportions.judgement.F ? "T" : "F";
  const life = proportions.life.J >= proportions.life.P ? "J" : "P";
  return `${energy}${awareness}${judgement}${life}` as MbtiType;
};

export const calculateMbti = (
  answers: Array<
    Pick<AnswerType, "dimension" | "proportion" | "energy" | "awareness" | "judgement" | "life">
  >
) => {
  const proportions = calculateMbtiProportion(answers);
  const type = determineMBTI(proportions);
  return { proportions, type } as const;
};
