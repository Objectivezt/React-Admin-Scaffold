import React, { Component, Fragment } from 'react';
import { Card, Form } from "antd";
import { FormComponentProps } from 'antd/es/form';

interface CURDFormProps extends FormComponentProps {

}

class CURDTS extends Component<CURDFormProps, any> {
  render() {
    return (
      <Fragment>
        <Card>
          123
        </Card>
      </Fragment>
    );
  }
}


const App = Form.create<CURDFormProps>({
})(CURDTS);

export default App;