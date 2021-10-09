import { getRandomRGB } from "./util.js";

const createBox = (
  width,
  height,
  depth,
  widthSegments = 1,
  heightSegments = 1,
  depthSegments = 1
) => {
  const geometry = new THREE.BoxGeometry(
    width,
    height,
    depth,
    widthSegments,
    heightSegments,
    depthSegments
  );
  const material = new THREE.MeshBasicMaterial({ color: getRandomRGB() });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
};

const createCone = (
  radius,
  height,
  radialSegments,
  heightSegments,
  openEnded,
  thetaStart = Math.PI * 0.25,
  thetaLength = Math.PI * 1.5
) => {
  const geometry = new THREE.ConeGeometry(
    radius,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength
  );
  const material = new THREE.MeshNormalMaterial();
  const cone = new THREE.Mesh(geometry, material);
  return cone;
};

const createTorus = (
  radius,
  segments,
  thetaStart = Math.PI * 0.25,
  thetaLength = Math.PI * 1.5
) => {
  const geometry = new THREE.TorusGeometry(
    radius,
    segments,
    thetaStart,
    thetaLength
  );
  const material = new THREE.MeshPhongMaterial({
    color: getRandomRGB(),
    shininess: 100,
  });
  const circle = new THREE.Mesh(geometry, material);
  return circle;
};

const createCylinder = (
  radiusTop = 3,
  radiusBottom = 3,
  height = 8,
  radialSegments = 32
) => {
  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments
  );

  const material = new THREE.MeshPhysicalMaterial({
    color: getRandomRGB(),
    reflectivity: 1,
    clearcoat: 1.0,
  });
  const cylinder = new THREE.Mesh(geometry, material);
  return cylinder;
};

const createOctahedron = (radius = 4.5, detail = 0) => {
  const geometry = new THREE.OctahedronGeometry(radius, detail);

  const material = new THREE.MeshStandardMaterial({
    color: getRandomRGB(),
    metalness: 0.5,
  });
  const octahedron = new THREE.Mesh(geometry, material);
  return octahedron;
};

const createDodecahedron = (radius = 4.5, detail = 0) => {
  const geometry = new THREE.DodecahedronGeometry(radius, detail);

  const material = new THREE.MeshToonMaterial({
    color: getRandomRGB(),
    wireframe: true,
  });
  const dodecahedron = new THREE.Mesh(geometry, material);
  return dodecahedron;
};

export {
  createBox,
  createTorus,
  createCone,
  createCylinder,
  createOctahedron,
  createDodecahedron,
};
