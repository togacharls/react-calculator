import './CalculatorScreen.css';

function CalculatorScreen(props) {
  return (
    <div className="screen">
      <span className="operation">{props.operation}</span>
      <span className="result">{props.result}</span>
    </div>
  );
}

export default CalculatorScreen;
