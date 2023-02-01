import type { Vector } from "src/types/vector";
import type Matrix from "./matrix";
import SVD from "./SVD";

export default class LSA {

  private matrix: Matrix

  constructor(matrix: Matrix) {
    this.matrix = matrix
  }

  public transform() {
    const svd = new SVD(this.matrix).transform()
    
    const documents: Vector[] = this.matrix.original()
    let transformed = new Array<Vector>(documents.length).fill({})
  
    //TODO

    return transformed
  }
}