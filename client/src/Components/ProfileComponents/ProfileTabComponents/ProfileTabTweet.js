import React from "react";
import styled from "styled-components";
import "../../../GlobalStyles.css";
import Tweet from "../../Tweet";
import Loading from "../../Loading";

const ProfileTabTweet = ({ input, type }) => {
  return (
    <>
      {input ? (
        <TweetWrapper>
          {type === "tweet" &&
            input.map((ele) => {
              //console.log(ele);
              return (
                <Tweet
                  key={`profile-feed-${ele.id}`}
                  type="small"
                  input={ele}
                />
              );
            })}
        </TweetWrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};
const TweetWrapper = styled.div``;

export default ProfileTabTweet;
