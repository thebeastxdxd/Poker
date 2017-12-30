import React, { Children } from 'react';
import { Menu } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { onNavBarClick } from '../actions/index';
import { NavLink } from 'react-router-dom'
import LogIn from './LogIn';
import SignUp from './SignUp'
import Home from './Home';



let NavBar = ({ selectedKey, onClick }) => (
    <div>
        <Menu
            onClick={onClick}
            selectedKeys={[selectedKey]}
            mode="horizontal"
        >
            <Menu.Item key="Home">
                <NavLink to="Home">
                    Home
            </NavLink>
            </Menu.Item>
            <Menu.Item key="LogIn">
                <NavLink to="LogIn">
                    Log In
            </NavLink>

            </Menu.Item>

            <Menu.Item key="SignUp">
                <NavLink to="SignUp">
                    Sign Up
            </NavLink>

            </Menu.Item>
        </Menu>
        <div className="content">
            <Switch>
                <Route path="/LogIn" component={LogIn} />
                <Route path="/SignUp" component={SignUp} />
                <Route path="/Home" component={Home} />
            </Switch>
        </div>
    </div>



);

const mapStateToProps = (state) => {
    return {
        selectedKey: state.rootReducer.NavBar.selected
    }
}



NavBar = connect(
    mapStateToProps,
    { onClick: onNavBarClick }
)(NavBar);


export default NavBar;