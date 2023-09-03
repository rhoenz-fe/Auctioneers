import React from 'react';
import { Layout, Menu, Typography, Button, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const menu = (
    <Menu>
        <Menu.Item key="1" icon={<LogoutOutlined />}>
            Logout
        </Menu.Item>
    </Menu>
);

const Header = () => {
    return (
        <AntHeader className='d-flex' style={{ position: 'fixed', zIndex: 1, width: '100%', top: 0, justifyContent: 'space-between', alignItems: 'center' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <h3 className='mt-3 mr-5'>AUCTIONEERS</h3>
                <Menu.Item key="1">Listing</Menu.Item>
            </Menu>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
                <Text style={{ marginRight: '16px', color: 'white' }}>Welcome Back, Profilename</Text>
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Button icon={<UserOutlined />} type="text" style={{ color: 'white' }} />
                </Dropdown>
            </div>
        </AntHeader>
    );
};

export default Header;
