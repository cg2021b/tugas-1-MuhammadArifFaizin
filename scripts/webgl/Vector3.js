export default class Vector3 {
  vertices = [];

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertices.push(this);
  }

  getArray = () => {
    return [this.x, this.y, this.z];
  };
}
  