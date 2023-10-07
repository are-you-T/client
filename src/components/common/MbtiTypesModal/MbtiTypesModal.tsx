import { useState } from "react";
import {
  ModalBg,
  ModalWrap,
  MbtiButton,
  MbtiLabel,
  MbtiList,
  Toggle
} from "./MbtiTypesModal.styles";

interface MbtiTypesModalProps {
  isButton: boolean;
  defaultMbti: string[];
  onCloseModal: (evt: React.MouseEvent<HTMLDivElement>) => void;
  onSelectMbti: (selectedMbti: string[]) => void;
}

const mbtiTypes = ["I", "E", "N", "S", "F", "T", "P", "J"];

const MbtiTypesModal = ({
  isButton,
  defaultMbti,
  onCloseModal,
  onSelectMbti
}: MbtiTypesModalProps) => {
  const [selectedMbti, setSelectedMbti] = useState(defaultMbti);

  const activeMapper = (mbtiChar: string) => {
    if (selectedMbti.includes(mbtiChar)) {
      return "active";
    }

    return "";
  };

  const handleChangeMbti = (idx: number, mbtiType: string) => {
    if (selectedMbti.includes(mbtiType)) return;

    const changedMbti = [...selectedMbti];
    changedMbti[idx] = mbtiType;
    setSelectedMbti(changedMbti);
  };

  return (
    <ModalBg onClick={onCloseModal}>
      <ModalWrap>
        <h3 className="text-2xl font-black text-center">MBTI 선택</h3>
        <ul>
          {selectedMbti.map((_, idx) => {
            const leftType = mbtiTypes[idx * 2],
              rightType = mbtiTypes[idx * 2 + 1];

            return (
              <MbtiList>
                <Toggle
                  className={selectedMbti.includes(leftType) ? "left" : "right"}
                />
                <div className="flex-1 text-center">
                  <input
                    type="radio"
                    id={leftType}
                    className="hidden"
                    onChange={() => handleChangeMbti(idx, leftType)}
                  />
                  <MbtiLabel
                    htmlFor={leftType}
                    className={activeMapper(leftType)}
                  >
                    {leftType}
                  </MbtiLabel>
                </div>
                <div className="flex-1 text-center">
                  <input
                    type="radio"
                    id={rightType}
                    className="hidden"
                    onChange={() => handleChangeMbti(idx, rightType)}
                  />
                  <MbtiLabel
                    htmlFor={rightType}
                    className={activeMapper(rightType)}
                  >
                    {rightType}
                  </MbtiLabel>
                </div>
              </MbtiList>
            );
          })}
        </ul>
        {isButton && (
          <MbtiButton onClick={() => onSelectMbti(selectedMbti)}>
            확인
          </MbtiButton>
        )}
      </ModalWrap>
    </ModalBg>
  );
};

export default MbtiTypesModal;
