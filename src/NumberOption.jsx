import React, { PureComponent } from "react";

export default class NumberOption extends PureComponent {
  noOfTestsRef = React.createRef();

  selectNumber = () => {
    this.props.onSelect(this.props.number);
  };
  changeNoOfTest = delta => {
    const currentInput = this.noOfTestsRef.current;
    if (typeof delta === "number") {
      currentInput.value = parseInt(currentInput.value, 10) + delta;
    }
    this.props.onChangeNoOfTests(currentInput.value);
  };
  increaseNoOfTests = () => {
    this.changeNoOfTest(1);
  };

  decreaseNoOfTests = () => {
    this.changeNoOfTest(-1);
  };

  render() {
    const { number, selected, noOfTests } = this.props;

    return (
      <div>
        <input
          value={number}
          type="checkbox"
          onChange={this.selectNumber}
          checked={selected}
        />
        <span>{number}</span>
        Number of tests:
        <input
          type="number"
          onChange={this.changeNoOfTest}
          value={noOfTests}
          ref={this.noOfTestsRef}
        />
        <button onClick={this.increaseNoOfTests}>+</button>
        <button onClick={this.decreaseNoOfTests}>-</button>
      </div>
    );
  }
}
