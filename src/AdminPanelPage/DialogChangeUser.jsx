import React from 'react';
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
    UserPlane
} from '../_components';

import { userActions } from "../_actions";


const DialogChangeUser = ({ jwt, user, dispatch, open, close, userData, setUserData, setStatus, status, setRoles, roles, setAccess, access, setAdminId, adminId, teathers }) => {

    const onValueChangeAccess = (event) => { setAccess(event) }
    const onValueChange = (event) => {
        switch (event) {
            case 'ИСКАТЕЛЬ':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                setAdminId('0');
                break;
            case 'УЧЕНИК':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                setAdminId('0');
                break;
            case 'ПРОМОУТЕР':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                setAdminId('0');
                break;
            case 'УЧИТЕЛЬ':
                setStatus(event);
                setRoles('ROLE_TEATHER');
                setAccess('full');
                setAdminId(user.id);
                break;
            case 'admin':
                setStatus(event);
                setRoles('ROLE_ADMIN');
                setAccess('full');
                break;
        }
    }

    const selectTeather = (e, teather) => {
        e.preventDefault();
        if (teather === undefined) {
            setUserData({
                ...userData,
                teather: null
            })
        } else {
            setUserData({
                ...userData,
                teather: {
                    id: teather.id,
                    name: teather.firstname + ' ' + teather.lastname,
                    phonenumber: teather.phonenumber,
                    country: teather.country,
                    sity: teather.sity,
                    status: teather.status,
                    access: teather.access,
                    roles: teather.roles,
                    avatar: teather.avatar

                }
            })
        }
    }

    const changeUser = (e) => {
        e.preventDefault();
        dispatch(userActions.updateUser(userData.id, jwt, userData.firstname, userData.lastname, userData.phonenumber, userData.country, userData.sity, status, access, roles, userData.avatar, roles === 'ROLE_TEATHER' ? user.id : '0', userData.teather === null ? '0' : userData.teather, userData.promouter_id)).then(
            () => close()
        )
    }

    return (
        <Dialog onClose={() => close()} open={open}>
            <Form onSubmit={(e) => changeUser(e)}>
                <DialogTitle>
                    <Typography variant='h5' component='h5' className='m-0'>{`Изменить пользователя ${userData.firstname}?`}</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить учителя пользователя?`}</Typography>
                    {userData !== null && userData.teather !== null && userData !== undefined && userData.teather !== undefined ? (
                        <UserPlane button onClick={(e) => selectTeather(e)} name={userData.teather.name} avatar={userData.teather.avatar} status={userData.teather.status} />
                    ) : (
                            <div className={'teathers-list'}>
                                {teathers.map((teather, index) => (
                                    <UserPlane button key={index} onClick={(e) => selectTeather(e, teather)} name={teather.firstname + ' ' + teather.lastname} avatar={teather.avatar} status={teather.status} />
                                ))}
                            </div>
                        )}
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить доступ к курсам?`}</Typography>
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'access'}
                                value={'limited'}
                                selected={access === "limited" ? "limited" : ""}
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
                                selected={access === "full" ? "full" : ""}
                                onChange={onValueChangeAccess}
                            />
                        }
                        label={'Полный'}
                    />
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить статус пользователя?`}</Typography>
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'ИСКАТЕЛЬ'}
                                selected={status === "ИСКАТЕЛЬ" ? "ИСКАТЕЛЬ" : ""}
                                onChange={onValueChange}
                            />
                        }
                        label={'ИСКАТЕЛЬ'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'УЧЕНИК'}
                                selected={status === "УЧЕНИК" ? "УЧЕНИК" : ""}
                                onChange={onValueChange}
                            />
                        }
                        label={'УЧЕНИК'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'ПРОМОУТЕР'}
                                selected={status === "ПРОМОУТЕР" ? "ПРОМОУТЕР" : ""}
                                onChange={onValueChange}
                            />
                        }
                        label={'ПРОМОУТЕР'}
                    />
                    <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'УЧИТЕЛЬ'}
                                selected={status === "УЧИТЕЛЬ" ? "УЧИТЕЛЬ" : ""}
                                onChange={onValueChange}
                            />
                        }
                        label={'УЧИТЕЛЬ'}
                    />
                    {user.roles === 'ROLE_SUPER_ADMIN' && <FormControlLabel
                        className='w-max'
                        control={
                            <Radio
                                name={'status'}
                                value={'admin'}
                                selected={status === "admin" ? "admin" : ""}
                                onChange={onValueChange}
                            />
                        }
                        label={'АДМИНИСТРАТОР'}
                    />}
                </DialogContent>
                <DialogActions>
                    <Button type="submit" className={'mr-3'} variant='outlined' color="primary">Сохранить</Button>
                    <Button onPress={() => close()} variant='outlined' color="primary">Отмена</Button>
                </DialogActions>
            </Form>
        </Dialog >
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    return { jwt, user };
}

const connectedDialogChangeUser = connect(mapStateToProps)(DialogChangeUser);
export { connectedDialogChangeUser as DialogChangeUser };