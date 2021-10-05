import Color from "./Color.js";
import Vector3 from "./Vector3.js";
import Geometry from "./Geometry.js";

export default class Ellipse extends Geometry {
  constructor(
    id,
    position,
    uniformColors = new Color(1.0, 0.5, 0.5, 1.0),
    motionMatrix = [],
    radiusX = 10,
    radiusY = 6,
    numberOfSides = 60
  ) {
    super(id, position, uniformColors, motionMatrix);
    this._radiusX = radiusX;
    this._radiusY = radiusY;
    this._numberOfSides = numberOfSides;
    this._numberOfVertices = numberOfSides + 2;
    this._drawMode = 0x0006; // TRIANGLE_FAN
    this.init();
  }

  init = () => {
    this.parseVerticeArray();
  };

  parseVerticeArray = () => {
    let circleVerticesX = [];
    let circleVerticesY = [];
    let circleVerticesZ = [];

    circleVerticesX.push(this._position.x);
    circleVerticesY.push(this._position.y);
    circleVerticesZ.push(this._position.z);

    for (let i = 1; i < this._numberOfVertices; i++) {
      circleVerticesX.push(
        this._position.x +
          0.01 *
            this._radiusX *
            Math.cos((2 * i * Math.PI) / this._numberOfSides)
      );
      circleVerticesY.push(
        this._position.y +
          0.01 *
            this._radiusY *
            Math.sin((2 * i * Math.PI) / this._numberOfSides)
      );
      circleVerticesZ.push(this._position.z);
    }

    for (let i = 0; i < this._numberOfVertices; i++) {
      this.addVertice(
        new Vector3(circleVerticesX[i], circleVerticesY[i], circleVerticesZ[i])
      );
      this.addColor(this._uniform_colors);
    }
  };
}
