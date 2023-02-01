import type { Stemmer } from "../../stemmer";
import Dictionary from './dictionary'

export default class IDStemmer implements Stemmer {
  
  private dictionary: string[]

  constructor() {
    this.dictionary = Dictionary()
  }

  private inDictionary(word: string): boolean {
    return this.dictionary.includes(word)
  }

  private isPlural(word: string): boolean {
    const words = word.match(/^(.*)-(ku|mu|nya|lah|kah|tah|pun)/)
    if (words) {
      return words[1].includes('-')
    }

    return word.includes('-')
  }

  private stemPlural(word: string): string {
    let words = word.match(/^(.*)-(.*)$/) 
    
    if (words) {
      const suffix = words[2]
      const suffixes = ['ku', 'mu', 'nya', 'lah', 'kah', 'tah', 'pun']
      
      const anotherwords = words[1].match(/^(.*)-(.*)$/)
      if (suffixes.includes(suffix) && anotherwords) {
        words[1] += suffix
      }

      const stem1 = this.stem(words[1])
      const stem2 = this.stem(words[2])

      if (stem1 === stem2) return stem1
    }
    
    return word
  }

  public stem(word: string): string {
    if (this.inDictionary(word)) return word;

    if (this.isPlural(word)) {
      return this.stemPlural(word);
    }

    //jika tidak ada dalam kamus maka dilakukan stemming
    word = this.delInflectionSuffixes(word);
    if (this.inDictionary(word)) {
      return word;
    }

    word = this.delDerivationSuffixes(word);
    if (this.inDictionary(word)) {
      return word;
    }

    return word;
  } 

  //TODO: implement this
  private delInflectionSuffixes(word: string): string {
    return word
  }

  //TODO: implement this
  private delDerivationSuffixes(word: string): string {
    return word
  }

  //TODO: implement this
  private checkPrefixDisallowedSuffixes(word: string): boolean {
    return true
  }

  //TODO: implement this
  private delDerivationPrefix(word: string): string {
    return word
  }
}