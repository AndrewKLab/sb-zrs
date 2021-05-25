import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { userActions, courseActions, categoryActions } from "../_actions";
import {
    Avatar,
    Paper,
    Accordion,
    UserPlane,
    UserAccordionPlane,
    IconButton,
    TextEditor,
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
    TabPanel,
    Chat
} from '../_components';

import JoditEditor from "jodit-react";

import { DialogDeleteUser, DialogChangeUser } from './';
import { TeatherCourses } from '../TeatherPanelPage/TeatherCourses';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const AdminPanelPage = ({ dispatch, history, jwt, user, users, courses, course_error }) => {
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);

    const [userData, setUserData] = useState({});
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [status, setStatus] = useState('');
    const [roles, setRoles] = useState('');
    const [access, setAccess] = useState('');
    const [adminId, setAdminId] = useState('0');

    useEffect(() => {
        if (user.roles === 'ROLE_ADMIN' || user.roles === 'ROLE_SUPER_ADMIN') {
            dispatch(userActions.readAll(jwt)).then(
                () => {
                    switch (user.roles) {
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
                        <Tab index={3}>Диалоги</Tab>
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
                        setAdminId={setAdminId}
                        adminId={adminId}
                        teathers={users.teathers !== undefined ? users.teathers : []}
                    />
                    <DialogDeleteUser open={deleteDialog} close={removeClose} userData={userData} />

                    <div className='mb-3'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Paper square >
                                    <div className='paper-header mb-3'>
                                        <Typography component='h4' variant='h4' className={'paper-header-text'}>Ваши учителя и их ученики:</Typography>
                                    </div>

                                    {users.teathers !== undefined && users.teathers.filter(teather => teather.admin_id === user.id).map((teather, index) => (
                                        <div key={index} className={'mx-3 mb-3'}>
                                            <Accordion labеl={
                                                <UserPlane className={'p-0'} name={teather.firstname + " " + teather.lastname} avatar={teather.avatar} status={teather.status} />
                                            }>
                                                <div>
                                                    <div className={'d-flex p-3 grid-align-items-xs-center'}>
                                                        <Avatar alt={teather.firstname + " " + teather.lastname} src={teather.avatar} className={'avatar-large'} />
                                                        <div className={'p-3 w-100'}>
                                                            <div className={'d-flex grid-justify-xs-space-between grid-align-items-xs-center'}>
                                                                <Typography component='h5' variant='h5'>{teather.firstname + " " + teather.lastname}</Typography>
                                                                <div>
                                                                    <IconButton onClick={() => edit(teather)}>
                                                                        <EditOutlinedIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={() => remove(teather)}>
                                                                        <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                            <div className={'d-flex'}>
                                                                <div>
                                                                    <strong>Телефон: </strong>+7{teather.phonenumber}<br />
                                                                    <strong>Страна: </strong>{teather.country}<br />
                                                                    <strong>Город: </strong>{teather.sity}
                                                                </div>

                                                                <div className={'ml-3'}>
                                                                    <strong>Статус: </strong>{teather.status}<br />
                                                                    <strong>Доступ к курсам: </strong>{teather.access === 'full' ? 'полный' : 'ограниченый'}<br />
                                                                    <strong>Учитель: </strong>{teather.teather === null ? 'НЕТ' : teather.teather.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Divider className={'mt-0'} />
                                                            <Typography component='h5' variant='h5' className={'paper-header-text'}>Ученики:</Typography>
                                                            <Divider className={'mb-3'} />

                                                            {users.students !== undefined ? users.students.filter(student => student.teather !== null && student.teather.id === teather.id).length === 0 ? <div className='p-3'>У данного учителя нет учеников.</div> : users.students.filter(student => student.teather !== null && student.teather.id === teather.id).map((student, index) => (
                                                                <UserAccordionPlane key={index} edit={edit} remove={remove} user={student} />
                                                            )) : 'У данного учителя нет учеников.'}

                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Divider className={'mt-0'} />
                                                            <Typography component='h5' variant='h5' className={'paper-header-text'}>Промоутеры:</Typography>
                                                            <Divider className={'mb-3'} />
                                                            {users.promouters !== undefined ? users.promouters.filter(promouter => promouter.teather !== null && promouter.teather.id === teather.id).length === 0 ? <div className='p-3'>У данного учителя нет промоутеров.</div> : users.promouters.filter(promouter => promouter.teather !== null && promouter.teather.id === teather.id).map((promouter, index) => (
                                                                <UserAccordionPlane key={index} edit={edit} remove={remove} user={promouter} />
                                                            )) : 'У данного учителя нет учеников.'}
                                                        </Grid>
                                                    </Grid>

                                                </div>
                                            </Accordion>
                                        </div>
                                    ))}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper square>
                                    <div className='paper-header mb-3'>
                                        <Typography component='h4' variant='h4' className={'paper-header-text'}>Ученики без учителя:</Typography>
                                    </div>
                                    <div className='mx-3'>
                                        {users.students !== undefined ? users.students.filter(student => student.teather === null).length === 0 ? <div className='p-3'>Сейчас нет учеников без учителя.</div> : users.students.filter(student => student.teather === null).map((student, index) => (
                                            <UserAccordionPlane key={index} edit={edit} remove={remove} user={student} />
                                        )) : 'Сейчас нет учеников без учителя.'}
                                    </div>
                                </Paper>
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
                                {users.teathers !== undefined && users.teathers.filter(teather => teather.admin_id === user.id).map((teather, index) => (
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

                <TabPanel tab={tab} index={3}>
                    <Chat />
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