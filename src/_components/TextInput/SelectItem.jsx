import React from 'react'

export const SelectItem = ({className, children, value, selectded}) => {
    let styleClass = className == undefined ?  '' : ' '+className;
    return (
        <option value={value} selected={selectded} className={'text-input-option'+styleClass}>
            {children}
        </option>
    )
}


