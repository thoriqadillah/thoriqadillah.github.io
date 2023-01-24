import type { Vector } from "../types/vector"
import Stopword from "./stopwords/stopword"

export default class Tokenizer {

  private lang: string

  constructor(lang: string) {
    this.lang = lang
  }

  private normalize(str: string): string {
    return str.toLowerCase()
      .replace('/[^a-z -]/im', ' ')
      .replace('/( +)/im', ' ')
      .replace('- ', '')
      .trim()
  }

  public tokenize(str: string): string[] {
    let token = this.normalize(str).split(' ')
    token = new Stopword(this.lang).filter(token)
    console.log(token);
    
    return token
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