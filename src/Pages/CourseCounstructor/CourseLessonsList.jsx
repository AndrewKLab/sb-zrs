import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions } from '../../_actions';
import { ListItemText, ListItemFirstAction, ListItemTitle, ListItemIcon, Paper, List, ListItem, IconButton, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '../../_components';

//icons
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const CourseLessonsList = ({
    ...props, className, dispatch,
    course_id, course_autor_id,
    jwt, user,
    course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status
}) => {
    return (
        <Paper className={'create-course-helper h-min'}>
            <Typography className={'create-course-helper-title p-3'} variant='h5' component='h5'>Уроки в курсе:</Typography>

            {course !== null && course.lessons !== null &&
                <div className='create-course-helper-list p-3'>
                    <List >
                        {course.lessons.map((lesson, index) => (
                            <div key={index} className='center'>
                                <ListItem button onPress={() => dispatch(courseActions.selectLesson(lesson))}>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            {lesson.lesson_number}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <ListItemTitle>
                                                {lesson.lesson_name}
                                            </ListItemTitle>
                                        </ListItemText>
                                    </ListItemFirstAction>
                                </ListItem>
                                <div title='Удалить урок' >
                                    <IconButton onClick={() => this.handleOpenDeleteLessonDialog(lesson.lesson_id, lesson.lesson_name)}>
                                        <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </List>
                </div>
            }
            {/* {this.renderOpenDeleteLessonDialog()} */}

            <div className='center p-3'>
                <Button disabled={course_editing_status === 'create'} onPress={() => dispatch(courseActions.setLessonEditingStatus('create'))}>Добавить урок</Button>
            </div>
        </Paper>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status } = state.course_constructor;

    return {
        jwt, user,
        course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status
    };
}

const connectedCourseLessonsList = connect(mapStateToProps)(CourseLessonsList);

export { connectedCourseLessonsList as CourseLessonsList }