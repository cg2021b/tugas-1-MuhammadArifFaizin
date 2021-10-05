import Scene from "./webgl/Scene.js";
import Ellipse from "./webgl/Ellipse.js";
import Vector3 from "./webgl/Vector3.js";
import Color from "./webgl/Color.js";

let scene;
let motion = new Vector3(0, 0, 0);
let speed = 0.006;

let objekKiri = () => [
  1.0,
  0.0,
  0.0,
  0.0, //
  0.0,
  1.0,
  0.0,
  0.0, //
  0.0,
  0.0,
  1.0,
  0.0, //
  0.0,
  0.0,
  0.0,
  1.0, //
];

let objekKanan = () => [
  1.0,
  0.0,
  0.0,
  0.0, //
  0.0,
  1.0,
  0.0,
  0.0, //
  0.0,
  0.0,
  1.0,
  0.0, //
  0.0,
  motion.y,
  0.0,
  1.0, //
];

const createGallon = (id, x, y, objMotion) => {
  const topGallons = [];
  for (let i = 0; i < 20; i++) {
    topGallons.push({
      _id: id,
      centerX: x,
      centerY: y + 0.3 - (i * (0.3 - 0.1)) / 20,
      centerZ: 0,
      radiusX: 6 + Math.pow(i * 0.15, 2),
      radiusY: 4 + (i * (12 - 4)) / 20,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.8 + (i * (0.84 - 0.8)) / 20, 1.0),
      motion: objMotion,
    });
  }

  const bottomGallons = [
    {
      _id: id,
      centerX: x,
      centerY: y + -0.3,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 1.0, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + -0.2,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.96, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + -0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.92, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + 0,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.88, 1.0),
      motion: objMotion,
    },
    {
      _id: id,
      centerX: x,
      centerY: y + 0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.84, 1.0),
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

  const gallon1 = createGallon(1, -0.5, 0, objekKiri());
  const gallon2 = createGallon(2, 0.5, 0, objekKanan());

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
      geometry.motionMatrix = objekKanan();
    }
  });

  scene.render();
}

function animate() {
  update();
  requestAnimationFrame(animate);
}

window.onload = main();
