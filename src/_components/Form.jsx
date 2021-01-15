
import React from "react";

export const Form = ({ children, id, className, onSubmit }) => {
    let eid = id == undefined ?  '' : id;
    let styleClass = className == undefined ?  '' : ' '+className;
    let onSub = onSubmit == undefined ?  '' : onSubmit;
    return (
            <form id={eid} className={styleClass} onSubmit={onSub}>
                {children}
            </form>
    );
};
