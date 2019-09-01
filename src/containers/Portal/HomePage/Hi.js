import React, { Component } from 'react';
import { Button } from 'antd';
export default class Hi extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            count: 0
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", null,
                "\u4F60\u70B9\u51FB\u4E86 ",
                this.state.count,
                " \u6B21"),
            React.createElement(Button, { onClick: () => { this.setState({ count: this.state.count + 1 }); } },
                "Hi ",
                this.props.name)));
    }
}
Hi.defaultProps = {
    firstName: '',
    lastName: ''
};
//# sourceMappingURL=Hi.js.map