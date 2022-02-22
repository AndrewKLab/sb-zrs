import React, { useState, useRef } from "react";
import { Form, Loading, ChatMessages } from "../";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SendIcon from '@material-ui/icons/Send';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";
import Picker from 'emoji-picker-react';

const ChatCurrentDialog = ({
    dispatch,
    jwt,
    user,

    chats,
    selected_chat,

    get_messages_by_chat_loading,
    get_messages_by_chat_error,
    get_messages_by_chat_message,

    get_more_messages_by_chat_loading,
    get_more_messages_by_chat_error,
    get_more_messages_by_chat_message,

    check_new_messages_error
}) => {
    const messageList = useRef(null)

    const [loading, setLoading] = useState(true);
    const [openEmoBoard, setOpenEmoBoard] = useState(true);

    // componentDidUpdate() {

    //     if (this.firstSelectChat) {
    //         console.log('Первый выбор чата');
    //         this.scrollToBottom();
    //     } else if (this.selectOtherChat) {
    //         console.log('Переключил чат')
    //         this.scrollToBottom();
    //     } else if (this.loadMoreChat) {
    //         const { messageList } = this.refs;
    //         const { chats, selected_chat } = this.props;
    //         const numMessages = messageList.childNodes[0].childNodes.length;

    //         const numChat = chats.filter(chat => chat.chat_id === selected_chat);
    //         const message = messageList.childNodes[0].childNodes[numMessages - (numChat[0].offset - 20)]
    //         var topPos = message.offsetTop;
    //         //console.log(messageList.childNodes)
    //         //messageList.scrollTop = topPos;
    //         messageList.scroll({
    //             top: topPos - 250
    //         })
    //         //this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
    //         //messageList.parentNode.scrollTop = messageList.childNodes[numMessages - (numChat[0].offset - 20)].offsetTop; 
    //         //message.scrollIntoView({ block: "start" })
    //         //ReactDOM.findDOMNode(messageList).scrollTo({top: messageList.childNodes[19].offsetTop})
    //     } else if (this.sendMessageChat) {
    //         console.log('Сообщение отправлено')
    //         this.scrollToBottom();
    //     }

    // }


    // UNSAFE_componentWillUpdate(nextProps) {
    //     const { selected_chat, chats, get_messages_by_chat_loading, get_more_messages_by_chat_loading, get_more_messages_by_chat_error, send_get_messages_by_chat_loading, send_message_error } = this.props;
    //     const { loading } = this.state;
    //     console.log("props: " + selected_chat, get_messages_by_chat_loading, chats, get_more_messages_by_chat_loading, get_more_messages_by_chat_error, send_get_messages_by_chat_loading, send_message_error);
    //     console.log("nextProps: " + nextProps.selected_chat, nextProps.get_messages_by_chat_loading, nextProps.chats, nextProps.get_more_messages_by_chat_loading, nextProps.get_more_messages_by_chat_error, nextProps.send_get_messages_by_chat_loading, nextProps.send_message_error)
    //     this.firstSelectChat = selected_chat === undefined && selected_chat !== nextProps.selected_chat;
    //     this.selectOtherChat = selected_chat !== undefined && selected_chat !== nextProps.selected_chat;
    //     this.loadMoreChat = nextProps.selected_chat === selected_chat && get_more_messages_by_chat_loading === true && nextProps.get_more_messages_by_chat_loading === false && nextProps.get_more_messages_by_chat_error !== "Сообщения не найдены."
    //     this.sendMessageChat = (selected_chat !== undefined &&
    //         selected_chat === nextProps.selected_chat) &&
    //         send_get_messages_by_chat_loading &&
    //         !nextProps.send_get_messages_by_chat_loading &&
    //         nextProps.send_message_error === null &&
    //         chats.filter((chat => chat.chat_id === selected_chat))[0].messages.length !== nextProps.chats.filter((chat => chat.chat_id === selected_chat))[0].messages.length;
    // }

    const scrollToBottom = () => {
        if (messageList && messageList.current) {
            const maxScrollTop = messageList.current.scrollHeight - messageList.current.clientHeight;
            messageList.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    const onScroll = (list, selected_chat) => {
        const messages_list = list.target;
        const scrollTop = messages_list.scrollTop;
        if (scrollTop === 0) {
            loadMoreMessages();
        }
    };

    const loadMoreMessages = async () => {
        // const messages_list = list.target;
        // if (messages_list.scrollHeight - (messages_list.scrollTop * 2) > messages_list.offsetHeight) {
        const { offset } = selected_chat;
        if (get_more_messages_by_chat_loading === false && get_more_messages_by_chat_error === null) {
            await dispatch(chatActions.getMoreMessagesByChat(jwt, selected_chat, offset + 20));
        }
        // }
    }

    const sendMessage = (event) => {
        event.preventDefault();
        dispatch(chatActions.sendMessage(jwt, selected_chat.chat_user_id, document.getElementById('chat-input').value)).then(() => {
            document.getElementById('chat-input').value = ""
        })

    }

    const onEmojiClick = (event, emojiObject) => {
        var input = document.getElementById('chat-input')
        input.value = input.value + emojiObject.emoji
    };

    const toogleEmojiBoard = () => {
        setOpenEmoBoard(!openEmoBoard)
    }

    const ChatMessagesEmptyComponent = () => {
        return <div className={`chat-current-dialog bl-none center h-100`}><span className={`chat-select-dialog-alert`}>Напишите что нибудь!</span></div>
    }

    if (selected_chat === null) {
        return <div className={`chat-current-dialog bl-none center`}><span className={`chat-select-dialog-alert`}>Выберите, кому бы вы хотели написать</span></div>
    } else {
        return (
            <div className={`chat-current-dialog bl-none center`}>
                <div className={`w-100 h-100`}>
                    <div className={`chat-current-dialog-header`}>
                        <div>
                            <span>{selected_chat.chat_user_name}</span>
                        </div>
                        <div>
                            <SearchIcon />
                            <MoreHorizIcon />
                        </div>
                    </div>
                    {get_messages_by_chat_loading ?
                        <div className={`chat-current-dialog bl-none center`}><Loading className={`messages-loading`} /></div>
                        :
                        <div ref={messageList} className='messages-container' onScroll={(list) => onScroll(list, selected_chat)} >
                            <ChatMessages scrollToBottom={scrollToBottom} selected_chat={selected_chat} ChatMessagesEmptyComponent={ChatMessagesEmptyComponent} />
                        </div >
                    }
                    <Form onSubmit={sendMessage}>
                        <div className="message-input">
                            <AttachFileIcon />
                            <input id={'chat-input'} name={'chat-input'} type={'text'} className='messages-input-plane' placeholder={'Напишите сообщение...'} autoComplete={"off"} />
                            {/* {openEmoBoard && <div className="p-relative"><Picker onEmojiClick={this.onEmojiClick} /></div>}
                                <SentimentSatisfiedOutlinedIcon onClick={this.toogleEmojiBoard}/> */}
                            <SendIcon onClick={sendMessage} />
                        </div>
                    </Form>
                </div>

            </div >
        )
    }
};

function mapStateToProps(state) {
    const {
        chats,
        selected_chat,

        get_messages_by_chat_loading,
        get_messages_by_chat_error,
        get_messages_by_chat_message,

        get_more_messages_by_chat_loading,
        get_more_messages_by_chat_error,
        get_more_messages_by_chat_message,

        check_new_messages_error
    } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        jwt,
        user,

        chats,
        selected_chat,

        get_messages_by_chat_loading,
        get_messages_by_chat_error,
        get_messages_by_chat_message,

        get_more_messages_by_chat_loading,
        get_more_messages_by_chat_error,
        get_more_messages_by_chat_message,

        check_new_messages_error
    };
}

const connectedChatCurrentDialog = connect(mapStateToProps)(ChatCurrentDialog);
export { connectedChatCurrentDialog as ChatCurrentDialog };
