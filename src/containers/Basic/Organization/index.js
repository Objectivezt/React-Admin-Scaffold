import React, { Component, Fragment } from 'react'

import PageHeader from 'components/PageHeader';

const content = () => {
	return (
		<Fragment>
			Organization
		</Fragment>
	)
}

export default class Organization extends Component {
	render() {
		return (
			<Fragment>
				<PageHeader breadcrumbList={[{}]} content={content()} />

			</Fragment>
		);
	}
}
