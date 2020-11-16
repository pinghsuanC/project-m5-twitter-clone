import React from "react";
import styled from "styled-components";
import "../GlobalStyles.css";
import { LOGOS } from "../Util/constants";

const ErrorPage = () => {
  return (
    <ErrorPageWrapper>
      <div>{"Σ:<Σ:<Σ:<Σ:<Σ:<"}</div>
      <LOGOS.IconError />
      <div>Something bad happened... </div>
      <div>Please refresh and try again.</div>
      <div>{"Σ:<Σ:<Σ:<Σ:<Σ:<"}</div>
    </ErrorPageWrapper>
  );
};

const ErrorPageWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
export default ErrorPage;
