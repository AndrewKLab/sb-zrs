import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions, lessonActions } from '../../_actions';
import { ListItemText, ListItemFirstAction, ListItemTitle, ListItemIcon, Paper, List, ListItem, IconButton, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '../../_components';

//icons
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const CourseLessonsList = ({
    ...props, className, dispatch,
    course_id, course_autor_id,
    jwt, user,
    course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status
}) => {
    const [lessonState, setLessonState] = useState({});
    const [visableDialog, setVisableDialog] = useState(false);
    const openDialog = (lesson) => { setVisableDialog(true), setLessonState(lesson) };
    const closeDialog = () => setVisableDialog(false);

    const deleteLesson = () => dispatch(lessonActions.deleteLesson(jwt, lessonState.lesson_id)).then(() => closeDialog());

    const RenderConfermDialog = ({ dialog_title, dialog_body, dialogAction }) => {
        return (
            <Dialog onClose={() => closeDialog()} open={visableDialog}>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>{dialog_title}</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography variant='body' component='body'>{dialog_body}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={dialogAction} className={'mr-3'} variant='outlined' color="primary">
                        Да
                    </Button>
                    <Button onPress={() => closeDialog()} variant='outlined' color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

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
                                    <IconButton onClick={() => openDialog(lesson)}>
                                        <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </List>
                </div>
            }
            <RenderConfermDialog dialog_title={`Удалить урок`} dialog_body={`Сохранить урок с именем "${lessonState.lesson_name}"`} dialogAction={() => deleteLesson()} />
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