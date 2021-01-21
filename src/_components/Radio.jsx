
import React from "react";

export const Radio = ({ children, selected, name, value, reff, onChange, className }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    return (
        <div
        className="modern-radio-container"
        onClick={() => {
          onChange(value);
        }}
      >
        <input  name={name} checked={value !== selected ? false : true} type="radio" value={value} ref={reff} onChange={()=>{}} />
        <div
          className={`radio-outer-circle ${value !== selected && "unselected"}`}
        >
          <div
            className={`radio-inner-circle ${value !== selected &&
              "unselected-circle"}`}
          />
        </div>
      </div>
    );
};
