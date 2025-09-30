import { themeColor } from "@/styles/color";

export const typeColor = {
  energy: themeColor.red?.[4],
  awareness: themeColor.blue?.[4],
  judgement: themeColor.yellow?.[4],
  life: themeColor.green?.[4],
};

export const mbtiTypeColor = {
  E: themeColor.orange?.[4],
  I: themeColor.violet?.[4],
  N: themeColor.teal?.[4],
  S: themeColor.lime?.[4],
  T: themeColor.blue?.[4],
  F: themeColor.pink?.[4],
  J: themeColor.indigo?.[4],
  P: themeColor.yellow?.[4],
};

export const MBTI_TYPE_COLORS: { [key: string]: string } = {
  INTJ: "#4A235A", // 진한 보라색
  INTP: "#5B2C6F", // 보라색
  ENTJ: "#922B21", // 진한 적색
  ENTP: "#76448A", // 어두운 보라색
  INFJ: "#1F618D", // 진한 파란색
  INFP: "#AF7AC5", // 연보라색
  ENFJ: "#1ABC9C", // 진한 민트색
  ENFP: "#F5B041", // 금색
  ISTJ: "#839192", // 회색
  ISFJ: "#A9CCE3", // 하늘색
  ESTJ: "#E6B0AA", // 연분홍색
  ESFJ: "#A3E4D7", // 연민트색
  ISTP: "#3498DB", // 밝은 파란색
  ISFP: "#F7DC6F", // 밝은 노란색
  ESTP: "#AED6F1", // 페이스트 블루
  ESFP: "#F1948A", // 연한 코랄
  XXXX: "#945353",
};

export const MBTI_TYPE_COLORS_PAIRS: { [key: string]: string } = {
  // INTJ와 ESFP의 색상을 교환
  INTJ: "#F1948A", // 연한 코랄 (원래 ESFP)
  ESFP: "#4A235A", // 진한 보라색 (원래 INTJ)

  // INTP와 ESFJ의 색상을 교환
  INTP: "#A3E4D7", // 연민트색 (원래 ESFJ)
  ESFJ: "#5B2C6F", // 보라색 (원래 INTP)

  // ENTJ와 ISFP의 색상을 교환
  ENTJ: "#F7DC6F", // 밝은 노란색 (원래 ISFP)
  ISFP: "#922B21", // 진한 적색 (원래 ENTJ)

  // ENTP와 ISFJ의 색상을 교환
  ENTP: "#A9CCE3", // 하늘색 (원래 ISFJ)
  ISFJ: "#76448A", // 어두운 보라색 (원래 ENTP)

  // INFJ와 ESTP의 색상을 교환
  INFJ: "#AED6F1", // 페이스트 블루 (원래 ESTP)
  ESTP: "#1F618D", // 진한 파란색 (원래 INFJ)

  // INFP와 ESTJ의 색상을 교환
  INFP: "#E6B0AA", // 연분홍색 (원래 ESTJ)
  ESTJ: "#AF7AC5", // 연보라색 (원래 INFP)

  // ENFJ와 ISTP의 색상을 교환
  ENFJ: "#3498DB", // 밝은 파란색 (원래 ISTP)
  ISTP: "#1ABC9C", // 진한 민트색 (원래 ENFJ)

  // ENFP와 ISTJ의 색상을 교환
  ENFP: "#839192", // 회색 (원래 ISTJ)
  ISTJ: "#F5B041", // 금색 (원래 ENFP)

  XXXX: "#945353",
};
