import React from "react";

export class Button extends React.Component {
    constructor(props) {
        super(props)
        this.bounce;
        this.ButtonRef = React.createRef();
    }
    initializeState = () => {
        return {
            spanStyles: {},
            count: 0
        }
    }
    state = this.initializeState();

    /* Debounce Code to call the Ripple removing function */
    callCleanUp = () => {
        clearTimeout(this.bounce);
        this.bounce = setTimeout(() => {
            this.cleanUp();
        }, 2000);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.callCleanUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.callCleanUp);
    }


    showRipple = (e) => {
        const rippleContainer = e.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = e.pageX - pos.x - (size / 2);
        const y = e.pageY - pos.y - (size / 2);

        const spanStyles = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const count = this.state.count + 1;
        this.setState({
            spanStyles: { ...this.state.spanStyles, [count]: spanStyles },
            count: count
        });
    }

    cleanUp = () => {
        const initialState = this.initializeState();
        this.setState({ ...initialState });
    }

    renderRippleSpan = () => {
        const { showRipple = false, spanStyles = {} } = this.state;
        const spanArray = Object.keys(spanStyles);
        if (spanArray && spanArray.length > 0) {
            return (
                spanArray.map((key, index) => {
                    return <span key={'spanCount_' + index} className="" style={{ ...spanStyles[key] }}></span>
                })
            )
        } else {
            return null;
        }
    }

    render() {
        const { type, children = null, className, variant, onPress, fullWidth, disabled } = this.props;
        let buttonType;
        let styleClass;
        let styleVariant;
        let styleDisabled;
        let fullWidthStyle = fullWidth === true ? ' w-100' : '';

        switch (disabled) {
            case true:
                styleDisabled = ' button-disabled'
                break;
            case false:
                styleDisabled = ''
                break;
            default:
                styleDisabled = ''
                break;
        }

        switch (variant) {
            case 'contained':
                styleVariant = ' button-contained '
                break;
            case 'outlined':
                styleVariant = ' button-outlined '
                break;
            default:
                styleVariant = ' button-contained '
                break;
        }

        switch (type) {
            case 'button':
                buttonType = 'button'
                break;
            case 'reset':
                buttonType = 'reset'
                break;
            case 'submit':
                buttonType = 'submit'
                break;
            default:
                buttonType = 'button'
                break;
        }

        if (className) {
            styleClass = className
        } else {
            styleClass = ''
        }
        return (
            <button type={buttonType} ref={this.ButtonRef} className={'button ripple' + styleVariant + styleClass + fullWidthStyle+styleDisabled} disabled={disabled} onClick={onPress}>
                {children}
                <div className="rippleContainer" onMouseDown={this.showRipple} >
                    {this.renderRippleSpan()}
                </div>
            </button>
        );
    }
}