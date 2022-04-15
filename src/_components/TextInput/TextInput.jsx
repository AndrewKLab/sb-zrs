import React, { useRef, useState, useEffect } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const TextInput = ({ helperText, variant, id, name, autoComplete, label, labelFor, onChange, onSelect, className, type, InputProps, fullWidth, reff, select, defaultValue, children, multiline, rows, value, files }) => {
    const ref = useRef();
    let curRef = reff !== undefined ? reff : ref
    let styleClass = className == undefined ? '' : ' ' + className;
    var styleAlert;
    let styleVariant = variant === undefined ? 'default' : variant;
    let variants;
    let selectType = select === undefined ? false : true;
    let textareaType = multiline === undefined ? false : true;
    let inputType;
    let inputProps = null;
    if (selectType) {
        inputType = 'select'
        if (!InputProps) {
            inputProps = {
                endAdornment: (
                    <ExpandMoreIcon />
                ),
                endAdornmentClass: 'select-arrow'
            }
        }
    }
    else if (textareaType) inputType = 'textarea'
    else if (type === 'file') inputType = 'file';
    else inputType = 'default'


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

    const [styleFocused, setStyleFocused] = useState('');

    const [styleLegendFocused, setStyleLegendFocused] = useState(
        InputProps !== undefined && InputProps.startAdornment !== undefined ?
            ' text-input-label-plane-focused'
            :
            value !== undefined && value !== '' ?
                ' text-input-label-plane-focused'
                :
                '');
    const [styleLabelFocused, setStyleLabelFocused] = useState(
        InputProps !== undefined && InputProps.startAdornment !== undefined ?
            ' text-input-label-focused'
            :
            value !== undefined && value !== '' ?
                ' text-input-label-focused'
                :
                ''
    );
    const [styleFocusedColor, setStyleFocusedColor] = useState('');
    const [styleHovered, setStyleHovered] = useState('');
    const [styleLabelFocusedColor, setStyleLabelFocusedColor] = useState('');

    var fullWidthStyle = fullWidth === true ? ' w-100' : '';
    const onFocus = () => {
        setStyleFocused(' text-input-' + variants + '-focused');
        setStyleLegendFocused(' text-input-label-plane-focused')
        setStyleLabelFocused(' text-input-label-focused');
        setStyleFocusedColor(' text-input-' + variants + '-focused-color');
        setStyleLabelFocusedColor(' text-input-label-focused-color');
    }

    const change = (event) => {
        if (value !== undefined && value !== '') {
            setStyleLabelFocused(' text-input-label-focused');
            setStyleLegendFocused(' text-input-label-plane-focused')
        } else {
            if (InputProps !== undefined && InputProps.startAdornment !== undefined) {
                setStyleLabelFocused(' text-input-label-focused');
                setStyleLegendFocused(' text-input-label-plane-focused')
            } else {
                setStyleLabelFocused('');
                setStyleLegendFocused('')
            }
        }
    }

    useEffect(() => {

        ref && ref.current && ref.current.addEventListener('change', change);

        return () => {
            ref && ref.current && ref.current.removeEventListener('change', change);
        };
    }, [change]);

    const onBlur = (event) => {
        setStyleFocused('');
        setStyleLegendFocused(
            (InputProps !== undefined ? InputProps.startAdornment !== undefined : false) ||
                event.target.value !== '' ?
                ' text-input-label-plane-focused' : '');
        setStyleLabelFocused(
            (InputProps !== undefined ? InputProps.startAdornment !== undefined : false) ||
                event.target.value !== '' ?
                ' text-input-label-focused' : '');
        setStyleFocusedColor('');
        setStyleLabelFocusedColor('');

    }

    const onMouseEnter = () => {
        setStyleHovered(' text-input-' + variants + '-hovered');
    }

    const onMouseLeave = () => {
        setStyleHovered('');
    }

    if (helperText) {
        styleAlert = ' text-input-danger'
    } else {
        styleAlert = ''
    }

    switch (inputType) {
        case 'default':
            return (
                <div className={'text-input-group' + styleClass + fullWidthStyle}>
                    <label className={"text-input-" + styleVariant} >
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
                                ref={curRef}
                                id={id}
                                name={name}
                                autoComplete={autoComplete}
                                type={type}
                                value={value}
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            />
                            <label className={"text-input-label" + styleAlert + styleLabelFocused + styleLabelFocusedColor}>{label}</label>
                            {variants === 'fieldset' &&
                                <fieldset className={"text-input-filed" + styleHovered + styleFocused + styleFocusedColor + styleAlert} aria-hidden="true">
                                    <legend className={"text-input-label-plane " + styleLegendFocused} ><span>{label}</span></legend>
                                </fieldset>
                            }

                            <div className={'text-input-' + variants + '' + styleFocused + styleFocusedColor + styleAlert}></div>
                            {InputProps ?
                                (
                                    InputProps.endAdornment && <div
                                        className='text-input-end-adornment'
                                    >
                                        {InputProps.endAdornment}
                                    </div>
                                ) : (null)
                            }
                        </div>
                        {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
                    </label>
                </div>
            )
        case 'textarea':
            return (
                <div className={'text-input-group' + styleClass + fullWidthStyle}>
                    <label className={"text-input-" + styleVariant} >
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

                            <textarea
                                ref={curRef}
                                id={id}
                                name={name}
                                value={value}
                                rows={rows}
                                autoComplete={autoComplete}
                                type={type}
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            ></textarea>
                            <label className={"text-input-label" + styleAlert + styleLabelFocused + styleLabelFocusedColor}>{label}</label>
                            {variants === 'fieldset' &&
                                <fieldset className={"text-input-filed" + styleHovered + styleFocused + styleFocusedColor + styleAlert} aria-hidden="true">
                                    <legend className={"text-input-label-plane " + styleLegendFocused} ><span>{label}</span></legend>
                                </fieldset>
                            }

                            <div className={'text-input-' + variants + '' + styleFocused + styleFocusedColor + styleAlert}></div>
                            {InputProps == undefined ? (null) : (
                                InputProps.endAdornment && <div
                                    className='text-input-end-adornment'
                                >
                                    {InputProps.endAdornment}
                                </div>)}
                        </div>
                        {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
                    </label>
                </div>
            )
        case 'select':
            return (
                <div className={'text-input-group' + styleClass + fullWidthStyle}>
                    <label className={"text-input-" + styleVariant} >
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

                            <select
                                ref={curRef}
                                id={id}
                                name={name}
                                defaultValue={defaultValue}
                                autoComplete={autoComplete}
                                type={type}
                                onChange={onChange}
                                onSelect={onSelect}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            >
                                {children}
                            </select>
                            <label className={"text-input-label text-input-label-focused" + styleLabelFocusedColor}>{label}</label>
                            {variants === 'fieldset' &&
                                <fieldset className={"text-input-filed" + styleHovered + styleFocused + styleFocusedColor + styleAlert} aria-hidden="true">
                                    <legend className={"text-input-label-plane text-input-label-plane-focused" + styleLegendFocused} ><span>{label}</span></legend>
                                </fieldset>
                            }

                            <div className={'text-input-' + variants + '' + styleFocused + styleFocusedColor + styleAlert}></div>
                            {InputProps ?
                                (
                                    InputProps.endAdornment && <div
                                        className='text-input-end-adornment'
                                    >
                                        {InputProps.endAdornment}
                                    </div>
                                ) : (
                                    inputProps ? inputProps.endAdornment && <div
                                        className={`${inputProps.endAdornmentClass} text-input-end-adornment`}
                                    >
                                        {inputProps.endAdornment}
                                    </div> : (null)
                                )}
                        </div>
                        {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
                    </label>
                </div>
            )
        case 'file':
            return (
                <div className={'text-input-group' + styleClass + fullWidthStyle}>
                    <label className={"text-input-" + styleVariant} >
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
                                className="file-input"
                                ref={curRef}
                                id={id}
                                name={name}
                                autoComplete={autoComplete}
                                type={type}
                                value={value}
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            />
                            <label for={labelFor} className={"file-input-label"}>
                                <span>{files ? files : 'Выберите файлы...'}</span>
                            </label>
                            <label className={"text-input-label" + styleAlert + ' text-input-label-focused' + styleLabelFocusedColor}>{label}</label>
                            {variants === 'fieldset' &&
                                <fieldset className={"text-input-filed" + styleHovered + styleFocusedColor + styleAlert} aria-hidden="true">
                                    <legend className={"text-input-label-plane text-input-label-plane-focused"} ><span>{label}</span></legend>
                                </fieldset>
                            }

                            <div className={'text-input-' + variants + '' + ` text-input-${variants}-focused` + styleFocusedColor + styleAlert}></div>
                            {InputProps ?
                                (
                                    InputProps.endAdornment && <div
                                        className='text-input-end-adornment'
                                    >
                                        {InputProps.endAdornment}
                                    </div>
                                ) : (null)
                            }
                        </div>
                        {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
                    </label>
                </div>
            )
        default:
            return null;
    }
}
