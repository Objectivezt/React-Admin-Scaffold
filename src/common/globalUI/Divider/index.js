import React, { Component, Fragment } from 'react';
import { Divider } from 'antd';
import { globalDividerProps } from 'common/config';

export default class GlobalDivider extends Component {
	render() {
		const { children } = this.props;
		return (
			<Fragment>
				<Divider {...globalDividerProps}>{children}</Divider>
			</Fragment>
		)
	}
}
