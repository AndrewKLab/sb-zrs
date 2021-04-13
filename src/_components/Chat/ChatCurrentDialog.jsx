import React from "react";
import { Grid, Loading } from "../";
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export const ChatCurrentDialog = ({ children, className, selectedDialog, message_loading, messages }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <Grid item xs={12} sm={8} className={`chat-current-dialog bl-none${styleClass}`}>
            {message_loading === true ? (
                <Loading className={`messages-loading`} />
            ) : (
                selectedDialog !== null ? (
                    <div>
                        <div className={`chat-current-dialog-header`}>
                            <div>
                                <span>{selectedDialog.chat_user_name}</span>
                            </div>
                            <div>
                                <SearchIcon />
                                <MoreHorizIcon />
                            </div>
                        </div>
                        <div className={`chat-select-dialog-alert-container`}>
                            <div className='messages'>
                                {messages.map((item, index) => {
                                    return (
                                       <div className='message-right'> 
                                        <span>{item.message}</span>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`chat-select-dialog-alert-container`}>
                        <span className={`chat-select-dialog-alert`}>Выберите, кому бы выхотели написать</span>
                    </div>
                )

            )}


        </Grid>
    );
};