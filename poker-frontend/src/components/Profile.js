import React from 'react';
import { Card, Icon, Avatar, Spin } from 'antd';
import {connect} from 'react-redux';
import {  withRouter, Redirect } from 'react-router-dom';
import UserInfo from './UserInfo'
const { Meta } = Card;


class Profile extends React.Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {
        const {user, loading} = this.props
        console.log(user)
        return (
                <Spin spinning={loading} >
                    <div style={{ background: '#ECECEC', padding: '30px', minHeight:"85vh"}}>
                        <UserInfo avatarSrc={user.avatar} username={user.userName} type={user.player_type} games={user.stats.games} wins={user.stats.wins} />
                    </div>
                </Spin>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.rootReducer.profile.loading
    }
  }
  


const WrappedProfile = withRouter(connect(mapStateToProps)(Profile));



export default WrappedProfile;