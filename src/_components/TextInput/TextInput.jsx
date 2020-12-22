
import React from "react";

export const TextInput = ({helperText, id, name, autoComplete, label, onChange, className, type, InputProps }) => {
    var styleClass;
    var styleAlert;
    var TextInputComponent;
    console.log(InputProps)
    if (className) {
        styleClass = ' ' + className
    } else {
        styleClass = ''
    }

    if(helperText){
        styleAlert = ' text-input-danger'
    } else {
        styleAlert= ''
    }

    return (
        <div className={'text-input-group'+ styleClass}>
            <label className="text-input-outlined" >
                <div className={'text-input'}>
                    <div className={'text-input-components'}>
                    <input id={id} name={name} autoComplete={autoComplete} type={type} onChange={onChange} className={styleAlert}/>
                    {InputProps.endAdornment}
                    </div>
                    <span className={"text-input-label"+ styleAlert}>{label}</span>
                </div>
                {helperText && <span className={"text-input-helper"+ styleAlert}>{helperText}</span>}
            </label>
        </div>
    )
};
