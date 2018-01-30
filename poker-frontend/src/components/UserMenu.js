import React from 'react';
import {  Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
const UserMenu = ({selectedKey, onClick}) => {
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

                <Menu.Item key="/Profile" >
                <Icon type="user" /> Profile
                <NavLink to="/Profile" />
                </Menu.Item>

                <Menu.Item key="/Logout"  >
                <Icon type="logout" />
                    Logout
                <NavLink to="/Home" />
                </Menu.Item>        
            </Menu>
    );
}

export default UserMenu;