import React from 'react';
import {  Menu, Icon, Input } from 'antd';
import { NavLink } from 'react-router-dom'
const Search = Input.Search;

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

                <Menu.Item key="/Logout">
                <Icon type="logout" />
                    Logout
                <NavLink to="/Home" />
                </Menu.Item> 

                <Menu.Item key="/Search" style={{float: 'right'}}>
                <Search
                placeholder="search user"
                onSearch={value => console.log(value)}
                enterButton
                />
                </Menu.Item>
            </Menu>
    );
}

export default UserMenu;