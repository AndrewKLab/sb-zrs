import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';

import {
    Divider,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemText,
    ListItemTitle,
    ListItemSecondAction,
    IconButton,
    Button,
    Typography
} from '../_components';

import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

export const CourseCategory = ({ history, user, name, category, deleteDialog, updateDialog, panel }) => {
    return (
        <div>
            {category && (
                <div className='pb-3'>
                    <Typography component='h5' variant='h5'>{name}</Typography>
                    <Divider />
                    <List>
                        {category.map((item, index) => (
                            <div key={index}>
                                <ListItem className='text-align-left p-0'>
                                    <ListItemFirstAction>
                                        <ListItemText>
                                            <ListItemTitle>
                                                <Typography component='h6' variant='h6'>{item.name}</Typography>

                                            </ListItemTitle>
                                        </ListItemText>
                                    </ListItemFirstAction>
                                    <ListItemSecondAction>
                                        <div title={item.published === "0" ? 'Неопубликованный курс' : 'Опубликованный курс'} className='mr-3'>
                                            {user.roles === 'ROLE_ADMIN' || user.roles === 'ROLE_SUPER_ADMIN' ?
                                                <IconButton onClick={() => updateDialog(item)}>
                                                    {item.published === "0" ? <EventBusyOutlinedIcon className='warning-area-title-icon' /> : <EventAvailableOutlinedIcon className='done-area-title-icon' />}
                                                </IconButton>
                                                :
                                                item.published === "0" ? <EventBusyOutlinedIcon className='warning-area-title-icon' /> : <EventAvailableOutlinedIcon className='done-area-title-icon' />
                                            }
                                        </div>
                                        <div title='Удалить курс' className='mr-3'>
                                            <IconButton onClick={() => deleteDialog(item)}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </div>
                                        <Button onPress={() => history.push({
                                            pathname: `/${panel}/create-course`,
                                            state: { course: item }
                                        })} variant='outlined' color="primary">Изменить курс</Button>
                                    </ListItemSecondAction>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
            )}
        </div>
    )
}