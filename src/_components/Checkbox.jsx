
import React from "react";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const Checkbox = ({ children, placeholder, checked, name, value, reff, onChange, className, disabled }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    let checkboxName = name == undefined ? '' : name;
    let chekedIcon;
    
    switch (checked) {
        case true:
            chekedIcon = <CheckBoxIcon />
            break;
        case false:
            chekedIcon = <CheckBoxOutlineBlankIcon />
            break;
        default:
            chekedIcon = <CheckBoxOutlineBlankIcon />
            break;
    }

    return (
        <div className={"checkbox" + styleClass}>
            <input
                type="checkbox"
                placeholder={placeholder}
                checked={checked}
                name={name}
                value={value}
                ref={reff}
                onChange={onChange}
                disabled={disabled}
                />
            {chekedIcon}
        </div>
    );
};
