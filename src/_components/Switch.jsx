import React from "react";

export const Switch = ({className, isToggled, onToggle}) => {
  let styleClass = className == undefined ? '' : ' ' + className;
  return (
    <label className={`toggle-switch${styleClass}`}>
      <input type="checkbox" className={'toggle-switch-input'} checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
};