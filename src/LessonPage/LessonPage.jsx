import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { lessonActions, courseActions, userActions } from '../_actions'
import 'moment/locale/ru';
import YouTube from 'react-youtube';
import { Test, Question, LessonProgressPlane, TeatherPlane } from './';

import {
    Loading,
    Button,
    Typography,
    Grid,
    LessonText,
    Divider,
} from '../_components';
import { LessonPlane } from './LessonPlane';

const LessonPage = ({ dispatch, match, history, user, jwt, course, get_by_course_loading, get_by_course_message, get_by_course_error, inprocess_lesson }) => {
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

    if (get_by_course_error) return <div className="alert-screen-center"><Alert severity="error" className="mt-3 mb-3">{get_by_course_error}</Alert></div>
    if (get_by_course_loading || !course) return <Loading />

    return (
            <Grid container spacing={1} className="py-3">
                <Grid item xs={10} sm={9} >
                    <LessonPlane lesson_id={match.params.lesson} history={history} />
                </Grid>
                <Grid item xs={2} sm={3}>
                    <LessonProgressPlane dispatch={dispatch} history={history} course={course} user={user} />
                    {/* {user.teather && <TeatherPlane teather={user.teather} />} */}
                </Grid>
            </Grid>
    );

}


function mapStateToProps(state) {
    const { course, get_by_course_loading, get_by_course_message, get_by_course_error, inprocess_lesson } = state.lesson;
    const { user, jwt } = state.authentication;
    return { jwt, user, course, get_by_course_loading, get_by_course_message, get_by_course_error, inprocess_lesson };
}

const connectedLessonPage = connect(mapStateToProps)(LessonPage);
export { connectedLessonPage as LessonPage };