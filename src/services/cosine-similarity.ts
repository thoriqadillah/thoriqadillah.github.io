import type { Vector } from "../types/vector"

export default class CosineSimilarity {

  private product(v1: Vector, v2: Vector): number {
    let product = 0

    for (const [key, value] of Object.entries(v1)) {
      product += value * v2[key]
    }
    
    return product
  }

  private magnitude(vect: Vector): number {
    let magnitude = 0

    for (const [key, _] of Object.entries(vect)) {
      magnitude += vect[key] * vect[key]
    }
    
    return Math.sqrt(magnitude)
  }

  public getSimilarity(v1: Vector, v2: Vector) {
    const dot = this.product(v1, v2)
    const magnitude = this.magnitude(v1) * this.magnitude(v2)

    return parseFloat((dot / magnitude).toFixed(2)) * 100
  }
}