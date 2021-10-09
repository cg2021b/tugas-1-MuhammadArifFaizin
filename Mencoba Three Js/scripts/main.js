import {
  createBox,
  createCone,
  createTorus,
  createCylinder,
  createOctahedron,
  createDodecahedron,
} from "./geometry.js";

const main = () => {
  let scene, camera, renderer;
  let speedX = 0.05;
  let geometries = [];
  let canvas = document.getElementById("myCanvas");

  const resizeRendererToDisplaySize = (renderer) => {
    const canvasElem = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvasElem.clientWidth * pixelRatio) | 0;
    const height = (canvasElem.clientHeight * pixelRatio) | 0;
    const needResize =
      canvasElem.width !== width || canvasElem.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };

  // set up the environment -
  // initiallize scene, camera, objects and renderer
  const init = () => {
    // 1. create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefefef);

    // 2. create an locate the camera
    const cameraSize = 5;
    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 100);

    // 3. create an locate the object on the scene
    const cube = createBox(5, 5, 5);
    const cone = createCone(4, 5, 8);
    const torus = createTorus(3, 1.5, 16, 100);
    const cylinder = createCylinder(3, 3, 8, 32);
    const octahedron = createOctahedron(4.5);
    const dodecahedron = createDodecahedron(4.5);

    geometries.push(cube);
    geometries.push(cone);
    geometries.push(torus);
    geometries.push(cylinder);
    geometries.push(octahedron);
    geometries.push(dodecahedron);

    scene.add(cube);
    scene.add(cone);
    scene.add(torus);
    scene.add(cylinder);
    scene.add(octahedron);
    scene.add(dodecahedron);

    // 4. create the renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas });

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  };

  // main animation loop - calls 50-60 in a second.
  const mainLoop = function () {
    geometries.forEach((geometry, index) => {
      geometry.rotation.x -= (index + 1) * 0.01;
      geometry.rotation.y -= (index + 1) * 0.01;

      geometry.position.x = index * 10;
    });

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
  };

  init();
  mainLoop();
};

///////////////////////////////////////////////
window.onload = () => {
  main();
};
