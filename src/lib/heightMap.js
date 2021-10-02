const heightMap = async () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = "images/ya.png";
  await image.decode();
  ctx.drawImage(image, 0, 0);
  let map = {},
    data;
  const width = image.width;
  const height = image.height;
  for (let x = 0; x < width - 1; x++) {
    map[x] = {};
    for (let y = 0; y < height - 1; y++) {
      data = ctx.getImageData(x, y, 1, 1).data;
      data = data[0] + data[1] + data[2];
      if (data) map[x][y] = Math.floor(data / 3);
    }
  }
  return map;
};

export default heightMap;
