import React from 'react'
import {
    Avatar,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText
} from '../';

export const UserPlane = ({ name, avatar, status, button, onClick, className }) => {
    let styleClass = className !== undefined ? ' '+className : '';
    let isButton = button === undefined ? false : true;
    return (
        <ListItem button={isButton} onPress={onClick} className={styleClass}>
            <ListItemFirstAction>
                <ListItemIcon>
                    <Avatar alt={name} src={avatar} />
                </ListItemIcon>
                 <ListItemText title={name} subtitle={status && "Статус: " + status} />
            </ListItemFirstAction>
        </ListItem>
    )
}


