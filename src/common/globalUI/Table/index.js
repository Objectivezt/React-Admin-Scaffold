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
      pageNum,
      pageSize
    });
    const tempPayloadMain = {
      ...filterObj,
      pageNum,
      pageSize
    };
    this.props.basePageRequest(tempPayloadMain);
  };

  onRowClick(item, index) {
    const { selectKeys, that, rowSelection } = this.props;
    const selectedRowKeys = selectKeys;
    const selectedRows = that.state.selectedRowKeys;
    if (rowSelection === 'checkbox') {
      if (selectKeys.indexOf(index + 1) === -1) {
        selectedRowKeys.push(index + 1);
        selectedRows.push(item);
        that.setState({ selectedRowKeys, selectedRows });
      } else {
        // eslint-disable-next-line no-underscore-dangle
        const index_ = selectKeys.indexOf(index + 1);
        selectedRowKeys.splice(index_, 1);
        selectedRows.splice(index_, 1);
        that.setState({ selectedRowKeys, selectedRows });
      }
    } else if (rowSelection === 'radio' || rowSelection === '') {
      that.setState({
        selectedRowKeys: index,
        selectedRows: item
      });
    }
  }

  updateSelectedItem(selectedRowKeys, selectedItem) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      selectedRowKeys,
      // eslint-disable-next-line react/no-unused-state
      selectedItem
    });
  }

  render() {
    const self = this;
    const {
      columns,
      loading,
      resList,
      resTotal,
      rowKeys,
      scrollX,
      rowSelection,
      selectKeys,
      that
    } = this.props;
    const { pageNum, pageSize } = this.state;
    const tempRowSelection = {
      type: rowSelection === 'checkbox' ? 'checkbox' : 'radio',
      selectedRowKeys: selectKeys,
      onChange: self.updateSelectedItem.bind(that)
    };
    return (
      <Table
        {...globalTableProps}
        columns={columns}
        dataSource={resList}
        loading={loading}
        rowKey={rowKeys}
        scroll={{ x: scrollX || '100%' }}
        rowSelection={rowSelection === false ? null : tempRowSelection}
        pagination={{
          ...globalPaginationProps,
          current: pageNum,
          total: resTotal,
          pageSize,
          showTotal: total => `总 ${total} 项`,
          onChange: () => this.changePage(pageNum, pageSize),
          onShowSizeChange: () => this.changePage(pageNum, pageSize)
        }}
        onRow={(item, index) => ({
          onClick: () => {
            this.onRowClick(item, index);
          }
        })}
      />
    );
  }
}
