import React from "react";
import styled, { keyframes } from "styled-components";
import Particle from "./Particle";

const ConfettiPiece = ({ angle, distance, color }) => {
  const circum = Math.random() * 12 + 3;
  const shrink = keyframes`
    from{
        width: ${circum}px;
        height: ${circum}px;
    }to{
       width: 0px;
       height: 0px;
    }
  `;
  return (
    <CenteredInsideParent>
      <Particle angle={angle} distance={distance}>
        <Circle color={color} circum={circum} ani_shrink={shrink} />
      </Particle>
    </CenteredInsideParent>
  );
};

const CenteredInsideParent = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
`;
const Circle = styled.div`
  border-radius: 50%;
  background-color: ${(prop) => prop.color};
  animation: ${(prop) => prop.ani_shrink} 2s linear forwards;
`;
export default ConfettiPiece;
