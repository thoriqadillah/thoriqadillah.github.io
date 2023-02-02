import type { Vector } from "../types/vector"

export default class CosineSimilarity {

  private product(v1: Vector, v2: Vector): number {
    let product = 0;
    for (const [key, value] of Object.entries(v1)) {
      product += value * v2[key];
    }

    return product;
  }

  private magintude(vector: Vector): number {
    let magnitude = 0;
    for (const [_, v] of Object.entries(vector)) {
      magnitude += v * v;
    }

    return Math.sqrt(magnitude);
  }
  
  public getSimilarity(v1: Vector, v2: Vector): number {
    const dot = this.product(v1, v2);
    const magnitude = this.magintude(v1) * this.magintude(v2);

    return parseFloat((dot / magnitude).toPrecision(2)) * 100;
  }
}