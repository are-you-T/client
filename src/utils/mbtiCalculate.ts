import { AnswerType, MBTIElementOption, MbtiType } from "@/types";

export type MBTIProportion = { type: MBTIElementOption; rate: number };
export type MBTIProportions = {
  energy: MBTIProportion[];
  awareness: MBTIProportion[];
  judgement: MBTIProportion[];
  life: MBTIProportion[];
};

type Totals = {
  energy: { E: number; I: number };
  awareness: { S: number; N: number };
  judgement: { T: number; F: number };
  life: { J: number; P: number };
};

const createEmptyTotals = (): Totals => ({
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
  const totals = createEmptyTotals();

  answers.forEach((ans) => {
    switch (ans.dimension) {
      case "energy":
        if (ans.energy === "E") totals.energy.E += ans.proportion;
        else if (ans.energy === "I") totals.energy.I += ans.proportion;
        break;
      case "awareness":
        if (ans.awareness === "S") totals.awareness.S += ans.proportion;
        else if (ans.awareness === "N") totals.awareness.N += ans.proportion;
        break;
      case "judgement":
        if (ans.judgement === "T") totals.judgement.T += ans.proportion;
        else if (ans.judgement === "F") totals.judgement.F += ans.proportion;
        break;
      case "life":
        if (ans.life === "J") totals.life.J += ans.proportion;
        else if (ans.life === "P") totals.life.P += ans.proportion;
        break;
      default:
        break;
    }
  });

  const [ePct, iPct] = toPercentPair(totals.energy.E, totals.energy.I);
  const [sPct, nPct] = toPercentPair(totals.awareness.S, totals.awareness.N);
  const [tPct, fPct] = toPercentPair(totals.judgement.T, totals.judgement.F);
  const [jPct, pPct] = toPercentPair(totals.life.J, totals.life.P);

  const sortDesc = (a: MBTIProportion, b: MBTIProportion) => b.rate - a.rate;

  const energy: MBTIProportion[] = [
    { type: "E", rate: ePct },
    { type: "I", rate: iPct },
  ];
  const awareness: MBTIProportion[] = [
    { type: "S", rate: sPct },
    { type: "N", rate: nPct },
  ];
  const judgement: MBTIProportion[] = [
    { type: "T", rate: tPct },
    { type: "F", rate: fPct },
  ];
  const life: MBTIProportion[] = [
    { type: "J", rate: jPct },
    { type: "P", rate: pPct },
  ];

  return {
    energy: energy.sort(sortDesc),
    awareness: awareness.sort(sortDesc),
    judgement: judgement.sort(sortDesc),
    life: life.sort(sortDesc),
  };
};

export const determineMBTI = (proportions: MBTIProportions): MbtiType => {
  const e =
    proportions.energy[0].rate === proportions.energy[1].rate ? "E" : proportions.energy[0].type;
  const s =
    proportions.awareness[0].rate === proportions.awareness[1].rate
      ? "S"
      : proportions.awareness[0].type;
  const t =
    proportions.judgement[0].rate === proportions.judgement[1].rate
      ? "T"
      : proportions.judgement[0].type;
  const j = proportions.life[0].rate === proportions.life[1].rate ? "J" : proportions.life[0].type;
  return `${e}${s}${t}${j}` as MbtiType;
};
