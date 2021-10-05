import Scene from "./webgl/Scene.js";
import Ellipse from "./webgl/Ellipse.js";
import Vector3 from "./webgl/Vector3.js";
import Color from "./webgl/Color.js";

let scene;

const createGallon = (x, y) => {
  const topGallons = [];
  for (let i = 0; i < 20; i++) {
    topGallons.push({
      centerX: x,
      centerY: y + 0.3 - (i * (0.3 - 0.1)) / 20,
      centerZ: 0,
      radiusX: 6 + Math.pow(i * 0.15, 2),
      radiusY: 4 + (i * (12 - 4)) / 20,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.8 + (i * (0.84 - 0.8)) / 20, 1.0),
    });
  }

  const bottomGallons = [
    {
      centerX: x,
      centerY: y + -0.3,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 1.0, 1.0),
    },
    {
      centerX: x,
      centerY: y + -0.2,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.96, 1.0),
    },
    {
      centerX: x,
      centerY: y + -0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.92, 1.0),
    },
    {
      centerX: x,
      centerY: y + 0,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.88, 1.0),
    },
    {
      centerX: x,
      centerY: y + 0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.84, 1.0),
    },
  ];

  return [...bottomGallons, ...topGallons];
};

function main() {
  const canvas = document.getElementById("myCanvas");
  scene = new Scene(canvas);

  const bgColor = new Color(249 / 255, 249 / 255, 237 / 255, 1.0);
  scene.setBgColor(bgColor);

  const gallon1 = createGallon(-0.5, 0);
  const gallon2 = createGallon(0.5, 0);

  const gallons = [...gallon1, ...gallon2];

  gallons.forEach((item) => {
    const ellipse = new Ellipse(
      new Vector3(item.centerX, item.centerY, item.centerZ),
      item.radiusX,
      item.radiusY,
      item.numberOfSides,
      item.uniformColors
    );

    scene.addGeometry(ellipse);
  });

  scene.render();

  // animate();
}

function update() {
  scene.render();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

window.onload = main();
