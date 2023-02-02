import type { Vector } from "src/types/vector";
import type Matrix from "./matrix";
import SVD from "./SVD";

export default class LSA {

  private matrix: Matrix

  constructor(matrix: Matrix) {
    this.matrix = matrix
  }

  public transform() {
    const usv = new SVD(this.matrix).decompose()
    const S = usv.S()

    // truncate the topics for the most important part based on K
    for (let i = usv.K(); i < S.length; i++) { 
      S[i][i] = 0;
    }

    const lsa = this.matrix.multiply(
      this.matrix.multiply(usv.U(), S),
      usv.VT()
    )

    const transformed: Vector[] = []
    const original = this.matrix.original()
    
    // transforming to key valu pair
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