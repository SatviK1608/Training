import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [sectionId, setSectionId] = useState(null);

  return (
    <UpdateContext.Provider
      value={{ update, setUpdate, id, setId, sectionId, setSectionId }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
