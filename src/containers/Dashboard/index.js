import React, { Component, Fragment } from 'react';
import { Avatar } from 'antd';
import PageHeader from '@components/PageHeader';
import styles from './index.less';
import logo from '@assets/favicon.ico';

const content = () => {
	return (
		<Fragment>
			<div className={styles.pageHeaderContent}>
				<div className={styles.avatar}>
					<Avatar size="large" src={logo} />
				</div>
				<div className={styles.content}>
					<div className={styles.contentTitle}>
						早安，Objectivezt，祝你开心每一天！
					</div>
					<div>
						Web前端开发小码农 |
						平安科技－某某某系列－某某平台部－某某技术分组－Web
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default class oInput extends Component {
	render() {
		return (
			<Fragment>
				<PageHeader
					breadcrumbList={[{ key: '1' }]}
					content={content()}
					className={styles.pageHeader}
				/>
				<div className={styles.appContent}>main</div>
			</Fragment>
		);
	}
}
