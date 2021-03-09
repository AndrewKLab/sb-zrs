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

const UpdateUserAccessDialog = ({ open, close, jwt, dispatch, user }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            <DialogTitle>
                <Typography variant='h5' component='h5'>{user.access === 'limited' ? "Открыть " : "Закрыть "}доступ?</Typography>
            </DialogTitle>
            <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                <Typography component={'body'} variant={'body'}>{user.access === 'limited' ? "Открыть " : "Закрыть "} доступ ко всем категориям курсов для ученика: {user.firstname + ' ' + user.lastname}?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onPress={() => dispatch(userActions.updateUser(user.id, jwt, user.firstname, user.lastname, user.phonenumber, user.country, user.sity, user.status, user.access === 'limited' ? 'full' : 'limited', user.roles, user.avatar, user.admin_id, user.teather_id, user.promouter_id)).then(close())} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
            </DialogActions>
        </Dialog>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUpdateUserAccessDialog = connect(mapStateToProps)(UpdateUserAccessDialog);
export { connectedUpdateUserAccessDialog as UpdateUserAccessDialog };