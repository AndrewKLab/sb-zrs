import React from "react";

import moment from "moment";
import { Avatar } from "../";

export const ChatDialogUser = ({ onClick, className, name, avatar, lastmessage, lastmessagetime }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`chat-dialog-user${styleClass}`} onClick={onClick}>
            <Avatar className={`chat-dialog-user-avatar`} src={avatar} alt={'name'}/>     
            <div className={`chat-dialog-user-data`}>
                <div className="d-flex grid-justify-xs-space-between"><span>{name}</span><span className='chat-dialog-user-last-message-time'>{lastmessagetime && moment(lastmessagetime).startOf('hour').fromNow()}</span></div>
                <div className={`chat-dialog-user-last-message-container`}><span className={`chat-dialog-user-last-message`}>{lastmessage ? lastmessage : 'Напишите что нибудь!'}</span></div>
            </div>
        </div>
    );
};