import React, { Component, Fragment } from 'react';
import { globalCardProps } from 'common/config';
import { Card } from 'antd';

const styles = {
	marginBottom: '20px',
	minHeight: '200px'
}

export default class GlobalCard extends Component {
	render() {
		const { title, children } = this.props;
		return (
			<Fragment>
				<Card
					{...globalCardProps}
					title={title}
					style={styles}
				>
					{children}
				</Card>
			</Fragment>
		)
	}
}
