import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from '../_components';

import { courseActions } from "../_actions";

const UpdateCoursePublishDialog = ({ open, close, jwt, dispatch, course }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            <DialogTitle>
                <Typography variant='h5' component='h5' className='m-0'>{course.published === '0' ? 'Опубликовать курс?': 'Снять курс с публикации?'}</Typography>
            </DialogTitle>
            <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверенны что хотите ${course.published === '0' ? 'опубликовать курс' : 'снять курс с публикации'} с именем "${course.name}"?`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onPress={() => { dispatch(courseActions.updateCourse(jwt, course.id, course.name, course.autor_id, course.category_name, course.img, course.description, course.published === '0' ? '1' : '0')).then(() => close()) }} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return {jwt};
}

const connectedUpdateCoursePublishDialog = connect(mapStateToProps)(UpdateCoursePublishDialog);
export { connectedUpdateCoursePublishDialog as UpdateCoursePublishDialog };