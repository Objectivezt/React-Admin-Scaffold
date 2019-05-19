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
						某某公司－某某某系列－某某平台部－某某技术分组－Web
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default class oInput extends Component {
	renderGuide = () => {
		const guideList = [
			{
				flowName: '步骤XX',
				item: ['XXX', 'XXXXX', 'XXXXXX']
			},
			{
				flowName: '步骤XXX',
				item: ['XXX', 'XXXXX', 'XXXXXX', 'XXXXXX']
			},
			{
				flowName: '步骤XXXXX',
				item: ['XXX', 'XXXXX', 'XXXXXX', 'XXXXXX', 'XXXXXX']
			}
		];
		return (
			<Fragment>
				{guideList.map((item, index) => {
					return (
						<Fragment>
							{
								<div>
									<span>{index + 1}</span>123
								</div>
							}
						</Fragment>
					);
				})}
			</Fragment>
		);
	};
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
