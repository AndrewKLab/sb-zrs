import React from 'react';
import { connect } from 'react-redux';
import {
    Paper,
    Typography,
    UserAccordionPlane
} from '../../_components';


const UsersAccordionList = ({ title, users, empty, edit, remove, jwt, progress, usersBlock }) => {
    return (
        <Paper square>
            <div className='paper-header mb-0'>
                <Typography component='h4' variant='h4' className={'paper-header-text'}>{title}</Typography>
            </div>
            <div className='overflow-auto d-flex justify-content-center align-items-center flex-wrap' style={{ height: 500 }}>
                {!empty ? <div className="h-100 w-100">{users.map((user, index) => <UserAccordionPlane className={'border-bottom w-100'} key={index} edit={edit} remove={remove} user={user} progress={progress} usersBlock={usersBlock} />)}</div> : empty}
            </div>
        </Paper>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    return { jwt };
}

const connectedUsersAccordionList = connect(mapStateToProps)(UsersAccordionList);
export { connectedUsersAccordionList as UsersAccordionList };