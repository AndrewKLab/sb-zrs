import React, { useState } from 'react'
import {
    Form,
    Typography,
    Button
} from '../_components';
import { lessonActions, userActions, courseActions } from '../_actions'
import { LessonFinishedPlane, Answer, LessonControlButton } from './';
import { useForm } from "react-hook-form"
import Moment from 'moment';
import 'moment/locale/ru';

export const Test = ({ dispatch, history, jwt, user, category_name, course, passed_course_id, course_status, passed_course_assessment, passed_course_start_time, passed_course_finish_time, lessons, finishedLessonsLenght, lesson_id, number, status, lesson_passed_id, assessment, finish_time, questions }) => {
    const [selected, setSelected] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        if (status === "finished") {
            if (Number(number) === lessons.length && Number(finishedLessonsLenght) !== lessons.length) {
                console.log('Предыдущий непройденый урок')
                // Предыдущий непройденый урок
                backToUnFinisfedLesson()
            } else if (finishedLessonsLenght === lessons.length) {
                if (course_status === "inprocess") {
                    var result = lessons.reduce((acc, item) => {
                        acc[item.id] = item.assessment;
                        return Object.values(acc);
                    }, {});
                    var sum = 0;
                    for (var i = 0; i < result.length; i++) {
                        sum = sum + parseInt(result[i])
                    }
                    var assessment = sum / result.length;
                    finishCourse(assessment)
                } else {
                    // Назад к курсу
                    backToCourse()
                }
            } else {
                goToNextLesson()
            }
        } else {
            var result = questions.reduce((acc, item) => {
                var ansone = item.question_type === 'text' ? (item.answers[0].answer) : (item.current_answer);
                var anstwo = item.current_answer_too;
                acc[item.id] = anstwo === null ? (ansone) : ([ansone, anstwo]);
                return acc;
            }, {});
            var assessment = 2;
            for (var i = 0; i < Object.keys(result).length; i++) {
                let currAns = result[Object.keys(result)[i]];
                let userAns = data[Object.keys(result)[i]];
                console.log(currAns, userAns)
                if (Array.isArray(currAns) && Array.isArray(userAns)) {
                    for (var a = 0; a < currAns.length; a++) {
                        if (currAns[i] === userAns[a]) {
                            assessment++
                        }
                    }
                } else {
                    if (currAns == userAns) {
                        assessment++
                    }
                }
            }
            finishLesson(lesson_passed_id, assessment, Moment().format())
        }

    };

    // Завершить курс
    const finishCourse = (assessment) => {
        const status = "УЧЕНИК"
        if (user.status === "ИСКАТЕЛЬ") {
            dispatch(userActions.updateUser(jwt, user.firstname, user.lastname, user.phonenumber, user.country, user.sity, status, user.access, user.roles, user.teather_id, user.avatar))
                .then(() => dispatch(courseActions.updateCoursePassed(
                    passed_course_id,
                    'finished',
                    assessment,
                    passed_course_start_time,
                    Moment().format()))
                ).then(() => history.push(`/courses/${category_name}/${course}`))
        } else {
            dispatch(courseActions.updateCoursePassed(
                passed_course_id,
                'finished',
                assessment,
                passed_course_start_time,
                Moment().format())
            ).then(() => history.push(`/courses/${category_name}/${course}`))
        }
    }

    //Назад к курсу
    const backToCourse = () => {
        history.push(`/courses/${category_name}/${course}`);
    }

    //Назад предыдущему непройденому уроку
    const backToUnFinisfedLesson = () => {
        for (var i = 0; i < lessons.length; i++) {
            if (lessons[i].status === 'inprocess' || lessons[i].status === null) {
                history.push(`/courses/${category_name}/${course}/${lessons[i].id}`)
                break;
            }
        }
    }

    //Следующий урок
    const goToNextLesson = () => {
        if (user != undefined) {
            dispatch(lessonActions.createLessonPassed(course, lessons[Number(number)].id, user.id))
                .then(() => {
                    dispatch(lessonActions.getAllLessonsByCourse(course, user.id, user.teather_id))
                        .then(() => {
                            window.scrollTo(0, 0);
                            history.push(`/courses/${category_name}/${course}/${lessons[Number(number)].id}`)
                        }
                        )
                })

        }
    }

    // Пройти урок
    const finishLesson = (lesson_passed_id, assessment, finish_time) => {
        dispatch(lessonActions.updateLessonPassed(lesson_passed_id, assessment, finish_time))
    }

    const handleBack = () => {
        window.scrollTo(0, 0);
        history.push(`/courses/${category_name}/${course}/${lessons[Number(number-2)].id}`)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {status !== 'finished' ? (
                <div>
                    {questions.length !== 0 ? (<Typography component="h4" variant="h4" className='mb-2' >Тест:</Typography>) : (null)}
                    {questions.map((question, index) => (
                        <div key={index} className='d-flex grid-direction-xs-column'>
                            <Typography component="h5" variant="h5" className='mb-2' >{question.question}</Typography>
                            {question.answers.map((answer, index) =>
                                <Answer question_type={question.question_type} answer={answer} key={index} register={register} selected={selected} setSelected={setSelected} />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                    <LessonFinishedPlane assessment={assessment} finish_time={finish_time} />
                )}
            <div className={'d-flex grid-justify-xs-space-between'}>
                <Button
                    color="primary"
                    disabled={Number(number) === 1}
                    onPress={() => handleBack()}>
                    Предыдущий урок
                </Button>
                <LessonControlButton
                    user={user}
                    course={course}
                    course_status={course_status}
                    lessons={lessons}
                    finishedLessonsLenght={finishedLessonsLenght}
                    lesson_id={lesson_id}
                    status={status}
                    number={number}
                    lesson_passed_id={lesson_passed_id}
                    finish_time={finish_time}
                />
            </div>
        </Form>
    )
}
