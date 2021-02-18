import React from 'react';
import { connect } from 'react-redux';
import { CreateTestPlane } from './';

import { lessonActions } from '../_actions';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

import {
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Loading,
    Paper,
    Typography,
    Button,
    TextInput,
    SelectItem,
    Switch
} from '../_components'

let SignupSchema = yup.object().shape({
    lesson_name: yup
        .string()
        .max(50, "Это название слишком длинное.")
        .required("Это поле является обязательным для заполнения."),
    lesson_videolink: yup
        .string()
        .max(50, "Это название слишком длинное.")
        .required("Это поле является обязательным для заполнения."),
    lesson_description: yup
        .string()
        .required("Это поле является обязательным для заполнения."),
    lesson_text: yup
        .string()
        .required("Это поле является обязательным для заполнения."),

});

class CreateLessonPlane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changed: false,
            addTest: props.lesson.questions && props.lesson.questions.length !== 0 ? true : false,
            lessonCreated: Object.keys(props.lesson).length === 0 ? false : true,
            create: [],
            update: [],
            del: []
        }
    }
    componentDidMount() {
        this.setState({ loading: false })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lesson.id !== this.props.lesson.id) {
            this.setState({ loading: true }, () => {
                this.setState({
                    lessonCreated: Object.keys(nextProps.lesson).length === 0 ? false : true,
                    addTest: nextProps.lesson.questions && Object.keys(nextProps.lesson.questions).length !== 0 ? true : false,
                    changed: false,
                }, () => {
                    this.setState({ loading: false })
                });
            })
        }
    }

    handleToggleChange() {
        this.setState({
            addTest: !this.state.addTest
        })
    }

    render() {
        const { dispatch, className, jwt, lesson, error, message, data, lesson_error, course_id, lessons, changeLesson } = this.props;
        const { loading, changed, lessonCreated, addTest } = this.state;
        let styleClass = className == undefined ? '' : ' ' + className;
        if (loading) { return <Loading /> }
        return (
            <Paper className={styleClass}>
                <Formik
                    initialValues={
                        Object.keys(lesson).length === 0 ?
                            {
                                lesson_name: '',
                                lesson_videolink: '',
                                lesson_text: '',
                                lesson_description: '',
                                lesson_questions: []
                            } : {
                                lesson_name: lesson.name,
                                lesson_videolink: lesson.videolink,
                                lesson_text: lesson.text,
                                lesson_description: lesson.description,
                                lesson_questions: lesson.questions
                            }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        const { lesson, course_id } = this.props;
                        const { lessonCreated, addTest, create, update, del } = this.state;
                        const { lesson_name, lesson_videolink, lesson_text, lesson_description, lesson_questions } = values;
                        if (lessonCreated === false) {
                            dispatch(lessonActions.createLesson(
                                jwt,
                                course_id,
                                lessons !== null ? Number(data.lessons.length) + 1 : data !== undefined ? Number(data.lessons.length) + 1 : 1,
                                lesson_name,
                                lesson_videolink,
                                lesson_description,
                                lesson_text,
                                lesson_questions
                            )).then(
                                () => changeLesson(), this.setState({ changed: error === undefined ? false : true, lessonCreated: error === undefined ? true : false })
                            )
                        } else {
                            var questions;
                            dispatch(lessonActions.updateLesson(
                                jwt,
                                lesson.id,
                                lessons !== null ? Number(data.lessons.length) + 1 : data !== undefined ? Number(data.lessons.length) + 1 : 1,
                                lesson_name,
                                course_id,
                                lesson_videolink,
                                lesson_description,
                                lesson_text,
                                questions = {
                                    delete: del,
                                    update: update,
                                    create: create
                                }
                            )).then(
                                () => this.setState({ changed: error === undefined ? false : true })
                            )

                        }
                    }
                    }
                >
                    {({ errors, values, handleChange, setFieldValue, touched }) => (
                        <Form onChange={() => { this.setState({ changed: true }) }}>

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

                            <TextInput
                                multiline
                                rows={4}
                                error={errors.lesson_description && touched.lesson_description}
                                value={values.lesson_description}
                                id="lesson_description"
                                label="Описание урока"
                                type={'text'}
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("lesson_description", val)}
                                helperText={
                                    errors.lesson_description && touched.lesson_description
                                        ? errors.lesson_description
                                        : null
                                }
                                className='w-100 mb-3'
                            />

                            <TextInput
                                multiline
                                rows={4}
                                error={errors.lesson_text && touched.lesson_text}
                                value={values.lesson_text}
                                id="lesson_text"
                                label="Текст урока"
                                type={'text'}
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("lesson_text", val)}
                                helperText={
                                    errors.lesson_text && touched.lesson_text
                                        ? errors.lesson_text
                                        : null
                                }
                                className='w-100 mb-3'
                            />
                            <div className='d-flex grid-justify-xs-space-between'>
                                <Typography component='body' variant='body' className='m-0 f-initial'>Добавить тест к уроку?</Typography>
                                <Switch className='m-0' isToggled={addTest} onToggle={() => this.handleToggleChange()} />
                            </div>
                            {addTest === true &&
                                <CreateTestPlane
                                    questions={values.lesson_questions}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    setState={(obj) => this.setState(obj)}
                                    del={this.state.del}
                                    update={this.state.update}
                                    create={this.state.create}
                                />}


                            <div className={`d-flex grid-justify-xs-${lesson_error !== undefined && lesson_error !== null || message !== undefined && message !== null ? 'space-between' : 'flex-end'} grid-align-items-xs-center`}>
                                {data !== undefined && lesson_error !== undefined && (
                                    <Alert className='error' severity="error">{lesson_error}</Alert>
                                )}
                                {message && (
                                    <Alert severity="success">{message}</Alert>
                                )}
                                {touched.course_name}
                                <Button type='submit' disabled={changed === false} className='m-3'>{lessonCreated === false ? 'Создать урок' : 'Сохранить'}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, lesson } = state;
    const { user, jwt } = authentication;
    const { message, lesson_error, data } = lesson
    return {
        user,
        jwt,
        message,
        lesson_error,
        data
    };
}

const connectedCreateLessonPlane = connect(mapStateToProps)(CreateLessonPlane);
export { connectedCreateLessonPlane as CreateLessonPlane };