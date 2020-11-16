import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../GlobalStyles.css";
import { COLORS, LOGOS } from "../Util/constants";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { HandlerContext } from "../Context/HandlerContext";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

const large_icon_size = "100px";
const icon_size = "30px";

const Sidebar = () => {
  const { buttonDown, buttonUp } = React.useContext(HandlerContext);
  const { currentUser, status } = React.useContext(CurrentUserContext);
  console.log(currentUser, status);

  return status === "idle" ? (
    <Sidebar_Wrapper>
      <Div_icon>
        <LOGOS.IconCat size={large_icon_size} color={COLORS.primary} />
      </Div_icon>
      <Div>
        <Btn>
          <NavigationLink exact to="/">
            <LOGOS.IconHouse size={icon_size} />
            <Span></Span>Home
          </NavigationLink>
        </Btn>
        <Btn>
          <NavigationLink exact to={`/${currentUser.profile.handle}`}>
            <LOGOS.IconUser size={icon_size} />
            <Span></Span>Profile
          </NavigationLink>
        </Btn>
        <Btn>
          <NavigationLink exact to="/notifications">
            <LOGOS.IconBell size={icon_size} />
            <Span></Span>Notifications
          </NavigationLink>
        </Btn>
        <Btn>
          <NavigationLink exact to="/bookmarks">
            <LOGOS.IconBookmark size={icon_size} />
            <Span></Span>Bookmarks
          </NavigationLink>
        </Btn>
        <Btn_M
          onMouseDown={(ev) => {
            buttonDown(ev);
          }}
          onMouseUp={(ev) => {
            buttonUp(ev);
          }}
        >
          MEOW
        </Btn_M>
      </Div>
    </Sidebar_Wrapper>
  ) : status === "loading" ? (
    <Sidebar_Wrapper>
      <Loading />
    </Sidebar_Wrapper>
  ) : (
    <Sidebar_Wrapper>
      <ErrorPage />
    </Sidebar_Wrapper>
  );
};

export default Sidebar;

const Sidebar_Wrapper = styled.div`
  padding: 15px;
  min-width: 20%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${COLORS.faint_gray};
`;
const Span = styled.span`
  min-width: 20px;
`;
// this kinds of induced warning of "exact"
// see : https://github.com/styled-components/styled-components/issues/1198
const Btn = styled.button`
  min-height: 55px;
  line-height: ${icon_size};
  width: 100%;
  height: auto;
  background: none;
  border: none;
  font-size: 1em;

  :focus {
    outline: none;
  }
`;
const Btn_M = styled(Btn)`
  min-height: 55px;
  width: 80%;
  margin-top: 20px;
  background: ${COLORS.primary};
  border-radius: 30px;
  color: white;
  font-size: 1.5em;
  align-self: center;
  :hover {
    cursor: pointer;
  }
`;
const Div = styled.div`
  margin-top: 20px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Div_icon = styled.div``;
const NavigationLink = styled(NavLink)`
  /* default styles here */
  padding-left: 15px;
  line-height: 55px;
  text-decoration: none;
  color: black;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  :hover {
    background: ${COLORS.primary_reduced_opacity};
  }
  &.active {
    color: ${COLORS.primary};
    background-color: ${COLORS.primary_reduced_opacity};
  }
`;
