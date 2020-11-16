import React from "react";
import { COLORS } from "../Util/constants";
const HandlerContext = React.createContext(null);

const HandlerContextProvider = ({ children }) => {
  function buttonDown(ev) {
    if (ev.button === 0) {
      ev.target.style.background = COLORS.primary_clicked;
    }
  }
  function buttonUp(ev) {
    if (ev.button === 0) {
      ev.target.style.background = COLORS.primary;
    }
  }

  return (
    <HandlerContext.Provider value={{ buttonDown, buttonUp }}>
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerContextProvider };
