import React, { useEffect, useState } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading, Paper, Grid } from "../";
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";

const Chat = ({ dispatch, jwt, user, className, chat_loading, chats, message_loading, messages }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [selectedDialog, setSelectedDialog] = useState(null);
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
    if (chat_loading) {
        return <Loading />
    }
    return (

        <Paper square>
            <Grid container className={`chat${styleClass}`}>
                <ChatDialogs
                    dispatch={dispatch}
                    jwt={jwt}
                    chats={chats}
                    selectedDialog={selectedDialog}
                    setSelectedDialog={setSelectedDialog}
                />
                <ChatCurrentDialog
                    user={user}
                    message_loading={message_loading}
                    messages={messages}
                    selectedDialog={selectedDialog}
                />
            </Grid>
        </Paper>
    );
};

function mapStateToProps(state) {
    const { message_loading, messages } = state.message;
    const { chat_loading, chats } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        message_loading,
        messages
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };