import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
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
    Radio
} from '../_components';
import { ProgressCircle } from '../LessonPage'



class TeatherPanelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedOption: ''
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
                dispatch(userActions.getAllStudentsByUser(user.id))
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

    handleClose() {
        this.setState({ open: false })
    }

    onValueChange(event) {
        this.setState({ selectedOption: event });
    }

    formSubmit(event) {
        const { dispatch, jwt } = this.props;
        const {user_id, firstname, lastname, phonenumber, country, sity, access, roles, teather_id, avatar } = this.state;
        event.preventDefault();
        console.log(this.state.selectedOption);
        dispatch(userActions.updateUserById(user_id, jwt, firstname, lastname, phonenumber, country, sity, this.state.selectedOption, access, roles, teather_id, avatar))
        this.setState({ selectedOption: '' });
        this.handleClose()
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

    render() {
        const { loading, users_array } = this.props;
        if (loading === undefined || loading === true) {
            return <Loading />
        }
        return (
            <div className={'py-3'}>
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
                                        <MenuItem onPress={() => {console.log('открыть доступ ко всем курсам')}}>Открыть доступ ко всем курсам</MenuItem>
                                    </Menu>
                                    {this.state.open === true ? this.renderChangeUserStatusDialog() : null}
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
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { authentication, users } = state;
    const { user, jwt } = authentication;
    const { loading, users_array } = users;
    return {
        jwt,
        loading,
        users_array,
        user
    };
}
const connectedTeatherPanelPage = connect(mapStateToProps)(TeatherPanelPage);
export { connectedTeatherPanelPage as TeatherPanelPage }; 