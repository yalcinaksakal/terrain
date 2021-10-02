import { DirectionalLight, AmbientLight, PointLight } from "three";

const createLights = () => {
  //lights
  const light = new DirectionalLight(0xffffff);
  light.position.set(100, 100, 100);
  light.target.position.set(0, 200, 0);
  light.castShadow = true;
  light.shadow.bias = -0.01;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.camera.near = 1.0;
  light.shadow.camera.far = 500;
  light.shadow.camera.left = 200;
  light.shadow.camera.right = -200;
  light.shadow.camera.top = 200;
  light.shadow.camera.bottom = -200;

  // const plight = new PointLight("white", 1);
  // plight.position.set(-1000, 500, -500);
  // plight.castShadow = true;
  // const plight2 = new PointLight("red", 0.4);
  // plight2.position.set(100, 0, 0);

  return {
    directional: light,
    ambient: new AmbientLight(0x404040),
    // pointLight: plight,
  };
};

export default createLights;
