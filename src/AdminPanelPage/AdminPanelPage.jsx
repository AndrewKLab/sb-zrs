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
    Form
} from '../_components'

const AdminPanelPage = ({ dispatch, history, jwt, user, users }) => {
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState({});
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {
        if (user.roles !== 'ROLE_ADMIN') {
            history.push('/')
        } else {
            dispatch(userActions.readAll(jwt)).then(setLoading(false))
        }
    }, []);


    //EDIT
    const edit = (user) => { setEditDialog(true), setUserData(user) }
    const editClose = () => { setEditDialog(false) }
    const editDialogPlane = () => {
        return (
            <Dialog onClose={() => editClose()} open={editDialog}>
                <Form onSubmit={() => editUser()}>
                    <DialogTitle>
                        <Typography variant='h5' component='h5' className='m-0'>{`Изменить пользователя ${userData.firstname}?`}</Typography>
                    </DialogTitle>
                    <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                        <Typography component={'body'} variant={'body'} className='m-0'>{`Изменить доступ к курсам?`}</Typography>


                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={'mr-3'} variant='outlined' color="primary">Сохранить</Button>
                        <Button onPress={() => editClose()} variant='outlined' color="primary">Отмена</Button>
                    </DialogActions>
                </Form>
            </Dialog >
        )
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
                            Header: 'Доступ ко всем курсам',
                            accessor: 'access',
                        },
                        {
                            Header: 'Учитель',
                            accessor: 'teather_id',
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