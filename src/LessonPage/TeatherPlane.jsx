import React from 'react'
import {
    Avatar,
    Paper,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText
} from '../_components';

export const TeatherPlane = ({ teather_status, teather_name, teather_avatar, onClick }) => {
    return (
        teather_status !== null ? (
            <Paper className={'p-1 mt-3'}>
                <h5 className={'pl-2 mb-0 pt-1'} >Учитель:</h5>
                <div className={'pt-1 w-100'}>
                    <ListItem button onPress={onClick}>
                        <ListItemFirstAction>
                            <ListItemIcon>
                                <Avatar alt={teather_name} src={teather_avatar} />
                            </ListItemIcon>
                            <ListItemText title={teather_name} subtitle={"Статус: " + teather_status} />
                        </ListItemFirstAction>
                    </ListItem>
                </div>
            </Paper>
        ) : (null))
}


