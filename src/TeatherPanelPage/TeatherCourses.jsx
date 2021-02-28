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


const TeatherCourses = ({ history, courses, error, panel, deleteDialog }) => {

    return (
        <div>
            {error === undefined ? (
                <div>
                    {courses.basic && (
                        <div className='pb-3'>
                            <Typography component='h5' variant='h5'>{'Основные курсы'}</Typography>
                            <Divider />
                            <List>
                                {courses.basic.map((item, index) => (
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
                                                {
                                                    item.published === "0" ?
                                                        <div title='Неопубликованный курс'>
                                                            <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                        </div>
                                                        :
                                                        <div title='Опубликованный курс'>
                                                            <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                        </div>
                                                }
                                                <div title='Удалить курс' className='mr-3'>
                                                    <IconButton onClick={() => deleteDialog(item.name, item.id)}>
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
                    {courses.special && (
                        <div className='pb-3'>
                            <Typography component='h5' variant='h5'>{'Специальные курсы'}</Typography>
                            <Divider />
                            <List>
                                {courses.special.map((item, index) => (
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
                                                {
                                                    item.published === "0" ?
                                                        <div title='Неопубликованный курс'>
                                                            <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                        </div>
                                                        :
                                                        <div title='Опубликованный курс'>
                                                            <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                        </div>
                                                }
                                                <div title='Удалить курс' className='mr-3'>
                                                    <IconButton onClick={() => deleteDialog(item.name, item.id)}>
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

                    {courses.social && (
                        <div className='pb-3'>
                            <Typography component='h5' variant='h5'>{'Социальные курсы'}</Typography>
                            <Divider />
                            <List>
                                {courses.social.map((item, index) => (
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
                                                {
                                                    item.published === "0" ?
                                                        <div title='Неопубликованный курс'>
                                                            <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                        </div>
                                                        :
                                                        <div title='Опубликованный курс'>
                                                            <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                        </div>
                                                }
                                                <div title='Удалить курс' className='mr-3'>
                                                    <IconButton onClick={() => deleteDialog(item.name, item.id)}>
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

                    {courses.national && (
                        <div className='pb-3'>
                            <Typography component='h5' variant='h5'>{'Национальные курсы'}</Typography>
                            <Divider />
                            <List>
                                {courses.national.map((item, index) => (
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
                                                {
                                                    item.published === "0" ?
                                                        <div title='Неопубликованный курс'>
                                                            <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                        </div>
                                                        :
                                                        <div title='Опубликованный курс'>
                                                            <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                        </div>
                                                }
                                                <div title='Удалить курс' className='mr-3'>
                                                    <IconButton onClick={() => deleteDialog(item.name, item.id)}>
                                                        <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                    </IconButton>
                                                </div>
                                                <Button onPress={() => history.push({
                                                    pathname: `/${panel}/create-course`,
                                                    state: { course: item }
                                                })} variant='outlined' color="primary">Изменить курс</Button>
                                            </ListItemSecondAction>
                                        </ListItem>
                                        {index === courses.national.length - 1 ? (null) : <Divider />}
                                    </div>
                                ))}
                            </List>

                        </div>
                    )}

                </div>
            ) : (
                    <div>
                        <div>{error}</div>
                    </div>
                )}
        </div>
    );

};

function mapStateToProps(state) {
    const { course } = state;
    const { courses, error } = course;
    return {
        courses,
        error
    };
}

const connectedTeatherCourses = connect(mapStateToProps)(TeatherCourses);
export { connectedTeatherCourses as TeatherCourses };