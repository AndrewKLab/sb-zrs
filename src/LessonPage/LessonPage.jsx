import React from 'react';

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

class LessonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    componentDidMount() {
        const { dispatch, user } = this.props;
        const { course, lesson } = this.props.match.params;
        if (user != null) {
            dispatch(lessonActions.createLessonPassed(course, lesson, user.id))
                .then(() => {
                    dispatch(lessonActions.getAllLessonsByCourse(course, user.id, user.teather_id))
                })
        }

    }

    render() {
        const { dispatch, history, data, loading, jwt, user } = this.props;
        const { category_name, course, lesson } = this.props.match.params;

        var lessons;
        if (loading == true || loading == undefined || user == null || data == undefined) {
            return <Loading />
        } else {
            lessons = data.lessons;
        }



        var finishedLessonsLenght = 0;
        lessons.forEach(item => item.status == 'finished' ? finishedLessonsLenght++ : finishedLessonsLenght)
        const { course_id, teather_status, teather_name, teather_avatar, passed_course_id, passed_course_status, assessment, start_time, finish_time } = data;
        return (
            <div className='py-3'>
                <Grid container spacing={1}>
                    <Grid item xs={10} sm={9} >
                        {lessons.map((lesson_item, index) => {


                            return (
                                <div key={index}>
                                    {lesson === lesson_item.id &&
                                        <div>
                                            {lesson.videolink && <YouTube videoId={lesson_item.videolink} className={'video-container'} containerClassName={'video-container'} onReady={this._onReady} />}
                                            <div className={'mt-3'}>
                                                <Typography variant="h4" component='h4' >{lesson_item.name}</Typography>
                                                {/* <Typography>Описание урока:</Typography> */}
                                                <div dangerouslySetInnerHTML={{ __html: lesson_item.description }}/>
                                                <Typography variant="h4" component='h4' className={'mt-3'} >Текст урока:</Typography>
                                                <LessonText text={lesson_item.text}/>
                                                <Divider />
                                                <Test
                                                    dispatch={dispatch}
                                                    history={history}
                                                    jwt={jwt}
                                                    user={user}
                                                    category_name={category_name}
                                                    course={course}
                                                    passed_course_id={passed_course_id}
                                                    course_status={passed_course_status}
                                                    passed_course_assessment={assessment}
                                                    passed_course_start_time={start_time}
                                                    passed_course_finish_time={finish_time}
                                                    lessons={lessons}
                                                    finishedLessonsLenght={finishedLessonsLenght}
                                                    lesson_id={lesson_item.id}
                                                    number={lesson_item.number}
                                                    status={lesson_item.status}
                                                    lesson_passed_id={lesson_item.passed_id}
                                                    assessment={lesson_item.assessment}
                                                    finish_time={lesson_item.finish_time}
                                                    questions={lesson_item.questions}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </Grid>
                    <Grid item xs={2} sm={3}>
                        <LessonProgressPlane dispatch={dispatch} history={history} lessons={lessons} category_name={category_name} course={course} user={user} />
                        <TeatherPlane teather_status={data.teather_status} teather_name={teather_name} teather_avatar={teather_avatar} />
                    </Grid>
                </Grid>
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

const connectedLessonPage = connect(mapStateToProps)(LessonPage);
export { connectedLessonPage as LessonPage };