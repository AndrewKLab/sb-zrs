import React from "react";
import { Paper, ChatDialogUser } from "../";

export const ChatDialogs = ({ children, className, chats }) => {
    let styleClass = className !== undefined ? ' ' + className : '';


    return (
        <Paper square className={`chat-dialogs${styleClass}`}>
            {chats.map((item, index) => (
                <ChatDialogUser key={index} name={item.chat_user_name} avatar={item.chat_user_avatar} lastmessage={item.chat_last_message} lastmessagetime={item.chat_last_message_time} />
            ))}
        </Paper>
    );
};