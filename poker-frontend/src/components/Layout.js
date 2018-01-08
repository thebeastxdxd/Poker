import React, { Children } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { onNavBarClick } from '../actions/index';
import { NavLink } from 'react-router-dom'
import LogIn from './LogIn';
import SignUp from './SignUp'
import Home from './Home';
const { Header, Content, Footer, Sider } = Layout;



let siteLayout = ({ selectedKey, onClick }) => (
    <Layout>
        <Header style={{ position: 'fixed', width: '100%'  }}>
            <div className="logo" />
            <Menu
                onClick={onClick}
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="horizontal"
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="Home" >
                <Icon type="home" /> Home
                <NavLink to="Home" />
                </Menu.Item>
                <Menu.Item key="LogIn">
                <Icon type="unlock" />Log In
                    <NavLink to="LogIn" />
                </Menu.Item>

                <Menu.Item key="SignUp">
                <Icon type="user-add" />Sign Up
                    <NavLink to="SignUp" />
                </Menu.Item>
            </Menu>
        </Header>

        <Content style={{ height:"85vh", padding: '0 50px', marginTop: 64 }}>
                <Route path="/SignUp" component={SignUp} />
                <Route path="/LogIn" component={LogIn} />
                <Route path="/Home" component={Home} />

        </Content>

        <Footer style={{ textAlign: 'center'}}>
            fuck i am so out of my league
   </Footer>
    </Layout>

);

const mapStateToProps = (state) => {
    return {
        selectedKey: state.rootReducer.NavBar.selected
    }
}



siteLayout = connect(
    mapStateToProps,
    { onClick: onNavBarClick }
)(siteLayout);


export default siteLayout;