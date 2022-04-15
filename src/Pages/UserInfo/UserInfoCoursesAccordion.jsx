import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { Accordion, Paper, Loading, Typography, Grid, ListItem, ListItemFirstAction, IconButton, Menu, MenuItem, Alert, Button, } from '../../_components'
import { ProgressCircle } from '../../LessonPage'
import { UserInfoCoursesTest } from './';
import { lessonActions } from '../../_actions';


const UserInfoCoursesAccordion = ({ dispatch, jwt, index, course, courses, history, check_passed_lesson_anwsers_loading, check_passed_lesson_anwsers_message, check_passed_lesson_anwsers_error }) => {
    const [open, setOpen] = useState(false);
    const [selected_lesson_id, setSelectedLessonId] = useState(0);

    return (
        <Accordion
            open={open}
            setOpen={setOpen}
            labеl={<div className='d-flex justify-content-between align-items-center w-100'>
                <Typography variant={'strong'} component={'strong'}>{course.course_name}</Typography>
                {course.lessons && <Typography>{course.lessons.filter(lesson => lesson.status === 'finished').length}/{course.lessons.length} уроков</Typography>}
            </div>

            } className={index === courses.length - 1 ? '' : 'border-bottom'}>
            <div className='border-top'>

                <Grid container spacing={0}>
                    <Grid item xs={2} sm={3}>
                        {course.lessons.map((lesson, index) =>
                            <div key={index} onClick={() => setSelectedLessonId(lesson.id)}>
                                <ListItem button >
                                    <ListItemFirstAction>
                                        <ProgressCircle status={lesson.status} number={lesson.number} />
                                        <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                    </ListItemFirstAction>
                                </ListItem>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={10} sm={9}>
                        {selected_lesson_id !== 0 ?
                            course.lessons.map((selected_lesson, index) =>
                                selected_lesson.id === selected_lesson_id &&
                                <Grid key={index} container spacing={0}>
                                    <Grid item xs={12} sm={12}>
                                        <div className='selected_lesson_header'>
                                            <Typography variant={'strong'} component={'strong'}>{selected_lesson.name}</Typography>
                                            <div className='center gap-3'>

                                                {selected_lesson.status === 'finished' &&
                                                    <Button variant={'outlined'} loading={check_passed_lesson_anwsers_loading} disabled={check_passed_lesson_anwsers_loading} onPress={() => dispatch(lessonActions.checkPassedLessonAnswers(jwt, selected_lesson.passed_lesson_id))}>
                                                        {!selected_lesson.assessment || selected_lesson.assessment === '0' ? 'Проверить' : 'Проверить еще раз'}
                                                    </Button>
                                                }
                                                {selected_lesson.passed_lesson_id ?
                                                    <React.Fragment>
                                                        {selected_lesson.status === 'inprocess' && <div className='selected_lesson_header_info_status'>Начат {moment(selected_lesson.start_time).locale('ru').format('Do MMMM YYYY, H:mm')}</div>}
                                                        {selected_lesson.status === 'finished' &&
                                                            <div className='selected_lesson_header_success_status'>
                                                                Завершен {moment(selected_lesson.finish_time).locale('ru').format('Do MMMM YYYY, H:mm')}
                                                                {!selected_lesson.assessment || selected_lesson.assessment === '0' ? null : <React.Fragment><br />
                                                                    Верных ответов - <strong>{selected_lesson.assessment}%</strong>
                                                                </React.Fragment>}
                                                            </div>
                                                        }
                                                    </React.Fragment>
                                                    :
                                                    <div className='selected_lesson_header_danger_status'>Не открывался</div>
                                                }
                                            </div>

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} className='overflow-auto'>
                                        {selected_lesson.questions && selected_lesson.questions.length > 0 ?
                                            <UserInfoCoursesTest questions={selected_lesson.questions} />
                                            :
                                            <div className='center h-100 w-100'><Alert>В этом уроке нет вопросов!</Alert></div>
                                        }
                                    </Grid>
                                </Grid>)
                            :
                            <div className='center h-100'><Alert>Выберите урок</Alert></div>
                        }
                    </Grid>
                </Grid>
            </div>
        </Accordion >
    );
}

function mapStateToProps(state) {
    const { user, jwt } = state.authentication;
    const { check_passed_lesson_anwsers_loading, check_passed_lesson_anwsers_message, check_passed_lesson_anwsers_error } = state.users;
    return { user, jwt, check_passed_lesson_anwsers_loading, check_passed_lesson_anwsers_message, check_passed_lesson_anwsers_error };
}

const connectedUserInfoCoursesAccordion = connect(mapStateToProps)(UserInfoCoursesAccordion);
export { connectedUserInfoCoursesAccordion as UserInfoCoursesAccordion };