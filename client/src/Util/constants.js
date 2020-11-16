// No one is allowed to modify the variables in here.//

// Since there are many colors/icons/parameters to use across all places I devided to add them as global variables
// However since it's pron to threading issues sometimes it's better to use context.
// BUT this is more convenient in this case since I want uniform color scheme and namings.etc
// and be able to change things by a single file :3
// if there are different themes, it's bettter to use context

import {
  BsFillBookmarkFill as IconBookmark,
  BsFillBellFill as IconBell,
  BsFillPersonFill as IconUser,
  BsFillHouseDoorFill as IconHouse,
  BsArrowRepeat as IconRetweet,
  BsChat as IconComment,
  //BsHeart as IconLike, // BsFillHeartFill?    => using the heart from the last work shop for animation
  BsBoxArrowUp as IconShare,
  BsArrowLeft as IconBack,
  BsGeo as IconLocate,
  BsCalendar as IconDate,
  BsXOctagonFill as IconError,
} from "react-icons/bs";
import { GiWhiteCat as IconCat } from "react-icons/gi";
import styled from "styled-components";

export const COLORS = {
  // Bright purple:
  primary: "rgba(77, 0, 255, 1)",
  primary_reduced_opacity: "rgba(77, 0, 255, 0.1)",
  primary_clicked: "rgba(0, 110, 255, 1)",
  faint_gray: "#F0F0F0",
  light_gray: "#DCDCDC",
  // colors for actions
  retweet_blue: "rgb(88, 223, 253)",
  like_red: "rgb(251, 79, 27)",
  comment_green: "rgb(134, 229, 116)",
  action_default: "black",
  // colors for input counts
  inCount_first: "gray",
  inCount_second: "rgba(178, 187, 7, 1)",
  inCount_third: "rgba(224, 16, 16, 1)",
};

export const LOGOS = {
  IconCat,
  IconBookmark,
  IconBell,
  IconUser,
  IconHouse,
  IconRetweet,
  IconComment,
  //IconLike,
  IconShare,
  IconBack,
  IconLocate,
  IconDate,
  IconError,
};
export const Ava = styled.img`
  min-width: 60px;
  min-height: 60px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;
export const Ava_large = styled.img`
  min-width: 120px;
  min-height: 120px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;
export const MAX_LEN_INPUT = 200;
export const INPUT_INITIAL = "";
export const tweetAction_iconSize = "20px";
export const ERROR_PATH = "/error/errprpage";
