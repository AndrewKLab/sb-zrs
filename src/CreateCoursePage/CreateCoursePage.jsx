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
    course_name: yup
        .string()
        .max(50, "Это название слишком длинное.")
        .required("Это поле является обязательным для заполнения."),
    course_descrigtion: yup
        .string()
        .required("Это поле является обязательным для заполнения."),
    image: yup
        .mixed()
        .required("Это поле является обязательным для заполнения."),
});


class CreateCoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            openCreate: false
        }
    }

    componentDidMount() {
        const { dispatch, user, jwt, message } = this.props;
        if (user != undefined) {
            this.setState({ loading: false })
        }
    }

    handleOpen() {
        this.setState({ openCreate: true })
    }


    handleClose() {
        this.setState({ openCreate: false })
    }

    submit(values) {
        const { course_name, course_category_name, image, course_descrigtion } = values;
        const { dispatch, user, jwt, message } = this.props;
        if (message === undefined) {
            dispatch(courseActions.createCourse(jwt, course_name, user.id, course_category_name === '' ? 'basic' : course_category_name, image, course_descrigtion)).then(
                () => this.handleClose()
            )
        } else {
            console.log('изменить курс')
            this.handleClose()
        }
    }

    renderConfermCreateDialog(values) {
        const { openCreate } = this.state;
        return (
            <Dialog onClose={() => this.handleClose()} open={openCreate}>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>Создать курс?</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography variant='body' component='body'>{`Создать курс с именем "${values.course_name}"?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={()=> this.submit(values)} className={'mr-3'} variant='outlined' color="primary">
                        Да
                        </Button>
                    <Button onPress={() => this.handleClose()} variant='outlined' color="primary">
                        Закрыть
                        </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { history, error, message } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <Loading />
        }
        return (
            <div className={'py-3 d-flex gap-10'}>
                <Paper className={'create-course-body p-2'}>
                    <Formik
                        initialValues={{
                            image: '',
                            course_name: "",
                            course_category_name: "",
                            course_descrigtion: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            this.handleOpen();
                        }
                        }
                    >
                        {({ errors, values, handleChange, setFieldValue, touched }) => (
                            <Form>
                                <div className='mb-3'>
                                    <Dropzone
                                        className={`drag-and-drop ${errors.image && touched.image && 'drag-and-drop-error'}`}
                                        accept="image/*"
                                        onDrop={(acceptedFiles) => {
                                            // do nothing if no files
                                            if (acceptedFiles.length === 0) { return; }

                                            // on drop we add to the existing files
                                            setFieldValue("image", acceptedFiles[0]);
                                        }}>
                                        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                            if (isDragActive) {
                                                return "This file is authorized";
                                            }

                                            if (isDragReject) {
                                                return "This file is not authorized";
                                            }

                                            if (Object.keys(values.image).length === 0) {
                                                return (
                                                    <div className='drag-and-drop-layout'>
                                                        <AddPhotoAlternateOutlinedIcon fontSize={"large"} />
                                                        <p>Добавьте сюда свой фаил изображения для превью курса!</p>
                                                    </div>
                                                )
                                            }

                                            return <Thumb file={values.image} />;
                                        }}
                                    </Dropzone>

                                    {errors.image && touched.image && <span className="text-input-helper text-input-danger">{errors.image}</span>}
                                </div>

                                <TextInput
                                    error={errors.course_name && touched.course_name}
                                    value={values.value}
                                    id="course_name"
                                    name="course_name"
                                    label="Название курса"
                                    type={'text'}
                                    autoComplete="course_name"
                                    variant={'outlined'}
                                    onChange={handleChange}
                                    onSelect={val => setFieldValue("value", val)}
                                    helperText={
                                        errors.course_name && touched.course_name ? errors.course_name : null
                                    }
                                    className='w-100 mb-3'
                                />

                                <TextInput
                                    select
                                    value={values.value}
                                    id="course_category_name"
                                    name="course_category_name"
                                    label="Категория курса"
                                    autoComplete="course_category_name"
                                    variant={'outlined'}
                                    onChange={handleChange}
                                    onSelect={val => setFieldValue("value", val)}

                                    InputProps={{
                                        endAdornment: (
                                            <ExpandMoreIcon />
                                        ),
                                    }}
                                    className='w-100 mb-3'
                                >
                                    <SelectItem value={'basic'}>Основная категория</SelectItem>
                                    <SelectItem value={'special'}>Специальная категория</SelectItem>
                                    <SelectItem value={'social'}>Социальная категория</SelectItem>
                                    <SelectItem value={'national'}>Национальная категория</SelectItem>
                                </TextInput>

                                <TextInput
                                    multiline
                                    rows={4}
                                    error={errors.course_descrigtion && touched.course_descrigtion}
                                    value={values.value}
                                    id="course_descrigtion"
                                    label="Описание курса"
                                    type={'text'}
                                    variant={'outlined'}
                                    onChange={handleChange}
                                    onSelect={val => setFieldValue("value", val)}
                                    helperText={
                                        errors.course_descrigtion && touched.course_descrigtion
                                            ? errors.course_descrigtion
                                            : null
                                    }
                                    className='w-100 mb-3'
                                />
                                <div className={`d-flex grid-justify-xs-${error !== undefined || message !== undefined ? 'space-between' : 'flex-end'}`}>
                                    {error && (
                                        <Alert className='error' severity="error">{error}</Alert>
                                    )}
                                    {message && (
                                        <Alert severity="success">{message.message}</Alert>
                                    )}
                                    <Button type='submit' className='m-3'>{message === undefined ? 'Создать курс' : 'Изменить курс'}</Button>
                                </div>
                                {this.renderConfermCreateDialog(values)}
                            </Form>
                        )}
                    </Formik>

                </Paper>
                <Paper className={'create-course-helper p-2'}>
                    <Typography variant='h5' component='h5'>Уроки в курсе:</Typography>
                    <Button disabled={message === undefined} onPress={() => { console.log('Добавить урок') }}>Добавить урок</Button>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, course } = state;
    const { user, jwt } = authentication;
    const { loading, courses, error, message } = course;
    return {
        error,
        message,
        user,
        jwt,
        loading,
        courses
    };
}

const connectedCreateCoursePage = connect(mapStateToProps)(CreateCoursePage);
export { connectedCreateCoursePage as CreateCoursePage };