import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';


import { HomePage } from '../HomePage';
import { SignInPage } from '../SignInPage';
import { SignUpPage } from '../SignUpPage';
import { CategoriesPage } from '../CategoriesPage';
import { ProfilePage } from '../ProfilePage';
import getTheme from '../_styles/theme/base'

const currentTheme = localStorage.getItem('appTheme') || 'light'
const theme = getTheme(currentTheme);

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch, classes } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div>
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/sign-up" component={SignUpPage} />
                <Route path="/courses" component={CategoriesPage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/" component={HomePage} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, style } = state;
    return {
        alert,
        style
    };
}
const connectedMainRouter = connect(mapStateToProps)(MainRouter);
export { connectedMainRouter as MainRouter };

