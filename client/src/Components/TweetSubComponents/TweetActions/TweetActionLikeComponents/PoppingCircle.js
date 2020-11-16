import React from "react";
import styled, { keyframes } from "styled-components";

const PoppingCircle = ({ size, color }) => {
  return <Wrapper size={size} color={color}></Wrapper>;
};
const scale = keyframes`
  from {
    transform: "scaleX(0) scaleY(0)";
  }
  to {
    transform: "scaleX(1) scaleY(1)";
    
  }
`;
const fade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const Wrapper = styled.div`
  width: ${(prop) => `${prop.size}px`};
  height: ${(prop) => `${prop.size}px`};
  background-color: ${(prop) => prop.color};
  position: absolute;
  border-radius: 50%;
  z-index: 10;
  animation: ${scale} 900ms ease forwards, ${fade} 1500ms ease forwards;
`;
export default PoppingCircle;
