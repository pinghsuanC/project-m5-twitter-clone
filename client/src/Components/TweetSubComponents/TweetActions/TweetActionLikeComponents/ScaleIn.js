import React from "react";
import { useSpring, animated } from "react-spring";

const ScaleIn = ({ children }) => {
  const scale = useSpring({
    transform: "scale(1)",
    from: {
      transform: "scale(0)",
    },
    config: {
      stiffness: 170,
      damping: 26,
      tension: 227,
      friction: 9,
    },
  });
  return <animated.div style={scale}>{children}</animated.div>;
};

export default ScaleIn;
