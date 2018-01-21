import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert  } from 'antd';
import '../Form.css';
import {connect} from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import {login, loginToSignup} from '../actions/index';
import {assign, isEmpty} from 'lodash';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.errors = {}
        this.state = {
            errors: {},
            fireRedirect: false
        }
        this.onClick = props.onClick;
    }
    addErrors(user){
        if(user && user.errors ){ 
            assign(this.errors, user.errors)
            this.setState({errors: this.errors})
        }
        return this.errors
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.errors = {}
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values).catch(err => this.addErrors(err.response.data.user)).then(() => {if(isEmpty(this.errors)){console.log('should rerender',this.errors);this.setState({fireRedirect: true})}});    
            }
        })
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let {errors, fireRedirect} = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        

        return (
                <div>
                <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal" > 
                  {errors.global && <Alert {...formItemLayout} style={{width: '66.66666667%'}} message={errors.global} type='error' showIcon  />}
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <NavLink to="/SignUp" onClick={this.onClick}>Sign Up</NavLink>
                    </FormItem>
                </Form> 
                {fireRedirect && (
                    
                    <Redirect exact from='/LogIn' to='/Home'/>
                )}
                </div>
        );
    }
}



const WrappedLoginForm = withRouter(connect(null, {onClick: loginToSignup, login})(Form.create()(LoginForm)));



export default WrappedLoginForm;