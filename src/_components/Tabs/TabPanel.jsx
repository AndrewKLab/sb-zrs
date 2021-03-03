import React from 'react'

export const TabPanel = ({ children, index, tab }) => {
    if (index == tab) {
        return (
            <div>
                {children}
            </div>
        )
    } else {
        return null;
    }
}


