import React from "react";

export class ListItem extends React.Component {
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
        const { className, children, button, onPress } = this.props;
        let styleClass = className == undefined ? '' : ' ' + className;
        var listItem;
        switch (button) {
            case true:
                listItem = (
                    <button role="button" ref={this.ButtonRef} className={'list-item list-item-button list-item-ripple' + styleClass} onClick={onPress}>
                        {children}
                        <div className="rippleContainer" onMouseDown={this.showRipple} >
                            {this.renderRippleSpan()}
                        </div>
                    </button>
                )
                break;
            case false:
                listItem = <div className={'list-item' + styleClass}>{children}</div>
                break;
            default:
                listItem = <div className={'list-item' + styleClass}>{children}</div>
                break;
        }
        return listItem;
    }
}


