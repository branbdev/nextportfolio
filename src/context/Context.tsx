import React, { useState, createContext, ReactNode } from 'react';
import { PortfolioItem } from '../components/portfolioData';

interface ContextType {
  modal: boolean;
  modalValue: PortfolioItem | null;
  // eslint-disable-next-line no-unused-vars
  modalValueSet: (value: PortfolioItem) => void;
  close: () => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<PortfolioItem | null>(null);

  const modalValueSet = (value: PortfolioItem): void => {
    setModal(true);
    setModalValue(value);
  };

  const close = (): void => {
    setModal(false);
  };

  return (
    <Context.Provider
      value={{
        modal,
        modalValue,
        modalValueSet,
        close,
      }}>
      {children}
    </Context.Provider>
  );
};
