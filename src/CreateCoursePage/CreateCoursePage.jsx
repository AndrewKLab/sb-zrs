import React from 'react';
import { connect } from 'react-redux';

import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CreateLessonPlane } from './';

import { lessonActions, courseActions } from '../_actions';


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
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemSecondAction,
    ListItemSubtitle,
    ListItemText,
    ListItemTitle,
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
        .required("Это поле является обязательным для заполнения.")
});


class CreateCoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            addLesson: false,
            openCreate: false,
            changed: false,
            courseCreated: this.props.location.state !== undefined ? true : false,
            lesson: {}
        }
    }

    componentDidMount() {
        const { dispatch, user, jwt, message } = this.props;
        if (user != undefined) {
            if (this.props.location.state !== undefined) {
                dispatch(lessonActions.getAllLessonsByCourse(this.props.location.state.course.id, user.id, user.teather_id)).then(
                    () => this.setState({ loading: false })
                )
            } else {
                this.setState({ loading: false })
            }
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
        const { dispatch, user, jwt, message, error } = this.props;
        dispatch(courseActions.createCourse(jwt, course_name, user.id, course_category_name === '' ? 'basic' : course_category_name, image, course_descrigtion)).then(
            () => this.handleClose(), console.log(error), this.setState({ changed: error === undefined ? false : true, courseCreated: error === undefined ? true : false })
        )
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
                    <Button onPress={() => this.submit(values)} className={'mr-3'} variant='outlined' color="primary">
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
        const { jwt, error, message, dispatch, course_data, data } = this.props;
        const { loading, changed, courseCreated, addLesson, lesson } = this.state;

        if (loading) {
            return <Loading />
        }
        return (
            <div className={'py-3 d-flex gap-10'}>
                <div className={'create-course-body'}>
                    <Paper className='p-2'>
                        <Formik
                            initialValues={
                                this.props.location.state !== undefined ?
                                    {
                                        image: this.props.location.state.course.img,
                                        course_name: this.props.location.state.course.name,
                                        course_category_name: this.props.location.state.course.category_name,
                                        course_descrigtion: this.props.location.state.course.description,
                                    } : {
                                        image: '',
                                        course_name: "",
                                        course_category_name: "basic",
                                        course_descrigtion: "",
                                    }}
                            validationSchema={SignupSchema}
                            onSubmit={(values) => {
                                const { course_name, course_category_name, image, course_descrigtion } = values;
                                if (courseCreated === false) {
                                    this.handleOpen()
                                } else {
                                    dispatch(courseActions.updateCourse(
                                        jwt,
                                        course_data !== undefined ? (course_data.id === undefined ? this.props.location.state.course.id : course_data.id) : (this.props.location.state.course.id),
                                        course_name,
                                        course_data !== undefined ? (course_data.autor_id === undefined ? this.props.location.state.course.autor_id : course_data.autor_id) : (this.props.location.state.course.autor_id),
                                        course_category_name,
                                        image,
                                        course_descrigtion
                                    )).then(
                                        () => this.setState({ changed: false })
                                    )
                                }

                            }
                            }
                        >
                            {({ errors, values, handleChange, setFieldValue, touched }) => (
                                <Form onChange={() => { this.setState({ changed: true }) }}>
                                    <div className='mb-3'>
                                        <Dropzone
                                            className={`drag-and-drop ${errors.image && touched.image && 'drag-and-drop-error'}`}
                                            accept="image/*"
                                            onDrop={(acceptedFiles, rejectedFiles) => {
                                                if (acceptedFiles.length === 0) {
                                                    if (rejectedFiles.length !== 0) {
                                                        errors.image = 'Добавлять можно только файлы типов PNG, JPG и JPEG!'
                                                        touched.image = 'Добавлять можно только файлы типов PNG, JPG и JPEG!'
                                                    }
                                                } else {
                                                    if (rejectedFiles.length === 0) {
                                                        setFieldValue("image", acceptedFiles[0])
                                                        if (errors.image !== undefined) {
                                                            delete errors.image
                                                            delete touched.image
                                                        }
                                                    } else {
                                                        errors.image = 'Добавлять можно только файлы типов PNG, JPG и JPEG!'
                                                        touched.image = 'Добавлять можно только файлы типов PNG, JPG и JPEG!'
                                                    }
                                                }

                                            }}>
                                            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                                if (isDragReject) {
                                                    return "Данный тип файлов нельзя использовать как превью для курсов!";
                                                }

                                                if (Object.keys(values.image).length === 0 || isDragActive) {
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
                                        value={values.course_name}
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
                                        defaultValue={values.course_category_name}
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
                                        <SelectItem selectded={values.course_category_name === 'basic'} value={'basic'}>Основная категория</SelectItem>
                                        <SelectItem selectded={values.course_category_name === 'special'} value={'special'}>Специальная категория</SelectItem>
                                        <SelectItem selectded={values.course_category_name === 'social'} value={'social'}>Социальная категория</SelectItem>
                                        <SelectItem selectded={values.course_category_name === 'national'} value={'national'}>Национальная категория</SelectItem>
                                    </TextInput>

                                    <TextInput
                                        multiline
                                        rows={4}
                                        error={errors.course_descrigtion && touched.course_descrigtion}
                                        value={values.course_descrigtion}
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
                                            <Alert severity="success">{message}</Alert>
                                        )}
                                        {touched.course_name}
                                        <Button type='submit' disabled={changed === false} className='m-3'>{courseCreated === false ? 'Создать курс' : 'Сохранить'}</Button>
                                    </div>
                                    {this.renderConfermCreateDialog(values)}
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                    {addLesson === true ? <CreateLessonPlane className='p-2 mt-2' lesson={lesson} /> : null}
                </div>
                <Paper className={'create-course-helper p-2'}>
                    <Typography variant='h5' component='h5'>Уроки в курсе:</Typography>
                    {data !== undefined ?
                        (<List>
                            {data.lessons.map((lesson, index) => (
                                <ListItem key={index} button
                                    onPress={() => this.setState({ addLesson: true, lesson: lesson })}
                                >
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            {lesson.number}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <ListItemTitle>
                                                {lesson.name}
                                            </ListItemTitle>
                                        </ListItemText>
                                    </ListItemFirstAction>
                                    <ListItemSecondAction>

                                    </ListItemSecondAction>
                                </ListItem>

                            ))}
                        </List>
                        ) : null}
                    <Button disabled={!courseCreated} onPress={() => { this.setState({ addLesson: true, lesson: {} }) }}>Добавить урок</Button>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, course, lesson } = state;
    const { user, jwt } = authentication;
    const { loading, course_data, error, message } = course;
    const { data } = lesson;
    return {
        error,
        message,
        user,
        jwt,
        loading,
        course_data,
        data
    };
}

const connectedCreateCoursePage = connect(mapStateToProps)(CreateCoursePage);
export { connectedCreateCoursePage as CreateCoursePage };