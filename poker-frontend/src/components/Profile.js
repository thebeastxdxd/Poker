import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import {connect} from 'react-redux';
import {  withRouter, Redirect } from 'react-router-dom';
import UserInfo from './UserInfo'
const { Meta } = Card;


class Profile extends React.Component {
    constructor(props) {
        super(props)
    
    }
  
    render() {

        return (
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                <UserInfo />
                
                </div>
        );
    }
}



const WrappedProfile = withRouter(connect(null, )(Profile));



export default WrappedProfile;