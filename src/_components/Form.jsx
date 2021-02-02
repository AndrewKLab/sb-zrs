
import React from "react";

export const Form = ({ children, id, className, onSubmit, onChange }) => {
    let eid = id == undefined ?  '' : id;
    let styleClass = className == undefined ?  '' : ' '+className;
    let onSub = onSubmit == undefined ?  null : onSubmit;
    return (
            <form id={eid} className={styleClass} onSubmit={onSub} onChange={onChange}>
                {children}
            </form>
    );
};
