interface DelayLimits {
  min: number;
  max: number;
}

export class CharacterEmitter {
  private interval: any;
  private currentIndex: number = 0;
  private removeCharacterSection = '{r}';
  private currentValue = '';

  constructor(private inputString: string) {}

  public subscribe(callback: (value: string) => void, delayLimits: DelayLimits): void {
    this.interval = setInterval(() => {
      // If we are at the end of the string, unsubscribe and return
      if (this.currentIndex === this.inputString.length) {
        this.unsubscribe();
        return;
      }

      const indexOfFirstRemoveCharacter = this.inputString.indexOf(
        this.removeCharacterSection,
        this.currentIndex - 1
      );

      // If we are at the start of the remove character section, remove one character and update current index
      if (
        this.inputString[this.currentIndex] === this.removeCharacterSection[0] &&
        indexOfFirstRemoveCharacter === this.currentIndex
      ) {
        this.currentIndex += this.removeCharacterSection.length - 1;
        this.currentValue = this.currentValue.slice(0, -1);
      } else {
        this.currentValue = this.currentValue + this.inputString[this.currentIndex];
      }

      this.currentIndex++;
      const delay = this.getRandomDelay(delayLimits);
      setTimeout(() => {
        callback(this.currentValue);
      }, delay);
    }, delayLimits.min);
  }

  public unsubscribe(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  private getRandomDelay(delayLimit: DelayLimits): number {
    return Math.floor(Math.random() * (delayLimit.max - delayLimit.min));
  }
}
