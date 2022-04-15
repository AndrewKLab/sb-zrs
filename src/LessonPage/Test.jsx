import React, { useState } from 'react'
import { Typography, Button, Alert, Divider } from '../_components';
import { lessonActions, userActions, courseActions } from '../_actions'
import { LessonFinishedPlane, Question, LessonControlButton } from './';
import Moment from 'moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import { Formik, Form } from "formik";

const Test = ({ dispatch, jwt, user, history, course, inprocess_lesson, update_passed_lesson_loading, update_passed_lesson_error, update_passed_course_loading, update_passed_course_error }) => {
    const [testErrors, setTestErrors] = useState('')

    // Завершить курс
    const finishCourse = async (assessment) => {
        try {
            //if (user.role_type === "ROLE_USER" && role_name === "Искатель") await dispatch(userActions.updateSelf(jwt, { ...user, user_role_id: 6 }))
            await dispatch(courseActions.updateCoursePassed(jwt, course.passed_course_id, 'finished', assessment, course.start_time, Moment().format()))
            //history.push(`/courses/${category_name}/${course}`)
        } catch (error) {
            console.log(error)
        }
    }

    //Назад к курсу
    const backToCourse = () => {
        history.push(`/courses/${course.category_name}/${course.course_id}`);
    }

    //Назад предыдущему непройденому уроку
    const backToUnFinisfedLesson = () => {
        for (var i = 0; i < course.lessons.length; i++) {
            if (course.lessons[i].status === 'inprocess' || course.lessons[i].status === null) {
                goToLesson(course.lessons[i])
                break;
            }
        }
    }

    const goToLesson = (lesson) => {
        window.scrollTo(0, 0);
        //dispatch(lessonActions.setInprocessLesson(course.lessons.find((item) => item.id === lesson.id)))
        history.push(`/courses/${course.category_name}/${course.course_id}/${lesson.id}`);
    }

    return (
        <Formik
            initialValues={inprocess_lesson.questions.reduce((a, item) => ({ ...a, [item.id]: item.question_type === 'checkbox' ? [] : "" }), {})}
            onSubmit={(values) => {
                setTestErrors('')
                if (inprocess_lesson.status === "finished") {
                    if (Number(inprocess_lesson.number) === course.lessons.length && Number(course.lessons.filter(item => item.status === "finished").length) !== course.lessons.length) {
                        // Предыдущий непройденый урок
                        backToUnFinisfedLesson()
                    } else if (course.lessons.filter(item => item.status === "finished").length === course.lessons.length) {
                        //Пройти курс
                        if (course.passed_course_status === "inprocess") finishCourse(0)
                        // Назад к курсу
                        else {
                            history.push(`/courses/${course.category_name}/${course.course_id}`);
                            console.log(312)
                        }
                    } else {
                        //Следующий урок
                        goToLesson(course.lessons.find(item => Number(item.number) === (Number(inprocess_lesson.number) + 1)))
                    }
                } else {
                    var isValid = true;
                    if (inprocess_lesson.questions.length > 0) {
                        Object.values(values).every(element => {
                            if (element === '' || (typeof element === 'object' && element.length === 0)) {
                                isValid = false
                                return false
                            } else return true
                        })
                    }
                    if (isValid) {
                        console.log(values)
                        dispatch(lessonActions.updateLessonPassed(jwt, inprocess_lesson.passed_id, 0, Moment().format(), values))
                    }
                    else setTestErrors('Пожалуйста пройдите тест!')
                }
            }}
        >
            {({ errors, values, handleChange, setFieldValue, touched }) => (

                <Form>
                    {inprocess_lesson.status === 'finished' ? (
                        <React.Fragment>
                            <LessonFinishedPlane assessment={inprocess_lesson.assessment} finish_time={inprocess_lesson.finish_time} />
                            <Divider />
                        </React.Fragment>
                    ) : (inprocess_lesson.questions.length > 0 &&
                        <div>
                            <Typography component="h4" variant="h4" className='mb-2' >Тест:</Typography>
                            {inprocess_lesson.questions.map((question, index) => (
                                <Question values={values} handleChange={handleChange} setFieldValue={setFieldValue} question={question} key={index} />
                            ))}
                            {testErrors !== '' && <Alert severity="error" className="mt-3 mb-3">{testErrors}</Alert>}
                            {update_passed_lesson_error && <Alert severity="error" className="mt-3 mb-3">{update_passed_lesson_error}</Alert>}
                            <Divider />
                        </div>
                    )}


                    <div className={'d-flex grid-justify-xs-space-between'}>
                        <Button
                            color="primary"
                            disabled={Number(inprocess_lesson.number) === 1}
                            onPress={() => goToLesson(course.lessons.find(item => Number(item.number) === (Number(inprocess_lesson.number) - 1)))}>
                            Предыдущий урок
                        </Button>
                        <LessonControlButton
                            course={course}
                            lesson={inprocess_lesson}
                            finished_lessons_lenght={course.lessons.filter(item => item.status === "finished").length}
                            update_passed_lesson_loading={update_passed_lesson_loading}
                            update_passed_course_loading={update_passed_course_loading}
                        />
                    </div>
                </Form>
            )}
        </Formik>

    )
}

function mapStateToProps(state) {
    const { course, get_by_course_loading, get_by_course_message, get_by_course_error, inprocess_lesson, update_passed_lesson_loading, update_passed_lesson_error, update_passed_course_loading, update_passed_course_error } = state.lesson;
    const { user, jwt } = state.authentication;
    return { jwt, user, course, get_by_course_loading, get_by_course_message, get_by_course_error, inprocess_lesson, update_passed_lesson_loading, update_passed_lesson_error, update_passed_course_loading, update_passed_course_error };
}

const connectedTest = connect(mapStateToProps)(Test);
export { connectedTest as Test };
