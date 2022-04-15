
import React, { useState, useRef, useEffect, useCallback } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const Accordion = ({ open, setOpen, children, className, classButton, classBody, labеl }) => {
  const [setActive, setActiveState] = useState(!open ? "" : "active");
  const [setHeight, setHeightState] = useState(!open ? "0px" : "max-content");
  const [setRotate, setRotateState] = useState(!open ? "accordion__icon" : "accordion__icon rotate");

  let styleClass = className == undefined ? '' : ' ' + className;
  let styleButton = classButton == undefined ? '' : ' ' + classButton;
  let styleBody = classBody == undefined ? '' : ' ' + classBody;

  useEffect(() => {
    if (!open) {
      setActiveState("")
      setHeightState("0px")
      setRotateState("accordion__icon")
    } else {
      setActiveState("active")
      setHeightState("max-content")
      setRotateState("accordion__icon rotate")
    }
  }, [open])

  function toggleAccordion() {
    setOpen(!open)
  }

  return (
    <div className={styleClass} >

      <button className={`accordion ${setActive}` + styleButton} onClick={toggleAccordion}>
        {labеl}
        <ChevronRightIcon className={setRotate} />
      </button>

      <div className={"panel" + styleBody} style={{ maxHeight: `${setHeight}` }}>
        {children}
      </div>
    </div>
  );
};
