import Color from "./Color.js";
export default class Scene {
  _bgColor = new Color(1.0, 1.0, 1.0, 1.0);
  geometries = [];

  constructor(domElement) {
    this.context = domElement.getContext("webgl");

    if (this.context === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      return;
    }
    this._createShaderProgram();
  }

  _createShaderProgram = () => {
    this.shaderProgram = this.context.createProgram();
    this.context.attachShader(this.shaderProgram, this._createVertexShader());
    this.context.attachShader(this.shaderProgram, this._createFragmentShader());
    this.context.linkProgram(this.shaderProgram);
    this.context.useProgram(this.shaderProgram);
  };

  _createVertexShader = () => {
    let vertexShaderCode = `
            attribute vec3 aCoordinates;
            attribute vec4 aColor;
            varying mediump vec4 vColor;
            void main(){
                gl_Position = vec4(aCoordinates, 1.0);
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
    console.log(bgColor);
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

      this.context.drawArrays(
        geometry._drawMode,
        0,
        (verticeArr.length + colorArr.length) / 7
      );
    });
  };
}
