import React, { Component, Fragment } from 'react'

import PageHeader from 'components/PageHeader';

const content = () => {
	return (
		<Fragment>
			Home
		</Fragment>
	)
}

export default class oInput extends Component {
	render() {
		return (
			<Fragment>
				<PageHeader breadcrumbList={[{}]} content={content()} />
			</Fragment>
		);
	}
}
