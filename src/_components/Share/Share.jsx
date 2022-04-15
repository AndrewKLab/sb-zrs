import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Share = ({ children, id, className, show, close, cleanLink, link, whatsapp, viber, telegram, sms, copy }) => {
    let styleClass = className !== undefined ? ' ' + className : '';
    const dropdown_menu_ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) { if (dropdown_menu_ref.current && !dropdown_menu_ref.current.contains(event.target)) close() }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [])

    return (
        <div id={id} ref={dropdown_menu_ref} className={`share${styleClass}${show ? ' show' : ''}`}>

            {whatsapp ? <a onClick={() => window.open(`https://api.whatsapp.com/send?text=${link}`, 'share-whatsapp', 'width=800, height=400')} data-action="share/whatsapp/share" className="share-link" target={'_blank'}><FontAwesomeIcon icon="fa-brands fa-whatsapp" className="share-whatsapp" /></a> : null}
            {viber ? <a onClick={() => window.open(`viber://forward?text=${link}`, 'share-viber', 'width=800, height=400')} className="share-link" target={'_blank'}><FontAwesomeIcon icon="fa-brands fa-viber" className="share-viber" /></a> : null}
            {telegram ? <a onClick={() => window.open(`https://t.me/share/url?url=${link}`, 'share-tg', 'width=800, height=400')} className="share-link"><FontAwesomeIcon icon="fa-brands fa-telegram" className="share-telegram" /></a> : null}
            {sms ? <a onClick={() => window.open(`sms:?&body=/${link}`, 'share-tg', 'width=800, height=400')} className="share-link"><FontAwesomeIcon icon="fa-solid fa-comment-sms" className="share-sms" /></a> : null}
            {copy ? <a onClick={() => navigator.clipboard.writeText(cleanLink)} className="share-link"><FontAwesomeIcon icon="fa-solid fa-copy" className="share-copy" /></a> : null}

            {children}
        </div>
    );
};