import React from "react";
import { Paper } from "../";

export const ChatCurrentDialog = ({ children, className }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <Paper square className={`chat-current-dialog${styleClass}`}>
            123
        </Paper>
    );
};