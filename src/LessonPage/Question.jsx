import React, { useState } from 'react'
import {Typography} from '../_components'
import {Answer} from './'

export const Question = ({question, key, children}) => {
    const [selected, setSelected] = useState('');
    return (
        <div key={key}>
            <Typography component="h6" variant="h6">{question.question}</Typography>
            <div className='d-flex grid-direction-xs-column'>
            {question.answers.map((answer, index) => (
                <Answer key={index} selected={selected} setSelected={setSelected} answer={answer} questionType={question.question_type}/>
            ))}
            </div>
        </div>
    )
}


