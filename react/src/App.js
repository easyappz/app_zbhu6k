import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand2, setWaitingForOperand2] = useState(false);

  const handleDigit = (digit) => {
    if (waitingForOperand2) {
      setDisplay(digit);
      setWaitingForOperand2(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (nextOperator) => {
    if (operator && !waitingForOperand2) {
      const result = calculate(operand1, parseFloat(display), operator);
      setDisplay(String(result));
      setOperand1(result);
    } else {
      setOperand1(parseFloat(display));
    }
    setOperator(nextOperator);
    setWaitingForOperand2(true);
  };

  const calculate = (num1, num2, op) => {
    switch (op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: return num2;
    }
  };

  const handleEqual = () => {
    if (operator && !waitingForOperand2) {
      const result = calculate(operand1, parseFloat(display), operator);
      setDisplay(String(result));
      setOperand1(null);
      setOperator(null);
      setWaitingForOperand2(false);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperand1(null);
    setOperator(null);
    setWaitingForOperand2(false);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleDigit('7')}>7</button>
        <button onClick={() => handleDigit('8')}>8</button>
        <button onClick={() => handleDigit('9')}>9</button>
        <button onClick={() => handleOperator('/')}>÷</button>
        <button onClick={() => handleDigit('4')}>4</button>
        <button onClick={() => handleDigit('5')}>5</button>
        <button onClick={() => handleDigit('6')}>6</button>
        <button onClick={() => handleOperator('*')}>×</button>
        <button onClick={() => handleDigit('1')}>1</button>
        <button onClick={() => handleDigit('2')}>2</button>
        <button onClick={() => handleDigit('3')}>3</button>
        <button onClick={() => handleOperator('-')}>−</button>
        <button onClick={() => handleDigit('0')}>0</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

export default App;
