import type { Vector } from "../types/vector"

export default class Tokenizer {

  private normalize(str: string): string {
    return str.toLowerCase()
      .replace('/[^a-z -]/im', ' ')
      .replace('/( +)/im', ' ')
      .replace('- ', '')
      .trim()
  }

  public tokenize(str: string): string[] {
    return this.normalize(str).split(' ')
  }

  public vectorize(token: string[]): Vector {
    let vector: Vector = {}

    for (const word of token) {
      if (!vector[word]) vector[word] = 1
      else vector[word]++
    }

    return vector
  }
}