import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { lessonActions, courseActions } from '../_actions'
import Moment from 'moment';
import 'moment/locale/ru';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import config from 'config';

import {
    Avatar,
    Alert,
    Loading,
    Paper,
    Typography,
    Grid,
    Share,
    ShareButton,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText,
    Divider,
} from '../_components';
import { CourseActionButton } from './CourseActionButton';

const CoursePage = ({ dispatch, match, history, user, jwt, course, get_by_course_loading, get_by_course_message, get_by_course_error, create_passed_course_loading, delete_all_passed_lessons_by_course_loading }) => {
    const [openShareMenu, setOpenShareMenu] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                await dispatch(lessonActions.getAllLessonsByCourse(match.params.course, user.id, user.teather_id))
            } catch (error) {
                console.log(error)
            }
        }
        if (user !== null) {
            init();
        } else {
            history.push('/sign-in')
        }
    }, [])


    const enroll = async () => {
        switch (course.passed_course_status) {
            case 'finished':
                await dispatch(courseActions.updateCoursePassed(jwt, course.passed_course_id, 'inprocess', null, Moment().format(), null))
                await dispatch(lessonActions.deleteAllPassedLessonsByCourse(jwt, course.course_id, user.id))
                history.push(`/courses/${course.category_name}/${course.course_id}/${course.lessons[0].id}`)
                break;
            case 'inprocess':
                await dispatch(courseActions.deleteCoursePassed(course.passed_course_id))
                break;
            default:
                await dispatch(courseActions.createCoursePassed(jwt, course.course_id, user.id))
                history.push(`/courses/${course.category_name}/${course.course_id}/${course.lessons[0].id}`)
                break;
        }
    }

    if (get_by_course_loading || !course) return <Loading />
    if (get_by_course_error) return <div className="alert-screen-center"><Alert severity="error" className="mt-3 mb-3">{get_by_course_error}</Alert></div>
    return (
        <div className='py-3'>
            <Paper variant="outlined" square className='d-flex'>
                <Grid container spacing={0}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={7}>
                            <div className='course-image-container p-relative'>
                                <img className='img course-image' src={course.img} alt={course.course_name} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <div className='course-info-area gap-3'>
                                <div>
                                    <Typography variant="h2" component="h1">{course.course_name}</Typography>
                                    <Divider />
                                    <div className='course-info-text'>
                                        <Typography variant="h5" component="h5">Количество уроков:</Typography>
                                        <Typography variant="h5" component="h5">{course.lessons.length}</Typography>
                                    </div>
                                </div>
                                {user.teather &&
                                    <div>
                                        <Typography variant="h6" component="h6" >Ваш учитель: </Typography>
                                        <Paper variant="outlined" square >
                                            <ListItem>
                                                <ListItemFirstAction>
                                                    <ListItemIcon>
                                                        <Avatar alt={user.teather.firstname + " " + user.teather.lastname} src={user.teather.avatar} />
                                                    </ListItemIcon>
                                                    <ListItemText title={user.teather.firstname + " " + user.teather.lastname} subtitle={"Регалии: " + user.teather.role_name} />
                                                </ListItemFirstAction>
                                            </ListItem>
                                        </Paper>
                                    </div>
                                }
                                {course.passed_course_status === "finished" &&
                                    (
                                        <Paper variant="outlined" square className="mb-3 p-3">
                                            <div className='done-area-title'>
                                                <Typography variant="h5" component="h5">Курс пройден</Typography>
                                                <CheckCircleOutlineIcon className='done-area-title-icon' fontSize="large" />
                                            </div>
                                            <Typography variant="body" component="body">Дата и время прохождения: {Moment(course.finish_time).locale('ru').format('Do MMMM YYYY, H:mm')}</Typography>
                                        </Paper>
                                    )
                                }
                                <div className='course-info-button'>
                                    <CourseActionButton history={history} user={user} course={course} enroll={enroll} create_passed_course_loading={create_passed_course_loading} delete_all_passed_lessons_by_course_loading={delete_all_passed_lessons_by_course_loading} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12}><Divider className={'m-0'} /></Grid>
                    <Grid item sm={12} className={'p-3'}>
                        <Typography variant="h5" component="h5">О курсе:</Typography>
                        <Typography>{course.description}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}><Divider className={'m-0'} /></Grid>
                    <Grid item xs={12} sm={12} className={'p-3'}>
                        <div className='d-flex justify-content-end align-items-center'>
                            <Share
                                cleanLink={`${config.url}/courses/${course.category_name}/${course.course_id}`}
                                link={`${course.name ? course.name + '%0A' : ''}${config.url}/courses/${course.category_name}/${course.course_id}`}
                                show={openShareMenu}
                                close={() => setOpenShareMenu(false)}
                                whatsapp
                                viber
                                telegram
                                sms
                                copy
                            />
                            <ShareButton toogleShare={() => setOpenShareMenu(!openShareMenu)} />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

function mapStateToProps(state) {
    const { course, get_by_course_loading, get_by_course_message, get_by_course_error, create_passed_course_loading, delete_all_passed_lessons_by_course_loading } = state.lesson;
    const { user, jwt } = state.authentication;
    return { jwt, user, course, get_by_course_loading, get_by_course_message, get_by_course_error, create_passed_course_loading, delete_all_passed_lessons_by_course_loading };
}

const connectedCoursePage = connect(mapStateToProps)(CoursePage);
export { connectedCoursePage as CoursePage };