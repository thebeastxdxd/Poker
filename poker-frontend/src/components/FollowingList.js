import React from 'react';
import { Collapse, List } from 'antd';
const Panel = Collapse.Panel;


export default ({followed, followers}) => {
    return ( 
        <Collapse defaultActiveKey={['1']}>
        <Panel header="Followers" key="1">
        <List
                bordered
                dataSource={followers}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                />
        </Panel>
        <Panel header="Followed" key="2">
        <List
                bordered
                dataSource={followed}
                renderItem={item => (<List.Item>{item}</List.Item>)}
                />
        </Panel>
    </Collapse>
    );
}