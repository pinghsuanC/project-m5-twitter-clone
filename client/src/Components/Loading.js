import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "../GlobalStyles.css";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import Tweet from "./Tweet";
import TweetInput from "./InputComponents/TweetInput";
export const range = (n) => Array.from(Array(n).keys());

const Loading = () => {
  return (
    <LoadingWrapper>
      <div>Σ:3 Σ:3 Σ:3 Σ:3 Σ:3</div>
      <BarWrapper>
        {range(5).map((ele) => {
          //console.log(ele);
          return <Bar key={`bar-${ele}`} t={`${ele + 1}s`} />;
        })}
      </BarWrapper>
      Please wait while we retrieve information for you
      <div>Σ:3 Σ:3 Σ:3 Σ:3 Σ:3</div>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  color: gray;
`;
const LoadingInnerWrapper = styled.div`
  position: static;
`;
const BarWrapper = styled.div`
  width: 100%;
  position: relative;
  left: 47%;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const colorChange = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Bar = styled.div`
  position: absolute;
  width: 30px;
  height: 2px;
  background: gray;
  animation: ${rotate} ${(prop) => prop.t} linear infinite;
`;

export default Loading;
