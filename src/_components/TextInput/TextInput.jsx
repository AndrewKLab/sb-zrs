import React from "react";

export class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            focused: false,
            focusedVisoutColor: this.props.InputProps == undefined ? (false) : (this.props.InputProps.startAdornment !== undefined ? true : false),
            hovered: false,
            focusedColor: false
        }
        this.myRef = React.createRef()
    }


    onFocus() {
        this.setState({ focused: true, focusedColor: true })
    }

    onBlur() {
        const { value } = this.myRef.current;
        this.setState({ focusedColor: false })
        if (value === '') {
            this.setState({ focused: false })
        } else {
            this.setState({ focused: true })
        }
    }

    onMouseEnter() {
        this.setState({ hovered: true })
    }

    onMouseLeave() {
        this.setState({ hovered: false })
    }

    render() {
        const { helperText, id, name, autoComplete, label, onChange, className, type, InputProps, fullWidth } = this.props;
        const { focused, focusedVisoutColor, focusedColor, hovered } = this.state;
        var styleClass;
        var styleAlert;

        var styleFocused;
        var styleFocusedColor;
        var styleHovered;
        var styleLabelFocused;
        var styleLabelFocusedColor;
        var fullWidthStyle = fullWidth === true ? ' w-100' : '';


        if (className) {
            styleClass = ' ' + className
        } else {
            styleClass = ''
        }

        if (helperText) {
            styleAlert = ' text-input-danger'
        } else {
            styleAlert = ''
        }

        switch (hovered) {
            case true:
                styleHovered = ' text-input-fieldset-hovered'
                break;
            case false:
                styleHovered = ''
                break;

            default:
                styleHovered = ''
                break;
        }

        switch (focusedVisoutColor) {
            case true:
                switch (focused) {
                    case true:
                        styleFocused = ' text-input-fieldset-focused';
                        styleLabelFocused = ' text-input-label-focused';
                        styleFocusedColor = focusedColor === false ? '' : ' text-input-fieldset-focused-color';
                        styleLabelFocusedColor = focusedColor === false ? '' : ' text-input-label-focused-color';
                        break;

                    case false:
                        styleFocused = hovered === true ? '' : ' text-input-fieldset-focused';
                        styleLabelFocused = ' text-input-label-focused';
                        styleFocusedColor = '';
                        styleLabelFocusedColor = '';
                        break;

                    default: false
                        break;
                }
                break;
            case false:
                switch (focused) {
                    case true:
                        styleFocused = ' text-input-fieldset-focused';
                        styleLabelFocused = ' text-input-label-focused';
                        styleFocusedColor = focusedColor === false ? '' : ' text-input-fieldset-focused-color';
                        styleLabelFocusedColor = focusedColor === false ? '' : ' text-input-label-focused-color';
                        break;

                    case false:
                        styleFocused = '';
                        styleLabelFocused = '';
                        styleFocusedColor = '';
                        styleLabelFocusedColor = '';
                        break;

                    default: false
                        break;
                }
                break;

            default: false
                break;
        }

        return (
            <div className={'text-input-group' + styleClass + fullWidthStyle}>
                <label className="text-input-outlined" >
                    <div className={'text-input'}>
                        {InputProps == undefined ? (null) : (
                            InputProps.startAdornment &&
                            <div
                                className='text-input-start-adornment'
                                onMouseEnter={this.onMouseEnter}
                                onMouseLeave={this.onMouseLeave}
                            >
                                {InputProps.startAdornment}
                            </div>)}

                        <input
                            ref={this.myRef}
                            id={id}
                            name={name}
                            autoComplete={autoComplete}
                            type={type}
                            onChange={onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                        />
                        <span className={"text-input-label" + styleAlert + styleLabelFocused + styleLabelFocusedColor}>{label}</span>
                        <div className={'text-input-fieldset' + styleHovered + styleFocused + styleFocusedColor + styleAlert}></div>
                        {InputProps == undefined ? (null) : (
                        InputProps.endAdornment && <div
                            className='text-input-end-adornment'
                            onMouseEnter={this.onMouseEnter}
                            onMouseLeave={this.onMouseLeave}
                        >
                            {InputProps.endAdornment}
                        </div>)}
                    </div>
                    {helperText && <span className={"text-input-helper" + styleAlert}>{helperText}</span>}
                </label>
            </div>
        );
    }
}
