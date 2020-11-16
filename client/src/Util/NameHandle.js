import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../GlobalStyles.css";

const NameHandle = ({ nameHandle }) => {
  return (
    <NameLinkWrapper>
      <NameLink exact to={`/${nameHandle}`}>
        @{nameHandle}
      </NameLink>
    </NameLinkWrapper>
  );
};

export default NameHandle;

const NameLinkWrapper = styled.div``;
const NameLink = styled(Link)`
  border-bottom: 1px solid none;
  text-decoration: none;
  color: gray;
  z-index: 100;

  :hover {
    border-bottom: 1px solid gray;
    text-shadow: 1px 1px 0px rgba(150, 150, 150, 0.6);
  }
`;
