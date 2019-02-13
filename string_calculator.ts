import { isEmpty, escapeRegExp } from 'lodash';

export class StringCalculator {
  private _numbers: number[] = [];
  private _separators: string[] = [',', '\n'];

  add(numbers: string): number {
    if (isEmpty(numbers)) {
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
    if (!numbers.startsWith("//")) {
      return;
    }

    const regManyOwnSep = /(?<=\[).+?(?=\])/g;

    const sepString: string = numbers
      .substring(numbers.indexOf("//") + 2, numbers.indexOf("\n"))

    const sepArray: string[] = sepString
      .match(regManyOwnSep) || [sepString]

    this._separators = [...this._separators, ...sepArray]
      .map((sep) => escapeRegExp(sep))
  }

  private parseNumbers(numbers: string): void {
    this._numbers = numbers
      .split(new RegExp(this._separators.join('|'), 'g'))
      .filter(this.isNumber)
      .map((nr) => Number(nr))
      .filter(this.isNotGreaterThan1000)

    if (this._numbers.some(this.isNegative)) {
      const err: string = `Negatives not allowed: ${this._numbers.filter(this.isNegative).join(', ')}`;
      throw new RangeError(err); 
    }
  }

  private isNumber(nr: string): boolean {
    return !isNaN(Number(nr));
  }

  private isNegative(nr: number): boolean {
    return nr < 0;
  }

  private isNotGreaterThan1000(nr: number): boolean {
    return nr <= 1000;
  }

  private calculateSum(): number {
    return this._numbers.reduce((sum, nr) => sum + nr, 0);
  }
}

