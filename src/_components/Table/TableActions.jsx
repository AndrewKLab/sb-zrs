import React from "react";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import { IconButton } from '../'

export const TableActions = ({ children, className, user, dialog, edit, remove }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={styleClass}>
            <IconButton onClick={() => dialog(user)} className="p-1">
                <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => edit(user)} className="p-1">
                <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => remove(user)} className="p-1">
                <DeleteForeverOutlinedIcon className='danger-area-title-icon'/>
            </IconButton>
        </div>
    );
};