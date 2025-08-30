import { themeColor } from "@/styles/color";
import { Flex } from "@mantine/core";

interface CharacterProps {
  color?: string;
  bgColor?: string;
}

export const Character = ({
  color = "#78D9EE",
  bgColor = themeColor.violet[2],
}: CharacterProps) => {
  return (
    <Flex w="100%" justify="center">
      <svg
        viewBox="0 0 420 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse cx="210" cy="401.5" rx="325" ry="401.5" fill={bgColor} />
        <rect x="70" y="150" width="280" height="20" rx="9.71429" fill={color} />
        <ellipse cx="270" cy="162" rx="53.2958" ry="51" fill={color} />
        <ellipse cx="270" cy="161.393" rx="38.7029" ry="37.0357" fill="black" />
        <ellipse cx="258" cy="148.036" rx="12.055" ry="11.5357" fill="white" />
        <ellipse cx="243" cy="163.821" rx="5.71027" ry="5.46429" fill="white" />
        <ellipse cx="150" cy="162" rx="53.2958" ry="51" fill={color} />
        <ellipse cx="150" cy="161.393" rx="38.7029" ry="37.0357" fill="black" />
        <ellipse cx="138" cy="148.036" rx="12.055" ry="11.5357" fill="white" />
        <ellipse cx="123" cy="163.821" rx="5.71027" ry="5.46429" fill="white" />
        <ellipse cx="210" cy="228.5" rx="16.1978" ry="15.5" fill="black" />
        <ellipse cx="280" cy="236.553" rx="19.2776" ry="18.4472" fill="white" />
        <path
          d="M278.218 202.838C278.996 201.549 280.865 201.549 281.643 202.838L297.975 229.908C298.779 231.241 297.819 232.941 296.263 232.941H263.598C262.041 232.941 261.081 231.241 261.885 229.908L278.218 202.838Z"
          fill="white"
        />
      </svg>
    </Flex>
  );
};

export default Character;
