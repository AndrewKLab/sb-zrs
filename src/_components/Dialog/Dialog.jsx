import React, { useEffect } from 'react'

export const Dialog = ({ open, children, className, onClose }) => {
  let styleClass = className == undefined ? '' : ' ' + className;

  useEffect(() => {
    if (open) {
      document.body.classList.add('dialog-open');
      document.getElementsByTagName('header')[0].classList.add('dialog-open')
    } else {
      document.body.classList.remove('dialog-open');
      document.getElementsByTagName('header')[0].classList.remove('dialog-open')
    }
  }, [open]);

  return (
    <div className={open ? 'dialog-overlay active' : 'dialog-overlay'} onClick={onClose}>
      <div className={`${open ? 'dialog active' : 'dialog'}${styleClass}`} onClick={(e) => e.stopPropagation()}>
        <div className={`dialog-container`}>
          {children}
        </div>
      </div>
    </div>
  )
}
