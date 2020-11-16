import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { ERROR_PATH } from "../Util/constants";

const CurrentUserContext = React.createContext(null);
const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { ...state, currentUser: action.info, status: "idle" };
    default:
      throw { ...state, currentUser: action.info, status: "fail" };
  }
};
const CurrentUserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = React.useState(null);
  //const [status, setStatus] = React.useState("loading");
  // Want to try useReducer thereore switched
  const initialState = { currentUser: null, status: "loading" };
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  //console.log(state);
  // Fetch the user data from the API (api/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`

  useEffect(() => {
    fetch("/api/me/profile")
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          dispatch({ info: data, type: "success" });
        } else {
          dispatch({ info: data, type: "fail" });
        }
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={{ ...state }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext };
