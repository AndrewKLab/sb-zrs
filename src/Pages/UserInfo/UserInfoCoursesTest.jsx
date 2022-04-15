import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { FormControlLabel, Checkbox, Radio, TextInput, Typography, Switch, ListItemFirstAction, IconButton, Menu, MenuItem, Alert, Table, Row, HeaderCell, Cell } from '../../_components'
import { ProgressCircle } from '../../LessonPage'
import { UserInfoCoursesTestCurrentAnswer } from './';


const UserInfoCoursesTest = ({ index, questions }) => {
    return (
        <Table
            sm
            header={
                <Row>
                    <HeaderCell>Вопрос</HeaderCell>
                    <HeaderCell>Ответ</HeaderCell>
                    <HeaderCell>Верный ответ</HeaderCell>
                    <HeaderCell>Ответ Пользователя</HeaderCell>
                </Row>
            }>
            {questions.map((question, index) =>
                question && question.answers && question.answers.length > 0 ?
                    question.answers.map((answer, index) => {
                        return <Row key={index} className={index === question.answers.length - 1 ? 'border-bottom-1' : undefined}>
                            {index === 0 &&
                                <HeaderCell className={'text-center'} rowSpan={question.answers.length}>
                                    {question.question}
                                </HeaderCell>
                            }

                            {question.question_type === 'checkbox' && (
                                <React.Fragment>
                                    <Cell>
                                        <FormControlLabel
                                            className={'m-0'}
                                            control={
                                                <Checkbox
                                                    disabled
                                                    type="checkbox"
                                                    name={answer.answer_id}
                                                    value={answer.answer}
                                                />
                                            }
                                            label={answer.answer}
                                        />
                                    </Cell>
                                    <Cell className='text-center'>
                                        {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                    </Cell>
                                    <Cell className='text-center'>
                                        <UserInfoCoursesTestCurrentAnswer question={question} answer={answer} />
                                    </Cell>
                                </React.Fragment>
                            )}
                            {question.question_type === 'radio' && (
                                <React.Fragment>
                                    <Cell>
                                        <FormControlLabel
                                            className={'m-0'}
                                            control={
                                                <Radio
                                                    disabled
                                                    name={'answer_' + answer.id}
                                                    value={answer.answer}
                                                />
                                            }
                                            label={answer.answer}
                                        />
                                    </Cell>
                                    <Cell className='text-center'>
                                        {answer.current !== '0' ? (<DoneIcon className='done-area-title-icon' />) : (<CloseIcon className='danger-area-title-icon' />)}
                                    </Cell>
                                    <Cell className='text-center'>
                                        <UserInfoCoursesTestCurrentAnswer question={question} answer={answer} />
                                    </Cell>
                                </React.Fragment>
                            )}
                            {question.question_type === 'text' && (
                                <React.Fragment>
                                    <Cell colSpan={2}></Cell>
                                    <Cell className='text-center'>
                                        <UserInfoCoursesTestCurrentAnswer question={question} answer={answer} />
                                    </Cell>
                                </React.Fragment>
                            )}
                        </Row>
                    })
                    :
                    <tr><Cell><Alert>К этому вопросу нет ответов!</Alert></Cell></tr>

            )}
        </Table>



    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUserInfoCoursesTest = connect(mapStateToProps)(UserInfoCoursesTest);
export { connectedUserInfoCoursesTest as UserInfoCoursesTest };