/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Checkbox } from 'antd';

export default class DrawerSetting extends Component {
  onChange = e => {
    const { changeMultiPage } = this.props;
    changeMultiPage(!e.target.checked);
  };

  render() {
    return <Checkbox onChange={this.onChange}>是否多页</Checkbox>;
  }
}
