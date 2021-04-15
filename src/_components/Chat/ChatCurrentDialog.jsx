import React, { useState } from "react";
import { Grid, Loading } from "../";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { messageActions } from "../../_actions";
import CircularProgress from '@material-ui/core/CircularProgress';

export const ChatCurrentDialog = ({ dispatch, jwt, user, offset, setOffset, className, selectedDialog, message_loading, messages, message_loadmore_loading, message_loadmore_error }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const [loadmore, setLoadMore] = useState(false);

    const loadMoreMessages = (list) => {
        const messages_list = list.target;
        if (messages_list.scrollHeight + (messages_list.scrollTop * 2) < messages_list.offsetHeight) {
            if (!loadmore && message_loadmore_error === undefined) {
                setLoadMore(true)
                dispatch(messageActions.getMoreMessagesByChat(jwt, selectedDialog.chat_id, offset)).then(
                    () => {
                        setOffset(offset + 20)
                        setLoadMore(false)
                    }
                )
            }
        }
    }
    return (
        <Grid item xs={12} sm={8} className={`chat-current-dialog bl-none center${styleClass}`}>
            {message_loading === true ? (
                <Loading className={`messages-loading`} />
            ) : (
                selectedDialog !== null ? (
                    <div className={`w-100 h-100`}>
                        <div className={`chat-current-dialog-header`}>
                            <div>
                                <span>{selectedDialog.chat_user_name}</span>
                            </div>
                            <div>
                                <SearchIcon />
                                <MoreHorizIcon />
                            </div>
                        </div>
                        <div className='messages' onScroll={loadMoreMessages}>
                            {messages.map((item, index) => {
                                return (
                                    <div key={index} className={`${user.id === item.send_from ? 'mine' : 'yours'} w-100`}>
                                        <div className={`${user.id === item.send_from ? 'mine' : 'yours'} message last`}>
                                            {item.message}
                                            <div className={`messagetime-container`}>
                                                <div className={`messagetime-wrap`}>
                                                    <span className={`messagetime`}>{moment(item.created).format('HH:mm')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {message_loadmore_loading === true ? (<div className={`loadmore-messages-loading`}><CircularProgress size={20} /></div>) : (<div className="min-height-block"> </div>)}
                        </div>
                        <div className="message-input">
                            <input />
                        </div>
                    </div>
                ) : (
                    <span className={`chat-select-dialog-alert`}>Выберите, кому бы выхотели написать</span>
                )

            )}


        </Grid>
    );
};