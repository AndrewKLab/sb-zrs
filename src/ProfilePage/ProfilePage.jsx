import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ProfilePage extends React.Component {


    render() {
        const { user, classes } = this.props;
        return (
            <div>
                <div style={{margin: 5}} className={classes.paperRoot+ " " + classes.paperRounded+ " " +classes.paperOutlined}>
                    profile
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, style } = state;
    const { user } = authentication;
    const { classes } = style;
    return {
        user,
        classes
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };