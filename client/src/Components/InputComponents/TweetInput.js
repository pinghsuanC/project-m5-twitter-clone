import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  Ava,
  MAX_LEN_INPUT,
  INPUT_INITIAL,
} from "../../Util/constants";
import { useHistory } from "react-router-dom";
import "../../GlobalStyles.css";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import { HandlerContext } from "../../Context/HandlerContext";
// component for the homefeed input
// requirement: input counts

const addTweetHandler = (inputValue) => {
  //console.log(`${inputValue}`);
  fetch("/api/tweet", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: `${inputValue}` }),
  })
    .then((info) => info.json())
    .then((info) => console.log(info));
};

const TweetInputs = ({ refresh }) => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  const [numInputLeft, setNumInputLeft] = useState(MAX_LEN_INPUT);
  const [inputValue, setInputValue] = useState(INPUT_INITIAL);
  const { buttonDown, buttonUp } = React.useContext(HandlerContext);

  //console.log(currentUser);
  useEffect(() => {
    let i = inputValue.length;
    setNumInputLeft(MAX_LEN_INPUT - i);
  }, [inputValue]);

  return (
    status === "idle" && (
      <TweetInputsWrapper>
        <TweetInputsInnerWrapper>
          <Ava src={currentUser.profile.avatarSrc} />
          <TweetInputsInput
            value={inputValue}
            onChange={(ev) => {
              setInputValue(ev.target.value);
            }}
            placeholder="What's happening? Σ:3"
          />
        </TweetInputsInnerWrapper>
        <TweetInputsInnerWrapper_down>
          <TweetInputCount t={numInputLeft}>
            {numInputLeft}&nbsp;&nbsp;
          </TweetInputCount>
          <TweetInputBtn
            onMouseDown={(ev) => {
              buttonDown(ev);
            }}
            onMouseUp={(ev) => {
              if (ev.button === 0) {
                ev.target.style.background = COLORS.primary;
              }
            }}
            onClick={() => {
              if (inputValue && numInputLeft >= 0) {
                // send to server
                addTweetHandler(inputValue);
                // reset value
                setInputValue(INPUT_INITIAL);
                // refresh home
                refresh(true);
              }
            }}
          >
            MEOW
          </TweetInputBtn>
        </TweetInputsInnerWrapper_down>
      </TweetInputsWrapper>
    )
  );
};

const TweetInputsWrapper = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 3px solid gray;

  display: flex;
  flex-direction: column;
`;
const TweetInputCount = styled.div`
  font-size: 0.8em;
  color: ${(prop) => {
    if (prop.t <= 0) {
      return COLORS.inCount_third;
    } else if (prop.t < Math.floor(0.2 * MAX_LEN_INPUT) && prop.t > 0) {
      return COLORS.inCount_second;
    } else {
      return COLORS.inCount_first;
    }
  }};
`;
const TweetInputsInnerWrapper = styled.div`
  height: 160px;
  margin: 13px;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
`;
const TweetInputsInnerWrapper_down = styled.div`
  position: absolute;
  top: 100px;
  right: 10%;
  height: 100px;
  margin: 0px;
  margin-top: 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TweetInputsInput = styled.textarea`
  padding: 5px;
  font-size: 1.1em;
  width: 80%;
  height: 80px;
  margin-left: 20px;
  resize: none;
  border-radius: 10px;
  :focus {
    outline: none;
  }
  // setup scroll and hide the scroll bar!
  overflow-y: scroll;
  -ms-overflow-style: scroll; /* Internet Explorer 10+ */
  //scrollbar-width: none; /* Firefox */
  //::-webkit-scrollbar {
  //  display: none; /* Safari and Chrome */
  //}
`;
const TweetInputBtn = styled.button`
  width: 120px;
  min-height: 50px;
  border-radius: 30px;
  background: ${COLORS.primary};
  color: white;
  font-size: 1.3em;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default TweetInputs;
