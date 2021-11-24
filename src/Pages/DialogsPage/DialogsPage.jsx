import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Chat } from '../../_components';

const DialogsPage = ({}) => {

    useEffect(()=>{

    },[])

    return (
        <div className={'pv-3'}>
            <Chat/>
        </div>
    )
}

function mapStateToProps(state) {
    const { authentication, course } = state;
    const { user } = authentication;
    const { loading, courses } = course;
    return {
        user,
        loading,
        courses
    };
}

const connectedDialogsPage = connect(mapStateToProps)(DialogsPage);
export { connectedDialogsPage as DialogsPage };