import React from 'react'

export const SelectItem = ({className, children, value}) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <option value={value} className={'text-input-option'+styleClass}>
            {children}
        </option>
    )
}


