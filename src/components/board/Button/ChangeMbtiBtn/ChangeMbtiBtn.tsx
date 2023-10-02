import { ChangeMbti } from "./ChangeMbtiBtn.styles";

interface ChangeMbtiBtnProps {
  setOpenMbtiModal: (value: boolean) => void;
}
export default function ChangeMbtiBtn({
  setOpenMbtiModal,
}: ChangeMbtiBtnProps) {
  return (
    <ChangeMbti
      onClick={() => {
        setOpenMbtiModal(true);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="47"
        fill="none"
      >
        <ellipse
          cx="23.536"
          cy="23.204"
          fill="#00B26E"
          rx="23.536"
          ry="23.204"
        />
        <path
          fill="#000"
          d="M19.024 18.303a6.762 6.762 0 0 1 9.523-.042l-1.741 1.737a1.016 1.016 0 0 0 .718 1.733H32.935c.562 0 1.014-.452 1.014-1.014v-5.41a1.016 1.016 0 0 0-1.733-.719l-1.758 1.758c-3.703-3.656-9.667-3.643-13.348.043a9.414 9.414 0 0 0-2.232 3.542 1.352 1.352 0 0 0 2.549.9 6.694 6.694 0 0 1 1.598-2.528Zm-5.363 7.148v5.41a1.016 1.016 0 0 0 1.733.718l1.758-1.758c3.703 3.656 9.667 3.644 13.348-.042a9.443 9.443 0 0 0 2.236-3.538 1.352 1.352 0 0 0-2.549-.9 6.693 6.693 0 0 1-1.597 2.527 6.762 6.762 0 0 1-9.523.043l1.737-1.742a1.016 1.016 0 0 0-.719-1.733h-5.41c-.562 0-1.014.453-1.014 1.015Z"
        />
      </svg>
    </ChangeMbti>
  );
}
