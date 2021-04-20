import React, { useEffect } from "react";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import { chatActions } from "../../_actions";

export const ChatMessages = ({ message_loadmore_loading, current_chat, user, }) => {

    useEffect(() => {
        const timer = setInterval(() => checkNewMessages(), 3000);
        return () => clearInterval(timer);
    }, []);

    const checkNewMessages = () => {
        
        // current_chat.messages.filter((message => current_chat.chat_user_id === message.send_from))
        // let current_date = moment().format('YYYY-MM-DD HH:MM:SS')
        // var arr = current_chat.messages.filter((message, index, array) => {
        //     if (current_chat.chat_user_id === message.send_from) {

        //         console.log(moment(message.created).fromNow())
        //         if ((new Date() - new Date(current_date + ' ' + message.created)) < 3600 * 1000)
        //             return true;
        //         else
        //             return false;
        //     }
        // });
        // console.log(current_chat.chat_id, current_chat.chat_user_id, arr.length)
    }
    return (
        <div className='messages'>
            {message_loadmore_loading === true && (<div className={`loadmore-messages-loading`}><CircularProgress size={20} /></div>)}
            {
                current_chat.messages.map((item, index) => {
                    return (
                        <div key={index} className={`${current_chat.chat_user_id === item.send_to ? 'mine' : 'yours'} w-100`}>
                            <div className={`${current_chat.chat_user_id === item.send_to ? 'mine' : 'yours'} message last`}>
                                {item.message}
                                <div className={`messagetime-container`}>
                                    <div className={`messagetime-wrap`}>
                                        <span className={`messagetime`}>{moment(item.created).format('HH:mm')}</span>
                                        <span className={`messagetime`}>{current_chat.chat_user_id === item.send_to ? item.read_status === "0" ? <DoneIcon /> : <DoneAllIcon /> : null}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};