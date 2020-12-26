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
import { CoursesPage, CoursePage } from '../CoursesPage';
import { ProfilePage } from '../ProfilePage';
import getTheme from '../_styles/theme/base'

const currentTheme = localStorage.getItem('appTheme') || 'light'
const theme = getTheme(currentTheme);

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/sign-in" component={SignInPage} />
                <Route exact path="/sign-up" component={SignUpPage} />
                <Route exact path="/courses" component={CategoriesPage} />
                <Route exact path="/courses/:category_name" component={CoursesPage} />
                <Route exact path="/courses/:category_name/:course" component={CoursePage} />
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

