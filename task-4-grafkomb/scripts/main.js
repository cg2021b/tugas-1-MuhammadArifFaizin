/*
    Orbit Controls [Done]
    Texture [Done]
    Controls [Done]
*/

import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";

import { getRandomInt } from "./utils.js";
import { DegRadHelper, StringToNumberHelper, wrapModes } from "./helper.js";

let scene, camera, renderer, controls;
let canvasDOM;
let geometries = [];

const BG_COLOR = 0x151515;
const LIGHT_COLOR = 0xffffff;

// Create Geometry Function
const createCube = (side, x, y, z) => {
  const loader = new THREE.TextureLoader();
  const geometry = new THREE.BoxGeometry(side, side, side);
  const texture = loader.load(
    "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
  );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);

  return cube;
};

// Generate Random Cube
const generateCube = () => {
  const obj = createCube(
    getRandomInt(2, 5),
    getRandomInt(-10, 10),
    getRandomInt(-10, 10),
    getRandomInt(0, 10)
  );

  geometries.push(obj);
  scene.add(obj);
};

const main = () => {
  canvasDOM = document.getElementById("myCanvas");
  // Event Listener Function
  // On Windows Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // 1. Create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(BG_COLOR);

  // 2. Create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Add the light
  const pLight = new THREE.AmbientLight(LIGHT_COLOR, 1);
  pLight.position.set(20, 20, 30);
  scene.add(pLight);

  // 3. Create an locate the object on the scene
  // Loop with geometryData
  for (let i = 0; i < 10; i++) {
    generateCube();
  }

  camera.position.set(15, 10, 20);

  // 4. Create the renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvasDOM, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional

  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  // Controls
  const gui = new GUI();
  gui.add(controls, "autoRotate").name("controls.autoRotate").listen();
  gui.add(controls, "enableDamping").name("controls.enableDamping").listen();
  gui.add(controls, "dampingFactor", 0, 0.1).name("controls.dampingFactor");

  // Set the Event Listener
  window.addEventListener("resize", onWindowResize);
};

const mainLoop = () => {
  renderer.render(scene, camera);

  controls.update();
  requestAnimationFrame(mainLoop);
};

document.addEventListener("DOMContentLoaded", () => {
  main();
  mainLoop();
});
