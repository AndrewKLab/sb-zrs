import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Form,
    FormControlLabel,
    Radio,
    UserPlane,
    TextInput,
    SelectItem,
    Loading,
    Alert
} from '../_components';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { userActions } from "../_actions";


const DialogChangeUser = ({ jwt, user, dispatch, open, close, selected_user, teathers, admins, user_roles_loading, user_roles, user_roles_error, update_user_loading }) => {

    useEffect(() => {
        const init = async () => {
            await dispatch(userActions.getUserRoles(jwt))
        }
        init()
    }, []);

    const onValueChangeAccess = (event) => {dispatch(userActions.updateSelectedUser({ ...selected_user, access: event }))}

    const onValueChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        dispatch(userActions.updateSelectedUser({ ...selected_user, user_role_id: event.target.value, access: event.target.value === "7" ? 'limited' :  'full'}))
    }

    const selectTeather = (e, teather) => {
        e.preventDefault();
        if (teather === undefined) dispatch(userActions.updateSelectedUser({ ...selected_user, teather: false }))
        else dispatch(userActions.updateSelectedUser({ ...selected_user, teather: teather }))
    }

    const selectAdmin = (e, admin) => {
        e.preventDefault();
        if (admin === undefined) dispatch(userActions.updateSelectedUser({ ...selected_user, admin: false }))
        else dispatch(userActions.updateSelectedUser({ ...selected_user, admin: admin }))
    }

    const updateUser = (e, selected_user) => {
        e.preventDefault();
        dispatch(userActions.updateUser(jwt, selected_user)).then(() => close())
    }

    return (
        <Dialog onClose={() => close()} open={open}>
            {selected_user ?
            <Form onSubmit={(e) => updateUser(e, selected_user)}>
                <DialogTitle>
                    <Typography variant='h5' component='h5' className='m-0'>{`Изменить пользователя ${selected_user.firstname}?`}</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Учитель пользователя`}</Typography>
                    {selected_user !== null && selected_user.teather !== false && selected_user !== undefined && selected_user.teather !== undefined ? (
                        <UserPlane button onClick={(e) => selectTeather(e)} name={selected_user.teather.firstname + ' ' + selected_user.teather.lastname} avatar={selected_user.teather.avatar} status={selected_user.teather.role_name} />
                    ) : (
                        <div className={'teathers-list'}>
                            {teathers.map((teather, index) => (
                                <UserPlane button key={index} onClick={(e) => selectTeather(e, teather)} name={teather.firstname + ' ' + teather.lastname} avatar={teather.avatar} status={teather.role_name} />
                            ))}
                        </div>
                    )}

                    {user.role_type === "ROLE_SUPER_ADMIN" &&
                        <React.Fragment>
                            <Typography component={'body'} variant={'body'} className='m-0'>{`Администратор пользователя`}</Typography>
                            {selected_user !== null && selected_user.admin !== false && selected_user !== undefined && selected_user.admin !== undefined ? (
                                <UserPlane button onClick={(e) => selectAdmin(e)} name={selected_user.admin.firstname + ' ' + selected_user.admin.lastname} avatar={selected_user.admin.avatar} status={selected_user.admin.role_name} />
                            ) : (
                                <div className={'teathers-list'}>
                                    {admins.map((admin, index) => (
                                        <UserPlane button key={index} onClick={(e) => selectAdmin(e, admin)} name={admin.firstname + ' ' + admin.lastname} avatar={admin.avatar} status={admin.role_name} />
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    }
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить доступ к курсам?`}</Typography>
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'access'}
                                value={'limited'}
                                selected={selected_user.access === "limited" ? "limited" : ""}
                                onChange={onValueChangeAccess}
                            />
                        }
                        label={'Ограниченый'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'access'}
                                value={'full'}
                                selected={selected_user.access === "full" ? "full" : ""}
                                onChange={onValueChangeAccess}
                            />
                        }
                        label={'Полный'}
                    />
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
                            {user_roles.map((role, index) => {
                                return <SelectItem key={index} selectded={selected_user.user_role_id == role.role_id} value={role.role_id}>{role.role_name}</SelectItem>
                            })}
                        </TextInput>
                    }

                </DialogContent>
                <DialogActions>
                    <Button type="submit" className={'mr-3'} variant='outlined' color="primary" loading={update_user_loading} disabled={update_user_loading}>Сохранить</Button>
                    <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                </DialogActions>
            </Form>
            : 'Пользователь не выбран!'}
        </Dialog >
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { user_roles_loading, user_roles, user_roles_error, update_user_loading, selected_user } = state.users;
    return { jwt, user, user_roles_loading, user_roles, user_roles_error, update_user_loading,  selected_user };
}

const connectedDialogChangeUser = connect(mapStateToProps)(DialogChangeUser);
export { connectedDialogChangeUser as DialogChangeUser };