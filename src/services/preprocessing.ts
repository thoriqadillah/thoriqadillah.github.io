import type { Vector } from '../types/vector'
import Tokenizer from './tokenizer'
import TFIDF from './transformers/TFIDF'

export default class Preprocessing {
  
  public static preprocess(documents: string[], lang: string): Vector[] {
    const tokenizer = new Tokenizer(lang)
    
    let vectors: Vector[] = []
    let merger: string[] = []
    let tokens: string[][] = []
    
    for (let i = 0; i < documents.length; i++) {
      tokens[i] = tokenizer.tokenize(documents[i])
      merger = tokens[i].concat(merger.filter(item => tokens[i].indexOf(item) < 0))
    }
    
    for (let i = 0; i < documents.length; i++) {
      const vector = tokenizer.vectorize(tokens[i], merger)
      vectors.push(vector)
    }

    vectors = new TFIDF(vectors).transform()
    return vectors
  }

  
}