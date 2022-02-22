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

const UpdateUserAccessDialog = ({ open, close, jwt, dispatch, selected_user }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            {selected_user ? <React.Fragment>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>{selected_user.access === 'limited' ? "Открыть " : "Закрыть "}доступ?</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'}>{selected_user.access === 'limited' ? "Открыть " : "Закрыть "} доступ ко всем категориям курсов для ученика: {selected_user.firstname + ' ' + selected_user.lastname}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={() => dispatch(userActions.updateUser(jwt, { ...selected_user, access: selected_user.access === 'limited' ? "full" : "limited" })).then(() => close())} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                    <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                </DialogActions>
            </React.Fragment>
                : 'Пользователь не выбран!'}
        </Dialog>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { selected_user } = state.users;
    return { jwt, selected_user };
}

const connectedUpdateUserAccessDialog = connect(mapStateToProps)(UpdateUserAccessDialog);
export { connectedUpdateUserAccessDialog as UpdateUserAccessDialog };