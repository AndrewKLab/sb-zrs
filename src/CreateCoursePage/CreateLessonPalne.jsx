import React from 'react';
import { connect } from 'react-redux';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { userActions, courseActions } from '../_actions';


import Dropzone from "react-dropzone";
import Thumb from "../_components/Thumb";
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
    IconButton
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
    lesson_descrigtion: yup
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
            lessonCreated: Object.keys(props.lesson).length === 0 ? false : true
        }
    }
    componentDidMount() {
        this.setState({ loading: false })
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        this.setState({ lessonCreated: Object.keys(nextProps.lesson).length === 0 ? false : true });

    }

    render() {
        const { className, lesson, error, message } = this.props;
        const { loading, changed, lessonCreated } = this.state;
        let styleClass = className == undefined ? '' : ' ' + className;

        if (loading) { return <Loading /> }
        return (
            <Paper className={styleClass}>
                <Formik
                    initialValues={{
                        lesson_name: '',
                        lesson_videolink: '',
                        lesson_text: '',
                        lesson_descrigtion: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        const { lesson_name, lesson_videolink, lesson_text, lesson_descrigtion } = values;
                        console.log(values)
                    }
                    }
                >
                    {({ errors, values, handleChange, setFieldValue, touched }) => (
                        <Form onChange={() => { this.setState({ changed: true }) }}>

                            <TextInput
                                error={errors.lesson_name && touched.lesson_name}
                                value={lesson.name || values.lesson_name}
                                id="lesson_name"
                                name="lesson_name"
                                label="Название урока"
                                type={'text'}
                                autoComplete="lesson_name"
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("value", val)}
                                helperText={
                                    errors.lesson_name && touched.lesson_name ? errors.lesson_name : null
                                }
                                className='w-100 mb-3'
                            />


                            <TextInput
                                error={errors.lesson_videolink && touched.lesson_videolink}
                                value={lesson.videolink || values.lesson_videolink}
                                id="lesson_videolink"
                                name="lesson_videolink"
                                label="Ссылка на видео к уроку"
                                type={'text'}
                                autoComplete="lesson_videolink"
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("value", val)}
                                helperText={
                                    errors.lesson_videolink && touched.lesson_videolink ? errors.lesson_videolink : null
                                }
                                className='w-100 mb-3'
                            />

                            <TextInput
                                multiline
                                rows={4}
                                error={errors.lesson_descrigtion && touched.lesson_descrigtion}
                                value={lesson.description || values.lesson_descrigtion}
                                id="lesson_descrigtion"
                                label="Описание урока"
                                type={'text'}
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("value", val)}
                                helperText={
                                    errors.lesson_descrigtion && touched.lesson_descrigtion
                                        ? errors.lesson_descrigtion
                                        : null
                                }
                                className='w-100 mb-3'
                            />

                            <TextInput
                                multiline
                                rows={4}
                                error={errors.lesson_text && touched.lesson_text}
                                value={lesson.text || values.lesson_text}
                                id="lesson_text"
                                label="Текст урока"
                                type={'text'}
                                variant={'outlined'}
                                onChange={handleChange}
                                onSelect={val => setFieldValue("value", val)}
                                helperText={
                                    errors.lesson_text && touched.lesson_text
                                        ? errors.lesson_text
                                        : null
                                }
                                className='w-100 mb-3'
                            />


                            <div className={`d-flex grid-justify-xs-${error !== undefined || message !== undefined ? 'space-between' : 'flex-end'}`}>
                                {error && (
                                    <Alert className='error' severity="error">{error}</Alert>
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
    const { authentication, course } = state;
    const { user, jwt } = authentication;
    const { loading, course_data, error, message } = course;
    return {
        error,
        message,
        user,
        jwt,
        loading,
        course_data
    };
}

const connectedCreateLessonPlane = connect(mapStateToProps)(CreateLessonPlane);
export { connectedCreateLessonPlane as CreateLessonPlane };