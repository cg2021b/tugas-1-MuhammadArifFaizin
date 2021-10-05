import Color from "./Color.js";
import Vector3 from "./Vector3.js";

export default class Geometry {
  _vertices = []; // Vector3
  _faces = []; // Face
  _colors = []; // Color
  _drawMode = 0x0004; // TRIANGLES

  //position :Vector3
  constructor(position = new Vector3(0, 0, 0)) {
    this._position = position;
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
