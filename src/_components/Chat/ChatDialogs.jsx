import React, { useState } from "react";
import { Grid, ChatDialogUser } from "../";

export const ChatDialogs = ({className, chats, selectChat}) => {
    let styleClass = className !== undefined ? ' ' + className : '';


    return (
        <Grid item xs={12} sm={4} className={`chat-dialogs${styleClass}`}>
            <div className="chat-dialogs-header">
                <input />
            </div>
            <div className={`chat-dialog-users`}>
            {chats.map((item, index) => (
                <ChatDialogUser
                    key={index}
                    name={item.chat_user_name}
                    avatar={item.chat_user_avatar}
                    lastmessage={item.chat_last_message}
                    lastmessagetime={item.chat_last_message_time}
                    onClick={() => selectChat(item)}
                />
            ))}
            </div>
        </Grid>
    );
};