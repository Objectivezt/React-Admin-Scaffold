import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
  Sparklines,
  SparklinesBars,
  SparklinesLine,
  SparklinesSpots,
  SparklinesReferenceLine,
  SparklinesNormalBand
} from 'react-sparklines';

export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [5, 10, 1, 3, 4, 5, 5, 20] };
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <Sparklines data={this.state.data}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </Col>
        <Col span={12}>
          <Sparklines data={this.state.data}>
            <SparklinesBars />
          </Sparklines>
        </Col>
        <Col span={12}>
          <Sparklines data={this.state.data}>
            <SparklinesLine style={{ fill: 'none' }} />
            <SparklinesSpots />
          </Sparklines>
        </Col>
        <Col span={12}>
          <Sparklines data={this.state.data}>
            <SparklinesLine />
            <SparklinesReferenceLine type="mean" />
          </Sparklines>
        </Col>
        <Col span={12}>
          <Sparklines data={this.state.data}>
            <SparklinesLine style={{ fill: 'none' }} />
            <SparklinesNormalBand />
          </Sparklines>
        </Col>
      </Row>
    );
  }
}
