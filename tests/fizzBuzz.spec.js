/*
	FizzBuzz challenge
*/

import { expect } from 'chai';
import FizzBuzz from '../src/fizzBuzz';

describe('Main FizzBuzz', () => {
	it('should return `Fizz`if the number is divided by 3', () => {
		expect(FizzBuzz(6)).to.be.equal('Fizz');
		expect(FizzBuzz(3)).to.be.equal('Fizz');
	});

	it('should return `Buzz` when multiples of 5', () => {
		expect(FizzBuzz(5)).to.be.equal('Buzz');
		expect(FizzBuzz(10)).to.be.equal('Buzz');
	});

	it('should return `FizzBuzz` when multiple of 3 and 5', () => {
		expect(FizzBuzz(15)).to.be.equal('FizzBuzz');
	});

	it('should return the number when non-multiple', () => {
		expect(FizzBuzz(23)).to.be.equal(23);
	});

	it('should return zero when 0', () => {
		expect(FizzBuzz(0)).to.be.equal(0);
	});
});