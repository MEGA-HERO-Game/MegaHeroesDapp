import BigNumber from 'bignumber.js';

export function multiply(numberOne, numberTwo) {
  return new BigNumber(`${numberOne}`).times(new BigNumber(`${numberTwo}`)).toString();
}

export function divide(numberOne, numberTwo) {
  return new BigNumber(`${numberOne}`).dividedBy(new BigNumber(`${numberTwo}`)).toString();
}

export function add(numberOne, numberTwo) {
  return new BigNumber(`${numberOne}`).plus(new BigNumber(`${numberTwo}`)).toString();
}

export function subtract(numberOne, numberTwo) {
  return new BigNumber(`${numberOne}`).minus(new BigNumber(`${numberTwo}`)).toString();
}