import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { userActions, courseActions } from "../_actions";
import {
    Paper,
    Accordion,
    UserPlane,
    TableHeader,
    TableHeaderText,
    Button,
    Loading,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Typography,
    DataTable,
    Form,
    FormControlLabel,
    Radio,
    Tabs,
    Tab,
    TabPanel
} from '../_components';

import { DialogDeleteUser, DialogChangeUser } from './';
import { TeatherCourses } from '../TeatherPanelPage/TeatherCourses';

const AdminPanelPage = ({ dispatch, history, jwt, user, users, courses, course_error }) => {
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);

    const [userData, setUserData] = useState({});
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [status, setStatus] = useState('');
    const [roles, setRoles] = useState('');
    const [access, setAccess] = useState('');

    useEffect(() => {
        if (user.roles === 'ROLE_ADMIN' || user.roles === 'ROLE_SUPER_ADMIN') {
            dispatch(userActions.readAll(jwt)).then(
                () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                    () => setLoading(false)))
        } else {
            history.push('/');
        }
    }, []);


    //EDIT
    const edit = (user) => { setEditDialog(true), setUserData(user), setStatus(user.status), setRoles(user.roles), setAccess(user.access) }
    const editClose = () => { setEditDialog(false) }


    //DETETE
    const remove = (user) => { setDeleteDialog(true), setUserData(user) }
    const removeClose = () => { setDeleteDialog(false) }

    const selectTab = (event) => { setTab(event.target.id) }


    if (loading) {
        return <Loading />
    } else {
        return (
            <div className='pb-3'>
                <Paper square className='mb-3'>
                    <Tabs onChange={selectTab} tab={tab}>
                        <Tab index={0}>Статистика</Tab>
                        <Tab index={1}>Управление пользователями</Tab>
                        <Tab index={2}>Управление курсами</Tab>
                    </Tabs>
                </Paper>

                <TabPanel tab={tab} index={0}>
                    <Paper square className='p-3'>
                        Вкладка статистики !--(Уточнить какие данные нужно собирать)--!
                        </Paper>
                </TabPanel>


                <TabPanel tab={tab} index={1}>
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
                        <Typography variant='h3' component='h3'>{user.roles === "ROLE_SUPER_ADMIN" ? 'Учителя:' : 'Ваши учителя:'}</Typography>
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
                            data={users.teathers !== undefined ? user.roles === "ROLE_SUPER_ADMIN" ? users.teathers : users.teathers.filter(t => t.admin_id === user.id) : []}
                            edit={edit}
                            remove={remove}
                        />
                    </div>

                    {
                        user.roles === "ROLE_SUPER_ADMIN" &&
                        <div className='mb-3'>
                            <Typography variant='h3' component='h3'>{'Администраторы:'}</Typography>
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
                                data={users.admins !== undefined ? users.admins.filter(t => t.roles === 'ROLE_ADMIN') : []}
                                edit={edit}
                                remove={remove}
                            />
                        </div>
                    }

                </TabPanel>

                <TabPanel tab={tab} index={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper square >
                                <TeatherCourses create={true} user={user} courses={courses} course_error={course_error} history={history} panel={'admin-panel'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper square>
                                <div className='paper-header'>
                                    <Typography component='h4' variant='h4' className={'paper-header-text'}>Ваши учителя и их курсы:</Typography>
                                </div>
                                {users.teathers.filter(teather => teather.admin_id === user.id).map((teather, index) => (
                                    <div key={index} className={'mx-3 mb-3'}>
                                        <Accordion labеl={
                                            <UserPlane className={'p-0'} name={teather.firstname + " " + teather.lastname} avatar={teather.avatar} status={teather.status} />
                                        }>
                                            <TeatherCourses create={false} history={history} panel={'admin-panel'} user={user} courses={teather.courses !== null ? teather.courses : []} course_error={teather.courses === null ? 'У этого учителя нет своих курсов.' : undefined} />
                                        </Accordion>
                                    </div>
                                ))}
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>


            </div>
        );
    }


};

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { courses, course_error } = state.course;
    const { user, jwt } = authentication;
    return {
        user,
        jwt,
        users,
        courses,
        course_error
    };
}

const connectedAdminPanelPage = connect(mapStateToProps)(AdminPanelPage);
export { connectedAdminPanelPage as AdminPanelPage };