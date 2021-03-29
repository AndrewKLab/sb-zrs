
import React, { useState, useRef, useEffect, useCallback } from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const Accordion = ({ children, className, classButton, classBody, labеl }) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  const [ref, setRef] = useState(null);

  let styleClass = className == undefined ? '' : ' ' + className;
  let styleButton = classButton == undefined ? '' : ' ' + classButton;
  let styleBody = classBody == undefined ? '' : ' ' + classBody;

  const content = useRef(null);
  const main = useRef(null);


  function toggleAccordion() {

    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `max-content`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  // if ((content.current !== null && content.current.scrollHeight + "px" !== setHeight) && setHeight !== "0px") {
  //   setHeightState(`${content.current.scrollHeight}px`);
  // }

  return (
    <div ref={main} className={styleClass} >

      <button className={`accordion ${setActive}` + styleButton} onClick={toggleAccordion}>
        {labеl}
        <ChevronRightIcon className={setRotate} />
      </button>

      <div ref={content} className={"panel"+ styleBody} style={{ maxHeight: `${setHeight}` }}>
        {children}
      </div>
    </div>
  );
};
