# String Calculator

Example from https://github.com/ardalis/kata-catalog/blob/master/katas/String%20Calculator.md

# First steps
To create this project I executed following commands:

* git init
* yarn init
* yarn add typescrip
* yarn add mocha
* yarn add chai
* yarn add @types/jest
* yarn add @types/chai

To convert .ts files I executed following commands:

* node_modules/.bin/tsc --init
* node_modules/.bin/tsc -watch

To run the tests I execute following command:

* node_modules/mocha/bin/mocha test/string_calculator_test.js

# Test coverage
To install istanbul:

* yarn add istanbul

To run the test with test coverage with istanbul:

* ./node_modules/.bin/.istanbul cover ./node_modules/.bin/_mocha string_calculator_test.js
