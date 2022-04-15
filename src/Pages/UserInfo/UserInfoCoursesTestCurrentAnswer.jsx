import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { FormControlLabel, Checkbox, Radio, TextInput, Typography, Switch, ListItemFirstAction, IconButton, Menu, MenuItem, Alert, Table, Row, HeaderCell, Cell } from '../../_components'
import { ProgressCircle } from '../../LessonPage'
import { userActions } from '../../_actions';


const UserInfoCoursesTestCurrentAnswer = ({ dispatch, jwt, question, answer }) => {
    return (
        answer.uqa_id &&
        <React.Fragment>
            {question.question_type === 'text' ? <Typography>{answer.uqa_user_answer}</Typography> : <DoneIcon className='done-area-title-icon' />}

            {question.question_type === 'text' &&
                <div className='center gap-3'>
                    <Typography component='body' variant='body' className={'m-0 p-0'}>Верно?</Typography>
                    <Typography component='strong' variant='strong' className={'text-danger'}>Нет</Typography>
                    <Switch className='toggle-switch-sm m-0' isToggled={answer.uqa_current === "1"} onToggle={() => dispatch(userActions.updateUserQuestionAnswer(jwt, { ...answer, uqa_current: answer.uqa_current === "1" ? 0 : 1 }))} />
                    <Typography component='strong' variant='strong' className={'text-success'}>Да</Typography>
                </div>
            }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUserInfoCoursesTestCurrentAnswer = connect(mapStateToProps)(UserInfoCoursesTestCurrentAnswer);
export { connectedUserInfoCoursesTestCurrentAnswer as UserInfoCoursesTestCurrentAnswer };