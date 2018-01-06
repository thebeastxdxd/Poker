import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import'../Form.css';
import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span:  8},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button" {...tailFormItemLayout}>
            Log in
          </Button>
          Or <NavLink to="SignUp">Sign Up</NavLink>
        </FormItem>
        <Route path="/SignUp" component={SignUp} />
      </Form>
      
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;