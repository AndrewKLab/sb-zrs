import React from 'react'

export const SelectItem = ({className, children, value, selected, disabled}) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <option value={value} className={'text-input-option'+styleClass} selected={selected} disabled={disabled}>
            {children}
        </option>
    )
}


