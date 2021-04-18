import React, { useState, useRef, useEffect } from "react";
import { Grid, Loading } from "../";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from "moment";
import { chatActions } from "../../_actions";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class ChatCurrentDialog extends React.Component {
    constructor(props) {
        super(props);
        // Не вызывайте здесь this.setState()!
        this.state = { loading: true };
    }

    // componentDidMount() {
    //     const { dispatch, jwt, selectedDialog, setOffset } = this.props

    //     dispatch(chatActions.getMessagesByChat(jwt, selectedDialog, 0)).then(() => {
    //         setOffset(20)
    //         this.setState({ loading: false })
    //     })
    // }

    UNSAFE_componentDidUpdate() {
        console.log(123)
        if (this.historyChanged) {
            if (this.scrollAtBottom) {
                this.scrollToBottom();
            }
            if (this.topMessage) {
                ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
            }
        }
    }

    UNSAFE_componentWillUpdate(nextProps) {
        const { selected_chat, chats, message_loading } = this.props;
        const { loading } = this.state;
        console.log(selected_chat, chats, message_loading)
        if (!loading) {
            console.log(123)
            this.historyChanged = chats.filter(chat => chat.chat_id === selected_chat).messages.length !== nextProps.chats.filter(chat => chat.chat_id === nextProps.selectedDialog).messages.length;
            if (this.historyChanged) {
                const { messageList } = this.refs;
                const scrollPos = messageList.scrollTop;
                const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
                this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
            }
        }
    }

    onScroll = () => {
        const { refs, props } = this;
        const scrollTop = refs.messageList.scrollTop;
        if (scrollTop === 0) {
            this.loadMoreMessages(refs.messageList);
        }
    };

    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    loadMoreMessages = (list) => {
        // const messages_list = list.target;
        // if (messages_list.scrollHeight - (messages_list.scrollTop * 2) > messages_list.offsetHeight) {
        if (!loadmore && message_loadmore_loading === false && message_loadmore_error === null) {
            setLoadMore(true)
            dispatch(chatActions.getMoreMessagesByChat(jwt, selectedDialog, offset)).then(
                () => {
                    setOffset(offset + 20)
                    setLoadMore(false)
                }
            )
        }
        // }
    }

    render() {
        const { chats, message_loading, chat_id, message_loadmore_loading, user } = this.props;
        if (message_loading) {
            return <div className={`chat-current-dialog bl-none center`}><Loading className={`messages-loading`} /></div>
        } else if (!message_loading && chat_id === null) {
            return <div className={`chat-current-dialog bl-none center`}><span className={`chat-select-dialog-alert`}>Выберите, кому бы выхотели написать</span></div>
        } else {
            var current_chat = chats.filter((chat) => (chat.chat_id === chat_id));
            var current_chat = current_chat[0]
            return (
                <div className={`chat-current-dialog bl-none center`}>
                    <div className={`w-100 h-100`}>
                        <div className={`chat-current-dialog-header`}>
                            <div>
                                <span>{current_chat.chat_user_name}</span>
                            </div>
                            <div>
                                <SearchIcon />
                                <MoreHorizIcon />
                            </div>
                        </div>
                        <div ref="messageList" className='messages' onScroll={this.onScroll} >
                            {message_loadmore_loading === true ? (<div className={`loadmore-messages-loading`}><CircularProgress size={20} /></div>) : (<div className="min-height-block"> </div>)}
                            {
                                current_chat.messages.map((item, index) => {
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
                                })
                            }
                        </div >
                        <div className="message-input">
                            <input />
                        </div>
                    </div>

                </div >
            )
        }

    }
};

function mapStateToProps(state) {
    const { chat_loading, chats, message_loading, message_loadmore_loading, message_loadmore_error, selected_chat } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        selected_chat,
        message_loading,
        message_loadmore_loading,
        message_loadmore_error
    };
}

const connectedChatCurrentDialog = connect(mapStateToProps)(ChatCurrentDialog);
export { connectedChatCurrentDialog as ChatCurrentDialog };
