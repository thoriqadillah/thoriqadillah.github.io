import type { Vector } from "../types/vector"
import type { Stemmer } from "./stemmers/stemmer"

import ENStemmer from "./stemmers/lang/en/en"
import IDStemmer from "./stemmers/lang/id/id"

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

  private stemmer(): Stemmer | undefined {
    switch (this.lang) {
      case 'en': 
        return new ENStemmer()
      case 'id': 
        return new IDStemmer()
    }
  }

  public tokenize(str: string): string[] {
    let token = this.normalize(str).split(' ')
    token = new Stopword(this.lang).filter(token, this.stemmer())
    
    return token
  }

  public vectorize(token: string[], merger: string[]): Vector {
    let vector: Vector = {}

    for (const word of merger) {
      vector[word] = vector[word] ?? 0
      if (token.includes(word)) vector[word]++
    }

    return vector
  }
}