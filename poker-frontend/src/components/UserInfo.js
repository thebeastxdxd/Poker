import React from 'react';
import { Card, Icon, Avatar, Progress, Row, Col } from 'antd';
import FollowingList from './FollowingList';


export default ({avatarSrc, username, type, games, wins, followed, followers}) => {
    let progress = wins/games ? wins/games : 0
    
    return ( 
        <div>
            <Row style={{ minHeight:'250px'}}>
                <Col span={6}><Avatar src={avatarSrc ?  "data:image/jpeg;base64," + avatarSrc.replace(/(\r\n|\n|\r)/gm, "") : ''} style={{width: '100%', minHeight:'250px', verticalAlign: 'middle', float: 'left', position: 'relative' }}/>
                </Col>
                <Col span={6}>  <div style={{padding: '10px', float:'left'}}>
                <h2 > Username: </h2> {username? username : '?'}
                <h2> Type: </h2> {type ? type : 'player'}
            </div></Col>
            <Col span={12}><FollowingList followed={followed} followers={followers} /></Col>
            </Row>
            <Row style={{minHeight:'300px', paddingTop: '3%'}}>
            <Col span={12} style={{width: '10%'}} > <Progress width={200} type="circle" percent={progress} format={percent => `${percent} %`} /></Col>
            <Col span={12} ><div style={{paddingLeft: '10%', float:'left'}}>
                <h2 > Games: </h2> {games ? games : 0}
                <h2> Wins: </h2> {wins ? wins : 0}
            </div> </Col>
            </Row >
        </div>
    );
}