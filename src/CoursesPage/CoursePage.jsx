import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { lessonActions, courseActions, userActions } from '../_actions'
import ClampLines from 'react-clamp-lines';
import Moment from 'moment';
import 'moment/locale/ru';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import {
    Avatar,
    Loading,
    Paper,
    Button,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText,
} from '../_components';

class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        const { dispatch, user } = this.props;

        if (user != undefined ) {
            dispatch(userActions.getAllTeathers())
            dispatch(lessonActions.getAllLessonsByCourse(
                this.props.match.params.course, user.id, user.teather_id))
        }

    }

    renderTeathersList(user, teathers, teather_name, teather_status, teather_avatar) {
        if (Number(user.teather_id) === 0 && user.roles === "user") {
            return (
                <div>
                    <Typography variant="h6">Учителя: </Typography>
                    <Paper variant="outlined" square >
                        <List className='teathers-list'>
                            {teathers.map((teather, index) => (
                                <div key={index}>
                                    <ListItem button key={index} onPress={() => this.handleClickOpen(teather.id, teather.firstname, teather.lastname, teather.status, teather.avatar)}>
                                        <ListItemFirstAction>
                                            <ListItemIcon>
                                                <Avatar alt={teather.firstname + " " + teather.lastname} src={teather.avatar} />
                                            </ListItemIcon>
                                            <ListItemText title={teather.firstname + " " + teather.lastname} subtitle={"Статус: " + teather.status} />
                                        </ListItemFirstAction>
                                    </ListItem>
                                    {this.renderTeatherDialog()}
                                </div>
                            )
                            )}
                        </List>
                    </Paper>
                </div>
            )
        } else if (Number(user.teather_id) === 0 && user.roles !== "user") {
            return (null)
        } else {
            return (
                <div>
                    <Typography variant="h6" >Учитель: </Typography>
                    <Paper variant="outlined" square >
                        <ListItem button>
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <Avatar alt={teather_name} src={teather_avatar} />
                                </ListItemIcon>
                                <ListItemText title={teather_name} subtitle={"Регалии: " + teather_status} />
                            </ListItemFirstAction>
                        </ListItem>
                    </Paper>
                </div>
            )
        }
    }

    renderTeatherDialog() {
        const { open, firstname, lastname, avatar, status, id } = this.state;
        return (
            <Dialog onClose={() => this.handleClose()} open={open}>

                <DialogTitle>
                    <Typography variant='h5' component='h5'>{firstname + ' ' + lastname}</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar alt={firstname + " " + lastname} src={avatar} className='avatar-large' />
                        </ListItemIcon>
                        <ListItemText
                            title={
                                <Typography variant="h5">{firstname + " " + lastname}</Typography>
                            }
                            subtitle={
                                <Typography >
                                    <strong>Статус:</strong>{" "}
                                    {status}
                                </Typography>
                            } />
                    </ListItem>
                    <Typography >Информация об учителе</Typography >
                </DialogContent>
                <DialogActions>
                    <Button onPress={() => this.sendRequest(id)} variant='outlined' color="primary">
                        Подать заявку
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleClickOpen(id, firstname, lastname, status, avatar) {
        this.setState({
            open: true,
            id,
            firstname,
            lastname,
            status,
            avatar
        })
    }
    handleClose() {
        this.setState({ open: false })
    }

    sendRequest(id) {
        const {dispatch, user, jwt } = this.props
        dispatch(userActions.updateUser(jwt, user.firstname, user.lastname, user.phonenumber, user.country, user.sity, user.status, user.access, user.roles, id, user.avatar))
        this.handleClose();
    }

    // условный рендеринг кнопки контроля курса.
    renderCourseButton(course_id, category_name, passed_course_status, passed_course_id, assessment, finish_time, user, lessons) {
        if (passed_course_status === "finished") {
            return <Button variant="contained" color="inherit" onPress={() => this.enroll(course_id, category_name, passed_course_status, passed_course_id, assessment, finish_time, user.id, lessons)}>Пройти еще раз</Button>
        } else if (passed_course_status === "inprocess") {
            return <Button variant='contained' onPress={() => this.enroll(course_id, category_name, passed_course_status, passed_course_id, assessment, finish_time, user.id, lessons)}>Прекратить прохождение курса</Button>
        } else if (Number(user.teather_id) === 0 && user.roles === "user") {
            return <Typography>Пожалуйста выберите учителя!</Typography>
        } else {
            return <Button variant="contained" color="secondary" onPress={() => this.enroll(course_id, category_name, passed_course_status, passed_course_id, assessment, finish_time, user.id, lessons)}>Записаться на курс</Button>
        }
    }

    enroll = (course_id, category_name, passed_course_status, passed_course_id, assessment, finish_time, user_id, lessons) => {
        const { dispatch, history } = this.props
        const start_time = Moment().format();
        switch (passed_course_status) {
            case 'inprocess':
                dispatch(courseActions.deleteCoursePassed(passed_course_id))
                break;
            case 'finished':
                dispatch(courseActions.updateCoursePassed(
                    passed_course_id,
                    passed_course_status = 'inprocess',
                    assessment = null,
                    start_time,
                    finish_time = null))
                    history.push(`/courses/${category_name}/${course_id}/${lessons[0].id}`)
                // CoursesService.UpdateCoursePassed(passed_course_id, start_time)
                //     .then(
                //         response => {
                //             LessonsService.DeleteAllByCoursePassed(course_id, user_id)
                //             LessonsService.readFirstLesson(course_id).then(
                //                 response => {
                //                     this.props.history.push(`/courses/${category_name}/${course_id}/${response.data.id}`)
                //                 }
                //             )
                //         },
                //         error => {
                //             console.log(error.response.data.message)
                //         }
                //     )
                break;

            default:
                dispatch(courseActions.createCoursePassed(course_id, user_id))
                history.push(`/courses/${category_name}/${course_id}/${lessons[0].id}`)
                break;
        }
    }

    render() {
        const { data, loading, user, teathers } = this.props;
        var lessons;
        if (loading == true || loading == undefined || teathers == undefined || user == undefined) {
            return <Loading />
        } else {
            lessons = data;
        }

        return (
            <div className='py-3'>
                <Paper variant="outlined" square className='d-flex'>
                    <div className='w-70 p-relative'>
                        <img className='w-100' src={lessons.img} alt={lessons.course_name} height="350" />
                        <div className='wrap-area'>
                            <Typography variant="h2" component="h1">{lessons.course_name}</Typography>
                        </div>
                    </div>
                    <div className='course-info-area'>
                        <div className='course-info-text'>
                            <Typography variant="h5" component="h5">Количество уроков:</Typography>
                            <Typography variant="h5" component="h5">{lessons.lessons.length}</Typography>
                        </div>
                        {this.renderTeathersList(user, teathers, lessons.teather_name, lessons.teather_status, lessons.teather_avatar)}
                        {lessons.passed_course_status === "finished" ?
                            (
                                <div>
                                    <div className='done-area-title'>
                                        <Typography variant="h5" component="h5">Курс пройден</Typography>
                                        <CheckCircleOutlineIcon className='done-area-title-icon' fontSize="large" />
                                    </div>
                                    <Typography variant="body" component="body">Оценка: {lessons.assessment}</Typography>
                                    <Typography variant="body" component="body">Дата и время прохождения: {Moment(lessons.finish_time).locale('ru').format('Do MMMM YYYY, hh:mm:ss')}</Typography>
                                </div>
                            ) : (null)
                        }
                        <div className='course-info-button'>
                            {this.renderCourseButton(
                                lessons.course_id,
                                lessons.category_name,
                                lessons.passed_course_status,
                                lessons.passed_course_id,
                                lessons.assessment,
                                lessons.finish_time,
                                user,
                                lessons.lessons
                            )}
                        </div>
                    </div>
                </Paper>
                <Typography variant="h5" component="h5">О курсе:</Typography>
                <Typography>{lessons.description}</Typography>
                {lessons.passed_course_status === "inprocess" || lessons.passed_course_status === "finished" ? (
                    <div>
                        <h5>Уроки:</h5>
                        <Grid
                            container
                            direction={"row"}
                            justify={"space-around"}
                            alignItems={"flex-start"}
                            spacing={1}>
                            {lessons.lessons.map((lesson, index) => (
                                <Grid item xs key={index}>
                                    <Paper >
                                        <Card>
                                            <Link to={`/courses/${lessons.category_name}/${lessons.course_id}/${lesson.id}`}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt={lesson.name}
                                                        height="140"
                                                        image="http://lifestudio-test.ru/assets/img/350x250.png"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="h6">
                                                            {lesson.name}
                                                        </Typography>
                                                        <ClampLines
                                                            text={lesson.description}
                                                            id="really-unique-id"
                                                            lines={3}
                                                            ellipsis="..."
                                                            buttons={false}
                                                            innerElement="p"
                                                        />
                                                    </CardContent>
                                                </CardActionArea>
                                            </Link>
                                        </Card>
                                    </Paper>
                                </Grid>
                            )
                            )}
                        </Grid>
                    </div>
                ) : (null)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lesson, authentication, users } = state;
    const { loading, data } = lesson;
    const { user, jwt } = authentication;
    const { teathers } = users;
    return {
        jwt,
        user,
        data,
        teathers,
        loading
    };
}

const connectedCoursePage = connect(mapStateToProps)(CoursePage);
export { connectedCoursePage as CoursePage };