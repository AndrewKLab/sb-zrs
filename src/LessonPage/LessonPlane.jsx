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
import config from 'config';

const LessonPlane = ({ dispatch, lesson_id, history, user, jwt, course, create_passed_lesson_loading, inprocess_lesson }) => {
    useEffect(() => {
        const init = async () => {
            await dispatch(lessonActions.setInprocessLesson(course.lessons.find((item) => item.id === lesson_id)));
            if (!course.passed_course_id) await dispatch(courseActions.createCoursePassed(jwt, course.course_id, user.id))
            await dispatch(lessonActions.createLessonPassed(jwt, course.course_id, lesson_id, user.id))
        }
        init();
        
    }, [])

    return (
        inprocess_lesson &&
        <div>
            {/* {inprocess_lesson.videolink && <YouTube videoId={inprocess_lesson.videolink} className={'video-container'} containerClassName={'video-container'} />} */}
            <div className='lesson-header'>
                <div>
                    <Typography variant={'h1'} component={'h1'}>{course.course_name}</Typography>
                    <Typography variant="h4" component='h4' >{inprocess_lesson.name}</Typography>
                </div>
                {inprocess_lesson.videolink &&
                    <div>
                        <p className='mb-1'>Аудио версия урока:</p>
                        <audio controls>
                            <source src={`${config.url}/assets/audio/${inprocess_lesson.videolink}`} type="audio/mpeg" />
                        </audio>
                    </div>
                }
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: inprocess_lesson.description }} />
                <LessonText text={inprocess_lesson.text} />
                <Divider />
                {create_passed_lesson_loading ? <Loading className={'h-100'} /> : <Test history={history} />}
            </div>
        </div>
    );
}


function mapStateToProps(state) {
    const { course, create_passed_lesson_loading, inprocess_lesson } = state.lesson;
    const { user, jwt } = state.authentication;
    return { jwt, user, course, create_passed_lesson_loading, inprocess_lesson };
}

const connectedLessonPlane = connect(mapStateToProps)(LessonPlane);
export { connectedLessonPlane as LessonPlane };