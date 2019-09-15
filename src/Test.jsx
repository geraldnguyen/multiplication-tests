import React, { PureComponent } from "react";

export default class Test extends PureComponent {
  checkAnswer = event => {
    const { number1, number2 } = this.props;
    const answer = event.target.value;
    this.setState({ result: number1 * number2 === parseInt(answer, 10) });
  };

  render() {
    const { number1, number2 } = this.props;
    const { result } = this.state || {};
    const className = result === undefined ? "" : result ? "correct" : "wrong";

    return (
      <div className={className}>
        <span className="question">{`${number1} x ${number2} = ?`}</span>
        <input type="number" className="answer" onChange={this.checkAnswer} />
      </div>
    );
  }
}
