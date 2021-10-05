export default class Face {
  /*
          @constructor
          @param number vertice1 - index of first vertice
          @param number vertice2 - index of second vertice
          @param number vertice3 - index of third vertice
       */
  constructor(verticeStart, verticeEnd) {
    this.verticeStart = verticeStart;
    this.verticeEnd = verticeEnd;
  }

  getArray = () => {
    let vertice = [];
    for (let i = 0; i <= this.verticeEnd; i++) {
      vertice.push(i);
    }

    return vertice;
  };
}
