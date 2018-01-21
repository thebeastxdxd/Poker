import React from 'react';
import '../Form.css'
import { Form, Input, Tooltip, Icon, Alert   } from 'antd';
import { connect } from 'react-redux';
import {signup} from '../actions/index';
import {assign} from 'lodash';

const FormItem = Form.Item;




class signUpForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.errors = {}
    this.state = {
      confirmDirty: false,
      errors: {}
    };
}
  componentDidMount() {
  this.props.onRef(this)
  }
  componentWillUnmount() {
  this.props.onRef(undefined)
  }
  addErrors(user){
    if(user && user.errors ){ 
        assign(this.errors, user.errors)
        this.setState({errors: this.errors})
    }
    console.log(this.errors)
    return this.errors
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.errors = {}
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.signup(values).catch(err => this.addErrors(err.response.data.user))
      }
    });
    return this.errors
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
    let {errors} = this.state
    
    
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
          {errors.email && <Alert message={errors.email} type='error' showIcon />}
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
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }, {pattern: '^[a-zA-Z0-9_-]{3,50}$', message:'Username has to be atleast 3 letters long and only have letters of the alphabet, numbers, and _ - '}],
          })(
            <Input />
          )}
          {errors.userName && <Alert message={errors.userName} type='error' showIcon />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            },{pattern: '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$', message:'Password has to have atleast 1 uppercase letter, 1 special letter, 1 number, 3 lowercase letters.'},
             {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
          {errors.password && <Alert message={errors.password} type='error' showIcon />}
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
          {errors.confirm && <Alert message={errors.confirm} type='error' showIcon />}
        </FormItem>
        
      </Form>
    );
  }
}

const WrappedSignUpForm = connect(null, {signup})(Form.create()(signUpForm));

export default WrappedSignUpForm;