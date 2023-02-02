import type { Vector } from "../../types/vector";

export default class TFIDF {

  private vectors: Vector[]
  private idf: Vector = {}

  constructor(vectors: Vector[]) {
    this.vectors = vectors
    this.IDF()
  }

  private IDF(): void {
    for (const [word] of Object.entries(this.vectors[0])) {
      this.idf[word] = 0
    }
    
    
    for (const vector of this.vectors) {
      for (const [word, count] of Object.entries(vector)) {
        if (count > 0) {
          this.idf[word] += 1
        }
      }
    }

    const n = this.vectors.length // total docs
    for (const [word, value] of Object.entries(this.idf)) {
      this.idf[word] = 1 + Math.log10((n+1) / (value+1))
    }
  }

  public transform() {
    for (let i = 0; i < this.vectors.length; i++) {
      for (const [word] of Object.entries(this.vectors[i])) {
        this.vectors[i][word] *= this.idf[word]
      }
    }

    return this.vectors
  }
}