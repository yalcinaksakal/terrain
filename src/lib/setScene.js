import { Scene } from "three";
import { loadingActions } from "../store/loading-slice";

import myCam from "./camera";
import createPlane from "./createPlane";
import createLights from "./lights";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import skyBox from "./skybox";

const setScene = (parent, dispatch) => {
  const loadedContent = [];

  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //lights
  Object.values(createLights()).forEach(light => {
    scene.add(light);
  });

  //domEL
  const { domElement } = renderer;
  const appender = () => {
    parent.appendChild(domElement);
  };

  //add plane
  createPlane().then(plane => scene.add(plane));

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //animate
  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
  };

  //background, texture onLoad calls appender
  dispatch(loadingActions.setMsg("Loading textures"));
  scene.background = skyBox(
    appender,
    loadedContent,
    dispatch,
    loadingActions.setMsg
  );

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const keyDownHandler = ({ code }) => {};
  const keyUpHandler = ({ code }) => {};

  return {
    animate,
    onResize,
    keyDownHandler,
    keyUpHandler,
  };
};

export default setScene;
