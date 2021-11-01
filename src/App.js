import './App.css';
import CalculatorScreen from './CalculatorScreen.js';
import CalculatorKeyboard from './CalculatorKeyboard.js';
import React, { useState } from 'react';

const ZERO = '0';
const DECIMAL = ',';
const DECIMAL_DOT = '.';
const EQUAL = '=';
const SUM = '+';
const SUBSTRACTION = '-';
const MULTIPLICATION = 'X';
const DIVISION = '/';
const MODULE = '%';
const removers = ['C', 'CE', '⌫'];
const operations = [MODULE, DIVISION, MULTIPLICATION, SUBSTRACTION, SUM];
const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', ZERO];
export const CalculatorContext = React.createContext();

function App() {
  const [state, setState] = useState({ result: ZERO, operation: '' });
  
  const buttons = [
    MODULE, ...removers,
    ...numbers.slice(0, 3), DIVISION,
    ...numbers.slice(3, 6), MULTIPLICATION,
    ...numbers.slice(6, 9), SUBSTRACTION,
    DECIMAL, numbers[9], EQUAL, SUM
  ];

  const calc = () => {
    let operator = '', result, operationToNumber, resultToNumber;
    const thereIsOperator = operations.some(op => {
      if (state.operation.includes(op)) {
        operator = op;
      }
      return !!operator;
    });

    if (thereIsOperator) {
      operationToNumber = state.operation.replace(DECIMAL, DECIMAL_DOT).slice(0, -1);
      resultToNumber = state.result.replace(DECIMAL, DECIMAL_DOT);
      switch (operator) {
        case SUM:
          result = (Number(operationToNumber) + Number(resultToNumber));
          break;
        case SUBSTRACTION:
          result = (Number(operationToNumber) - Number(resultToNumber));
          break;
        case MULTIPLICATION:
          result = (Number(operationToNumber) * Number(resultToNumber));
          break;
        case DIVISION:
          result = (Number(operationToNumber) / Number(resultToNumber));
          break;
        case MODULE:
          result = (Number(operationToNumber) % Number(resultToNumber));
          break;
      }
      setState({ operation: '', result: result.toString().replace(DECIMAL_DOT, DECIMAL) });
    }
  }

  const onClickRemover = (button) => {
    switch(button) {
      case removers[0]:
        setState({ operation: '', result: ZERO });
        break;
      case removers[1]:
        setState({ ...state, result: ZERO });
        break;
      case removers[2]:
        setState({ ...state, result: state.result.slice(0, -1) || ZERO });
        break;
    }
  }

  const onClickOperation = (button) => {
    if (operations.some(operator => state.operation.includes(operator))) {
      setState({ ...state, operation: state.operation.slice(0, -1) + button });
    } else if (state.result.substr(-1) !== DECIMAL) {
      setState({ operation: state.result + button, result: ZERO });
    }
  }

  const onClickNumber = (button) => {
    setState({ ...state, result: state.result === ZERO ? button : state.result + button });
  }

  const onClickDecimal = () => {
    if (!isNaN(Number(state.result))) {
      setState({ ...state, result: state.result + DECIMAL });
    }
  }

  const onClickButton = (button) => {
    if (operations.includes(button)) {
      onClickOperation(button);
    } else if (numbers.includes(button)) {
      onClickNumber(button);
    } else if (removers.includes(button)) {
      onClickRemover(button);
    } else if (button === EQUAL) {
      calc();
    } else if (button === DECIMAL) {
      onClickDecimal();
    }
  };

  const context = { numbers, removers, operations };

  return (
    <div className="calculator">
      <CalculatorContext.Provider value={context}>
        <CalculatorScreen result={state.result} operation={state.operation}/>
        <CalculatorKeyboard buttons={buttons} onClickButton={onClickButton}/>
      </CalculatorContext.Provider>
    </div>
  );
}

export default App;
