/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'dva';

@connect(({ globalModel }) => ({
  globalModel
}))
export default class DrawerSetting extends Component {
  onChangeMultiPage = e => {
    const { changeMultiPage } = this.props;
    changeMultiPage(!e.target.checked);
  };

  onChangeLang = e => {
    this.props.dispatch({
      type: 'globalModel/changeLang',
      payloadLang: e.target.checked ? 'cn' : 'en'
    });
  };

  render() {
    return (
      <Fragment>
        <Checkbox onChange={this.onChangeMultiPage}>是否多页</Checkbox>
        <Checkbox onChange={this.onChangeLang} defaultChecked>
          是否中文
        </Checkbox>
      </Fragment>
    );
  }
}
