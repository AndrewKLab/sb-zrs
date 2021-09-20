import React, { useState } from "react";
import { Loading, ChatDialogUser } from "../";

export const ChatDialogs = ({ className, chats, selectChat, chat_loading }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`chat-dialogs${styleClass}`}>
            <div className="chat-dialogs-header">
            <input id={'chat-search-dialog-input'} name={'chat-search-dialog-input'} type={'text'} className='messages-input-plane' placeholder={'Поиск...'} autoComplete={"off"} />
            </div>
            { chat_loading === true ?
                <Loading className={`messages-loading`} />
                :
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
            }
        </div>
    );
};