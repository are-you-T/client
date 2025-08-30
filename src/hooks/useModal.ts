import { createContext, useContext } from "react";

type ModalContextType = {
  openModal: (
    component: React.ReactNode,
    parameter: unknown,
    title: string,
    closeOnClickOutside?: boolean
  ) => Promise<unknown>;
  closeModal: (result: unknown) => void;
};

export const ModalContext = createContext<ModalContextType>({
  openModal: async () => undefined,
  closeModal: () => {},
});

export const useModal = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModal must be used within a ModalStackManager");
  }
  return modalContext;
};
