import {
  PlaneGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh,
  Vector2,
} from "three";
import { DEGREE } from "../config/content";
import heightMap from "./heightMap";
import { math } from "./math.js";

//Plane
let plane;

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

const modifyVerticesWithHeightMap = async positions => {
  const map = await heightMap();
  let x, y;

  for (let i = 0; i < positions.length; i += 3) {
    //modify height
    x = Math.floor((positions[i] + 1250) / 10);
    y = Math.floor((positions[i + 1] + 1250) / 10);
    positions[i + 2] = map[x] ? (map[x][y] ? map[x][y] * 4 : 0) : 0;
  }
};

const createPlane = async () => {
  plane = new Mesh(
    new PlaneGeometry(2500, 2500, 256, 256),
    new MeshStandardMaterial({
      color: "dodgerblue",
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
