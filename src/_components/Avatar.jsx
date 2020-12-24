
import React from "react";

export const Avatar = ({ children, alt, src, className }) => {
    let styleClass;

    if (className) {
        styleClass = ' '+className
    } else {
        styleClass = ''
    }

    return (
            <div className={'avatar' + styleClass}>
                {children}
                {src && <img alt={alt} src={src} className="avatar-img"/>}
            </div>
    );
};
