import React, { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const modalValueSet = (value) => {
    setModal(true);
    setModalValue(value);
  };

  const close = () => {
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
