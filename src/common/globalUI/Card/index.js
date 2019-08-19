import React, { Component, Fragment } from 'react';
import { globalCardProps } from '@common/config';
import { Card } from 'antd';

export default class GlobalCard extends Component {
	render() {
		const { title, children, extra, height } = this.props;
		let styles = {
			marginBottom: '20px',
			minHeight: '200px'
		};
		if (height) {
			styles.minHeight = height + 'px';
		}
		return (
			<Fragment>
				<Card
					{...globalCardProps}
					title={title}
					extra={extra}
					style={styles}
				>
					{children}
				</Card>
			</Fragment>
		);
	}
}
