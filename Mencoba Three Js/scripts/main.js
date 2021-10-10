import {
  createBox,
  createCone,
  createTorus,
  createTorusKnot,
  createCylinder,
  createOctahedron,
  createDodecahedron,
  createIcosahedron,
  createTetrahedron,
  createSphere,
} from "./geometry.js";

import {
  hemisphereLight,
  ambientLight,
  directionalLight,
  pointLight,
  spotLight,
} from "./light.js";

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
    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 100);

    // 3. create an locate the object on the scene

    // Row 1
    const cube = createBox(5, 5, 5, 1, 1, 1);
    const icosahedron = createIcosahedron(4.5, 0);
    const octahedron = createOctahedron(4.5);
    const tetrahedron = createTetrahedron(4.5);
    const sphere = createSphere(4, 32, 16);
    // Row 2
    const cube_2 = createBox(5, 5, 5, 2, 2, 2);
    const icosahedron_2 = createIcosahedron(4.5, 1);
    const octahedron_2 = createOctahedron(4.5, 1);
    const tetrahedron_2 = createTetrahedron(4.5, 1);
    const dome = createSphere(4, 32, 16, 0, 2 * Math.PI, 0, Math.PI / 2);
    // Row 3
    const cylinder = createCylinder(3, 3, 8, 32, 20, 4);
    const cone = createCylinder(0, 3, 10, 20, 4);
    const pyramid = createCylinder(0, 3, 10, 4, 4);
    const torus = createTorus(3, 1, 8, 4);
    const torusknot = createTorusKnot(3, 1, 60, 10, 2, 3);
    // Row 4
    const prism = createCylinder(3, 3, 8, 6, 4);
    const conetruncated = createCylinder(1, 3, 10, 20, 4);
    const pyramidtruncated = createCylinder(1.5, 3, 10, 6, 4);
    const torus_2 = createTorus(3, 2, 16, 40);
    const torusknot_2 = createTorusKnot(3, 1, 60, 10, 3, 7);

    // Row 1
    geometries.push(cube);
    geometries.push(icosahedron);
    geometries.push(octahedron);
    geometries.push(tetrahedron);
    geometries.push(sphere);
    // Row 2
    geometries.push(cube_2);
    geometries.push(icosahedron_2);
    geometries.push(octahedron_2);
    geometries.push(tetrahedron_2);
    geometries.push(dome);
    // Row 3
    geometries.push(cylinder);
    geometries.push(cone);
    geometries.push(pyramid);
    geometries.push(torus);
    geometries.push(torusknot);
    // Row 4
    geometries.push(prism);
    geometries.push(conetruncated);
    geometries.push(pyramidtruncated);
    geometries.push(torus_2);
    geometries.push(torusknot_2);

    // Row 1
    scene.add(cube);
    scene.add(icosahedron);
    scene.add(octahedron);
    scene.add(tetrahedron);
    scene.add(sphere);
    // Row 2
    scene.add(cube_2);
    scene.add(icosahedron_2);
    scene.add(octahedron_2);
    scene.add(tetrahedron_2);
    scene.add(dome);
    // Row 3
    scene.add(cylinder);
    scene.add(cone);
    scene.add(pyramid);
    scene.add(torus);
    scene.add(torusknot);
    // Row 4
    scene.add(prism);
    scene.add(conetruncated);
    scene.add(pyramidtruncated);
    scene.add(torus_2);
    scene.add(torusknot_2);

    // 4. initiate light
    const hemisphere = hemisphereLight("#ffffff", "#141414");
    hemisphere.position.set(0, 40, 0);

    const ambient = ambientLight("#ffffff");

    const directional = directionalLight("#ffffff");
    directional.position.set(0, 40, 50);

    const point = pointLight("#ffffff");
    point.position.set(-60, 40, 50);

    const spot = spotLight("#ffffff", "#141414");
    spot.position.set(60, 40, 50);

    scene.add(hemisphere);
    scene.add(ambient);
    scene.add(directional);
    scene.add(point);
    scene.add(spot);

    let lightChoices = [];
    lightChoices.push(hemisphere, ambient, directional, point, spot);

    lightChoices.forEach((item) => {
      item.visible = false;
      scene.add(item);
    });
    lightChoices[0].visible = true;

    const selectedLight = document.getElementById("lightChoices");
    selectedLight.addEventListener("change", () => {
      const index = Number(selectedLight.value);
      lightChoices.forEach((item) => {
        item.visible = false;
      });
      lightChoices[index].visible = true;
    });

    // 5. create the renderer
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
    const row = 2;
    const col = 5;
    geometries.forEach((geometry, index) => {
      geometry.rotation.x -= (index + 1) * 0.001;
      geometry.rotation.y -= (index + 1) * 0.001;

      geometry.position.x = (index % col) * 10 - (col / 2) * 10;
      geometry.position.y = ((row + 1) / 2) * 10 - Math.floor(index / col) * 10;
      // geometry.position.y = Math.floor(index / col) * 10;
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
