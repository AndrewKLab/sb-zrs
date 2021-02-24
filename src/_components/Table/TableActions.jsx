import React from "react";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

import { IconButton } from '../'

export const TableActions = ({ children, className, user, edit, remove }) => {
    let styleClass = className !== undefined ? ' ' + className : '';

    return (
        <div className={styleClass}>
            <IconButton onClick={() => edit(user)}>
                <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => remove(user)}>
                <DeleteForeverOutlinedIcon className='danger-area-title-icon'/>
            </IconButton>
        </div>
    );
};