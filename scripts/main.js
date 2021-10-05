import Scene from "./webgl/Scene.js";
import Ellipse from "./webgl/Ellipse.js";
import Vector3 from "./webgl/Vector3.js";
import Color from "./webgl/Color.js";

let scene;

function main() {
  const canvas = document.getElementById("myCanvas");
  scene = new Scene(canvas);

  const ellipses = [
    {
      centerX: 0,
      centerY: -0.3,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 1.0, 1.0),
    },
    {
      centerX: 0,
      centerY: -0.2,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.96, 1.0),
    },
    {
      centerX: 0,
      centerY: -0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.92, 1.0),
    },
    {
      centerX: 0,
      centerY: 0,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.88, 1.0),
    },
    {
      centerX: 0,
      centerY: 0.1,
      centerZ: 0,
      radiusX: 22,
      radiusY: 12,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.84, 1.0),
    },
    {
      centerX: 0,
      centerY: 0.3,
      centerZ: 0,
      radiusX: 6,
      radiusY: 4,
      numberOfSides: 120,
      uniformColors: new Color(0.5, 0.5, 0.8, 1.0),
    },
  ];

  ellipses.forEach((item) => {
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

  //   animate();
}

function update() {
  scene.render();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

window.onload = main();
