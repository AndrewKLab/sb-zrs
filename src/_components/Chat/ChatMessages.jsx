import React, { useEffect } from "react";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import { chatActions } from "../../_actions";
import { connect } from 'react-redux';

const ChatMessages = ({ dispatch, message_loadmore_loading, check_new_messages_error, selected_chat, jwt, ChatMessagesEmptyComponent, scrollToBottom }) => {

    useEffect(() => {
        scrollToBottom()
        // const timer = setInterval(() => checkNewMessages(selected_chat, jwt), 3000);
        // return () => clearInterval(timer);
    }, [selected_chat]);

    const checkNewMessages = (selected_chat, jwt) => {
        // dispatch(chatActions.checkNewMessagesByChat(jwt, selected_chat.chat_id, selected_chat.chat_user_id)).then(() => {
        //     console.log(selected_chat.messages.filter(message => message.read_status === "0"))
        //     if (check_new_messages_error === null) { scrollToBottom() }
        // })

        // selected_chat.messages.filter((message => selected_chat.chat_user_id === message.send_from))
        // let current_date = moment().format('YYYY-MM-DD HH:MM:SS')
        // var arr = selected_chat.messages.filter((message, index, array) => {
        //     if (selected_chat.chat_user_id === message.send_from) {

        //         console.log(moment(message.created).fromNow())
        //         if ((new Date() - new Date(current_date + ' ' + message.created)) < 3600 * 1000)
        //             return true;
        //         else
        //             return false;
        //     }
        // });
        // console.log(selected_chat.chat_id, selected_chat.chat_user_id, arr.length)
    }
    return (
        selected_chat.messages !== undefined &&
            selected_chat.messages.length > 0 ?
            <div className='messages'>
                {message_loadmore_loading === true && (<div className={`loadmore-messages-loading`}><CircularProgress size={20} /></div>)}
                {selected_chat.messages.map((item) => {
                    return (
                        <div key={item.message_id} className={`${selected_chat.chat_user_id === item.send_to ? 'mine' : 'yours'} w-100`}>
                            <div className={`${selected_chat.chat_user_id === item.send_to ? 'mine' : 'yours'} message last`}>
                                {item.message}
                                <div className={`messagetime-container`}>
                                    <div className={`messagetime-wrap`}>
                                        <span className={`messagetime`}>{moment(item.created).format('HH:mm')}</span>
                                        <span className={`messagetime`}>{selected_chat.chat_user_id === item.send_to ? item.read_status === "0" ? <DoneIcon /> : <DoneAllIcon /> : null}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
                }
            </div>
            : ChatMessagesEmptyComponent ? <ChatMessagesEmptyComponent /> : null
    );
};

function mapStateToProps(state) {
    const { message_loadmore_loading, get_more_messages_by_chat_error, selected_chat, check_new_messages_error } = state.chat;
    const { jwt } = state.authentication;
    return {
        jwt,
        message_loadmore_loading,
        get_more_messages_by_chat_error,
        selected_chat,
        check_new_messages_error
    };
}

const connectedChatMessages = connect(mapStateToProps)(ChatMessages);
export { connectedChatMessages as ChatMessages };