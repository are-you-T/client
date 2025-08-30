import React, { useState, useCallback, useMemo } from "react";
import { Modal, Portal } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "@/hooks/useModal";

type ModalProps = {
  id: string; // Unique identifier for each modal
  component: React.ReactNode; // Modal content
  parameter: unknown; // Parameters to pass to the modal
  opened: boolean; // Whether the modal is open
  title: string; // Title of the modal
  onClose: (result?: unknown) => void; // Callback when the modal closes
  closeOnClickOutside?: boolean; // Close modal on outside click
};

export const ModalStackManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalProps[]>([]);

  const openModal = useCallback(
    (
      component: React.ReactNode,
      parameter: unknown,
      title: string,
      closeOnClickOutside = false
    ): Promise<unknown> => {
      return new Promise<unknown>((resolve) => {
        const id = uuidv4();
        const modalProps: ModalProps = {
          id,
          component,
          parameter,
          onClose: resolve,
          title,
          opened: true,
          closeOnClickOutside,
        };
        setModalStack((prevStack) => [...prevStack, modalProps]);
      });
    },
    []
  );

  const closeModal = useCallback((result?: unknown) => {
    setModalStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;

      const updatedStack = [...prevStack];
      const currentModal = updatedStack.pop();
      if (currentModal) {
        currentModal.onClose(result);
      }
      return updatedStack;
    });
  }, []);

  const contextValue = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Portal>
        {modalStack.map((modalProps) => (
          <Modal
            opened={modalProps.opened}
            onClose={() => closeModal(null)}
            title={modalProps.title}
            centered
            size="auto"
            key={modalProps.id}
            closeOnClickOutside={!modalProps.closeOnClickOutside}
          >
            {modalProps.component}
          </Modal>
        ))}
      </Portal>
    </ModalContext.Provider>
  );
};
