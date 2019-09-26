import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '@components/PageHeader';
import styles from './index.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '20px  0' }} className={wrapperClassName}>
    <PageHeader
      key="pageHeader"
      style={{ margin: '20px  0', backgroundColor: '#f0f2f5' }}
      {...restProps}
      linkElement={Link}
    />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
