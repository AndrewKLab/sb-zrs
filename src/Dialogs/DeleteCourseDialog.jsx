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

const DeleteCourseDialog = ({ open, close, jwt, dispatch, course }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            <DialogTitle>
                <Typography variant='h5' component='h5' className='m-0'>{`Удалить курс?`}</Typography>
            </DialogTitle>
            <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверенны что хотите удалить курс "${course.name}"?`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onPress={() => { dispatch(courseActions.deleteCourse(jwt, course.id)).then(() => close()) }} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return {jwt};
}

const connectedDeleteCourseDialog = connect(mapStateToProps)(DeleteCourseDialog);
export { connectedDeleteCourseDialog as DeleteCourseDialog };