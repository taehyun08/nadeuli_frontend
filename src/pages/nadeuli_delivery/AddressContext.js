import React, { createContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addressState, setAddressState] = useState({
    departure: "",
    arrival: "",
  });

  return (
    <AddressContext.Provider value={{ addressState, setAddressState }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
