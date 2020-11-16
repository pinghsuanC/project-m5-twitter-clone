import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ERROR_PATH } from "../../../../Util/constants";
import styled from "styled-components";
import Heart from "./Heart";
import PoppingCircle from "./PoppingCircle";
import ScaleIn from "./ScaleIn";
import ConfettiPiece from "./ConfettiPiece";
const PARTICLE_COLORS = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#fb8c00"];
export const range = (n) => Array.from(Array(n).keys());

const LikeButton = ({ size, isLiked, numLiked, id }) => {
  const [liked, setLiked] = useState(isLiked);
  const [nLiked, setNLiked] = useState(numLiked);
  const history = useHistory();

  const handleLike = (id) => {
    fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: !liked }),
    })
      .then((info) => info.json())
      .then((info) => {
        if (info.status === 409) {
          console.log(info);
        } else {
          console.log(info.success);
          setLiked(!liked);
          if (liked) {
            setNLiked(nLiked - 1);
          } else {
            setNLiked(nLiked + 1);
          }
        }
      })
      .catch((err) => {
        history.push(ERROR_PATH);
      });
  };
  return (
    <Wrapper
      style={{ width: size, height: size }}
      onClick={() => {
        handleLike(id);
      }}
    >
      {/*<Heart width={heartSize} isToggled={isLiked} />*/}
      {liked ? (
        <InnerWrapper>
          {range(8).map((i) => (
            <ConfettiPiece
              key={i}
              angle={360 * (i / 15)}
              distance={20}
              color={
                PARTICLE_COLORS[
                  Math.floor(
                    Math.random(PARTICLE_COLORS.length) * PARTICLE_COLORS.length
                  )
                ]
              }
            />
          ))}
          <ScaleIn>
            <Heart height={size} width={size} isToggled={liked} />
            &nbsp;&nbsp;{nLiked}
          </ScaleIn>
        </InnerWrapper>
      ) : (
        <InnerWrapper size={size}>
          <Heart width={size} height={size} isToggled={liked} />
          &nbsp;&nbsp;{nLiked}
        </InnerWrapper>
      )}
    </Wrapper>
  );
};

const InnerWrapper = styled.div`
  width: auto;
  position: relative;
  max-height: ${(prop) => `${prop.size}px`};
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
