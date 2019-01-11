import React, { Component, Fragment } from 'react'

import PageHeader from 'components/PageHeader';

const content = () => {
	return (
		<Fragment>
			Task
		</Fragment>
	)
}

export default class Task extends Component {
	render() {
		return (
			<Fragment>
				<PageHeader breadcrumbList={[{}]} content={content()} />

			</Fragment>
		);
	}
}
