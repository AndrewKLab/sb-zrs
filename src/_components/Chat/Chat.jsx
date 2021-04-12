import React from "react";
import { ChatDialogs, ChatCurrentDialog } from "../";

export const Chat = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={`chat${styleClass}`}>
            <ChatDialogs/>
            <ChatCurrentDialog/>
        </div>
    );
};