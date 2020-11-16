import "./GlobalStyles.css";
import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./Components/Bookmarks";
import HomeFeed from "./Components/HomeFeed";
import Notificatoins from "./Components/Notifications";
import Profile from "./Components/Profile";
import Sidebar from "./Components/Sidebar";
import Tweet from "./Components/Tweet";
import ErrorPage from "./Components/ErrorPage";
import { COLORS, LOGOS } from "./Util/constants";
import { CurrentUserProvider } from "./Context/CurrentUserContext";
import { HandlerContextProvider } from "./Context/HandlerContext";

const App = () => {
  return (
    <APP_Wrapper>
      <Router>
        <CurrentUserProvider>
          <HandlerContextProvider>
            <Sidebar />
            <Switch>
              <Route exact path="/notifications" component={Notificatoins} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              {/*Not sure if this will fail! Since I am not allowed to pass down parameters here*/}
              <Route exact path="/tweet/:tweetId" component={Tweet} />
              <Route exact path="/:profileId" component={Profile} />
              <Route exact path="/error/errprpage" component={ErrorPage} />
              <Route exact path="/" component={HomeFeed} />
            </Switch>
          </HandlerContextProvider>
        </CurrentUserProvider>
      </Router>
    </APP_Wrapper>
  );
};
export default App;

const APP_Wrapper = styled.div`
  //background: lightblue;
  margin-left: 10vw;
  margin-right: 10vw;
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-left: 1px solid ${COLORS.light_gray};
  border-right: 1px solid ${COLORS.light_gray};
`;
