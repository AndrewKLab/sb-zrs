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

import { userActions } from "../_actions";

const DialogDeleteUser = ({ jwt, dispatch, open, close, userData }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            <DialogTitle>
                <Typography variant='h5' component='h5' className='m-0'>Удалить пользователя?</Typography>
            </DialogTitle>
            <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверенны что хотите удалить пользователя с именем ${userData.firstname}?`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onPress={() => { dispatch(userActions.deleteUser(jwt, userData.id)).then(() => close()) }} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return {jwt};
}

const connectedDialogDeleteUser = connect(mapStateToProps)(DialogDeleteUser);
export { connectedDialogDeleteUser as DialogDeleteUser };