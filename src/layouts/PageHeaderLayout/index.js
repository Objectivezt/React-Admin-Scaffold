import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '@components/PageHeader';
import styles from './index.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-16px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageHeader" {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
