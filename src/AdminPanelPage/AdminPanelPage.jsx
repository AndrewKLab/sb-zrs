import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { userActions, courseActions, categoryActions, chatActions } from "../_actions";
import {
    Paper,
    Accordion,
    UserPlane,
    Button,
    Loading,
    Grid,
    Typography,
    DataTable,
    Alert,
    Tabs,
    Tab,
    TabPanel,
    Chat
} from '../_components';

import { CreateUserDialog, UpdateUserDialog } from '../Dialogs';

import { DialogDeleteUser, DialogChangeUser } from './';
import { TeatherCourses } from '../TeatherPanelPage/TeatherCourses';

import { UsersAccordionList } from "./UsersMenagment";

const AdminPanelPage = ({ dispatch, history, jwt, user, users, courses, course_error }) => {
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);

    const [createUserDialog, setCreateUserDialog] = useState(false);
    const [updateUserDialog, setUpdateUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);


    useEffect(() => {
        if (user.role_type === 'ROLE_ADMIN' || user.role_type === 'ROLE_SUPER_ADMIN') {
            dispatch(userActions.readAll(jwt)).then(
                () => {
                    switch (user.role_type) {
                        case 'ROLE_ADMIN':
                            dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                                () => setLoading(false))
                            break;
                        case 'ROLE_SUPER_ADMIN':
                            dispatch(courseActions.getAllCourses(jwt)).then(
                                () => setLoading(false))
                            break;

                        default:
                            history.push('/');
                            break;
                    }
                })
        } else {
            history.push('/');
        }
    }, []);

    const openCreateUserDialog = () => { setCreateUserDialog(true) }
    const closeCreateUserDialog = () => { setCreateUserDialog(false) }

    const openUpdateUserDialog = (user) => { dispatch(userActions.selectUser(user)), setUpdateUserDialog(true) }
    const edit = (user) => { openUpdateUserDialog(user) }
    const closeUpdateUserDialog = () => { setUpdateUserDialog(false) }

    const openDeleteUserDialog = (user) => { dispatch(userActions.selectUser(user)), setDeleteUserDialog(true) }
    const remove = (user) => { openDeleteUserDialog(user) }
    const closeDeleteUserDialog = () => { setDeleteUserDialog(false) }


    const dialog = async (user) => {
        await dispatch(chatActions.createChat(jwt, user.id))
        history.push('/dialogs')
    }


    const selectTab = (event) => { setTab(event.target.id) }

    const EmptyTableComponent = (text) => {
        return <Alert className='info' severity="info">{text}</Alert>
    }


    if (loading) return <Loading />
    return (
        <div className='pb-3'>
            <Paper square className='mb-3'>
                <Tabs onChange={selectTab} tab={tab}>
                    {/* <Tab index={0}>Статистика</Tab> */}
                    <Tab index={0}>Управление пользователями</Tab>
                    <Tab index={1}>Управление курсами</Tab>
                    <Tab index={2}>Диалоги</Tab>
                </Tabs>
            </Paper>

            {/* <TabPanel tab={tab} index={0}>
                    <Paper square className='p-3'>
                        Вкладка статистики !--(Уточнить какие данные нужно собирать)--!
                        </Paper>
                </TabPanel> */}


            <TabPanel tab={tab} index={0}>
                <CreateUserDialog open={createUserDialog} close={closeCreateUserDialog} />
                <UpdateUserDialog open={updateUserDialog} close={closeUpdateUserDialog} />
                <DialogDeleteUser open={deleteUserDialog} close={closeDeleteUserDialog} />

                <div className='mb-3'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Button onPress={openCreateUserDialog} variant='outlined' color="primary">Создать пользователя</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UsersAccordionList
                                progress
                                usersBlock
                                title="Ваши учителя и их ученики:"
                                users={users.teathers ? users.teathers.filter(teather => teather.admin && teather.admin.id === user.id) : []}
                                empty={users.teathers && users.teathers.filter(teather => teather.admin && teather.admin.id === user.id).length > 0 ? null : <Alert className='info' severity="info">{'На данный момент у вас нет учителей!'}</Alert>}
                                edit={edit}
                                remove={remove}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UsersAccordionList
                                progress
                                title="Ученики без учителя:"
                                users={users.students ? users.students.filter(student => !student.teather) : []}
                                empty={users.students && users.students.filter(student => !student.teather).length > 0 ? null : <Alert className='info' severity="info">{'На данный момент нет учеников без учителя!'}</Alert>}
                                edit={edit}
                                remove={remove}
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>Ученики:</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Email', accessor: 'email' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Община', accessor: 'commune' },
                            { Header: 'Статус', accessor: 'role_name' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Учитель', accessor: '' },
                            { Header: 'Дата регистрации', accessor: '' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.students !== undefined ? users.students : []}
                        dialog={dialog}
                        edit={edit}
                        remove={remove}
                        ititSortBy={'lastname'}
                        ititSortType={'asc'}
                        EmptyTableComponent={() => EmptyTableComponent('На данный момент у вас нет учеников!')}
                    />
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>Промоутеры:</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Email', accessor: 'email' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Община', accessor: 'commune' },
                            { Header: 'Статус', accessor: 'role_name' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Учитель', accessor: '' },
                            { Header: 'Дата регистрации', accessor: '' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.promouters !== undefined ? users.promouters : []}
                        dialog={dialog}
                        edit={edit}
                        remove={remove}
                        ititSortBy={'lastname'}
                        ititSortType={'asc'}
                        EmptyTableComponent={() => EmptyTableComponent('На данный момент у вас нет промоутеров!')}
                    />
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3'>{user.role_type === "ROLE_TEATHER" ? 'Ваши учителя:' : 'Учителя:'}</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Email', accessor: 'email' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Община', accessor: 'commune' },
                            { Header: 'Статус', accessor: 'role_name' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Админ', accessor: '' },
                            { Header: 'Дата регистрации', accessor: '' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.teathers !== undefined ? user.role_type === "ROLE_SUPER_ADMIN" ? users.teathers : users.teathers.filter(t => t.admin_id === user.id) : []}
                        dialog={dialog}
                        edit={edit}
                        remove={remove}
                        ititSortBy={'lastname'}
                        ititSortType={'asc'}
                        EmptyTableComponent={() => EmptyTableComponent('На данный момент у вас нет учителей!')}
                    />
                </div>

                <div className='mb-3'>
                    <Typography variant='h3' component='h3' >Координаторы</Typography>
                    <DataTable columns={
                        [
                            { Header: 'Имя', accessor: 'firstname' },
                            { Header: 'Фамилия', accessor: 'lastname' },
                            { Header: 'Номер телефона', accessor: 'phonenumber' },
                            { Header: 'Email', accessor: 'email' },
                            { Header: 'Страна', accessor: 'country' },
                            { Header: 'Город', accessor: 'sity' },
                            { Header: 'Община', accessor: 'commune' },
                            { Header: 'Статус', accessor: 'role_name' },
                            { Header: 'Доступ ко всем курсам', accessor: 'access' },
                            { Header: 'Админ', accessor: '' },
                            { Header: 'Дата регистрации', accessor: '' },
                            { Header: 'Действия', accessor: '' }
                        ]}
                        data={users.coordinators !== undefined ? users.coordinators : []}
                        dialog={dialog}
                        edit={edit}
                        remove={remove}
                        ititSortBy={'lastname'}
                        ititSortType={'asc'}
                        EmptyTableComponent={() => EmptyTableComponent('На данный момент у вас нет координоторов!')}
                    />
                </div>

                {
                    user.role_type === "ROLE_SUPER_ADMIN" &&
                    <div className='mb-3'>
                        <Typography variant='h3' component='h3'>{'Администраторы:'}</Typography>
                        <DataTable columns={
                            [
                                { Header: 'Имя', accessor: 'firstname' },
                                { Header: 'Фамилия', accessor: 'lastname' },
                                { Header: 'Номер телефона', accessor: 'phonenumber' },
                                { Header: 'Email', accessor: 'email' },
                                { Header: 'Страна', accessor: 'country' },
                                { Header: 'Город', accessor: 'sity' },
                                { Header: 'Община', accessor: 'commune' },
                                { Header: 'Статус', accessor: 'role_name' },
                                { Header: 'Доступ ко всем курсам', accessor: 'access' },
                                { Header: 'Суперадмин', accessor: '' },
                                { Header: 'Дата регистрации', accessor: '' },
                                { Header: 'Действия', accessor: '' }
                            ]}
                            data={users.admins !== undefined ? users.admins.filter(t => t.role_type === 'ROLE_ADMIN' || t.role_type === 'ROLE_SUPER_ADMIN') : []}
                            dialog={dialog}
                            edit={edit}
                            remove={remove}
                            ititSortBy={'lastname'}
                            ititSortType={'asc'}
                        />
                    </div>
                }

            </TabPanel>

            <TabPanel tab={tab} index={1}>
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
                            {users.teathers !== undefined ?
                                users.teathers.filter(teather => teather.admin_id === user.id).length > 0 ?
                                    users.teathers.filter(teather => teather.admin_id === user.id).map((teather, index) => (
                                        <div key={index} className={'mx-3 mb-3'}>
                                            <Accordion labеl={
                                                <UserPlane className={'p-0'} name={teather.firstname + " " + teather.lastname} avatar={teather.avatar} status={teather.role_name} />
                                            }>
                                                <TeatherCourses create={false} history={history} panel={'admin-panel'} user={user} courses={teather.courses !== null ? teather.courses : []} course_error={teather.courses === null ? 'У этого учителя нет своих курсов.' : undefined} />
                                            </Accordion>
                                        </div>
                                    ))
                                    : <Alert className='info' severity="info">{'На данный момент у вас нет учителей!'}</Alert>
                                : <Alert className='info' severity="info">{'На данный момент нет учителей!'}</Alert>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel tab={tab} index={2}>
                <Chat />
            </TabPanel>


        </div>
    );
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