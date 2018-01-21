import React from 'react';
import {  Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'

const GuestMenu = ({selectedKey,onClick}) => {
    return ( 
        <Menu
                onClick={(e) => onClick(e.key)}
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="horizontal"
                style={{ lineHeight: '70px' }}
            >
                <Menu.Item key="/Home" >
                <Icon type="home" /> Home
                <NavLink to="/Home" />
                </Menu.Item>
               
                <Menu.Item key="/LogIn" style>
                <Icon type="login" />Log In
                    <NavLink to="/LogIn" />
                </Menu.Item>
                <Menu.Item key="/SignUp">
                <Icon type="user-add" />Sign Up
                    <NavLink to="/SignUp" />
                </Menu.Item>

            </Menu>
    );
}



export default GuestMenu;