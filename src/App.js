import React, {useState} from "react";

function doMath(a, b, operator) {
    switch(operator) {
      case "+": 
        return Number(a) + Number(b);
      case "-": 
        return Number(a) - Number(b);
      case "x": 
        return Number(a) * Number(b);
      case "÷": 
        return Number(a) / Number(b);
      default: 
        break;
    }
}

function App() {
  const numButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operatorButtons = ["+", "-", "x", "÷"]
  const [calculator, setCalculator] = useState({
    sign: "",
    num: 0,
    result: 0
  })

  const handleNumber = (event) => {
    event.preventDefault();
    const val = event.target.innerHTML;
    if (calculator.num.toString().length < 16) {
      setCalculator({
        ...calculator,
        num: calculator.num === 0 && !calculator.num.toString().includes(".") ? 
        String(Number(calculator.num + val))
        : String(calculator.num + val),
        result: !calculator.sign ? 0 : calculator.result
      })
    }
  }

  function handleOperator(event) {
    const operator = event.target.innerHTML;
    setCalculator({
      sign: operator,
      result: !calculator.num ? calculator.result
              : !calculator.result
              ? calculator.num
              : doMath(calculator.result, calculator.num, calculator.sign),
      num: 0
    })
  }


  function handleDecimal(event) {
    event.preventDefault();
    const val = event.target.innerHTML;
    setCalculator({
      ...calculator,
      num: !calculator.num.toString().includes(".") ? calculator.num + val : calculator.num
    })
  }
  

  function handleEquals() {
    if (calculator.sign && calculator.num) {
      setCalculator({
        ...calculator,
        result: String(calculator.num) === "0" && calculator.sign === "÷"
                ? "Can't divide by 0."
                : String(doMath(Number(calculator.result), Number(calculator.num), calculator.sign)),
        sign: "",
        num: 0
      })
    }
  }

  function handlePlusMinus() {
    setCalculator({
      ...calculator,
      num: calculator.num ? String(Number(calculator.num) * -1) : calculator.num,
      result: calculator.result && calculator.sign ? String(Number(calculator.result) * -1) : 0,
    })
  }

  function clear() {
    setCalculator({
      sign: "",
      num: 0,
      result: 0
    })
  }

  return (
    <div className="App">
      <div className="screen">
      <h3>{calculator.num ? calculator.num : calculator.result}</h3>
      </div>
      <div className="button-area">
      <div className="nums-and-decimal-and-plusminus">
      {numButtons.map((num)=>{
        return <button className="num-one-through-nine" onClick={handleNumber} key={num} id={num}>{num}</button>
      })}
      <button className="zero" id="0" key="0" onClick={handleNumber}>0</button>
      <button className ="decimal-point" onClick={handleDecimal} id="decimalPoint">.</button>
      <button className="plusminus" key="plusminus" id="plusminus" onClick={handlePlusMinus}>+/-</button>
      </div>
      <div className="operators">
       { operatorButtons.map((op) => {
          return <button className="operator" id={op} key={op} onClick={handleOperator}>{op}</button>
        })}
      </div>
      <div className="equals-sign-area">
      <div className="bottom-row">
      <button id="=" onClick={handleEquals}>=</button>
      <button id="clear" onClick={clear}>Clear</button>
      </div>
      </div>
      

      </div>
    </div>
  );
}

export default App;