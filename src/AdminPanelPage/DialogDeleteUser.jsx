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

const DialogDeleteUser = ({ jwt, dispatch, open, close, selected_user, delete_user_loading }) => {
    return (
        <Dialog onClose={() => close()} open={open}>
            {selected_user ?
                <React.Fragment>
                    <DialogTitle>
                        <Typography variant='h5' component='h5' className='m-0'>Удалить пользователя?</Typography>
                    </DialogTitle>
                    <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                        <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверены что хотите удалить пользователя с именем ${selected_user.firstname}?`}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onPress={() => { dispatch(userActions.deleteUser(jwt, selected_user.id)).then(() => close()) }} className={'mr-3'} variant='outlined' color="primary" loading={delete_user_loading} disabled={delete_user_loading}>Да</Button>
                        <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                    </DialogActions>
                </React.Fragment>
                : null}
        </Dialog>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { selected_user, delete_user_loading } = state.users;
    return { jwt, selected_user, delete_user_loading };
}

const connectedDialogDeleteUser = connect(mapStateToProps)(DialogDeleteUser);
export { connectedDialogDeleteUser as DialogDeleteUser };