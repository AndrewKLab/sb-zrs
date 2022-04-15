import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemSecondAction,
    ListItemSubtitle,
    ListItemText,
    ListItemTitle,
    Menu,
    MenuItem,
} from '../';

export const UserListItem = ({ button, user, actions }) => {
    return (
        <div className='d-flex border'>
            <ListItem className="p-2" button={button}>
                <Link className={'w-100'} to={`/teather-panel/user-info/${user.id}`}>
                    <ListItemFirstAction>
                        <ListItemIcon>
                            <Avatar src={user.avatar} alt={user.firstname + " " + user.lastname} />
                        </ListItemIcon>
                        <ListItemText>
                            <ListItemTitle>
                                {user.firstname + " " + user.lastname}
                            </ListItemTitle>
                            <ListItemSubtitle>
                                Статус: {user.role_name}
                            </ListItemSubtitle>
                        </ListItemText>
                    </ListItemFirstAction>
                </Link>

            </ListItem >
            {actions}
        </div>
    )
}