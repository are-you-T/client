import {CommonButton} from './Button.styles';

interface ButtonProps {
  text: string;
}

export default function Button({text}: ButtonProps) {
  return (
    <CommonButton>
      {text}
    </CommonButton>
  );
}

