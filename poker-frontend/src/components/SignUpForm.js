import React from 'react';
import '../Form.css'
import { Form, Input, Tooltip, Icon,   } from 'antd';
const FormItem = Form.Item;



class signUpForm extends React.Component {
  
  constructor({errorValues}) {
    super()
    
    this.state = {
      confirmDirty: false,
    };
}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    }    
    else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if(value && value.length < 6) {
        callback( 'Password too short, should be atleast 6 characters')
    }
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 4 },
          sm: { span: 8 },
        },
      };
   


    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}  className="signup-form" id="SignUp"  >
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              userName&nbsp;
              <Tooltip title="What name do you want people to see?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your userName!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

      </Form>
    );
  }
}

const WrappedSignUpForm = Form.create()(signUpForm);

export default WrappedSignUpForm;