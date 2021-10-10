import {
  PlaneGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh,
  // Vector2,
} from "three";
import { DEGREE } from "../config/content";
import heightMap from "./heightMap";

//Plane
let plane;
/*
const modifyVertices = positions => {
  for (let i = 0; i < positions.length; i += 3) {
    //modify height
    positions[i + 2] = Math.ceil(Math.random() * 150) - 75;
  }
};
const modifyVerticesWithBump = positions => {
  let dist, height;
  const zeroVector = new Vector2(0, 0);
  for (let i = 0; i < positions.length; i += 3) {
    //modify height
    dist = zeroVector.distanceTo(new Vector2(positions[i], positions[i + 1]));
    height = 1 - dist / 1768;
    height = height * height * height * (height * (height * 6 - 15) + 10);
    positions[i + 2] = height * 1500;
  }
};
*/
const modifyVerticesWithHeightMap = async positions => {
  const map = await heightMap();
  let x, y, xf, yf, x1, y1, x2, y2, p11, p21, p12, p22;

  for (let i = 0; i < positions.length; i += 3) {
    //modify height,
    //plane 2500*2500
    //image 250*250

    x = positions[i] + 1250;
    y = positions[i + 1] + 1250;
    xf = 1 - x / 2500;
    yf = y / 2500;
    x1 = Math.floor(xf * 250);
    y1 = Math.floor(yf * 250);

    x2 = x1 + 1;
    y2 = y1 + 1;

    p11 = map[x1] ? (map[x1][y1] ? map[x1][y1] : 0) : 0;
    p21 = map[x2] ? (map[x2][y1] ? map[x2][y1] : 0) : 0;
    p12 = map[x1] ? (map[x1][y2] ? map[x1][y2] : 0) : 0;
    p22 = map[x2] ? (map[x2][y2] ? map[x2][y2] : 0) : 0;

    // positions[i + 2] = map[x] ? (map[x][y] ? map[x][y] * 4 : 0) : 0;

    // max height
    x = (p11 + p12 + p21 + p22) / 4;
    positions[i + 2] = x < 50 ? 0 : x;
  }
};
/*
const modifyVerticesWithNoise = positions => {
  let x, y, xf, yf, x1, y1, x2, y2, p11, p21, p12, p22;

  for (let i = 0; i < positions.length; i += 3) {
    //modify height,
    //plane 2500*2500
    //image 250*250

    x = positions[i] + 1250;
    y = positions[i + 1] + 1250;
    xf = 1 - x / 2500;
    yf = y / 2500;
    x1 = Math.floor(xf * 250);
    y1 = Math.floor(yf * 250);

    x2 = x1 + 1;
    y2 = y1 + 1;

    // positions[i + 2] = map[x] ? (map[x][y] ? map[x][y] * 4 : 0) : 0;

    // max height
    x = (p11 + p12 + p21 + p22) / 4;
    positions[i + 2] = x < 50 ? 0 : x;
  }
};
*/
const createPlane = async () => {
  plane = new Mesh(
    new PlaneGeometry(2500, 2500, 256, 256),
    new MeshStandardMaterial({
      color: "dodgerblue",
      // vertexColors: true,
      // transparent: true,
      // opacity: 0.5,
    })
  );

  plane.castShadow = true;
  plane.receiveShadow = true;
  plane.rotation.x = -90 * DEGREE;
  plane.material.side = DoubleSide;
  plane.position.set(0, 0, 0);

  await modifyVerticesWithHeightMap(plane.geometry.attributes.position.array);

  return plane;
};

export default createPlane;
