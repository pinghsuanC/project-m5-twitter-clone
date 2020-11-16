import React from "react";
import styled, { keyframes } from "styled-components";
const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

const Particle = ({ angle, distance, children }) => {
  const angleInRads = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRads) * 2 * (Math.random() * distance + 2);
  const y = Math.sin(angleInRads) * 2 * (Math.random() * distance + 2);

  //console.log(x, y);
  const spread = keyframes`
    from{
        left: 0px;
        top: 0px;
        
    }to{
        left: ${x}px;
        top: ${y}px;
    }
  `;
  const shade = keyframes`
    from{
        left: ${x}px;
        top: ${y}px;
    }to{
        left: ${x - 4}px;
        top: ${y - 4}px;
    }
  `;
  const fade = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }`;

  return (
    <Wrapper ani_spread={spread} ani_fade={fade} ani_shade={shade}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  animation: ${(prop) => prop.ani_spread} 1s ease forwards,
    ${(prop) => prop.ani_shade} 2s ease; //${(prop) => prop.ani_fade} 4s ease;
  //animation-delay: 0s, 1s, 1s;
`;
export default Particle;
