import React from "react";

export const ChatDialogUser = ({ children, className, name, avatar, lastmessage, lastmessagetime }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`chat-dialog-user${styleClass}`}>
            <img className={`chat-dialog-user-avatar`} src={avatar} alt={'name'}/>      
            <div className={`chat-dialog-user-data`}>
                <div className="d-flex grid-justify-xs-space-between"><span>{name}</span><span className='chat-dialog-user-last-message-time'>{lastmessagetime}</span></div>
                <div className={`chat-dialog-user-last-message-container`}><span className={`chat-dialog-user-last-message`}>{lastmessage}</span></div>
            </div>
        </div>
    );
};