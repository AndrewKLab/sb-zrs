import React, { useEffect, useState } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading, Paper, Grid } from "../";
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";

const Chat = ({ dispatch, jwt, user, className, chat_loading, chats, message_loading, messages, message_loadmore_loading, message_loadmore_error, selected_chat }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        dispatch(chatActions.getAllChatsByUser(jwt)).then(
            ()=>{
                setLoading(false);
            }
        )
    }, []);



    const selectChat = (item) => {
        if (selected_chat !== item.chat_id) {
            const openChats = chats.filter(chat => chat.messages !== undefined)
            var isOpen = openChats.filter((chat) => { return chat.chat_id !== selected_chat })
            if (isOpen.length !== 0) {
                console.log("Этот чат уже открыт")
                dispatch(chatActions.selectOpenChat(item.chat_id))
            } else {
                console.log("Этот чат еще не открыт")
                dispatch(chatActions.getMessagesByChat(jwt, item.chat_id, 0))
            }


        }
    }

    if(loading){
        return <Loading />
    }

    return (
        <Paper square>
            <Grid container className={`chat${styleClass}`}>
                <ChatDialogs
                    chat_loading={chat_loading}
                    chats={chats}
                    selectChat={selectChat}
                />
                <ChatCurrentDialog />
            </Grid>
        </Paper>
    );
};

function mapStateToProps(state) {
    const { chat_loading, chats, message_loading, message_loadmore_loading, message_loadmore_error, selected_chat } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        message_loading,
        message_loadmore_loading,
        message_loadmore_error,
        selected_chat
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };