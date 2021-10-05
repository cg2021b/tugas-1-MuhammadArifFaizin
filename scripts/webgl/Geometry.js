import Color from "./Color.js";
import Vector3 from "./Vector3.js";

export default class Geometry {
  _id;
  _vertices = []; // Vector3
  _faces = []; // Face
  _colors = []; // Color
  _drawMode = 0x0004; // TRIANGLES
  _uniform_colors;
  motionMatrix = [];

  //position :Vector3
  constructor(
    id,
    position = new Vector3(0, 0, 0),
    uniformColors = new Color(1.0, 0.5, 0.5, 1.0),
    motionMatrix = []
  ) {
    this._id = id;
    this._position = position;
    this._uniform_colors = uniformColors;
    this.motionMatrix = motionMatrix;
  }

  //Vector3
  addVertice = (vertice) => {
    this._vertices.push(vertice);
  };

  addFace = (face) => {
    this._faces.push(face);
  };

  addColor = (color) => {
    this._colors.push(color);
  };

  getId = () => {
    return this._id;
  };

  getVerticeArray = () => {
    let vertices = [];
    this._vertices.forEach((vertice) => {
      vertice.getArray().forEach((verticeItem) => {
        vertices.push(verticeItem);
      });
    });
    return vertices;
  };

  getColorArray = () => {
    let colors = [];
    this._colors.forEach((color) => {
      color.getArray().forEach((colorItem) => {
        colors.push(colorItem);
      });
    });
    return colors;
  };
}
