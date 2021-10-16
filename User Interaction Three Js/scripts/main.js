import { getRandomInt } from "./utils.js";

let scene, canvas, camera, renderer, controls;
let groups = [],
  geometries = [];

const BG_COLOR = 0x151515;
const LIGHT_COLOR = 0xffffff;
const KEYCODE = {
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_UP: 38,
  KEY_DOWN: 40,
  KEY_W: 87,
  KEY_A: 65,
  KEY_S: 83,
  KEY_D: 68,
};

const colorChoices = [
  0xc06ec7, 0xb8171c, 0x6fa64a, 0xbaba66, 0x7f7dcb, 0xad2749,
];

const main = () => {
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  canvas = document.getElementById("myCanvas");

  // Event Listener Function
  // On Windows Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // On Key Down
  const onKeyDown = (e) => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    console.log(direction);

    // Rotation move
    if (e.keyCode === KEYCODE.KEY_LEFT) camera.rotation.y += 0.03;
    else if (e.keyCode === KEYCODE.KEY_RIGHT) camera.rotation.y += -0.03;
    else if (e.keyCode === KEYCODE.KEY_UP) camera.rotation.x += 0.03;
    else if (e.keyCode === KEYCODE.KEY_DOWN) camera.rotation.x -= 0.03;
    // Camera move
    else if (e.keyCode === KEYCODE.KEY_W) camera.position.add(direction);
    else if (e.keyCode === KEYCODE.KEY_S) camera.position.add(direction);
    else return;
  };

  // On Click
  const onClick = (e) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects && intersects[0]) {
      intersects.forEach((obj) => obj.object.material.color.set(0x00ff00));
    }
  };

  // Create Geometry Function
  const createCube = (side, x, y, z, color) => {
    const geometry = new THREE.BoxGeometry(side, side, side);
    const material = new THREE.MeshPhysicalMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

    return cube;
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
    const obj = createCube(
      getRandomInt(2, 5),
      getRandomInt(-10, 10),
      getRandomInt(-10, 10),
      getRandomInt(0, 10),
      colorChoices[getRandomInt(0, colorChoices.length)]
    );
    const group = new THREE.Object3D();

    obj.userData.parent = group;
    group.add(obj);

    geometries.push(obj);
    groups.push(group);
    scene.add(group);
  }

  camera.position.set(15, 10, 20);

  // 4. Create the renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  // Set the Event Listener
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("click", onClick);
  window.addEventListener("resize", onWindowResize);
};

const mainLoop = () => {
  renderer.render(scene, camera);

  geometries.forEach((geometry) => {
    geometry.rotation.x += 0.01;
    geometry.rotation.y += 0.01;
  });

  controls.update();
  requestAnimationFrame(mainLoop);
};

document.addEventListener("DOMContentLoaded", () => {
  main();
  mainLoop();
});
