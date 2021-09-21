import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { courseActions, lessonActions } from '../../_actions';
import { Alert, Loading, Paper, TextInput, Switch, SelectItem, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '../../_components';
import Dropzone from "react-dropzone";
import Thumb from "../../_components/Thumb";
import { Formik, Form } from "formik";
import * as yup from "yup";
import JoditEditor from "jodit-react";

//icons
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CreateCoursePage } from '../../CreateCoursePage';

const CourseLessonsRedactor = ({
    ...props, className, dispatch,
    jwt, user,
    lesson_editing_status, selected_lesson_id, selected_lesson_loading, selected_lesson, selected_lesson_error, set_lesson_editing_data_loading, set_lesson_editing_data_error
}) => {
    const DiscriptionEditor = useRef(null);
    const TextEditor = useRef(null);
    const [loading, setLoading] = useState(true);
    const [addTest, setAddTest] = useState(false);
    let styleClass = className !== undefined ? ' ' + className : '';
    let SignupSchema = yup.object().shape({
        lesson_name: yup
            .string()
            .max(50, "Это название слишком длинное.")
            .required("Это поле является обязательным для заполнения."),
        lesson_videolink: yup
            .string(),
        lesson_description: yup
            .string()
            .required("Это поле является обязательным для заполнения."),
        lesson_text: yup
            .string()
            .required("Это поле является обязательным для заполнения."),
    });
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        language: 'ru',
        placeholder: 'Введите текст...',
    }

    useEffect(() => {
        if (selected_lesson_id !== null && selected_lesson_id !== "") {
            dispatch(lessonActions.readOneLessonById(selected_lesson_id)).then(() => setLoading(false));
        } else {
            if (selected_lesson_id !== null) {
                dispatch(lessonActions.setLessonEditingData());
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    }, [selected_lesson_id]);

    const toggleLessonTest = (e) => {
        
        setAddTest(!addTest)
    }

    if (selected_lesson_loading || set_lesson_editing_data_loading || loading) return <Loading />;
    if (selected_lesson_id === null || selected_lesson === null) return null;
    return (
        <Paper className={`${styleClass} p-3 mt-3`}>
            <Formik
                initialValues={
                    lesson_editing_status === 'create' ?
                        ({
                            lesson_name: '',
                            lesson_videolink: '',
                            lesson_text: '',
                            lesson_description: '',
                            lesson_questions: []
                        }) : ({
                            lesson_name: selected_lesson.lesson_name,
                            lesson_videolink: selected_lesson.lesson_videolink,
                            lesson_text: selected_lesson.lesson_text,
                            lesson_description: selected_lesson.lesson_description,
                            lesson_questions: selected_lesson.lesson_questions
                        })}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    const { lesson_name, lesson_videolink, lesson_text, lesson_description, lesson_questions } = values;
                    //if (lessonCreated === false) {
                    //     dispatch(lessonActions.createLesson(
                    //         jwt,
                    //         course_id,
                    //         lessons !== null && data !== undefined ? Number(data.lessons.length) + 1 : data !== undefined ? Number(data.lessons.length) + 1 : 1,
                    //         lesson_name,
                    //         lesson_videolink,
                    //         lesson_description,
                    //         lesson_text,
                    //         lesson_questions
                    //     )).then(
                    //         () => changeLesson(), clenupTest(), this.setState({ changed: error === undefined ? false : true, lessonCreated: error === undefined ? true : false })
                    //     )
                    // } else {
                    //     var questions;
                    //     dispatch(lessonActions.updateLesson(
                    //         jwt,
                    //         lesson.id,
                    //         lesson.number,
                    //         lesson_name,
                    //         course_id,
                    //         lesson_videolink,
                    //         lesson_description,
                    //         lesson_text,
                    //         questions = {
                    //             delete: del,
                    //             update: update,
                    //             create: create
                    //         }
                    //     )).then(
                    //         () => this.setState({ changed: error === undefined ? false : true })
                    //     )
                    // }
                }
                }
            >
                {({ errors, values, handleChange, setFieldValue, touched }) => (
                    <Form onChange={() => { }}>
                        <TextInput
                            error={errors.lesson_name && touched.lesson_name}
                            value={values.lesson_name}
                            id="lesson_name"
                            name="lesson_name"
                            label="Название урока"
                            type={'text'}
                            variant={'outlined'}
                            onChange={handleChange}
                            onSelect={val => setFieldValue("lesson_name", val)}
                            helperText={
                                errors.lesson_name && touched.lesson_name ? errors.lesson_name : null
                            }
                            className='w-100 mb-3'
                        />
                        <TextInput
                            error={errors.lesson_videolink && touched.lesson_videolink}
                            value={values.lesson_videolink}
                            id="lesson_videolink"
                            name="lesson_videolink"
                            label="Ссылка на видео к уроку"
                            type={'text'}
                            autoComplete="lesson_videolink"
                            variant={'outlined'}
                            onChange={handleChange}
                            onSelect={val => setFieldValue("lesson_videolink", val)}
                            helperText={
                                errors.lesson_videolink && touched.lesson_videolink ? errors.lesson_videolink : null
                            }
                            className='w-100 mb-3'
                        />
                        <Divider />
                        {/* <div className={errors.lesson_description ? "text-input-danger" : ""}>
                            <Typography component='body' variant='body'>Описание урока:</Typography>
                            <JoditEditor
                                ref={DiscriptionEditor}
                                value={values.lesson_description}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={val => setFieldValue("lesson_description", val)} // preferred to use only this option to update the content for performance reasons
                                onChange={val => setFieldValue("lesson_description", val)}
                            />
                            {errors.lesson_description ? <span className="text-input-helper text-input-danger">{errors.lesson_description}</span> : null}
                        </div> */}

                        <div className={errors.lesson_text ? "text-input-danger" : ""}>
                            <Typography component='body' variant='body' className={`mt-3`}>Текст урока:</Typography>
                            <JoditEditor
                                ref={TextEditor}
                                value={values.lesson_text}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={val => setFieldValue("lesson_text", val)} // preferred to use only this option to update the content for performance reasons
                                onChange={val => setFieldValue("lesson_text", val)}
                            />
                            {errors.lesson_text ? <span class="text-input-helper text-input-danger">{errors.lesson_text}</span> : null}
                        </div>
                        <Divider className='mv-3' />
                        <div className='d-flex grid-justify-xs-space-between ph-3'>
                            <Typography component='body' variant='body' className='m-0 f-initial'>Добавить тест к уроку?</Typography>
                            <Switch className='m-0' isToggled={addTest} onToggle={toggleLessonTest} />
                        </div>
                        <Divider className='mv-3' />
                    </Form>
                )}
            </Formik>

        </Paper>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { lesson_editing_status, selected_lesson_id, selected_lesson_loading, selected_lesson, selected_lesson_error, set_lesson_editing_data_loading, set_lesson_editing_data_error } = state.course_constructor;

    return {
        jwt, user,
        lesson_editing_status, selected_lesson_id, selected_lesson_loading, selected_lesson, selected_lesson_error, set_lesson_editing_data_loading, set_lesson_editing_data_error
    };
}

const connectedCourseLessonsRedactor = connect(mapStateToProps)(CourseLessonsRedactor);

export { connectedCourseLessonsRedactor as CourseLessonsRedactor }

