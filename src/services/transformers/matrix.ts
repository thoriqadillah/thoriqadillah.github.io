import type { Vector } from "src/types/vector";

export default class Matrix {

  private matrix: number[][] = []
  private documents: Vector[] = []

  public constructor(documents: Vector[]) {
    this.documents = documents
    
    for (let i = 0; i < documents.length; i++) {
      this.matrix.push([])
      for (const [_, value] of Object.entries(documents[i])) {
        this.matrix[i].push(value)
      }
    }
  }

  public construct(width: number, height: number = 0): number[][] | number[] {
    if (height === 0) {
      const matrix: number[] = []
      for (let i = 0; i < width; i++) matrix.push(0)
      return matrix
    }

    const matrix: number[][] = []
    for (let i = 0; i < height; i++) {
      matrix.push([])
      for (let j = 0; j < width; j++) {
        matrix[i].push(0)
      }
    }

    return matrix
  }

  public truncate(matrix: number[][], rows: number, cols: number): void {
    for (let i = 0; i < matrix.length; i++) {
      if (i > rows) {
        matrix.splice(rows)
        break
      }

      matrix.splice(cols)
    }
  }

  public original(): Vector[] {
    return this.documents
  }

  public get(): number[][] {
    return this.matrix
  }

  public multiply(A: number[][], B: number[][]): number[][] {
    const colA = A[0].length
		const rowB = B.length

    let product: number[][] = this.construct(B[0].length, A.length) as number[][]

    if (colA !== rowB) {
      throw new Error(`Column A ${colA} is not equal to Row B ${rowB}`)
    }

    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < B[0].length; j++) {
        for (let p = 0; p < A[0].length; p++) {
          product[i][j] += A[i][p] * B[p][j]
        }
        
      }
    }
    
    return product
  }

  public transpose(matrix: number[][]): number[][] {
    let result: number[][] = []

    for (let i = 0; i < matrix.length; i++) {
      result.push([])
      for (let j = 0; j < matrix[0].length; j++) {
        result[i][j] = matrix[j][i]
      }
    }

    return result
  }
}