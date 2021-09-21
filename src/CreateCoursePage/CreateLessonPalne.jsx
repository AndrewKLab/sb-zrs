import React from 'react';
import { connect } from 'react-redux';
import { CreateTestPlane } from './';

import { lessonActions } from '../_actions';
import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";


import { Editor } from '@tinymce/tinymce-react';

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
    TextEditor,
    Switch,
    Divider
} from '../_components'

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

class CreateLessonPlane extends React.Component {
    constructor(props) {
        super(props);
        this.lessonDescriptionRef = React.createRef();
        this.editorRef = React.createRef();
        this.state = {
            loading: true,
            changed: false,
            addTest: props.lesson.questions && props.lesson.questions.length !== 0 ? true : false,
            lessonCreated: Object.keys(props.lesson).length === 0 ? false : true,
            create: [],
            update: [],
            del: [],
            content: '',
            lessonDescriptionError: ''
        }
    }
    componentDidMount() {
        this.setState({ loading: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lesson !== undefined && nextProps.lesson.id !== this.props.lesson.id) {
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

    setChange() {
        this.setState({
            create: [],
            update: [],
            del: [],
        });
    }

    changeEditorValue(setter, editor, value) {
        console.log(editor)
        var e = this.lessonDescriptionRef.current.getContent()
        console.log(e)
        if (e === '') {
            this.setState({ changed: false })
        } else {
            this.setState({ changed: true })
        }
        setter(value, e);
        // this.setChange();
    }

    clenupTest() {
        this.setState({ changed: true })
    }



    render() {
        const { dispatch, className, jwt, lesson, error, message, data, lesson_error, currentTheme, lessons, changeLesson } = this.props;
        const { loading, changed, content, lessonCreated, addTest } = this.state;
        let styleClass = className == undefined ? '' : ' ' + className;
        if (parent.frames["lesson_description_ifr"] !== undefined) {
            let iframeName = parent.frames["lesson_description_ifr"];
            let iframeContent = iframeName.contentDocument;
            if (currentTheme === "dark") {
                iframeContent.body.classList.remove("light");
                iframeContent.body.classList.add("dark");
            } else {
                iframeContent.body.classList.remove("dark");
                iframeContent.body.classList.add("light");
            }
        }

        if (parent.frames["lesson_text_ifr"] !== undefined) {
            let iframeName = parent.frames["lesson_text_ifr"];
            let iframeContent = iframeName.contentDocument;
            if (currentTheme === "dark") {
                iframeContent.body.classList.remove("light");
                iframeContent.body.classList.add("dark");
            } else {
                iframeContent.body.classList.remove("dark");
                iframeContent.body.classList.add("light");
            }
        }


        if (loading) { return <Loading /> }
        return (
            <Paper className={styleClass}>
                <Formik
                    initialValues={
                        Object.keys(lesson).length === 0 ?
                            ({
                                lesson_name: '',
                                lesson_videolink: '',
                                lesson_text: '',
                                lesson_description: '',
                                lesson_questions: []
                            }) : ({
                                lesson_name: lesson.name,
                                lesson_videolink: lesson.videolink,
                                lesson_text: lesson.text,
                                lesson_description: lesson.description,
                                lesson_questions: lesson.questions
                            })}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        const { lesson, course_id } = this.props;
                        const { lessonCreated, create, update, del } = this.state;
                        const { lesson_name, lesson_videolink, lesson_text, lesson_description, lesson_questions } = values;
                        if (lessonCreated === false) {
                                dispatch(lessonActions.createLesson(
                                    jwt,
                                    course_id,
                                    lessons !== null && data !== undefined ? Number(data.lessons.length) + 1 : data !== undefined ? Number(data.lessons.length) + 1 : 1,
                                    lesson_name,
                                    lesson_videolink,
                                    lesson_description,
                                    lesson_text,
                                    lesson_questions
                                )).then(
                                    () => changeLesson(), clenupTest(), this.setState({ changed: error === undefined ? false : true, lessonCreated: error === undefined ? true : false })
                                )
                        } else {
                            console.log(lesson)
                            var questions;
                            dispatch(lessonActions.updateLesson(
                                jwt,
                                lesson.id,
                                lesson.number,
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
                        <Form onChange={() => { this.setChange() }}>

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
                            <div className={errors.lesson_description ? "text-input-danger" : ""}>
                                <Typography component='body' variant='body'>Описание урока:</Typography>
                                <Editor
                                    onInit={(evt, editor) => this.lessonDescriptionRef.current = editor}
                                    value={values.lesson_description}
                                    id="lesson_description"
                                    textareaName='lesson_description'
                                    onEditorChange={() => {
                                        var val = this.lessonDescriptionRef.current.getContent();
                                        setFieldValue("lesson_description", val)
                                        if (val === '') {
                                            this.setState({ changed: false })
                                        } else {
                                            this.setState({ changed: true })
                                        }
                                    }}
                                    init={{
                                        height: 200,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                                            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                                            'table emoticons template paste help'
                                        ],
                                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
                                        content_style: '.light{ color: color: rgba(66, 66, 66, 1)} .dark{ color: rgba(255, 255, 255, 1)}',
                                    }}
                                />
                                {errors.lesson_description ? <span className="text-input-helper text-input-danger">{errors.lesson_description}</span> : null}
                            </div>

                            <div className={errors.lesson_text ? "text-input-danger" : ""}>
                                <Typography component='body' variant='body' className={`mt-3`}>Текст урока:</Typography>
                                <Editor
                                    onInit={(evt, editor) => this.editorRef.current = editor}
                                    value={values.lesson_text}
                                    id="lesson_text"
                                    textareaName='lesson_text'
                                    onEditorChange={() => {
                                        var val = this.editorRef.current.getContent();
                                        setFieldValue("lesson_text", val)
                                        if (val === '') {
                                            this.setState({ changed: false })
                                        } else {
                                            this.setState({ changed: true })
                                        }
                                    }}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                                            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                                            'table emoticons template paste help'
                                        ],
                                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
                                        content_style: '.light{ color: color: rgba(66, 66, 66, 1)} .dark{ color: rgba(255, 255, 255, 1)}',
                                    }}
                                />
                                {errors.lesson_text ? <span className="text-input-helper text-input-danger">{errors.lesson_text}</span> : null}
                            </div>
                            <Divider className='mv-3' />
                            <div className='d-flex grid-justify-xs-space-between ph-3'>
                                <Typography component='body' variant='body' className='m-0 f-initial'>Добавить тест к уроку?</Typography>
                                <Switch className='m-0' isToggled={addTest} onToggle={() => this.handleToggleChange()} />
                            </div>
                            <Divider className='mv-3' />
                            {addTest === true &&
                                <CreateTestPlane
                                    questions={values.lesson_questions}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    setState={(obj) => this.setState(obj)}
                                    del={this.state.del}
                                    update={this.state.update}
                                    create={this.state.create}
                                />

                            }

                            <div className={`d-flex grid-justify-xs-${lesson_error !== undefined && lesson_error !== null || message !== undefined && message !== null ? 'space-between' : 'flex-end'} grid-align-items-xs-center`}>
                                {data !== undefined && lesson_error !== undefined && (
                                    <Alert className='error' severity="error">{lesson_error}</Alert>
                                )}
                                {message && (
                                    <Alert severity="success">{message}</Alert>
                                )}
                                {touched.course_name}
                                <Button type='submit' disabled={changed === false}>{lessonCreated === false ? 'Создать урок' : 'Сохранить'}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </Paper>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, lesson, style } = state;
    const { currentTheme } = style;
    const { user, jwt } = authentication;
    const { message, lesson_error, data } = lesson
    return {
        user,
        jwt,
        message,
        lesson_error,
        data,
        currentTheme
    };
}

const connectedCreateLessonPlane = connect(mapStateToProps)(CreateLessonPlane);
export { connectedCreateLessonPlane as CreateLessonPlane };