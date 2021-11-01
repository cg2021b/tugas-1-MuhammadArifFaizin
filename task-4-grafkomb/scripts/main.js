/*
    Orbit Controls [Done]
    Texture [Done]
    Controls [Done]
    Panorama [Done]
    Realistic Reflective [Done]
    Load Model [Done]
*/

import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";

import { getRandomInt } from "./utils.js";

let scene, camera, renderer, controls, sphereCamera;
let canvasDOM;
let geometries = [];

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
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    }
  );

  // 2. Create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Add the light
  const pLight = new THREE.HemisphereLight(LIGHT_COLOR, LIGHT_COLOR, 1);
  pLight.position.set(20, 20, 30);
  scene.add(pLight);

  // Add Fog
  const fogColor = 0xffffff; // white
  const fogNear = 10;
  const fogFar = 100;
  scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

  // 3. Create an locate the object on the scene
  // Loop with geometryData
  for (let i = 0; i < 10; i++) {
    generateCube();
  }

  // Load GLB object
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./models/WaterBottle.gltf", (gltf) => {
    const waterBottle = gltf.scene;
    waterBottle.scale.set(80, 80, 80);
    waterBottle.position.set(0, -20, 0);
    scene.add(waterBottle);
  });

  camera.position.set(15, 10, 20);

  // Realistic Reflective
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });

  sphereCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  sphereCamera.position.set(0, 0, -1);
  scene.add(sphereCamera);
  let sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: sphereCamera.renderTarget,
  });
  let sphereGeo = new THREE.SphereGeometry(4, 32, 16);
  let mirrorSphere = new THREE.Mesh(sphereGeo, sphereMaterial);
  mirrorSphere.position.set(0, 0, -1);
  scene.add(mirrorSphere);

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
  sphereCamera.update(renderer, scene);

  controls.update();
  requestAnimationFrame(mainLoop);
};

document.addEventListener("DOMContentLoaded", () => {
  main();
  mainLoop();
});
