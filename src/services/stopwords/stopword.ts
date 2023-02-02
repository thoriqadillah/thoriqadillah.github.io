import type { Stemmer } from "../stemmers/stemmer"

import ENStopwords from './lang/en'
import IDStopwords from './lang/id'

export default class Stopword {

  private lang: string

  constructor(lang: string) {
    this.lang = lang
  }

  private getStopwords(): string[] {
    switch (this.lang) {
      case 'en':
        return ENStopwords()
      case 'id':
        return IDStopwords()
      default: 
        return []
    }
  }

  public filter(token: string[], stemmer?: Stemmer) {
    const stopwords = this.getStopwords()
    token = token.filter(el => stopwords.indexOf(el) === -1)
    
    if (stemmer !== undefined) {
      for (let i = 0; i < token.length; i++) {
        token[i] = stemmer.stem(token[i])
      }
    }
    
    return token
  }
}