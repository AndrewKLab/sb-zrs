import React from "react";

const styleRipple = {
    position: 'relative',
    overflow: 'hidden'
};
const styleRippleContainer = {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0'
}
const styleSpan = {
    transform: 'scale(0)',
    borderRadius: '100%',
    position: 'absolute',
    opacity: '0.75',
    backgroundColor: '#ffffff',
    animation: 'ripple 850ms'
}


export class Button extends React.Component {
    constructor(props) {
        super(props)
        this.bounce;
    }
    initializeState = () => {
        return {
            spanStyles: {},
            count: 0
        }
    }
    state = this.initializeState();

    /* Debounce Code to call the Ripple removing function */
    callCleanUp = (cleanup, delay) => {
        clearTimeout(this.bounce);
        this.bounce = setTimeout(() => {
            cleanup();
        }, delay);
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
        const { type, children = null, className, variant, onPress = null } = this.props;
        let buttonType;
        let styleClass;
        let styleVariant;

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
            styleClass =  className
        } else {
            styleClass = ''
        }
        return (
            <button type={buttonType} ref="targetElement" className={'button ripple' + styleVariant + styleClass} onClick={onPress}>
                {children}
                <div className="rippleContainer" onMouseDown={this.showRipple} onMouseUp={this.callCleanUp(this.cleanUp, 2000)} >
                    {this.renderRippleSpan()}
                </div>
            </button>
        );
    }
}