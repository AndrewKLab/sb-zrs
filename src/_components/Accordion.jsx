
import React, {useState, useRef} from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const Accordion = ({ children, className, labеl }) => {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");

    let styleClass = className == undefined ? '' : ' ' + className;
    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
          setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );
        setRotateState(
          setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
        );
      }

    return (
        <div>
            <div>
            <button className={`accordion ${setActive}` + styleClass} onClick={toggleAccordion}>
                {labеl}
                <ChevronRightIcon className={setRotate}/>
            </button>
            
            </div>
            <div ref={content} className="panel" style={{ maxHeight: `${setHeight}` }}>
                {children}
            </div>
        </div>
    );
};
