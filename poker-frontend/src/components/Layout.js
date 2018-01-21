import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeNavSelected, logout } from '../actions/index';
import { NavLink } from 'react-router-dom'
import LogIn from './LogIn';
import SignUp from './SignUp'
import Home from './Home';
import NotFound from './NotFound';
import UserRoute from './UserRoute';
import GuestRoute from './GuestRoute';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';
import '../App.css'
const { Header, Content, Footer } = Layout;



let layout = ({ selectedKey, isAuthenticated, onClick, logout, location }) => (
    <Layout>
        <Header style={{ position: 'fixed', width: '100%', padding: '0px' }}>
            <div className="logo" />
            {isAuthenticated ? <UserMenu onClick={onClick} logout={logout} selectedKey={selectedKey} /> : <GuestMenu onClick={onClick} selectedKey={selectedKey} />}
            
        </Header>

        <Content style={{ minHeight:"85vh", marginTop: '70px' }}>
            <Switch>
                <Route location={location} exact path="/Home" component={Home} />
                <GuestRoute location={location} exact path="/SignUp" component={SignUp} />
                <GuestRoute location={location} exact path="/LogIn" component={LogIn} />
                <Route location={location} exact path="/" component={Home} />
                <Route location={location} component={NotFound} />
            </Switch>
        </Content>

        <Footer style={{ textAlign: 'center'}}>
            fuck i am so out of my league
   </Footer>
    </Layout>

);

const mapStateToProps = (state) => {
    return {
        selectedKey: state.rootReducer.navBar.selected,
        isAuthenticated: !!state.user.token
    }
}



 const siteLayout = connect(
    mapStateToProps,
    { onClick: changeNavSelected,
    logout }
)(layout);


export default siteLayout;