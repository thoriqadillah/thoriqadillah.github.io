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

  public filter(token: string[]) {
    const stopwords = this.getStopwords()
    return token.filter(el => stopwords.indexOf(el) == -1)

    //TODO: implement stemming
  }
}