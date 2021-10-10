import {
  DirectionalLight,
  AmbientLight,
  PointLight,
  // DirectionalLightHelper,
  // SpotLight,
  // PointLightHelper,
} from "three";

const createLights = () => {
  //lights
  const light = new DirectionalLight(0xffffff, 0.5);
  light.position.set(0, 100, 0);
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

  // const helper = new DirectionalLightHelper(light);

  const plight = new PointLight("green", 1, 2000);
  plight.position.set(0, -1200, 0);
  const plight2 = new PointLight("dodgerblue", 1, 1500);
  plight2.position.set(0, 1000, 0);
  // plight.castShadow = true;
  // const h2 = new PointLightHelper(plight, 50);
  // const plight2 = new PointLight("red", 0.4);
  // plight2.position.set(100, 0, 0);
  // const spotLight = new SpotLight("white");
  // spotLight.position.set(100, 3000, 100);

  // spotLight.castShadow = true;

  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;

  // spotLight.shadow.camera.near = 500;
  // spotLight.shadow.camera.far = 4000;
  // spotLight.shadow.camera.fov = 30;
  return {
    directional: light,
    // helper,
    ambient: new AmbientLight(0x404040, 0.3),
    // spotLight,
    pointLight: plight,
    // h2,
    plight2,
  };
};

export default createLights;
