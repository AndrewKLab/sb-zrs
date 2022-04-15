
import React from "react";

export const Radio = ({ children, id, selected, defaultChecked, name, value, reff, onChange, className, disabled }) => {
  let styleClass = className == undefined ? '' : ' ' + className;
  return (
    <div className="modern-radio-container" onClick={() => onChange(value)}>
      <input id={id} name={name} checked={selected} defaultChecked={defaultChecked} type="radio" value={value} ref={reff} onChange={()=>{}} disabled={disabled} />
      <div className={`radio-outer-circle${!selected ? " unselected":""}`}>
        <div className={`radio-inner-circle${!selected ? " unselected-circle":""}`} />
      </div>
    </div>
  );
};
