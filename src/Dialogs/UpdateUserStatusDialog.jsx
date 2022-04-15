import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Form,
    TextInput,
    SelectItem,
    Loading
} from '../_components';

import { userActions } from "../_actions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UpdateUserStatusDialog = ({ open, close, jwt, dispatch, selected_user, user_roles_loading, user_roles, user_roles_error }) => {

    useEffect(() => {
        const init = async () => {
            await dispatch(userActions.getUserRoles(jwt))
        }
        init()
    }, []);

    const onValueChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        dispatch(userActions.updateSelectedUser({ ...selected_user, user_role_id: event.target.value, access: event.target.value === "7" ? 'limited' : 'full' }))
    }

    const submit = (event) => {
        event.preventDefault();
        dispatch(userActions.updateUser(jwt, selected_user)).then(() => close())
    }

    return (
        <Dialog onClose={() => close()} open={open}>
            {selected_user ?
                <Form onSubmit={(event) => submit(event)}>
                    <DialogTitle>
                        <Typography variant='h5' component='h5'>Изменить статус ученика: {selected_user.firstname + ' ' + selected_user.lastname}</Typography>
                    </DialogTitle>
                    <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                        {user_roles_loading && <React.Fragment>
                            <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить роль пользователя`}</Typography>
                            <Loading className="h-100" />
                        </React.Fragment>
                        }
                        {user_roles_error && <React.Fragment>
                            <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить роль пользователя`}</Typography>
                            <Alert className='info' severity="info">{user_roles_error}</Alert>
                        </React.Fragment>}
                        {user_roles &&
                            <TextInput
                                select
                                defaultValue={selected_user.user_role_id}
                                id="user_role_id"
                                name="user_role_id"
                                label="Изменить роль пользователя"
                                autoComplete="user_role_id"
                                variant={'outlined'}
                                onChange={onValueChange}
                                //onSelect={onValueChange}

                                InputProps={{
                                    endAdornment: (
                                        <ExpandMoreIcon />
                                    ),
                                    endAdornmentClass: 'select-arrow'

                                }}
                                className='w-100 mb-3 mt-3'
                            >
                                {user_roles.filter(i => i.role_id != 1 && i.role_id != 2 && i.role_id != 3 && i.role_id != 4).map((role, index) => {
                                    return <SelectItem key={index} selectded={selected_user.user_role_id == role.role_id} value={role.role_id}>{role.role_name}</SelectItem>
                                })}
                            </TextInput>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={'mr-3'} variant='outlined' color="primary">Подтвердить</Button>
                        <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                    </DialogActions>
                </Form>
                : 'Пользователь не выбран!'}
        </Dialog>

    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { selected_user, user_roles_loading, user_roles, user_roles_error } = state.users;
    return { jwt, selected_user, user_roles_loading, user_roles, user_roles_error };
}

const connectedUpdateUserStatusDialog = connect(mapStateToProps)(UpdateUserStatusDialog);
export { connectedUpdateUserStatusDialog as UpdateUserStatusDialog };