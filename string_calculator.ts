export class StringCalculator {
  private _numbers: number[] = [];
  private _separators: string[] = [',', '\n'];

  add(numbers?: string): number {
    if(typeof numbers == 'undefined' && !numbers) {
      return 0;
    }

    this.reset();
    this.addMySeparators(numbers);
    this.parseNumbers(numbers);
    return this.calculateSum();
  }

  private reset(): void {
    this._numbers = [];
    this._separators = [',', '\n'];
  }

  private addMySeparators(numbers: string): void {
    if (numbers.indexOf("//") == 0) {
      let sepString: string = numbers.substring(
          numbers.indexOf("//") + 2, 
          numbers.indexOf("\n")
      );

      let reg = /(?<=\[).+?(?=\])/g;
      let sepArray: string[] = sepString.match(reg) || [];

      this._separators = [...this._separators, ...sepArray];
    }
  }

  private parseNumbers(numbers: string): void {
      this._separators = this._separators.map((sep) => `[${sep}]`);
      let splitted: string[] = numbers.split(new RegExp(this._separators.join('|'), 'g'));
      let negNumbers: number[] = [];

      for(let nr of splitted) {
        if (this.isNumber(nr)) {

          let parsedNumber: number = parseInt(nr);
          if (this.isNegative(parsedNumber)) {
            negNumbers.push(parsedNumber);
          }
          else if (!this.isGreaterThan1000(parsedNumber)) {
            this._numbers.push(parsedNumber);
          }
        }
      }

      if (negNumbers.length > 0) {
        let err: string = `Negatives not allowed: ${negNumbers.join(', ')}`;
        throw new RangeError(err); 
      }
  }

  private isNumber(nr: string): boolean {
    let parsedNumber: number = parseInt(nr);
    if (parsedNumber) {
      return true;
    }
    return false;
  }

  private isNegative(nr: number): boolean {
    return nr < 0;
  }

  private isGreaterThan1000(nr: number): boolean {
    return nr > 1000;
  }

  private calculateSum(): number {
    return this._numbers.reduce((sum, nr) => sum += nr, 0);
  }
}

