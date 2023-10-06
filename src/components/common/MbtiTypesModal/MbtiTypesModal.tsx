import { useEffect, useState } from "react";
import { ModalBg, ModalWrap, MbtiButton, MbtiLabel, MbtiList, Toggle } from "./MbtiTypesModal.styles";

// MBTI 선택 모달
const MbtiTypesModal = ({
  selectMbti,
  onThisMbti,
  isButton,
  onThisConfirm = () => {},
}: {
  selectMbti: string[];
  onThisMbti: (value: string[]) => void;
  isButton: boolean;
  onThisConfirm?: () => void;
}) => {
  const [mbti_IE, setMbti_IE] = useState(selectMbti[0]);
  const [mbti_NS, setMbti_NS] = useState(selectMbti[1]);
  const [mbti_FT, setMbti_FT] = useState(selectMbti[2]);
  const [mbti_PJ, setMbti_PJ] = useState(selectMbti[3]);

  useEffect(() => {
    onThisMbti([mbti_IE, mbti_NS, mbti_FT, mbti_PJ]);
  }, [mbti_IE, mbti_NS, mbti_FT, mbti_PJ, onThisMbti]);

  return (
    <ModalWrap>
      <h3 className="text-2xl font-black text-center">MBTI 선택</h3>
      <ul>
        <MbtiList>
          <Toggle className={mbti_IE === "I" ? "left" : "right"} />
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_IE"
              id="I"
              className="hidden"
              checked={mbti_IE === "I"}
              onChange={(evt) => {
                setMbti_IE(evt.target.id);
              }}
            />
            <MbtiLabel htmlFor="I" className={mbti_IE === "I" ? "active" : ""}>
              I
            </MbtiLabel>
          </div>
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_IE"
              id="E"
              className="hidden"
              checked={mbti_IE === "E"}
              onChange={(evt) => {
                setMbti_IE(evt.target.id);
              }}
            />
            <MbtiLabel htmlFor="E" className={mbti_IE === "E" ? "active" : ""}>
              E
            </MbtiLabel>
          </div>
        </MbtiList>
        <MbtiList>
          <Toggle className={mbti_NS === "N" ? "left" : "right"} />
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_NS"
              id="N"
              className="hidden"
              checked={mbti_NS === "N"}
              onChange={(evt) => setMbti_NS(evt.target.id)}
            />
            <MbtiLabel htmlFor="N" className={mbti_NS === "N" ? "active" : ""}>
              N
            </MbtiLabel>
          </div>
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_NS"
              id="S"
              className="hidden"
              checked={mbti_NS === "S"}
              onChange={(evt) => setMbti_NS(evt.target.id)}
            />
            <MbtiLabel htmlFor="S" className={mbti_NS === "S" ? "active" : ""}>
              S
            </MbtiLabel>
          </div>
        </MbtiList>
        <MbtiList>
          <Toggle className={mbti_FT === "F" ? "left" : "right"} />
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_FT"
              id="F"
              className="hidden"
              checked={mbti_FT === "F"}
              onChange={(evt) => setMbti_FT(evt.target.id)}
            />
            <MbtiLabel htmlFor="F" className={mbti_FT === "F" ? "active" : ""}>
              F
            </MbtiLabel>
          </div>
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_FT"
              id="T"
              className="hidden"
              checked={mbti_FT === "T"}
              onChange={(evt) => setMbti_FT(evt.target.id)}
            />
            <MbtiLabel htmlFor="T" className={mbti_FT === "T" ? "active" : ""}>
              T
            </MbtiLabel>
          </div>
        </MbtiList>
        <MbtiList>
          <Toggle className={mbti_PJ === "P" ? "left" : "right"} />
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_PJ"
              id="P"
              className="hidden"
              checked={mbti_PJ === "P"}
              onChange={(evt) => setMbti_PJ(evt.target.id)}
            />
            <MbtiLabel htmlFor="P" className={mbti_PJ === "P" ? "active" : ""}>
              P
            </MbtiLabel>
          </div>
          <div className="flex-1 text-center">
            <input
              type="radio"
              name="mbti_PJ"
              id="J"
              className="hidden"
              checked={mbti_PJ === "J"}
              onChange={(evt) => setMbti_PJ(evt.target.id)}
            />
            <MbtiLabel htmlFor="J" className={mbti_PJ === "J" ? "active" : ""}>
              J
            </MbtiLabel>
          </div>
        </MbtiList>
      </ul>
      {isButton && (
        <MbtiButton onClick={() => onThisConfirm()}>확인</MbtiButton>
      )}
    </ModalWrap>
  );
}

export { ModalBg };
export default MbtiTypesModal;

