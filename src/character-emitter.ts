export class CharacterEmitter {
  private interval?: any;
  private currentIndex: number = 0;
  private removeCharacterSection = '{r}';
  private currentValue = '';

  constructor(private inputString: string) {}

  public subscribe(callback: (value: string) => void, timeout: number): void {
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

      callback(this.currentValue)
    }, timeout);
  }

  public unsubscribe(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}