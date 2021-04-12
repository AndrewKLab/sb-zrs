import React from "react";
import { Paper, ChatDialogUser } from "../";

export const ChatDialogs = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <Paper square className={`chat-dialogs${styleClass}`}>
            <ChatDialogUser name={'Тест Тестовый'} avatar={'https://kniga-knig.info/assets/img/unnamed.png'} lastmessage={'Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!Привет!'} lastmessagetime={'10:43'} />
        </Paper>
    );
};