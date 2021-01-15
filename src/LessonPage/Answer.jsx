import React, { useState } from 'react'
import { TextInput, Checkbox, FormControlLabel, Radio } from '../_components'

export const Answer = ({ question_type, answer, register, selected, setSelected }) => {
    switch (question_type) {
        case "checkbox":
            const [checked, setChecked] = useState(false);
            return (
                <FormControlLabel
                    className='w-max'
                    control={
                        <Checkbox
                            type="checkbox"
                            placeholder={answer.name}
                            checked={checked}
                            name={answer.question_id}
                            value={answer.id}
                            reff={register}
                            onChange={() => setChecked(!checked)}
                        />
                    }
                    label={answer.answer}
                />
            );
        case "radio":
            return (
                <FormControlLabel
                    className='w-max'
                    control={
                        <Radio
                            name={answer.question_id}
                            value={answer.id}
                            reff={register}
                            selected={selected}
                            onChange={setSelected}
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
                    reff={register}
                />
            );

        default:
            return <div>Неизвестный тип ответа</div>
    }
}


