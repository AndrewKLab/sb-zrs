import React, { useRef, useState, useEffect } from "react";

export const TextInput = ({ helperText, variant, id, name, autoComplete, label, onChange, className, type, InputProps, fullWidth, }) => {
    const ref = useRef();
    let styleClass = className == undefined ? '' : ' ' + className;
    var styleAlert;
    let styleVariant = variant === undefined ? 'default' : variant;
    let variants;
    switch (styleVariant) {
        case 'default':
            variants = 'line'
            break;
        case 'filed':
            variants = 'line'
            break;
        case 'outlined':
            variants = 'fieldset'
            break;

        default:
            variants = 'line'
            break;
    }

    const [styleFocused, setStyleFocused] = useState(InputProps !== undefined ? InputProps.startAdornment !== undefined ? ' text-input-'+variants+'-focused' : '' : '');
    const [styleLabelFocused, setStyleLabelFocused] = useState(InputProps !== undefined ? InputProps.startAdornment !== undefined ? ' text-input-label-focused' : '' : '');
    const [styleFocusedColor, setStyleFocusedColor] = useState('');
    const [styleHovered, setStyleHovered] = useState('');
    const [styleLabelFocusedColor, setStyleLabelFocusedColor] = useState('');

    var fullWidthStyle = fullWidth === true ? ' w-100' : '';

    const onFocus = () => {
        setStyleFocused(' text-input-'+variants+'-focused');
        setStyleLabelFocused(' text-input-label-focused');
        setStyleFocusedColor(' text-input-'+variants+'-focused-color');
        setStyleLabelFocusedColor(' text-input-label-focused-color');
    }

    const change = () => {
        if (ref.current !== undefined) {
            if (ref.current.value !== '') {
                setStyleFocused(' text-input-'+variants+'-focused');
                setStyleLabelFocused(' text-input-label-focused');
                setStyleFocusedColor('');
                setStyleLabelFocusedColor('');
            }
        }
    }

    useEffect(() => {
        window.addEventListener('change', change);

        return () => {
            window.removeEventListener('change', change);
        };
    }, [change]);




    const onBlur = () => {
        setStyleFocused(
            InputProps !== undefined ? InputProps.startAdornment !== undefined ||
                ref.current.value !== ''
                ? ' text-input-'+variants+'-focused' : '' : '');
        setStyleLabelFocused(
            InputProps !== undefined ? InputProps.startAdornment !== undefined ||
                ref.current.value !== '' ?
                ' text-input-label-focused' : '' : '');
        setStyleFocusedColor('');
        setStyleLabelFocusedColor('');
    }

    const onMouseEnter = () => {
        setStyleHovered(' text-input-'+variants+'-hovered');
    }

    const onMouseLeave = () => {
        setStyleHovered('');
    }

    if (helperText) {
        styleAlert = ' text-input-danger'
    } else {
        styleAlert = ''
    }

    return <div className={'text-input-group' + styleClass + fullWidthStyle}>
    <label className={"text-input-"+styleVariant} >
        <div className={'text-input'}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {InputProps == undefined ? (null) : (
                InputProps.startAdornment &&
                <div
                    className='text-input-start-adornment'
                >
                    {InputProps.startAdornment}
                </div>)}

            <input
                ref={ref}
                id={id}
                name={name}
                autoComplete={autoComplete}
                type={type}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <span className={"text-input-label" + styleAlert + styleLabelFocused + styleLabelFocusedColor}>{label}</span>
            <div className={'text-input-'+variants+'' + styleHovered + styleFocused + styleFocusedColor + styleAlert}></div>
            {InputProps == undefined ? (null) : (
                InputProps.endAdornment && <div
                    className='text-input-end-adornment'
                >
                    {InputProps.endAdornment}
                </div>)}
        </div>
        {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
    </label>
</div>;
}
