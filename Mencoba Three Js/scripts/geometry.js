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

const createTorusKnot = (
  radius = 1,
  tube = 0.4,
  tubularSegments = 64,
  radialSegments = 8,
  p = 2,
  q = 3
) => {
  const geometry = new THREE.TorusKnotGeometry(
    radius,
    tube,
    tubularSegments,
    radialSegments,
    p,
    q
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

const createIcosahedron = (radius = 4.5, detail = 0) => {
  const geometry = new THREE.IcosahedronGeometry(radius, detail);

  const material = new THREE.MeshLambertMaterial({
    color: getRandomRGB(),
    reflectivity: 0.8,
  });
  const dodecahedron = new THREE.Mesh(geometry, material);
  return dodecahedron;
};

const createTetrahedron = (radius = 4.5, detail = 0) => {
  const geometry = new THREE.TetrahedronGeometry(radius, detail);

  const material = new THREE.MeshDistanceMaterial({
    nearDistance: 5,
  });
  const dodecahedron = new THREE.Mesh(geometry, material);
  return dodecahedron;
};

const createSphere = (
  radius = 1,
  widthSegments = 32,
  heightSegments = 16,
  phiStart = 0,
  phiLength = Math.PI * 2,
  thetaStart = 0,
  thetaLength = Math.PI
) => {
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength
  );

  const material = new THREE.MeshToonMaterial({
    color: getRandomRGB(),
    wireframe: true,
  });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
};

export {
  createBox,
  createTorus,
  createTorusKnot,
  createCone,
  createCylinder,
  createOctahedron,
  createDodecahedron,
  createIcosahedron,
  createTetrahedron,
  createSphere,
};
