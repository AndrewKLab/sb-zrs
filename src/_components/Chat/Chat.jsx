import React, { useEffect } from "react";
import { ChatDialogs, ChatCurrentDialog, Loading } from "../";
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";

const Chat = ({ dispatch, jwt, className, caht_loading, chats }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
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
    if(caht_loading){
        return <Loading/>
    }
    return (
        <div className={`chat${styleClass}`}>
            <ChatDialogs chats={chats}/>
            <ChatCurrentDialog />
        </div>
    );
};

function mapStateToProps(state) {
    const { caht_loading, chats } = state.chat;
    const { jwt } = state.authentication;
    return {
        caht_loading,
        chats,
        jwt
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };