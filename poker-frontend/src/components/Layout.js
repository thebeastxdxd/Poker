import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeNavSelected } from '../actions/index';
import { NavLink, withRouter } from 'react-router-dom'
import LogIn from './LogIn';
import SignUp from './SignUp'
import Home from './Home';
import '../App.css'
const { Header, Content, Footer } = Layout;



let siteLayout = ({ selectedKey, onClick }) => (
    <Layout>
        <Header style={{ position: 'fixed', width: '100%', padding: '0px' }}>
            <div className="logo" />
            <Menu
                onClick={(e) => onClick(e.key)}
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="horizontal"
                style={{ lineHeight: '70px' }}
            >
                <Menu.Item key="/Home" >
                <Icon type="home" /> Home
                <NavLink to="Home" />
                </Menu.Item>
                <Menu.Item key="/LogIn">
                <Icon type="unlock" />Log In
                    <NavLink to="LogIn" />
                </Menu.Item>

                <Menu.Item key="/SignUp">
                <Icon type="user-add" />Sign Up
                    <NavLink to="SignUp" />
                </Menu.Item>
            </Menu>
        </Header>

        <Content style={{ minHeight:"85vh", marginTop: '70px' }}>
            <Switch>
                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/LogIn" component={LogIn} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Content>

        <Footer style={{ textAlign: 'center'}}>
            fuck i am so out of my league
   </Footer>
    </Layout>

);

const mapStateToProps = (state) => {
    return {
        selectedKey: state.rootReducer.navBar.selected
    }
}



siteLayout = connect(
    mapStateToProps,
    { onClick: changeNavSelected }
)(siteLayout);


export default siteLayout;