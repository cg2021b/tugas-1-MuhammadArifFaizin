const hemisphereLight = (
  skyColor = "#ffffff",
  groundColor = "#141414",
  intensity = 1
) => {
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

  return light;
};

const ambientLight = (color = "#ffffff", intensity = 1) => {
  const light = new THREE.AmbientLight(color, intensity);

  return light;
};

const directionalLight = (color = "#ffffff", intensity = 1) => {
  const light = new THREE.DirectionalLight(color, intensity);

  return light;
};

const pointLight = (color = "#ffffff", intensity = 1, decay = 300) => {
  const light = new THREE.PointLight({
    color: color,
    intensity: intensity,
    decay: decay,
  });

  return light;
};

const spotLight = (color = "#ffffff", decay = 300, penumbra = 0.8) => {
  const light = new THREE.PointLight({
    color: color,
    decay: decay,
    penumbra: penumbra,
  });

  return light;
};

export {
  hemisphereLight,
  ambientLight,
  directionalLight,
  pointLight,
  spotLight,
};
