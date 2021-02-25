import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { userActions } from "../_actions";
import {
    Table,
    Row,
    Cell,
    TableHeader,
    TableHeaderText,
    Button,
    Loading,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Typography,
    DataTable,
    Form,
    FormControlLabel,
    Radio
} from '../_components'

const AdminPanelPage = ({ dispatch, history, jwt, user, users }) => {
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState({});
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [status, setStatus] = useState('');
    const [roles, setRoles] = useState('');
    const [access, setAccess] = useState('');

    useEffect(() => {
        if (user.roles !== 'ROLE_ADMIN') {
            history.push('/')
        } else {
            dispatch(userActions.readAll(jwt)).then(setLoading(false))
        }
    }, []);


    //EDIT
    const edit = (user) => { setEditDialog(true), setUserData(user), setStatus(user.status), setRoles(user.roles), setAccess(user.access) }
    const editClose = () => { setEditDialog(false) }
    const editDialogPlane = () => {
        return (
            <Dialog onClose={() => editClose()} open={editDialog}>
                <Form onSubmit={() => editUser()}>
                    <DialogTitle>
                        <Typography variant='h5' component='h5' className='m-0'>{`Изменить пользователя ${userData.firstname}?`}</Typography>
                    </DialogTitle>
                    <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                        <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить учителя пользователя?`}</Typography>
                        {userData !== null && JSON.stringify(userData)}
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
                        <FormControlLabel
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
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={'mr-3'} variant='outlined' color="primary">Сохранить</Button>
                        <Button onPress={() => editClose()} variant='outlined' color="primary">Отмена</Button>
                    </DialogActions>
                </Form>
            </Dialog >
        )
    }
    const onValueChangeAccess = (event) => { setAccess(event) }
    const onValueChange = (event) => {
        switch (event) {
            case 'ИСКАТЕЛЬ':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                break;
            case 'УЧЕНИК':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                break;
            case 'ПРОМОУТЕР':
                setStatus(event);
                setRoles('user');
                setAccess('limited');
                break;
            case 'УЧИТЕЛЬ':
                setStatus(event);
                setRoles('ROLE_TEATHER');
                setAccess('full');
                break;
            case 'admin':
                setStatus(event);
                setRoles('ROLE_ADMIN');
                setAccess('full');
                break;
        }
    }
    const editUser = () => {
        editClose();
    }


    //DETETE
    const remove = (user) => { setDeleteDialog(true), setUserData(user) }
    const removeClose = () => { setDeleteDialog(false) }
    const removeDialogPlane = () => {
        return (
            <Dialog onClose={() => removeClose()} open={deleteDialog}>
                <DialogTitle>
                    <Typography variant='h5' component='h5' className='m-0'>Удалить пользователя?</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверенны что хотите удалить пользователя с именем ${userData.firstname}?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={() => { dispatch(userActions.deleteUser(jwt, userData.id)).then(() => { removeClose() }) }} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                    <Button onPress={() => removeClose()} variant='outlined' color="primary">Отмена</Button>
                </DialogActions>
            </Dialog>
        )
    }


    const more = (user) => {
        console.log(user)
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className='py-3'>
                {editDialogPlane()}
                {removeDialogPlane()}
                <DataTable columns={
                    [
                        {
                            Header: 'Имя',
                            accessor: 'firstname',
                        },
                        {
                            Header: 'Фамилия',
                            accessor: 'lastname',
                        },
                        {
                            Header: 'Номер телефона',
                            accessor: 'phonenumber',
                        },
                        {
                            Header: 'Страна',
                            accessor: 'country',
                        },
                        {
                            Header: 'Город',
                            accessor: 'sity',
                        },
                        {
                            Header: 'Статус',
                            accessor: 'status',
                        },
                        {
                            Header: 'Доступ ко всем курсам',
                            accessor: 'access',
                        },
                        {
                            Header: 'Учитель',
                            accessor: 'teather.name',
                        },
                        {
                            Header: 'Действия',
                            accessor: '',
                        }
                    ]}
                    data={users.students !== undefined ? users.students : []}
                    edit={edit}
                    remove={remove}
                />
                Статистика
                Управление курсами
                Управление пользователями
            </div>
        );
    }


};

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { user, jwt } = authentication;
    return {
        user,
        jwt,
        users
    };
}

const connectedAdminPanelPage = connect(mapStateToProps)(AdminPanelPage);
export { connectedAdminPanelPage as AdminPanelPage };