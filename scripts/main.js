import Scene from "./webgl/Scene.js";
import Ellipse from "./webgl/Ellipse.js";
import Vector3 from "./webgl/Vector3.js";
import Color from "./webgl/Color.js";

let scene;
let motion = new Vector3(0.0, 0.0, 0.0);
let speed = 0.006;

const createGallon = (id, x, y, objMotion) => {
  let topGallons = [];
  const numLoop = 10;
  for (let i = 0; i < numLoop; i++) {
    topGallons.push({
      _id: id,
      centerX: x,
      centerY: y + 0.32 - (i * (0.3 - 0.1)) / numLoop,
      centerZ: 0,
      radiusX: 6 + Math.pow(i * 0.15, 2),
      radiusY: 4 + (i * (12 - 4)) / numLoop,
      numberOfSides: 30,
      uniformColors: new Color(
        153 / 255,
        220 / 255,
        249 + (i * (255 - 249)) / (255 * numLoop),
        1.0
      ),
      motion: objMotion,
    });
  }
  topGallons.push({
    _id: id,
    centerX: x,
    centerY: y + 0.32,
    centerZ: 0,
    radiusX: 4,
    radiusY: 2,
    numberOfSides: 30,
    uniformColors: new Color(249 / 255, 249 / 255, 237 / 255, 1.0),
    motion: objMotion,
  });

  const bottomGallons = [
    {
      _id: id,
      centerX: x,
      centerY: y + -0.3,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 30,
      uniformColors: new Color(153 / 255, 220 / 255, 249 / 255, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + -0.2,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 30,
      uniformColors: new Color(173 / 255, 234 / 255, 255 / 225, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + -0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 30,
      uniformColors: new Color(153 / 255, 220 / 255, 249 / 255, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + 0,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 30,
      uniformColors: new Color(173 / 255, 234 / 255, 255 / 225, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + 0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 30,
      uniformColors: new Color(153 / 255, 220 / 255, 249 / 255, 1.0),
      motion: objMotion,
    },
  ];

  return [...bottomGallons, ...topGallons];
};

function main() {
  const canvas = document.getElementById("myCanvas");
  scene = new Scene(canvas);

  const bgColor = new Color(249 / 255, 249 / 255, 237 / 255, 1.0);
  scene.setBgColor(bgColor);

  const gallon1 = createGallon(1, -0.5, 0, new Vector3(0.0, 0.0, 0.0));
  const gallon2 = createGallon(2, 0.5, 0, new Vector3(0.0, motion.y, 0.0));

  const gallons = [...gallon1, ...gallon2];

  gallons.forEach((item) => {
    const ellipse = new Ellipse(
      item._id,
      new Vector3(item.centerX, item.centerY, item.centerZ),
      item.uniformColors,
      item.motion,
      item.radiusX,
      item.radiusY,
      item.numberOfSides
    );

    scene.addGeometry(ellipse);
  });

  //   scene.render();

  animate();
}

function update() {
  if (motion.y >= 0.6 || motion.y <= -0.6) speed = -speed;

  motion.y += speed;

  scene.getGeometries().forEach((geometry) => {
    if (geometry.getId() === 2) {
      geometry.motion = new Vector3(0.0, motion.y, 0.0);
    }
  });

  scene.render();
}

function animate() {
  update();
  requestAnimationFrame(animate);
}

window.onload = main();
