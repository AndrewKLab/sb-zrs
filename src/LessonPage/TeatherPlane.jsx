import React from 'react'
import {
    Avatar,
    Paper,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText
} from '../_components';

export const TeatherPlane = ({ teather }) => {
    return (
        teather &&
        <Paper className={'p-1 mt-3'}>
            <h5 className={'pl-2 mb-0 pt-1'} >Ваш учитель:</h5>
            <div className={'pt-1 w-100'}>
                <ListItem>
                    <ListItemFirstAction>
                        <ListItemIcon>
                            <Avatar alt={teather.firstname + ' ' + teather.lastname} src={teather.avatar} />
                        </ListItemIcon>
                        <ListItemText title={teather.firstname + ' ' + teather.lastname} subtitle={"Регалии: " + teather.role_name} />
                    </ListItemFirstAction>
                </ListItem>
            </div>
        </Paper>
    )
}


