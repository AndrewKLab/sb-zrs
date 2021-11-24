import React, { useEffect, useState } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading, Paper, Grid, Alert } from "../";
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";

const Chat = ({ dispatch, jwt, user, className, chat_loading, chat_error, chats, message_loading, messages, message_loadmore_loading, message_loadmore_error, selected_chat }) => {
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
        if(selected_chat === null){
            dispatch(chatActions.getMessagesByChat(jwt, item, 0))
        } else {
            if(selected_chat.chat_id !== item.chat_id){
                dispatch(chatActions.getMessagesByChat(jwt, item, 0))
            } else {
                console.log("Этот чат уже открыт")
            }
        }



        // if (selected_chat.chat_id === item.chat_id) {
        //     console.log("Этот чат уже открыт")
        //     dispatch(chatActions.selectOpenChat(item.chat_id))

        //     const openChats = chats.filter(chat => chat.messages !== undefined)
        //     var isOpen = openChats.filter((chat) => { return chat.chat_id !== selected_chat })
        //     if (isOpen.length !== 0) {
                
                
        //     } else {
        //         console.log("Этот чат еще не открыт")
                
        //         dispatch(chatActions.getMessagesByChat(jwt, item, 0))
        //     }


        // }
    }

    if(loading) return <Loading />
    if(chat_error) return <Alert>{chat_error}</Alert>

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
    const { chat_loading, chat_error, chats, message_loading, message_loadmore_loading, message_loadmore_error, selected_chat } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chat_error,
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