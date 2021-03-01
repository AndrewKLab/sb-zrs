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
    Typography,
    Grid
} from '../_components';

import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { DeleteCourseDialog } from '../Dialogs';


const TeatherCourses = ({ history, panel, courses, course_error }) => {
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
    const [courseData, setCourseData] = useState({});

    const openDeleteCourseDialog = (cur_course) => { setDeleteCourseDialog(true), setCourseData(cur_course) }
    const closeDeleteCourseDialog = () => { setDeleteCourseDialog(false) }

    return (
            <Grid item xs={12} sm={12}>
                <Typography component='h4' variant='h4'>Ваши курсы:</Typography>
                <div className='d-flex grid-justify-xs-flex-end w-100'>
                    <Button onPress={() => { history.push(`/${panel}/create-course`) }} variant='outlined' color="primary">Создать курс</Button>
                </div>
                <DeleteCourseDialog open={deleteCourseDialog} close={closeDeleteCourseDialog} course={courseData} />
                {course_error === undefined ? (
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
                                                        <IconButton onClick={() => openDeleteCourseDialog(item)}>
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
                            <div>{course_error}</div>
                        </div>
                    )}
        </Grid>
    );

};

function mapStateToProps(state) {
    const { courses, course_error} = state.course;
    return {
                courses,
                course_error
            };
}

const connectedTeatherCourses = connect(mapStateToProps)(TeatherCourses);
export { connectedTeatherCourses as TeatherCourses};