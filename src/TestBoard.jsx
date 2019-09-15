import React, { PureComponent } from "react";
import _ from "lodash";
import Test from "./Test";
import NumberOption from "./NumberOption";

export default class TestBoard extends PureComponent {
  constructor() {
    super();
    this.state = {
      numbers: this.getInitialNumbers()
    };
  }

  getInitialNumbers = () => {
    const initialNoOfTests = 2;
    return _.range(0, 11).map(n => ({
      number: n,
      noOfTests: initialNoOfTests,
      tests: this.generateTests(n, initialNoOfTests),
      selected: false
    }));
  };

  selectNumber = n => {
    const { numbers } = this.state;
    const updatedNumbers = [...numbers];
    updatedNumbers[n].selected = !numbers[n].selected;
    this.setState({ numbers: updatedNumbers });
  };

  setNumberTests = n => noOfTests => {
    const { numbers } = this.state;
    const updatedNumbers = [...numbers];
    updatedNumbers[n].noOfTests = Math.min(10, Math.max(0, noOfTests));
    updatedNumbers[n].tests = this.generateTests(n, updatedNumbers[n].noOfTests, updatedNumbers[n].tests)
    this.setState({ numbers: updatedNumbers });
  };

  resetSelection = event => {
    this.setState({ numbers: this.getInitialNumbers()});
  };

  recordAnswer = test => answer => {
    test.answer = answer;
  };

  generateTests(number, noOfTests, existingTests) {
    if (existingTests && existingTests.length > noOfTests){
      return existingTests;
    }
    const used = _.range(0, 10).map(n => existingTests ? undefined !== existingTests.find (({number1, number2}) => number2 === n) : false);

    return _.range(0, noOfTests).map(t => {
      if (existingTests && t < existingTests.length){
        return existingTests[t];
      }
      const number1 = number;
      let number2 = Math.floor(Math.random() * 10);
      while (used[number2]) {
        number2 = Math.floor(Math.random() * 10);
      }
      
      used[number2] = true;

      return { number1, number2 };
    });
  }

  render() {
    const { numbers } = this.state;

    return (
      <React.Fragment>
        <h1>How are your multiplication skill?</h1>
        <div>
          <h2>Select number table(s)</h2>
          <ul id="number-selectors">
            {numbers.map(n => {
              return (
                <li key={n.number} className="number-option">
                  <NumberOption
                    number={n.number}
                    selected={n.selected}
                    noOfTests={n.noOfTests}
                    onSelect={this.selectNumber}
                    onChangeNoOfTests={this.setNumberTests(n.number)}
                  />
                </li>
              );
            })}
          </ul>
          <button onClick={this.resetSelection}>Clear all</button>
        </div>
        <div>
          <h2>Now, do the tests</h2>
          <ul id="numbers-lister">
            {numbers
              .filter(n => n.selected)
              .map(n => {
                return (
                  <li key={n.number}>
                    <h3>Number: {n.number}</h3>
                    <ul id="tests-lister">
                      {_.range(0, n.noOfTests).map(t => {
                        const test = n.tests[t];
                        return <li key={test.number2}><Test {...test} /></li>
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
