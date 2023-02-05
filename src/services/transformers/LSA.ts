import type { Vector } from "src/types/vector";
import type Matrix from "./matrix";
import SVD from "./SVD";

export default class LSA {

  private matrix: Matrix

  constructor(matrix: Matrix) {
    this.matrix = matrix
  }
  
  public transform(): Vector[] {
    const usv = new SVD(this.matrix).decompose()

    const M = this.matrix.get()
    const V = usv.V()
    
    // truncate V with low rank approx
    for (let i = 0; i < V.length; i++) {
      for (let j = usv.K(); j < V[0].length; j++) {
        V[i][j] = 0
      }
    }    
    
    const lsa = this.matrix.multiply(M, V)
    const original = this.matrix.original()
    const transformed: Vector[] = []
    
    // transforming the matrix to key valu pair (optional)
    for (let i = 0; i < lsa.length; i++) {
      transformed[i] = {}
      let j = 0
      for (const [key, _] of Object.entries(original[i])) {
        transformed[i][key] = lsa[i][j++]
      }
    }
    
    return transformed
  }
}