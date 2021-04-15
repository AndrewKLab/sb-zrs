import React, { useEffect, useState } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading, Paper, Grid } from "../";
import { connect } from 'react-redux';
import { chatActions, messageActions } from "../../_actions";

const Chat = ({ dispatch, jwt, user, className, chat_loading, chats, message_loading, messages, message_loadmore_loading, message_loadmore_error }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [offset, setOffset] = useState(20);

    useEffect(() => {
        dispatch(chatActions.getAllChatsByUser(jwt))
        // if (user.roles === 'ROLE_ADMIN' || user.roles === 'ROLE_SUPER_ADMIN') {
        //     dispatch(userActions.readAll(jwt)).then(
        //         () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
        //             () => setLoading(false)))
        // } else {
        //     history.push('/');
        // }
    }, []);



    const selectChat = (item) => {
        dispatch(messageActions.getMessagesByChat(jwt, item.chat_id, 0)).then(()=>{
            setOffset(20)
            setSelectedDialog(item)
        })
    }

    if (chat_loading) {
        return <Loading />
    }
    return (

        <Paper square>
            <Grid container className={`chat${styleClass}`}>
                <ChatDialogs
                    chats={chats}
                    selectChat={selectChat}
                />
                <ChatCurrentDialog
                    dispatch={dispatch}
                    jwt={jwt}
                    user={user}
                    offset={offset}
                    setOffset={setOffset}
                    message_loading={message_loading}
                    messages={messages}
                    message_loadmore_loading={message_loadmore_loading} 
                    message_loadmore_error={message_loadmore_error}
                    selectedDialog={selectedDialog}
                />
            </Grid>
        </Paper>
    );
};

function mapStateToProps(state) {
    const { message_loading, messages, message_loadmore_loading, message_loadmore_error } = state.message;
    const { chat_loading, chats,  } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        message_loading,
        messages,
        message_loadmore_loading,
        message_loadmore_error
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };