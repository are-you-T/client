import tw from "twin.macro";

type NumButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const NumButton: React.FC<NumButtonProps> = ({
  isActive,
  onClick,
  children
}) => (
  <button
    className={`join-item btn ${isActive ? "active bg-regal-purple" : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);
