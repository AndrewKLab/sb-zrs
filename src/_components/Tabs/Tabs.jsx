import React, { useState, useEffect } from 'react'


export const Tabs = ({ children, name, avatar, status, onClick, tab, onChange }) => {
    const [width, setWidth] = useState();
    const [left, setLeft] = useState();


    const setTabActive = (event) => {
        setWidth(event.target.offsetWidth);
        setLeft(event.target.offsetLeft);
        onChange(event)
    }
    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { setTabActive: setTabActive, setWidthF: setWidth, setLeftF: setLeft, tab: tab })
    );
    return (
        <div className='tabs'>
            <div className='tabs-wraper'>
                {childrenWithProps}
                <span className='tabs-indicator' style={{ width: width, left: left }}></span>
            </div>
        </div>
    )
}


