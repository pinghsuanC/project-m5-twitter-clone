import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "../../../../GlobalStyles.css";
import {
  COLORS,
  LOGOS,
  tweetAction_iconSize,
  ERROR_PATH,
} from "../../../../Util/constants";

const RetweetButton = ({ id, isRetweeted, numRetweets }) => {
  const history = useHistory();
  const [perRetweeted, setPerRetweeted] = useState(isRetweeted);
  const [perNRetweets, setPerNRetweets] = useState(numRetweets);

  //console.log(numRetweets);
  const handleRetweet = (id) => {
    fetch(`/api/tweet/${id}/retweet`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ retweet: !perRetweeted }),
    })
      .then((info) => info.json())
      .then((info) => {
        if (info.error) {
          console.log(info);
        } else {
          console.log(info.success);
          setPerRetweeted(!perRetweeted);
          if (perRetweeted) {
            setPerNRetweets(perNRetweets - 1);
          } else {
            setPerNRetweets(perNRetweets + 1);
          }
        }
      })
      .catch((err) => {
        history.push(ERROR_PATH);
      });
  };
  return (
    <RetweetButtonWrapper onClick={() => handleRetweet(id)}>
      <LOGOS.IconRetweet
        size={tweetAction_iconSize}
        color={perRetweeted ? COLORS.retweet_blue : COLORS.action_default}
      />
      &nbsp;&nbsp;{perNRetweets}
    </RetweetButtonWrapper>
  );
};

const RetweetButtonWrapper = styled.div``;

export default RetweetButton;
