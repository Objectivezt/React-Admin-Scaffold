import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const boxMullerRandom = function() {
  let phase = false;
  let x1;
  let x2;
  let w;
  let z;

  return (function() {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
};

export class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    setInterval(
      () =>
        this.setState({
          data: this.state.data.concat([boxMullerRandom()])
        });
      100
    );
  }

  randomData = (n = 30) => {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
  };

  render() {
    const sampleData = randomData(30);
    const sampleData100 = randomData(100);
    return (
      <Sparklines data={this.state.data} limit={20}>
        <SparklinesLine color="#1c8cdc" />
        <SparklinesSpots />
      </Sparklines>
    );
  }
}
