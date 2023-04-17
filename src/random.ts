export class Random {
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Returns a random boolean value
   * @param n 1 in n chance of returning true
   */
  static getRandomBoolean(n: number): boolean {
    return Math.floor(Math.random() * n) === 0;
  }
}
