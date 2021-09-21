import React, { useEffect, useRef } from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
    let styleClass = className == undefined ? '' : ' ' + className;
    var body = document.body;
    const ref = useRef(null);
    var cont = document.getElementsByClassName('container');
    const handleClick = (e) => {
        if (ref && ref.current && ref.current.contains(e.target)) {
            // inside click

            return;
        }
        // outside click
        onClose();
        enableScroll()
    };


    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClick);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  
  function preventDefault(e) {
    e.preventDefault();
  }
  
  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }
  
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; } 
    }));
  } catch(e) {}
  
  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  
  // call this to Disable
  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }
  
  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }
   

    if (open === true) {
        disableScroll();
        return (
            <div className={'dialog-overlay'}>
                <div ref={ref} className={'dialog' + styleClass} onClick={(e) => { e.stopPropagation() }}>
                    {children}
                </div>
            </div>
        )
    } else {
        
       // body.classList.remove('stop-scrolling');
        return null
    }
}