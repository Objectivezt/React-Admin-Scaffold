import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

export default class BlankLayout extends React.Component {
  static defaultProps = {
    history: {}
  };

  static propTypes = {
    history: PropTypes.object
  };

  componentDidMount() {
    this.props.history.push({
      pathname: '/tourist'
    });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
