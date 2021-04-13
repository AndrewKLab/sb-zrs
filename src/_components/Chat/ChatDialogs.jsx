import React, { useState } from "react";
import { Grid, ChatDialogUser } from "../";
import { messageActions } from "../../_actions";

export const ChatDialogs = ({ dispatch, jwt, className, chats, selectedDialog, setSelectedDialog }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [offset, setOffset] = useState(0);

    const selectChat = (item) => {
        dispatch(messageActions.getMessagesByChat(jwt, item.chat_id, offset))
        setSelectedDialog(item)
    }

    return (
        <Grid item xs={12} sm={4} className={`chat-dialogs${styleClass}`}>
            <div className="chat-dialogs-header">
                <input />
            </div>
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
        </Grid>
    );
};