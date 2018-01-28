import React from 'react';
import {connect} from 'react-redux';
import { Steps, Button, message } from 'antd';
import SignUpForm from './SignUpForm';
import Avatar from './uploadAvatar';
import { isEmpty} from 'lodash'
import '../Steps.css'

const Step = Steps.Step;



class SignUp extends React.Component {
  steps = [{
    title: 'SignUp',
    content: <SignUpForm onRef={ref => {this.SignUpForm = ref}} />,
  },
    {
      title: 'Avtar Picture',
      content: <Avatar  />,
    },
   {
    title: 'Billing info',
    content: 'Enter your Billing info',
  }];

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      current:  0
    };
  } 
  componentWillMount() {
    let user = this.props.user
    let current = 0
    if(!!user) {
      return;
    }
    if(user.userName){
      current = 1
    }
    if(user.imageUrl){
      current = 2
    }
    this.setState({current})
  }

  checkUserAvatar(){
    if(this.props.user.imageUrl){
      return true
    }
    return false
  }
  onClick = (e) => {
    if(this.state.current === 0){
        this.SignUpForm.handleSubmit(e).then((errors) => {this.setState({errors}); this.next()})
    }
    if(this.state.current === 1){
        if(this.checkUserAvatar()){
          this.next()
        }
        else{
          message.warning('Are you sure you dont want to upload an avatar pic?', 3);
          this.next()
        }
    }  
  }
  next() {
    console.log(isEmpty(this.state.errors))
    if(isEmpty(this.state.errors)){
      const current = this.state.current + 1;
      this.setState({ current });
      }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div style={{margin: '5px 10px 0px 10px', paddingTop: '0px'}}>
        <Steps current={current}>
          {this.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{this.steps[this.state.current].content}</div>
        <div className="steps-action" style={{ textAlign: 'center'}} >
          {
            this.state.current < this.steps.length - 1
            &&
            <Button type="primary"  htmlType="submit" form={this.steps[this.state.current].title} onClick={this.onClick}>Next</Button>
          }
          {
            this.state.current === this.steps.length - 1
            &&
            <Button type="primary"  htmlType="submit" form={this.steps[this.state.current].title}  onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}




export default connect(mapStateToProps)(SignUp);