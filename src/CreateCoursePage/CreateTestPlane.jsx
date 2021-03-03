import React from 'react';
import { connect } from 'react-redux';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


import { lessonActions, questionActions } from '../_actions';

import { Formik, Form } from "formik";
import * as yup from "yup";
import "yup-phone";

import {
    Alert,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Loading,
    Paper,
    Typography,
    Button,
    TextInput,
    FormControlLabel,
    Checkbox,
    Radio,
    SelectItem,
    IconButton,
    Switch
} from '../_components';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class CreateTestPlane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changedQ: false,

            addQuestion: false,
            question_id: '',
            question_text: '',
            question_text_error: '',
            question_type: 'checkbox',
            question_answers: [],
            question_answers_error: [],
            answers_error: '',
            editQuestion: '',

            a_delete: [],
            a_update: [],
            a_create: []
        }
    }

    
    //выбрать вопрос для измененния
    selectQestion(question) { this.setState({ editQuestion: question, addQuestion: false }) }

    //изменить текст вопроса
    changeQestionText(event) {
        const { editQuestion } = this.state;
        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_text: event.target.value,
                question_text_error: ''
            })
        } else {
            this.setState({
                changedQ: true,
                editQuestion: { ...editQuestion, question: event.target.value },
                question_text_error: ''
            })
        }
    }

    //изменить тип вопроса
    changeQestionType(event) {
        const { editQuestion } = this.state;
        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_type: event.target.value,
            })
        } else {
            this.setState({
                changedQ: true,
                editQuestion: { ...editQuestion, question_type: event.target.value },
                question_text_error: ''
            })
        }
    }

    createQestion() {
        this.setState({ question_answers_error: [] }, () => {
            const { questions, setFieldValue, setState, create } = this.props;
            const { question_id, question_text, question_type, question_answers, question_answers_error, editQuestion } = this.state;

            //Если поле ввода вопроса пустое
            if (question_text === '') {
                this.setState({ question_text_error: 'Это поле является обязательным для заполнения.' })
                question_answers.map((item, index) => (
                    item.answer === '' ?
                        (
                            question_answers_error.push('Это поле является обязательным для заполнения.'),
                            this.setState({ question_answers_error: question_answers_error })
                        ) : (
                            question_answers_error.push(''),
                            this.setState({ question_answers_error: question_answers_error })
                        )
                ))
                if (question_answers.length !== 0) {
                    //Если все поля ответов заполнены
                    if (question_answers_error.filter(i => i !== '').length === 0) {
                        //Если поле ввода вопроса пустое
                        if (question_text === '') {
                            this.setState({ question_text_error: 'Это поле является обязательным для заполнения.' })
                            //Если поле ввода вопроса не пустое
                        } else {

                            if (editQuestion === '') {

                                questions.push({ id: question_id, question: question_text, question_type: question_type, answers: question_answers });
                                setFieldValue("lesson_questions", questions);
                                var to_create_arr = create;
                                to_create_arr.push({ id: question_id, question: question_text, question_type: question_type, answers: question_answers })
                                setState({ changed: true, create: to_create_arr });
                            } else {

                                setFieldValue("lesson_questions", editQuestion)
                            }


                            this.setState({
                                changedQ: false,
                                addQuestion: false,
                                question_text: '',
                                question_text_error: '',
                                question_type: 'checkbox',
                                question_answers: [],
                                question_text_error: '',
                                answers_error: '',
                                editQuestion: ''
                            })
                        }
                    }
                } else {
                    this.setState({ answers_error: 'Добавьте хотябы один ответ!' })
                }
                //Если поле ввода вопроса не пустое
            } else {
                if (question_answers.length !== 0) {
                    question_answers.map((item, index) => (
                        item.answer === '' ?
                            (
                                question_answers_error.push('Это поле является обязательным для заполнения.'),
                                this.setState({ question_answers_error: question_answers_error })
                            ) : (
                                question_answers_error.push(''),
                                this.setState({ question_answers_error: question_answers_error })
                            )
                    ))
                    //Если все поля ответов заполнены
                    if (question_answers_error.filter(i => i !== '').length === 0) {
                        var to_create_arr;
                        if (editQuestion === '') {
                            console.log(3),
                                questions.push({ id: question_id, question: question_text, question_type: question_type, answers: question_answers });
                            setFieldValue("lesson_questions", questions);

                            var to_create_arr = create;
                            to_create_arr.push({ id: question_id, question: question_text, question_type: question_type, answers: question_answers })
                            setState({ changed: true, create: to_create_arr });

                        } else {
                            console.log(4),
                                setFieldValue("lesson_questions", editQuestion)
                        }

                        this.setState({
                            changedQ: false,
                            addQuestion: false,
                            question_text: '',
                            question_text_error: '',
                            question_type: 'checkbox',
                            question_answers: [],
                            question_text_error: '',
                            answers_error: '',
                            editQuestion: ''
                        })
                    }
                } else {
                    this.setState({ answers_error: 'Добавьте хотябы один ответ!' })
                }
            }
            console.log(question_answers_error)
        })
    }

    //удалить ответ
    deleteQuestion(q_id) {
        const { questions, setFieldValue, setState, del, create } = this.props;
        setFieldValue('lesson_questions', questions.filter(ques => ques.id !== q_id))
        var to_dell_arr = del;
        if (Number(q_id) < 10000) {
            to_dell_arr.push({ id: q_id })
        } else {
            setState({ create: create.filter(ques => ques.id !== q_id) })
        }
        setState({ changed: true, del: to_dell_arr })
    }

    //OТВЕТ
    //изменить правильный ответ
    changedQuestionCurrentAnswer(event, answer) {
        const { editQuestion, question_answers, question_type, a_create, a_update } = this.state;

        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_answers: question_answers.map((item, j) => {
                    switch (question_type) {
                        case 'checkbox':
                            return (item.id === answer.id ?
                                {
                                    ...item,
                                    current: item.current === '0' ? '1' : '0'
                                } : item)

                        case 'radio':
                            return item.id === answer.id ?
                                {
                                    ...item,
                                    current: '1'
                                } :
                                {
                                    ...item,
                                    current: '0'
                                }
                        case 'text':
                            return {
                                ...item,
                                answer: event.target.value
                            }
                    }
                }
                )
            })
        } else {
            if (a_create.some(function (el) { return el.id === answer.id })) {
                this.setState({
                    a_create: a_create.map((item, j) => {
                        switch (editQuestion.question_type) {
                            case 'checkbox':
                                return (item.id === answer.id ?
                                    {
                                        ...item,
                                        current: item.current === '0' ? '1' : '0'
                                    } : item)

                            case 'radio':
                                return item.id === answer.id ?
                                    {
                                        ...item,
                                        current: '1'
                                    } :
                                    {
                                        ...item,
                                        current: '0'
                                    }
                            case 'text':
                                return {
                                    ...item,
                                    answer: event.target.value
                                }
                        }
                    })
                })
            } else {

                if (a_update.some(function (el) { return el.id === answer.id })) {
                    this.setState({
                        a_update: a_update.map((item, j) => {
                            switch (editQuestion.question_type) {
                                case 'checkbox':
                                    return (item.id === answer.id ?
                                        {
                                            ...item,
                                            current: item.current === '0' ? '1' : '0'
                                        } : item)

                                case 'radio':
                                    return item.id === answer.id ?
                                        {
                                            ...item,
                                            current: '1'
                                        } :
                                        {
                                            ...item,
                                            current: '0'
                                        }
                                case 'text':
                                    return {
                                        ...item,
                                        answer: event.target.value
                                    }
                            }
                        })
                    })
                } else {

                    var update_answers_arr = a_update;

                    editQuestion.answers.map((item, j) => {
                        switch (editQuestion.question_type) {
                            case 'checkbox':
                                return (item.id === answer.id ? (
                                    update_answers_arr.push({
                                        id: item.id,
                                        answer: item.answer,
                                        current: item.current === '0' ? '1' : '0',
                                        question_id: item.question_id
                                    }),
                                    {
                                        ...item,
                                        current: item.current === '0' ? '1' : '0'
                                    }) : item)

                            case 'radio':
                                return item.id === answer.id ? (
                                    update_answers_arr.push({
                                        id: item.id,
                                        answer: item.answer,
                                        current: '1',
                                        question_id: item.question_id
                                    }),
                                    {
                                        ...item,
                                        current: '1'
                                    }) :
                                    (update_answers_arr.push({
                                        id: item.id,
                                        answer: item.answer,
                                        current: '0',
                                        question_id: item.question_id
                                    }),
                                    {
                                        ...item,
                                        current: '0'
                                    })
                            case 'text':
                                return (
                                    update_answers_arr.push({
                                        id: answer.id,
                                        answer: answer.answer,
                                        current: event.target.value,
                                        question_id: answer.question_id
                                    }),
                                    {
                                        ...item,
                                        answer: event.target.value
                                    }
                                )
                        }
                    })

                    this.setState({ a_update: update_answers_arr })
                }
            }

            this.setState({
                changedQ: true,
                editQuestion: {
                    ...editQuestion,
                    answers: editQuestion.answers.map((item, j) => {
                        switch (editQuestion.question_type) {
                            case 'checkbox':
                                return item.id === answer.id ?
                                    {
                                        ...item,
                                        current: item.current === '0' ? '1' : '0'
                                    } : item

                            case 'radio':
                                return item.id === answer.id ?
                                    {
                                        ...item,
                                        current: '1'
                                    } :
                                    {
                                        ...item,
                                        current: '0'
                                    }
                                break;
                            case 'text':
                                return {
                                    ...item,
                                    answer: event.target.value
                                }
                        }
                    }

                    )
                }
            })
        }

    }

    //создать ответ 
    createAnswer() {
        const { editQuestion, question_id, question_answers, a_create } = this.state;
        var newAnswers = editQuestion.answers === undefined ? question_answers : editQuestion.answers;
        var randomINT = getRandomInt(10000, 1000000);
        newAnswers.push({ id: randomINT, answer: '', current: '0', question_id: editQuestion.id === undefined ? question_id : editQuestion.id });
        var create_answers_arr = a_create;
        create_answers_arr.push({ id: randomINT, answer: '', current: '0', question_id: editQuestion.id === undefined ? question_id : editQuestion.id });
        this.setState({ a_create: create_answers_arr })
        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_answers: newAnswers,
                answers_error: ''
            })
        } else {
            this.setState({
                changedQ: true,
                editQuestion: {
                    ...editQuestion,
                    answers: newAnswers,
                },
                answers_error: ''
            })
        }
    }

    //изменить ответ 
    changedAnswer(event, answer, index) {
        const { editQuestion, question_answers, question_answers_error, a_create, a_update } = this.state;
        if (a_create.some(function (el) { return el.id === answer.id })) {
            this.setState({
                a_create: a_create.map((i, j) => (i.id === answer.id ? {
                    ...i,
                    answer: event.target.value
                } : i))
            })
        } else {
            if (a_update.some(function (el) { return el.id === answer.id })) {
                this.setState({
                    a_update: a_update.map((i, j) => (i.id === answer.id ? {
                        ...i,
                        answer: event.target.value
                    } : i))
                })
            } else {
                var update_answers_arr = a_update;
                update_answers_arr.push({ id: answer.id, answer: event.target.value, current: answer.current, question_id: answer.question_id });
                this.setState({ a_update: update_answers_arr })
            }
        }

        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_answers: question_answers.map((item, j) => (
                    item.id === answer.id ?
                        {
                            ...item,
                            answer: event.target.value
                        } : item
                )),
                question_answers_error: question_answers_error.map((item, j) => (
                    j === index ?
                        '' : item
                ))
            })
        } else {
            this.setState({
                changedQ: true,
                editQuestion: {
                    ...editQuestion,
                    answers: editQuestion.answers.map((item, j) => (
                        item.id === answer.id ?
                            {
                                ...item,
                                answer: event.target.value
                            } : item
                    ))
                },
                question_answers_error: question_answers_error.map((item, j) => (
                    j === index ?
                        '' : item
                ))
            })
        }
    }

    //удалить ответ
    deleteAnswer(answer) {
        const { editQuestion, question_answers, a_delete, a_create, a_update } = this.state;
        if (editQuestion.answers === undefined) {
            this.setState({
                changedQ: true,
                question_answers: question_answers.filter(item => item.id !== answer.id),
            })
        }
        else {
            this.setState({
                changedQ: true,
                editQuestion: {
                    ...editQuestion,
                    answers: editQuestion.answers.filter(item => item.id !== answer.id)
                }
            })
            var to_dell_arr = a_delete;
            if (Number(answer.id) < 10000) {
                to_dell_arr.push({ id: answer.id, question_id: answer.question_id })
                if (a_create.some(function (el) { return el.id === answer.id })) {
                    this.setState({ a_create: a_create.filter(ans => ans.id !== answer.id) })
                } else {
                    this.setState({ a_update: a_update.filter(ans => ans.id !== answer.id) })
                }
            } else {
                if (a_create.some(function (el) { return el.id === answer.id })) {
                    this.setState({ a_create: a_create.filter(ans => ans.id !== answer.id) })
                } else {
                    this.setState({ a_update: a_update.filter(ans => ans.id !== answer.id) })
                }

            }
            this.setState({ changed: true, a_delete: to_dell_arr })
        }
    }

    //сохранить изменения вопроса в уроке
    saveQuestionChanges() {
        this.setState({ question_answers_error: [] }, () => {
            const { jwt, dispatch, setFieldValue, questions, setState, update, create } = this.props;
            const { id, question, question_type, lesson_id, answers } = this.state.editQuestion;
            const { question_id, question_answers_error, a_create, a_update, a_delete } = this.state;
            //Если поле ввода вопроса пустое
            if (question === '') {
                this.setState({ question_text_error: 'Это поле является обязательным для заполнения.' })
                answers.map((item, index) => (
                    item.answer === '' ?
                        (
                            question_answers_error.push('Это поле является обязательным для заполнения.'),
                            this.setState({ question_answers_error: question_answers_error })
                        ) : (
                            question_answers_error.push(''),
                            this.setState({ question_answers_error: question_answers_error })
                        )
                ))
                if (answers.length !== 0) {
                    //Если все поля ответов заполнены
                    if (question_answers_error.filter(i => i !== '').length === 0) {
                        //Если поле ввода вопроса пустое
                        if (question === '') {
                            this.setState({ question_text_error: 'Это поле является обязательным для заполнения.' })
                            //Если поле ввода вопроса не пустое
                        } else {
                            setFieldValue('lesson_questions', questions.map((q, i) => (q.id === id ? {
                                ...q,
                                question: question,
                                question_type: question_type,
                                answers: answers
                            } : q)))

                            this.setState({
                                changedQ: false,
                                editQuestion: '',
                                question_type: 'checkbox',
                                question_answers: [],
                                question_text_error: ''
                            })
                        }
                    }
                } else {
                    this.setState({ answers_error: 'Добавьте хотябы один ответ!' })
                }
                //Если поле ввода вопроса не пустое
            } else {
                if (answers.length !== 0) {
                    answers.map((item, index) => (
                        item.answer === '' ?
                            (
                                question_answers_error.push('Это поле является обязательным для заполнения.'),
                                this.setState({ question_answers_error: question_answers_error })
                            ) : (
                                question_answers_error.push(''),
                                this.setState({ question_answers_error: question_answers_error })
                            )
                    ))
                    //Если все поля ответов заполнены
                    if (question_answers_error.filter(i => i !== '').length === 0) {
                        setFieldValue('lesson_questions', questions.map((q, i) => (q.id === id ? {
                            ...q,
                            question: question,
                            question_type: question_type,
                            answers: answers
                        } : q)))

                        var to_update_arr = update;
                        if (!(to_update_arr.some(function (el) { return el.id === id }))) {
                            if (!(create.some(function (el) { return el.id === id }))) {
                                console.log(a_delete, a_update, a_create)
                                to_update_arr.push({
                                    id: id,
                                    question: question,
                                    question_type: question_type,
                                    answers: {
                                        delete: a_delete.filter(i => i.question_id === id),
                                        update: a_update.filter(i => i.question_id === id),
                                        create: a_create.filter(i => i.question_id === id)
                                    }
                                })
                            } else {
                                var to_create_arr = create;
                                to_create_arr = to_create_arr.map((q, i) => (q.id === id ? {
                                    ...q,
                                    question: question,
                                    question_type: question_type,
                                    answers: answers
                                } : q))

                                setState({ changed: true, create: to_create_arr });
                            }
                        } else {
                            to_update_arr = to_update_arr.map((q, i) => (q.id === id ? {
                                ...q,
                                question: question,
                                question_type: question_type,
                                answers: {
                                    delete: a_delete.filter(i => i.question_id === id),
                                    update: a_update.filter(i => i.question_id === id),
                                    create: a_create.filter(i => i.question_id === id)
                                }
                            } : q))

                        }

                        setState({ changed: true, update: to_update_arr });

                        this.setState({
                            changedQ: false,
                            editQuestion: '',
                            question_type: 'checkbox',
                            question_answers: [],
                            question_text_error: ''
                        })
                    }

                } else {
                    this.setState({ answers_error: 'Добавьте хотябы один ответ!' })
                }
            }
            console.log(question_answers_error)
        })

        // dispatch(questionActions.updateQuestion(jwt, id, question, question_type, lesson_id, current_answer, current_answer_too)).then(
        //     () => this.setState({changedQ: false, editQuestion: ''})
        // )
    }

    render() {
        const { questions, setFieldValue } = this.props;
        const { changedQ, addQuestion, question_text, question_text_error, question_type, question_answers, question_answers_error, answers_error, editQuestion } = this.state;
        return (
            <div>
                {questions && questions.map((question, index) => (
                    <div key={index} className='d-flex grid-direction-xs-column'>
                        <div className='d-flex grid-direction-xs-column'>
                            {question.id === editQuestion.id ?
                                <div>
                                    <Typography component="h5" variant="h5" >{'Вопрос:'}</Typography>
                                    <Divider />
                                    <TextInput
                                        value={editQuestion.question}
                                        id="question_text"
                                        name="question_text"
                                        label="Текст вопроса"
                                        type={'text'}
                                        variant={'outlined'}
                                        onChange={(event) => this.changeQestionText(event)}
                                        className='w-100 mb-3'
                                        helperText={
                                            question_text_error
                                                ? question_text_error
                                                : null
                                        }
                                    />

                                    <TextInput
                                        select
                                        defaultValue={editQuestion.question_type}
                                        id="question_type"
                                        name="question_type"
                                        label="Тип ответа"
                                        variant={'outlined'}
                                        onChange={(event) => this.changeQestionType(event)}
                                        InputProps={{
                                            endAdornment: (
                                                <ExpandMoreIcon />
                                            ),
                                        }}
                                        className='w-100 mb-3'
                                    >
                                        <SelectItem selectded={question_type === 'checkbox'} value={'checkbox'}>Несколько верных ответов</SelectItem>
                                        <SelectItem selectded={question_type === 'radio'} value={'radio'}>Один верный ответ</SelectItem>
                                        <SelectItem selectded={question_type === 'text'} value={'text'}>Текстовый ответ</SelectItem>
                                    </TextInput>
                                    <Divider />
                                    {editQuestion.answers && editQuestion.answers.length !== 0 &&
                                        <table className='w-100'>
                                            <tbody>
                                                <tr>
                                                    <th>Ответы</th>
                                                    <th className='text-align-end'>Правльный ответ</th>
                                                    <th className='text-align-end'>Действия</th>
                                                </tr>
                                                {editQuestion.answers.map((answer, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <TextInput
                                                                className='w-100 mb-3'
                                                                value={answer.answer}
                                                                id={"answer_" + (index + 1)}
                                                                name={"answer_" + (index + 1)}
                                                                label={"Ответ " + (index + 1)}
                                                                type={'text'}
                                                                variant={'outlined'}
                                                                onChange={(event) => this.changedAnswer(event, answer, index)}
                                                                helperText={
                                                                    question_answers_error !== undefined && question_answers_error.length !== 0
                                                                        ? question_answers_error[index]
                                                                        : null
                                                                }
                                                            />
                                                        </td>
                                                        <td className='text-align-end'>
                                                            {editQuestion.question_type === 'text' ?
                                                                answer.answer
                                                                :
                                                                <IconButton onClick={() => { this.changedQuestionCurrentAnswer(event, answer) }}>
                                                                    {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                </IconButton>
                                                            }
                                                        </td>
                                                        <td className='text-align-end'>
                                                            <IconButton onClick={() => this.deleteAnswer(answer)}>
                                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    }
                                    <Button fullWidth onPress={() => this.createAnswer()}>{'+'}</Button>
                                    <Divider />
                                    <div className='d-flex grid-justify-xs-space-between grid-align-items-xs-center'>
                                        <div>
                                            {answers_error !== '' && (
                                                <Alert className='error' severity="error">{answers_error}</Alert>
                                            )}
                                        </div>
                                        <div className='d-flex grid-justify-xs-flex-end'>
                                            <Button disabled={changedQ === false} onPress={() => this.saveQuestionChanges()} className='mr-3'>{'Сохранить вопрос'}</Button>
                                            <Button onPress={() => this.setState({ editQuestion: '' })}>{'Отмена'}</Button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='d-flex grid-justify-xs-space-between'>
                                        <Typography component="h5" variant="h5" className='mb-2' >{question.question}</Typography>
                                        <div>
                                            <IconButton onClick={() => this.selectQestion(question)}>
                                                <EditOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => this.deleteQuestion(question.id)}>
                                                <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className='d-flex grid-direction-xs-column ml-3 mr-3'>
                                        <table className='w-100'>
                                            <tbody>
                                                <tr>
                                                    <th>Ответы</th>
                                                    <th className='text-align-end'>Правльный ответ</th>
                                                </tr>

                                                {question.answers && question.answers.map((answer, index) => {

                                                    switch (question.question_type) {
                                                        case "checkbox":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <FormControlLabel
                                                                            className='w-max'
                                                                            control={
                                                                                <Checkbox
                                                                                    type="checkbox"
                                                                                    name={answer.id}
                                                                                    value={answer.answer}
                                                                                />
                                                                            }
                                                                            label={answer.answer}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        case "radio":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <FormControlLabel
                                                                            className='w-max'
                                                                            control={
                                                                                <Radio
                                                                                    name={answer.answer_name}
                                                                                    value={answer.answer}
                                                                                    onChange={() => { }}
                                                                                />
                                                                            }
                                                                            label={answer.answer}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        case "text":
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <TextInput
                                                                            className={'w-100'}
                                                                            type="text"
                                                                            label="Ответ"
                                                                            name={answer.answer_name}
                                                                            value={answer.answer}
                                                                            onChange={() => { }}
                                                                        />
                                                                    </td>
                                                                    <td className='text-align-end'>
                                                                        {answer.answer}
                                                                    </td>
                                                                </tr>
                                                            );

                                                        default:
                                                            return <div>Неизвестный тип ответа</div>
                                                    }

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                        <Divider />
                    </div>
                ))
                }
                {addQuestion === true ?
                    <div>
                        <Typography component="h5" variant="h5" >{'Вопрос:'}</Typography>
                        <Divider />
                        <TextInput
                            value={question_text}
                            id="question_text"
                            name="question_text"
                            label="Текст вопроса"
                            type={'text'}
                            autoComplete="lesson_videolink"
                            variant={'outlined'}
                            onChange={(event) => this.changeQestionText(event)}
                            className='w-100 mb-3'
                            helperText={
                                question_text_error
                                    ? question_text_error
                                    : null
                            }
                        />

                        <TextInput
                            select
                            defaultValue={question_type}
                            id="question_type"
                            name="question_type"
                            label="Тип ответа"
                            variant={'outlined'}
                            onChange={(event) => this.changeQestionType(event)}
                            InputProps={{
                                endAdornment: (
                                    <ExpandMoreIcon />
                                ),
                            }}
                            className='w-100 mb-3'
                        >
                            <SelectItem selectded={editQuestion.question_type === 'checkbox'} value={'checkbox'}>Несколько верных ответов</SelectItem>
                            <SelectItem selectded={editQuestion.question_type === 'radio'} value={'radio'}>Один верный ответ</SelectItem>
                            <SelectItem selectded={editQuestion.question_type === 'text'} value={'text'}>Текстовый ответ</SelectItem>
                        </TextInput>
                        {question_answers && question_answers.length !== 0 &&
                            <table className='w-100'>
                                <tbody>
                                    <tr>
                                        <th className='pb-2'>Ответы</th>
                                        <th className='text-align-end pb-2'>Правльный ответ</th>
                                        <th className='text-align-end pb-2'>Действия</th>
                                    </tr>
                                    {question_answers.map((answer, index) => (
                                        <tr key={index}>
                                            <td>
                                                <TextInput
                                                    className='w-100 mb-3'
                                                    value={answer.answer}
                                                    id={"answer_" + (index + 1)}
                                                    name={"answer_" + (index + 1)}
                                                    label={"Ответ " + (index + 1)}
                                                    type={'text'}
                                                    variant={'outlined'}
                                                    onChange={(event) => this.changedAnswer(event, answer, index)}
                                                    helperText={
                                                        question_answers_error !== undefined && question_answers_error.length !== 0
                                                            ? question_answers_error[index]
                                                            : null
                                                    }
                                                />
                                            </td>
                                            <td className='text-align-end'>
                                                {question_type === 'text' ?
                                                    answer.answer
                                                    :
                                                    <IconButton onClick={() => { this.changedQuestionCurrentAnswer(event, answer) }}>
                                                        {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                                    </IconButton>
                                                }
                                            </td>
                                            <td className='text-align-end'>
                                                <IconButton onClick={() => this.deleteAnswer(answer)}>
                                                    <DeleteForeverOutlinedIcon className='danger-area-title-icon' />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                        <Button fullWidth onPress={() => this.createAnswer()}>{'+'}</Button>
                        <Divider />
                        <div className='d-flex grid-justify-xs-space-between grid-align-items-xs-center'>
                            <div>
                                {answers_error !== '' && (
                                    <Alert className='error' severity="error">{answers_error}</Alert>
                                )}
                            </div>
                            <div className='d-flex grid-justify-xs-flex-end '>
                                <Button disabled={!changedQ} onPress={() => this.createQestion()} className='mr-3'>{'Добавить вопрос'}</Button>
                                <Button onPress={() => this.setState({ editQuestion: '', addQuestion: false })}>{'Отмена'}</Button>
                            </div>
                        </div>

                        <Divider />
                    </div>
                    : <Button onPress={() => this.setState({ addQuestion: true, editQuestion: '', question_id: getRandomInt(10000, 100000) })}>{'Добавить вопрос'}</Button>}

            </div >
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

const connectedCreateTestPlane = connect(mapStateToProps)(CreateTestPlane);
export { connectedCreateTestPlane as CreateTestPlane };