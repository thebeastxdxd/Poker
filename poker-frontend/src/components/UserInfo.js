import React from 'react';
import { Card, Icon, Avatar, Progress } from 'antd';


export default ({avatarSrc, username, type, games, wins}) => {
    let progress = wins/games ? wins/games : 0
    
    return ( 
        <div>
        <div style={{width: '100%', minHeight:'250px'}}>
            <Avatar src={avatarSrc ?  "data:image/jpeg;base64," + avatarSrc.replace(/(\r\n|\n|\r)/gm, "") : ''} style={{width: '20%', minHeight:'250px', verticalAlign: 'middle', float: 'left', position: 'relative' }}/>
            <div style={{padding: '10px', float:'left'}}>
                <h2 > Username: </h2> {username? username : '?'}
                <h2> Type: </h2> {type ? type : 'player'}
            </div>
        </div>
            <div style={{width: '20%', minHeight:'300px', paddingTop: '5%'}}>
            <Progress width={200} type="circle" percent={progress} format={percent => `${percent} %`} />
            <div style={{padding: '10px', float:'left'}}>
                <h2 > Games: </h2> {games ? games : 0}
                <h2> Wins: </h2> {wins ? wins : 0}
            </div>
            </div>
        </div>
    );
}