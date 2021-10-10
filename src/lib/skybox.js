import { CubeTextureLoader } from "three";
import { NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

const skyBox = (onLoad, loadeds, dispatch, action) => {
  const loader = new CubeTextureLoader().load(
    // [
    //   "SpaceboxCollection/Spacebox/LightGreen_right1.png",
    //   "SpaceboxCollection/Spacebox/LightGreen_left2.png",

    //   "SpaceboxCollection/Spacebox/LightGreen_top3.png",
    //   "SpaceboxCollection/Spacebox/LightGreen_bottom4.png",

    //   "SpaceboxCollection/Spacebox/LightGreen_front5.png",
    //   "SpaceboxCollection/Spacebox/LightGreen_back6.png",
    // ],
    [
      "images/white.png",
      "images/white.png",
      "images/white.png",
      "images/white.png",
      "images/white.png",
      "images/white.png",
    ],
    () => {
      loadeds.push("textures");
      dispatch(action("Textures done"));
      if (loadeds.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) onLoad();
    }
  );

  return loader;
};

export default skyBox;
