import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { userActions, courseActions } from "../_actions";
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
} from '../_components';

import { DialogDeleteUser, DialogChangeUser } from './';
import { TeatherCourses } from '../TeatherPanelPage/TeatherCourses';

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
            dispatch(userActions.readAll(jwt)).then(
                () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                    () => setLoading(false)))


        }
    }, []);


    //EDIT
    const edit = (user) => { setEditDialog(true), setUserData(user), setStatus(user.status), setRoles(user.roles), setAccess(user.access) }
    const editClose = () => { setEditDialog(false) }


    //DETETE
    const remove = (user) => { setDeleteDialog(true), setUserData(user) }
    const removeClose = () => { setDeleteDialog(false) }


    if (loading) {
        return <Loading />
    } else {
        return (
            <div className='py-3'>
                <DialogChangeUser
                    open={editDialog}
                    close={editClose}
                    userData={userData}
                    setUserData={setUserData}
                    setStatus={setStatus}
                    status={status}
                    setRoles={setRoles}
                    roles={roles}
                    setAccess={setAccess}
                    access={access}
                    teathers={users.teathers !== undefined ? users.teathers : []}
                />
                <DialogDeleteUser open={deleteDialog} close={removeClose} userData={userData} />
                <Typography variant='h3' component='h3'>Управление курсами:</Typography>
                <TeatherCourses history={history} panel={'admin-panel'} />
                <Divider />
                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>Ученики:</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Статус', accessor: 'status' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Учитель', accessor: 'teather.name' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.students !== undefined ? users.students : []}
                        edit={edit}
                        remove={remove}
                    />
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>Промоутеры:</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Статус', accessor: 'status' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Учитель', accessor: 'teather.name' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.promouters !== undefined ? users.promouters : []}
                        edit={edit}
                        remove={remove}
                    />
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>Учителя:</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Статус', accessor: 'status' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Учитель', accessor: 'teather.name' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.teathers !== undefined ? users.teathers : []}
                        edit={edit}
                        remove={remove}
                    />
                </div>

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