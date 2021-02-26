import React from 'react'
import {
    Avatar,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText
} from '../';

export const UserPlane = ({ name, avatar, status, onClick }) => {
    return (
        <ListItem button onPress={onClick}>
            <ListItemFirstAction>
                <ListItemIcon>
                    <Avatar alt={name} src={avatar} />
                </ListItemIcon>
                <ListItemText title={name} subtitle={"Статус: " + status} />
            </ListItemFirstAction>
        </ListItem>
    )
}


