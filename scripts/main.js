import Scene from "./webgl/Scene.js";
import Geometry from "./webgl/Geometry.js";
import Vector3 from "./webgl/Vector3.js";
import Face from "./webgl/Face.js";

let scene;

const drawCircle = (centerX, centerY, centerZ, radius, numberOfSides) => {
  let geometry = new Geometry();
  const numberOfVertices = numberOfSides + 2;

  let circleVerticesX = [];
  let circleVerticesY = [];
  let circleVerticesZ = [];

  circleVerticesX.push(centerX);
  circleVerticesY.push(centerY);
  circleVerticesZ.push(centerZ);

  for (let i = 1; i < numberOfVertices; i++) {
    circleVerticesX.push(
      centerX + 0.01 * radius * Math.cos((2 * i * Math.PI) / numberOfSides)
    );
    circleVerticesY.push(
      centerY + 0.01 * radius * Math.sin((2 * i * Math.PI) / numberOfSides)
    );
    circleVerticesZ.push(centerZ);
  }

  for (let i = 0; i < numberOfVertices; i++) {
    geometry.addVertice(
      new Vector3(circleVerticesX[i], circleVerticesY[i], circleVerticesZ[i])
    );
  }

  return geometry;
};

function main() {
  const canvas = document.getElementById("myCanvas");
  scene = new Scene(canvas);

  const circles = [
    {
      centerX: 0,
      centerY: 0.5,
      centerZ: 0,
      radius: 5,
      numberOfSides: 120,
    },
    {
      centerX: 0,
      centerY: 0.1,
      centerZ: 0,
      radius: 22,
      numberOfSides: 120,
    },
    {
      centerX: 0,
      centerY: -0.05,
      centerZ: 0,
      radius: 22,
      numberOfSides: 120,
    },
    {
      centerX: 0,
      centerY: -0.2,
      centerZ: 0,
      radius: 22,
      numberOfSides: 120,
    },
    {
      centerX: 0,
      centerY: -0.35,
      centerZ: 0,
      radius: 22,
      numberOfSides: 120,
    },
    {
      centerX: 0,
      centerY: -0.5,
      centerZ: 0,
      radius: 22,
      numberOfSides: 120,
    },
  ];

  circles.forEach((item) => {
    const circle = drawCircle(
      item.centerX,
      item.centerY,
      item.centerZ,
      item.radius,
      item.numberOfSides
    );
    circle.addFace(new Face(0, item.numberOfSides + 1));

    scene.add(circle);
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
