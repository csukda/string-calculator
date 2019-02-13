import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

import { StringCalculator } from '../string_calculator';

describe('StringCalculator', () => {

  describe('add', () => {

    let stringCalculator: StringCalculator;

    beforeEach(() => {
      stringCalculator = new StringCalculator();
    });

    it('returns_zero_with_empty_string_given', () => {
      const result = stringCalculator.add("");
      expect(result).to.be.a('number');
      expect(result).to.equal(0);
    });

    it('returns_number_with_one_number_given', () => {
      const result = stringCalculator.add("5");
      expect(result).to.be.a('number');
      expect(result).to.equal(5);
    });

    it('returns_sum_with_two_numbers_given', () => {
      const result = stringCalculator.add("5,6");
      expect(result).to.be.a('number');
      expect(result).to.equal(11);
    });

    it('returns_sum_with_unknown_number_of_numbers_given', () => {
      const result = stringCalculator.add("1,2,3,4,5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });

    it('returns_sum_with_new_line_separator', () => {
      const result = stringCalculator.add("1\n2\n3\n4\n5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    })

    it('returns_sum_with_mixed_separators', () => {
      const result = stringCalculator.add("1,2\n3\n4,5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });

    it('returns_sum_with_different_delimiter', () => {
      const result = stringCalculator.add("//[;]\n1,2\n3;4;5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });

    it('throws_exception_with_negative_numbers_given', () => {
      expect(() => {
        stringCalculator.add("1,-2\n-3,4");
      }).to.throw("Negatives not allowed: -2, -3");
    });

    it('ignores_numbers_greater_than_1000', () => {
      const result = stringCalculator.add("1,1111,2\n3,2222");
      expect(result).to.be.a('number');
      expect(result).to.equal(6);
    });

    it('returns_sum_with_different_delimiter_of_any_length', () => {
      const result = stringCalculator.add("//[|||]\n1|||2,3\n4|||5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });

    it('returns_sum_with_multiple_different_delimiters', () => {
      const result = stringCalculator.add("//[|][%]\n1|2%3,4\n5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });

    it('returns_sum_with_different_delimiters_of_any_length', () => {
      const result = stringCalculator.add("//[|||][%%%]\n1|||2%%%3,4\n5");
      expect(result).to.be.a('number');
      expect(result).to.equal(15);
    });
  });
});
