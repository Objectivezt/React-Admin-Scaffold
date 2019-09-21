import React, { Component, Fragment } from 'react';
import { Carousel, Col, Divider, Row } from 'antd';
import { GlobalCard } from 'globalUI';
import { routerRedux } from 'dva/router';
import Hi from './Hi';
import styles from './index.less';

const path = require('path');

class HomePage extends Component {
  handleCardMore = () => {
    this.props.dispatch(routerRedux.push('/tourist/list'));
  };

  render() {
    return (
      <Fragment>
        {/* eslint-disable-next-line */}
        <iframe src={path.resolve(__dirname, '/iframe/index.html')}></iframe>
        <div className={styles.HeadlineBox}>
          <h2 className={styles.Headline}>————头条信息————</h2>
          <span className={styles.HeadlineDesc}>
            <Hi name="scaffold" />
          </span>
        </div>
        <div className={styles.content}>
          <Row gutter={8}>
            <Col span={16}>
              <Carousel autoplay>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
            </Col>
            <Col span={8}>
              <GlobalCard title="123" extra="更多">
                123
              </GlobalCard>
            </Col>
            <Col span={16}>
              <GlobalCard title="123">123</GlobalCard>
            </Col>
            <Col span={8}>
              <GlobalCard title="123">123</GlobalCard>
            </Col>
          </Row>
          <Divider>{1231223}</Divider>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
