import React from "react";
import { Form, Loading, ChatMessages } from "../";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import SendIcon from '@material-ui/icons/Send';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { chatActions } from "../../_actions";


class ChatCurrentDialog extends React.Component {
    constructor(props) {
        super(props);
        // Не вызывайте здесь this.setState()!
        this.state = { loading: true };
        this.firstSelectChat;
        this.selectOtherChat;
        this.loadMoreChat;
        this.sendMessageChat;
        this.timer
    }

    componentDidUpdate() {

        if (this.firstSelectChat) {
            console.log('Первый выбор чата');
            this.scrollToBottom();
        } else if (this.selectOtherChat) {
            console.log('Переключил чат')
            this.scrollToBottom();
        } else if (this.loadMoreChat) {
            const { messageList } = this.refs;
            const { chats, selected_chat } = this.props;
            const numMessages = messageList.childNodes[0].childNodes.length;

            const numChat = chats.filter(chat => chat.chat_id === selected_chat);
            const message = messageList.childNodes[0].childNodes[numMessages - (numChat[0].offset - 20)]
            var topPos = message.offsetTop;
            //console.log(messageList.childNodes)
            //messageList.scrollTop = topPos;
            messageList.scroll({
                top: topPos - 250
            })
            //this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
            //messageList.parentNode.scrollTop = messageList.childNodes[numMessages - (numChat[0].offset - 20)].offsetTop; 
            //message.scrollIntoView({ block: "start" })
            //ReactDOM.findDOMNode(messageList).scrollTo({top: messageList.childNodes[19].offsetTop})
        } else if (this.sendMessageChat) {
            console.log('Сообщение отправлено')
            this.scrollToBottom();
        }

    }


    UNSAFE_componentWillUpdate(nextProps) {
        const { selected_chat, chats, message_loading, message_loadmore_loading, message_loadmore_error, send_message_loading, send_message_error } = this.props;
        const { loading } = this.state;
        console.log("props: " + selected_chat, message_loading, chats, message_loadmore_loading, message_loadmore_error, send_message_loading, send_message_error);
        console.log("nextProps: " + nextProps.selected_chat, nextProps.message_loading, nextProps.chats, nextProps.message_loadmore_loading, nextProps.message_loadmore_error, nextProps.send_message_loading, nextProps.send_message_error)
        this.firstSelectChat = selected_chat === undefined && selected_chat !== nextProps.selected_chat;
        this.selectOtherChat = selected_chat !== undefined && selected_chat !== nextProps.selected_chat;
        this.loadMoreChat = nextProps.selected_chat === selected_chat && message_loadmore_loading === true && nextProps.message_loadmore_loading === false && nextProps.message_loadmore_error !== "Сообщения не найдены."
        this.sendMessageChat = (selected_chat !== undefined &&
            selected_chat === nextProps.selected_chat) &&
            send_message_loading &&
            !nextProps.send_message_loading &&
            nextProps.send_message_error === null &&
            chats.filter((chat => chat.chat_id === selected_chat))[0].messages.length !== nextProps.chats.filter((chat => chat.chat_id === selected_chat))[0].messages.length;
    }

    onScroll = (list, current_chat) => {
        const messages_list = list.target;
        const scrollTop = messages_list.scrollTop;
        if (scrollTop === 0) {
            this.loadMoreMessages(messages_list, current_chat);
        }
    };

    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    loadMoreMessages = (list, current_chat) => {
        // const messages_list = list.target;
        // if (messages_list.scrollHeight - (messages_list.scrollTop * 2) > messages_list.offsetHeight) {
        const { dispatch, message_loadmore_loading, selected_chat, jwt, message_loadmore_error } = this.props;
        if (message_loadmore_loading === false && message_loadmore_error === null) {
            dispatch(chatActions.getMoreMessagesByChat(jwt, selected_chat, current_chat.offset))
        }
        // }
    }

    sendMessage = (event) => {
        const { dispatch, jwt, chats, selected_chat } = this.props;
        const chat = chats.filter(chat => chat.chat_id === selected_chat);
        //console.log(document.getElementById('chat-input').value)
        dispatch(chatActions.sendMessage(jwt, chat[0].chat_user_id, document.getElementById('chat-input').value)).then(() => {
            document.getElementById('chat-input').value = ""
        })
        event.preventDefault();
    }

    render() {
        const { chats, message_loading, selected_chat, message_loadmore_loading, check_new_messages_error, user, jwt, dispatch } = this.props;
        if (message_loading) {
            return <div className={`chat-current-dialog bl-none center`}><Loading className={`messages-loading`} /></div>
        } else if (!message_loading && selected_chat === undefined) {
            return <div className={`chat-current-dialog bl-none center`}><span className={`chat-select-dialog-alert`}>Выберите, кому бы выхотели написать</span></div>
        } else {
            console.log(selected_chat)
            var current_chat = chats.filter((chat) => (chat.chat_id === selected_chat));
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
                        <div ref="messageList" className='messages-container' onScroll={(list) => this.onScroll(list, current_chat)} >
                            <ChatMessages scrollToBottom={this.scrollToBottom} current_chat={current_chat} />
                        </div >
                        <Form onSubmit={this.sendMessage}>
                            <div className="message-input">
                                <AttachFileIcon />
                                <input id={'chat-input'} name={'chat-input'} type={'text'} className='messages-input-plane' placeholder={'Напишите сообщение...'} autoComplete={"off"} />
                                <SentimentSatisfiedOutlinedIcon />
                                <SendIcon onClick={this.sendMessage} />
                            </div>
                        </Form>
                    </div>

                </div >
            )
        }

    }
};

function mapStateToProps(state) {
    const { chat_loading, chats, message_loading, message_loadmore_loading, message_loadmore_error, selected_chat, send_message_loading, send_message_error, check_new_messages_error } = state.chat;
    const { jwt, user } = state.authentication;
    return {
        chat_loading,
        chats,
        jwt,
        user,
        selected_chat,
        message_loading,
        message_loadmore_loading,
        message_loadmore_error,
        send_message_loading,
        send_message_error,
        check_new_messages_error
    };
}

const connectedChatCurrentDialog = connect(mapStateToProps)(ChatCurrentDialog);
export { connectedChatCurrentDialog as ChatCurrentDialog };
