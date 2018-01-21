import React from 'react';
import { Steps, Button, message } from 'antd';
import SignUpForm from './SignUpForm';
import { isEmpty} from 'lodash'
import '../Steps.css'

const Step = Steps.Step;



class SignUp extends React.Component {
  steps = [{
    title: 'SignUp',
    content: <SignUpForm onRef={ref => {this.SignUpForm = ref}} />,
  }, {
    title: 'Billing info',
    content: 'Enter your Billing info',
  }, {
    title: 'Avtar Picture',
    content: 'Upload Avatar Pic',
  }];

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      current: 0,
    };
  }
  onClick = (e) => {
    Promise.resolve(
      this.SignUpForm.handleSubmit(e)
    ).then((errors) => {console.log('please', errors);this.setState({errors}); this.next()})
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
      <div style={{margin: '5px 10px 0px 10px'}}>
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

export default SignUp;