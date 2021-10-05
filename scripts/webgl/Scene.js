import Color from "./Color.js";
import Vector3 from "./Vector3.js";

export default class Scene {
  _bgColor;
  geometries = [];

  constructor(domElement) {
    this.context = domElement.getContext("webgl");

    if (this.context === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }

    this._bgColor = new Color(1.0, 1.0, 1.0, 1.0);
    this._createShaderProgram();
  }

  _checkIsCompiled = (shader) => {
    const compiled = this.context.getShaderParameter(
      shader,
      this.context.COMPILE_STATUS
    );
    if (!compiled) {
      console.error(this.context.getShaderInfoLog(shader));
    }
  };

  _checkIsLinked = () => {
    const linked = this.context.getProgramParameter(
      this.shaderProgram,
      this.context.LINK_STATUS
    );
    if (!linked) {
      console.error(this.context.getProgramInfoLog(this.shaderProgram));
    }
  };

  _createShaderProgram = () => {
    this.shaderProgram = this.context.createProgram();

    const vertexShader = this._createVertexShader();
    this.context.attachShader(this.shaderProgram, vertexShader);
    this._checkIsCompiled(vertexShader);

    const fragmentShader = this._createFragmentShader();
    this.context.attachShader(this.shaderProgram, fragmentShader);
    this._checkIsCompiled(fragmentShader);

    this.context.linkProgram(this.shaderProgram);
    this._checkIsLinked();
    this.context.useProgram(this.shaderProgram);
  };

  _createVertexShader = () => {
    let vertexShaderCode = `
      attribute vec3 aCoordinates;
      attribute vec4 aColor;
      varying mediump vec4 vColor;
      uniform mat4 u_matrix;
      void main(){
          gl_Position = u_matrix * vec4(aCoordinates, 1.0);
          gl_PointSize = 10.0;
          vColor = aColor;
      }`;

    let vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
    this.context.shaderSource(vertexShader, vertexShaderCode);
    this.context.compileShader(vertexShader);

    return vertexShader;
  };

  _createFragmentShader = () => {
    let fragmentShaderCode = `
            varying mediump vec4 vColor;
            void main(){
                gl_FragColor = vColor;
            }`;

    let fragmentShader = this.context.createShader(
      this.context.FRAGMENT_SHADER
    );
    this.context.shaderSource(fragmentShader, fragmentShaderCode);
    this.context.compileShader(fragmentShader);

    return fragmentShader;
  };

  _bindArrayInsideShader = (arrayToBePushed, shaderAttrib, sizeBuffer) => {
    let buffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      arrayToBePushed,
      this.context.STATIC_DRAW
    );

    let attribLocation = this.context.getAttribLocation(
      this.shaderProgram,
      shaderAttrib
    );
    this.context.vertexAttribPointer(
      attribLocation,
      sizeBuffer,
      this.context.FLOAT,
      false,
      0,
      0
    );
    this.context.enableVertexAttribArray(attribLocation);
  };

  addGeometry = (geometry) => {
    this.geometries.push(geometry);
  };

  removeGeometry = (removedGeometry) => {
    this.geometries.forEach((geometry, index, object) => {
      if (removedGeometry === geometry) object.splice(index, 1);
    });
  };

  setBgColor = (bgColor) => {
    this._bgColor = bgColor;
  };

  getGeometries = () => {
    return this.geometries;
  };

  setGeometries = (geometries) => {
    this.geometries = geometries;
  };

  render = () => {
    this.context.clearColor(
      this._bgColor.r,
      this._bgColor.g,
      this._bgColor.b,
      this._bgColor.a
    );
    this.context.clear(this.context.COLOR_BUFFER_BIT);

    this.geometries.forEach((geometry) => {
      const verticeArr = new Float32Array(geometry.getVerticeArray());
      const colorArr = new Float32Array(geometry.getColorArray());

      this._bindArrayInsideShader(verticeArr, "aCoordinates", 3);
      this._bindArrayInsideShader(colorArr, "aColor", 4);

      const u_matrix = this.context.getUniformLocation(
        this.shaderProgram,
        "u_matrix"
      );
      const motionMatrix = [
        1.0,
        0.0,
        0.0,
        0.0, //
        0.0,
        1.0,
        0.0,
        0.0, //
        0.0,
        0.0,
        1.0,
        0.0, //
        geometry.motion.x,
        geometry.motion.y,
        geometry.motion.z,
        1.0, //
      ];
      this.context.uniformMatrix4fv(u_matrix, false, motionMatrix);

      this.context.drawArrays(
        geometry._drawMode,
        0,
        (verticeArr.length + colorArr.length) / 7
      );
    });
  };
}
