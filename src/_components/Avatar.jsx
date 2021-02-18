import React from "react";

export const Avatar = ({ children, alt, src, className }) => {
    let styleClass = className !== undefined ? ' '+className : '';

    return (
            <div className={`avatar${styleClass}`}>
                {children}
                {src && <img alt={alt} src={src} className="avatar-img"/>}
            </div>
    );
};