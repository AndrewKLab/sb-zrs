import React, { useEffect, useState } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading, Paper, Grid } from "../";
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";

const Chat = ({ dispatch, jwt, user, className, chat_loading, chats, message_loading, messages, message_loadmore_loading, message_loadmore_error }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [offset, setOffset] = useState(20);

    useEffect(() => {
        dispatch(chatActions.getAllChatsByUser(jwt))
    }, []);



    const selectChat = (item) => {
        dispatch(chatActions.getMessagesByChat(jwt, item.chat_id, 0)).then(() => {
            setSelectedDialog(item.chat_id)
            setOffset(20)
        })
    }

    return (

        <Paper square>
            <Grid container className={`chat${styleClass}`}>
                <ChatDialogs
                    chat_loading={chat_loading}
                    chats={chats}
                    selectChat={selectChat}
                />
                <ChatCurrentDialog
                    offset={offset}
                    setOffset={setOffset}
                    chat_id={selectedDialog}
                />
            </Grid>
        </Paper>
    );
};

function mapStateToProps(state) {
    const { chat_loading, chats, message_loading, message_loadmore_loading, message_loadmore_error } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        message_loading,
        message_loadmore_loading,
        message_loadmore_error
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };