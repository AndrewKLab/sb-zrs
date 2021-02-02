import React from 'react';
import { connect } from 'react-redux';
import { userActions, courseActions } from '../_actions';
import {
    Avatar,
    Accordion,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Loading,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemSecondAction,
    ListItemSubtitle,
    ListItemText,
    ListItemTitle,
    Menu,
    MenuItem,
    Form,
    FormControlLabel,
    Radio,
    IconButton
} from '../_components';
import { ProgressCircle } from '../LessonPage'

import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';



class TeatherPanelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: false,
            openAccessDialog: false,
            selectedOption: '',
            openDeleteDialog: false
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch, history, user } = this.props;
        if (user !== undefined) {
            if (user.roles !== 'ROLE_TEATHER') {
                history.push('/')
            } else {
                dispatch(userActions.getAllStudentsByUser(user.id)).then(
                    () => dispatch(courseActions.getAllCoursesByAutor(user.id)).then(
                        () => this.setState({ loading: false })
                    )
                )
            }
        }
    }

    handleClickOpen(id, firstname, lastname, phonenumber, country, sity, access, roles, teather_id, avatar) {
        this.setState({
            open: true,
            user_id: id,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            country: country,
            sity: sity,
            access: access,
            roles: roles,
            teather_id: teather_id,
            avatar: avatar
        })
    }

    handleClickOpenAccessDialog(id, firstname, lastname, phonenumber, country, sity, roles, status, access, teather_id, avatar) {
        this.setState({
            openAccessDialog: true,
            user_id: id,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            country: country,
            sity: sity,
            roles: roles,
            status: status,
            access: access,
            teather_id: teather_id,
            avatar: avatar
        })
    }

    handleClickOpenDeleteDialog(course_name, course_id) {
        this.setState({ openDeleteDialog: true, course_name: course_name, course_id: course_id })
    }

    handleClose() {
        this.setState({ open: false })
    }

    handleCloseAccessDialog() {
        this.setState({ openAccessDialog: false })
    }

    handleCloseDeleteDialog() {
        this.setState({ openDeleteDialog: false })
    }

    onValueChange(event) {
        this.setState({ selectedOption: event });
    }

    formSubmit(event) {
        const { dispatch, jwt } = this.props;
        const { user_id, firstname, lastname, phonenumber, country, sity, access, roles, teather_id, avatar } = this.state;
        event.preventDefault();
        dispatch(userActions.updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, this.state.selectedOption, access, roles, teather_id, avatar))
        this.setState({ selectedOption: '' });
        this.handleClose()
    }

    changeUserAcces() {
        const { dispatch, jwt } = this.props;
        const { user_id, firstname, lastname, phonenumber, country, sity, access, roles, status, teather_id, avatar } = this.state;
        dispatch(userActions.updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, status, access === 'limited' ? 'full' : 'limited', roles, teather_id, avatar))
        this.handleCloseAccessDialog()
    }

    renderChangeUserAccessDialog() {
        const { openAccessDialog, firstname, lastname, access } = this.state;
        return (
            <Dialog onClose={() => this.handleCloseAccessDialog()} open={openAccessDialog}>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>{access === 'limited' ? "Открыть " : "Закрыть "}доступ?</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'}>{access === 'limited' ? "Открыть " : "Закрыть "} доступ ко всем категориям курсов для ученика: {firstname + ' ' + lastname}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={() => this.changeUserAcces()} className={'mr-3'} variant='outlined' color="primary">
                        Да
                    </Button>
                    <Button onPress={() => this.handleCloseAccessDialog()} variant='outlined' color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderChangeUserStatusDialog() {
        const { open, firstname, lastname } = this.state;
        return (
            <Dialog onClose={() => this.handleClose()} open={open}>
                <Form onSubmit={this.formSubmit}>
                    <DialogTitle>
                        <Typography variant='h5' component='h5'>Изменить статус ученика: {firstname + ' ' + lastname}</Typography>
                    </DialogTitle>
                    <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                        <FormControlLabel
                            className='w-max'
                            control={
                                <Radio
                                    name={'status'}
                                    value={'ИСКАТЕЛЬ'}
                                    selected={this.state.selectedOption === "ИСКАТЕЛЬ" ? "ИСКАТЕЛЬ" : ""}
                                    onChange={this.onValueChange}
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
                                    selected={this.state.selectedOption === "УЧЕНИК" ? "УЧЕНИК" : ""}
                                    onChange={this.onValueChange}
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
                                    selected={this.state.selectedOption === "ПРОМОУТЕР" ? "ПРОМОУТЕР" : ""}
                                    onChange={this.onValueChange}
                                />
                            }
                            label={'ПРОМОУТЕР'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={'mr-3'} variant='outlined' color="primary">
                            Подтвердить
                        </Button>
                        <Button onPress={() => this.handleClose()} variant='outlined' color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        )
    }

    renderDeleteCourseDialog() {
        const { openDeleteDialog, course_name, course_id } = this.state;
        const { jwt, dispatch } = this.props;
        return (
            <Dialog onClose={() => this.handleCloseDeleteDialog()} open={openDeleteDialog}>
                <DialogTitle>
                    <Typography variant='h5' component='h5' className='m-0'>Удалить курс</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography component={'body'} variant={'body'} className='m-0'>{`Вы уверенны что хотите удалить курс "${course_name}"?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={() => { dispatch(courseActions.deleteCourse(jwt, course_id)), this.handleCloseDeleteDialog() }} className={'mr-3'} variant='outlined' color="primary">Да</Button>
                    <Button onPress={() => this.handleCloseDeleteDialog()} variant='outlined' color="primary">Закрыть</Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {

        const { history, users_array, courses, error } = this.props;
        const { loading } = this.state;
        if (loading) {
            return <Loading />
        }
        return (
            <div className={'py-3'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography component='h4' variant='h4'>Ваши курсы:</Typography>
                        <div className='d-flex grid-justify-xs-flex-end w-100'>
                            <Button onPress={() => { history.push(`/teather-panel/create-course`) }} variant='outlined' color="primary">Создать курс</Button>
                        </div>
                        {error === undefined ? (
                            <div>
                                {courses.basic && (
                                    <div className='pb-3'>
                                        <Typography component='h5' variant='h5'>{'Основные курсы'}</Typography>
                                        <Divider />
                                        <List>
                                            {courses.basic.map((item, index) => (
                                                <div key={index}>
                                                    <ListItem className='text-align-left p-0'>
                                                        <ListItemFirstAction>
                                                            <ListItemText>
                                                                <ListItemTitle>
                                                                    <Typography component='h6' variant='h6'>{item.name}</Typography>

                                                                </ListItemTitle>
                                                            </ListItemText>
                                                        </ListItemFirstAction>
                                                        <ListItemSecondAction>
                                                            {
                                                                item.published === "0" ?
                                                                    <div title='Неопубликованный курс'>
                                                                        <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                                    </div>
                                                                    :
                                                                    <div title='Опубликованный курс'>
                                                                        <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                                    </div>
                                                            }
                                                            <div title='Удалить курс' className='mr-3'>
                                                                <IconButton onClick={() => this.handleClickOpenDeleteDialog(item.name, item.id)}>
                                                                    <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                                </IconButton>
                                                            </div>
                                                            <Button onPress={() => history.push({
                                                                pathname: '/teather-panel/create-course',
                                                                state: { course: item }
                                                            })} variant='outlined' color="primary">Изменить курс</Button>
                                                        </ListItemSecondAction>
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            ))}
                                        </List>
                                    </div>
                                )}
                                {courses.special && (
                                    <div className='pb-3'>
                                        <Typography component='h5' variant='h5'>{'Специальные курсы'}</Typography>
                                        <Divider />
                                        <List>
                                            {courses.special.map((item, index) => (
                                                <div key={index}>
                                                    <ListItem className='text-align-left p-0'>
                                                        <ListItemFirstAction>
                                                            <ListItemText>
                                                                <ListItemTitle>
                                                                    <Typography component='h6' variant='h6'>{item.name}</Typography>

                                                                </ListItemTitle>
                                                            </ListItemText>
                                                        </ListItemFirstAction>
                                                        <ListItemSecondAction>
                                                            {
                                                                item.published === "0" ?
                                                                    <div title='Неопубликованный курс'>
                                                                        <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                                    </div>
                                                                    :
                                                                    <div title='Опубликованный курс'>
                                                                        <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                                    </div>
                                                            }
                                                            <div title='Удалить курс' className='mr-3'>
                                                                <IconButton onClick={() => this.handleClickOpenDeleteDialog(item.name, item.id)}>
                                                                    <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                                </IconButton>
                                                            </div>
                                                            <Button onPress={() => history.push({
                                                                pathname: '/teather-panel/create-course',
                                                                state: { course: item }
                                                            })} variant='outlined' color="primary">Изменить курс</Button>
                                                        </ListItemSecondAction>
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            ))}
                                        </List>
                                    </div>
                                )}

                                {courses.social && (
                                    <div className='pb-3'>
                                        <Typography component='h5' variant='h5'>{'Социальные курсы'}</Typography>
                                        <Divider />
                                        <List>
                                            {courses.social.map((item, index) => (
                                                <div key={index}>
                                                    <ListItem className='text-align-left p-0'>
                                                        <ListItemFirstAction>
                                                            <ListItemText>
                                                                <ListItemTitle>
                                                                    <Typography component='h6' variant='h6'>{item.name}</Typography>

                                                                </ListItemTitle>
                                                            </ListItemText>
                                                        </ListItemFirstAction>
                                                        <ListItemSecondAction>
                                                            {
                                                                item.published === "0" ?
                                                                    <div title='Неопубликованный курс'>
                                                                        <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                                    </div>
                                                                    :
                                                                    <div title='Опубликованный курс'>
                                                                        <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                                    </div>
                                                            }
                                                            <div title='Удалить курс' className='mr-3'>
                                                                <IconButton onClick={() => this.handleClickOpenDeleteDialog(item.name, item.id)}>
                                                                    <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                                </IconButton>
                                                            </div>
                                                            <Button onPress={() => history.push({
                                                                pathname: '/teather-panel/create-course',
                                                                state: { course: item }
                                                            })} variant='outlined' color="primary">Изменить курс</Button>
                                                        </ListItemSecondAction>
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            ))}
                                        </List>
                                    </div>
                                )}

                                {courses.national && (
                                    <div className='pb-3'>
                                        <Typography component='h5' variant='h5'>{'Национальные курсы'}</Typography>
                                        <Divider />
                                        <List>
                                            {courses.national.map((item, index) => (
                                                <div key={index}>
                                                    <ListItem className='text-align-left p-0'>
                                                        <ListItemFirstAction>
                                                            <ListItemText>
                                                                <ListItemTitle>
                                                                    <Typography component='h6' variant='h6'>{item.name}</Typography>

                                                                </ListItemTitle>
                                                            </ListItemText>
                                                        </ListItemFirstAction>
                                                        <ListItemSecondAction>
                                                            {
                                                                item.published === "0" ?
                                                                    <div title='Неопубликованный курс'>
                                                                        <EventBusyOutlinedIcon className='mr-3 warning-area-title-icon' />
                                                                    </div>
                                                                    :
                                                                    <div title='Опубликованный курс'>
                                                                        <EventAvailableOutlinedIcon className='mr-3 done-area-title-icon' />
                                                                    </div>
                                                            }
                                                            <div title='Удалить курс' className='mr-3'>
                                                                <IconButton onClick={() => this.handleClickOpenDeleteDialog(item.name, item.id)}>
                                                                    <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                                </IconButton>
                                                            </div>
                                                            <Button onPress={() => history.push({
                                                                pathname: '/teather-panel/create-course',
                                                                state: { course: item }
                                                            })} variant='outlined' color="primary">Изменить курс</Button>
                                                        </ListItemSecondAction>
                                                    </ListItem>
                                                    {index === courses.national.length - 1 ? (null) : <Divider />}
                                                </div>
                                            ))}
                                        </List>

                                    </div>
                                )}

                            </div>
                        ) : (
                                <div>
                                    <div>{error}</div>
                                </div>
                            )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography component='h4' variant='h4'>Ваши ученики:</Typography>
                        <List>
                            {users_array.map((student, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemFirstAction>
                                            <ListItemIcon>
                                                <Avatar src={student.avatar} alt={student.firstname + " " + student.lastname} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <ListItemTitle>
                                                    {student.firstname + " " + student.lastname}
                                                </ListItemTitle>
                                                <ListItemSubtitle>
                                                    Статус: {student.status}
                                                </ListItemSubtitle>
                                            </ListItemText>
                                        </ListItemFirstAction>
                                        <ListItemSecondAction>
                                            <Menu>
                                                <MenuItem onPress={() => this.handleClickOpen(
                                                    student.id,
                                                    student.firstname,
                                                    student.lastname,
                                                    student.phonenumber,
                                                    student.country,
                                                    student.sity,
                                                    student.access,
                                                    student.roles,
                                                    student.teather_id,
                                                    student.avatar
                                                )}>Изменить статус ученика</MenuItem>
                                                {student.status === 'УЧЕНИК' || student.status === 'ПРОМОУТЕР' ?
                                                    <MenuItem onPress={() => this.handleClickOpenAccessDialog(
                                                        student.id,
                                                        student.firstname,
                                                        student.lastname,
                                                        student.phonenumber,
                                                        student.country,
                                                        student.sity,
                                                        student.roles,
                                                        student.status,
                                                        student.access,
                                                        student.teather_id,
                                                        student.avatar
                                                    )}>Изменить доступ к курсам</MenuItem> : null
                                                }

                                            </Menu>
                                            {this.state.open === true ? this.renderChangeUserStatusDialog() : null}
                                            {this.state.openAccessDialog === true ? this.renderChangeUserAccessDialog() : null}
                                            {this.state.openDeleteDialog === true ? this.renderDeleteCourseDialog() : null}
                                        </ListItemSecondAction>
                                    </ListItem>

                                    {student.courses !== undefined ? (
                                        <Grid container spacing={2}>
                                            {student.courses.inprocess !== undefined ? (
                                                <Grid item xs={12} sm={student.courses.finished !== undefined ? 6 : 0}>
                                                    <Paper>
                                                        <Typography className='m-2' variant="h4" component="h4">Курсы в процессе прохождения:</Typography>
                                                        {student.courses.inprocess.map((course, index) => (
                                                            <Accordion key={index} labеl={course.course_name}>
                                                                <div>
                                                                    {course.lessons !== null ? (
                                                                        course.lessons.map((lesson, index) => (
                                                                            <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                                <ListItem button >
                                                                                    <ListItemFirstAction>
                                                                                        <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                        <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                                    </ListItemFirstAction>
                                                                                </ListItem>
                                                                                {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                            </div>
                                                                        ))
                                                                    ) : (course.course_name)}
                                                                </div>
                                                            </Accordion>
                                                        ))}
                                                    </Paper>
                                                </Grid>
                                            ) : (null)}
                                            {student.courses.finished !== undefined ? (
                                                <Grid item xs={12} sm={student.courses.inprocess !== undefined ? 6 : 0}>
                                                    <Paper>
                                                        <Typography className='m-2' variant="h4" component="h4">Пройденные курсы:</Typography>
                                                        {student.courses.finished.map((course, index) => (
                                                            <Accordion key={index} labеl={course.course_name}>
                                                                <div>
                                                                    {course.lessons.map((lesson, index) => (
                                                                        <div key={index} onClick={() => { history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`) }}>
                                                                            <ListItem button >
                                                                                <ListItemFirstAction>
                                                                                    <ProgressCircle status={lesson.status} number={lesson.number} />
                                                                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                                                </ListItemFirstAction>
                                                                            </ListItem>
                                                                            {course.lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (null)}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Accordion>
                                                        ))}
                                                    </Paper>
                                                </Grid>
                                            ) : (null)}

                                        </Grid>
                                    ) : (null)}
                                    <Divider />
                                </div>
                            ))}
                        </List>
                    </Grid>
                </Grid>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, users, course } = state;
    const { user, jwt } = authentication;
    const { loading, users_array } = users;
    const { courses, error } = course;
    return {
        jwt,
        loading,
        users_array,
        user,
        courses,
        error
    };
}
const connectedTeatherPanelPage = connect(mapStateToProps)(TeatherPanelPage);
export { connectedTeatherPanelPage as TeatherPanelPage }; 