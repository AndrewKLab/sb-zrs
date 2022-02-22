import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { courseActions } from '../../_actions';
import { Alert, Loading, Paper, TextInput, SelectItem, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '../../_components';
import Dropzone from "react-dropzone";
import Thumb from "../../_components/Thumb";
import { Formik, Form } from "formik";
import * as yup from "yup";



//icons
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CreateCoursePage } from '../../CreateCoursePage';

const CourseRedactor = ({
    ...props, className, dispatch,
    course_id, course_autor_id,
    jwt, user,
    course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status
}) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    let SignupSchema = yup.object().shape({
        course_name: yup
            .string()
            .max(50, "Это название слишком длинное.")
            .required("Это поле является обязательным для заполнения."),
        course_descrigtion: yup
            .string()
            .required("Это поле является обязательным для заполнения."),
        course_image: yup
            .mixed()
            .required("Это поле является обязательным для заполнения.")
    });

    const [visableDialog, setVisableDialog] = useState(false);
    const openDialog = () => setVisableDialog(true);
    const closeDialog = () => setVisableDialog(false);

    // const course_id = props.location.state !== undefined ? props.location.state.course : null;


    // useEffect(() => {
    //     if (course_id !== null) {
    //         dispatch(courseActions.readOneCourseById(course_id)).then(()=>{
    //             setLoading(false);
    //         })
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);

    const createCourse = (values) => {
        const { course_image, course_name, course_category_name, course_descrigtion } = values;
        dispatch(courseActions.createCourse(jwt, course_name, user.id, course_category_name === '' ? 'basic' : course_category_name, course_image, course_descrigtion)).then(() => closeDialog());
    }

    const updateCourse = (values) => {
        const { course_image, course_name, course_category_name, course_descrigtion } = values;
        dispatch(courseActions.updateCourse(jwt, course_id, course_name, course_autor_id, course_category_name, course_image, course_descrigtion, 0)).then(() => closeDialog());
    }

    const RenderConfermCreateDialog = ({ dialog_title, dialog_body, dialogAction }) => {
        return (
            <Dialog onClose={() => closeDialog()} open={visableDialog}>
                <DialogTitle>
                    <Typography variant='h5' component='h5'>{dialog_title}</Typography>
                </DialogTitle>
                <DialogContent dividers className={'d-flex grid-direction-xs-column'}>
                    <Typography variant='body' component='body'>{dialog_body}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onPress={dialogAction} className={'mr-3'} variant='outlined' color="primary">
                        Да
                    </Button>
                    <Button onPress={() => closeDialog()} variant='outlined' color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Paper className={`${styleClass} p-3`}>
            <Formik
                initialValues={
                    course_id === null ?
                        {
                            course_image: '',
                            course_name: "",
                            course_category_name: "basic",
                            course_descrigtion: "",
                        } : {
                            course_image: course.course_img,
                            course_name: course.course_name,
                            course_category_name: course.course_category_name,
                            course_descrigtion: course.course_description,
                        }}
                validationSchema={SignupSchema}
                onSubmit={(values) => { openDialog() }
                }
            >
                {({ errors, values, handleChange, setFieldValue, touched }) => (
                    <Form onChange={() => { }}>
                        <div className='drag-and-drop-container mb-3'>
                            <Dropzone
                                className={`drag-and-drop ${errors.course_image && touched.course_image && 'drag-and-drop-error'}`}
                                accept="image/*"
                                onDrop={(acceptedFiles, rejectedFiles) => {
                                    if (acceptedFiles.length === 0) {
                                        if (rejectedFiles.length !== 0) {
                                            errors.course_image = 'Добавлять можно только файлы типов PNG, WEBP, JPG, и JPEG!'
                                            touched.course_image = 'Добавлять можно только файлы типов PNG, WEBP, JPG, и JPEG!'
                                        }
                                    } else {
                                        if (rejectedFiles.length === 0) {
                                            setFieldValue("course_image", acceptedFiles[0])
                                            if (errors.course_image !== undefined) {
                                                delete errors.course_image
                                                delete touched.course_image
                                            }
                                        } else {
                                            errors.course_image = 'Добавлять можно только файлы типов PNG, WEBP, JPG, и JPEG!'
                                            touched.course_image = 'Добавлять можно только файлы типов PNG, WEBP, JPG, и JPEG!'
                                        }
                                    }

                                }}>
                                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                                    if (isDragReject) {
                                        return "Данный тип файлов нельзя использовать как превью для курсов!";
                                    }

                                    if (Object.keys(values.course_image).length === 0 || isDragActive) {
                                        return (
                                            <div className='drag-and-drop-layout'>
                                                <AddPhotoAlternateOutlinedIcon fontSize={"large"} />
                                                <p>Добавьте сюда свой фаил изображения для превью курса!</p>
                                            </div>
                                        )
                                    }

                                    return <Thumb file={values.course_image} />;
                                }}
                            </Dropzone>

                            {errors.course_image && touched.course_image && <span className="text-input-helper text-input-danger">{errors.course_image}</span>}
                            <small>Рекомендуемые размеры: 1280х720.</small><br/>
                            <small>Рекомендуемый формат: ".webp".</small>
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
                                endAdornmentClass: 'select-arrow'
                                
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
                        <div className={`d-flex grid-align-items-xs-center grid-justify-xs-${create_course_success_message !== null || create_course_error !== null || update_course_success_message !== null || update_course_error !== null ? 'space-between' : 'flex-end'}`}>
                            {(create_course_error || update_course_error) && (
                                <Alert className='error' severity="error">{create_course_error || update_course_error}</Alert>
                            )}
                            {(create_course_success_message || update_course_success_message) && (
                                <Alert severity="success">{create_course_success_message || update_course_success_message}</Alert>
                            )}
                            <Button className="h-min" type='submit'>{course_editing_status === 'create' ? 'Создать курс' : 'Сохранить'}</Button>
                            <RenderConfermCreateDialog  dialog_title={course_editing_status === 'create' ? `Создать курс` : `Сохранить курс`} dialog_body={course_editing_status === 'create' ? `Создать курс с именем "${values.course_name}"` : `Сохранить курс с именем "${values.course_name}"`} dialogAction={() => course_editing_status === 'create' ? createCourse(values) : updateCourse(values)} />
                        </div>

                    </Form>
                )}
            </Formik>
        </Paper>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status } = state.course_constructor;

    return {
        jwt, user,
        course, course_loading, course_error, create_course_loading, create_course_success_message, create_course_error, update_course_loading, update_course_success_message, update_course_error, delete_course_loading, delete_course_error, course_editing_status
    };
}

const connectedCourseRedactor = connect(mapStateToProps)(CourseRedactor);

export { connectedCourseRedactor as CourseRedactor }

