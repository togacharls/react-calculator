import './CalculatorKeyboard.css';
import { CalculatorContext } from './App.js';

function CalculatorKeyboard(props) {
  const buttons = props && props.buttons ? props.buttons : [];
  const rows = buttons.reduce((rows, button, index) => {
    index % 4 === 0 ? rows.push([button]) : rows[rows.length-1].push(button);
    return rows;
  }, []);
  return (
    <CalculatorContext.Consumer>{ context =>
      <div className="keyboard">
        {
          rows.map((row, index) => <div className="row" key={index}> {
            row.map(button => {
              const className = context && context.numbers && context.numbers.includes(button) ? 'number' : '';
              return <button key={button} className={className} onClick={() => props.onClickButton(button)}>{button}</button>
            })
          }</div>)
        }
      </div>
    }</CalculatorContext.Consumer>
  );
}

export default CalculatorKeyboard;
