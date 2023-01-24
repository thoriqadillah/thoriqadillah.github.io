import type { Vector } from '../types/vector'
import Tokenizer from './tokenizer'
import TFIDF from './transformers/TFIDF'

export default class Preprocessing {
  
  public static preprocess(documents: string[]): Vector[] {
    const tokenizer = new Tokenizer()
    let merged: string[] = []

    let vectors: Vector[] = []

    for (const document of documents) {
      const token = tokenizer.tokenize(document)
      const vector = tokenizer.vectorize(token)

      vectors.push(vector)
      merged = token.concat(merged.filter(item => token.indexOf(item) < 0))
    }
    
    for (let i = 0; i < vectors.length; i++) {
      for (const word of merged) {
        if (!vectors[i][word]) vectors[i][word] = 0
      }
    }

    vectors = new TFIDF(vectors).transform()
    return vectors
  }

  
}