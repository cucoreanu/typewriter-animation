export class CharacterEmitter {
  private interval?: NodeJS.Timer;
  private currentIndex = 0;
  private currentValue = "";

  constructor(private inputString: string) {}

  public subscribe(callback: (value: string) => void, timeout: number): void {
    this.interval = setInterval(() => {
      if (this.currentIndex === this.inputString.length) {
        this.unsubscribe();
        return;
      }

      this.currentValue += this.inputString[this.currentIndex];
      this.currentIndex++;

      callback(this.currentValue);
    }, timeout);
  }

  public unsubscribe(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
