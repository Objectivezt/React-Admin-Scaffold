import React, { Component } from 'react';
import { Table } from 'antd';
import { globalPaginationProps, globalTableProps } from '@common/config';

export default class GlobalTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageNum: 1,
			pageSize: 10
		};
	}

	changePage = (pageNum, pageSize) => {
		const { filterObj } = this.props;
		this.setState({
			pageNum: pageNum,
			pageSize: pageSize
		});
		let tempPayloadMain = {
			...filterObj,
			pageNum: pageNum,
			pageSize: pageSize
		};
		this.props.basePageRequest(tempPayloadMain);
	};

	render() {
		const {
			columns,
			loading,
			resList,
			resTotal,
			rowKeys,
			scrollX
		} = this.props;
		const { pageNum, pageSize } = this.state;
		return (
			<Table
				{...globalTableProps}
				columns={columns}
				dataSource={resList}
				loading={loading}
				rowKey={rowKeys}
				scroll={{ x: scrollX || '100%' }}
				pagination={{
					...globalPaginationProps,
					current: pageNum,
					total: resTotal,
					pageSize: pageSize,
					showTotal: total => `总 ${total} 项`,
					onChange: (pageNum, pageSize) =>
						this.changePage(pageNum, pageSize),
					onShowSizeChange: (pageNum, pageSize) =>
						this.changePage(pageNum, pageSize)
				}}
			/>
		);
	}
}
