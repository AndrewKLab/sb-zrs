import React, { useState } from 'react'
import { TextInput, Checkbox, FormControlLabel, Radio } from '../_components'

export const Answer = ({ question_type, answer, values, handleChange, setFieldValue }) => {
    switch (question_type) {
        case "checkbox":
            const [checked, setChecked] = useState(false);
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            type="checkbox"
                            placeholder={answer.name}
                            checked={checked}
                            name={answer.question_id}
                            value={answer.id}
                            onChange={e => {
                                setChecked(e.target.checked)                            
                                if (e.target.checked) {
                                    values[answer.question_id].push(answer.id);
                                } else {
                                  const idx = values[answer.question_id].indexOf(answer.id);
                                  values[answer.question_id].splice(idx,1);
                                }
                              }}
                        />
                    }
                    label={answer.answer}
                />
            );
        case "radio":
            return (
                <FormControlLabel
                    control={
                        <Radio
                            name={answer.question_id}
                            value={answer.id}
                            selected={values[answer.question_id] === answer.id}
                            onChange={() => setFieldValue(answer.question_id, answer.id)}
                        />
                    }
                    label={answer.answer}
                />
            );
        case "text":
            return (
                <TextInput
                    className={'w-100'}
                    type="text"
                    label="Ответ"
                    name={answer.question_id}
                    onChange={handleChange}
                />
            );

        default:
            return <div>Неизвестный тип ответа</div>
    }
}


