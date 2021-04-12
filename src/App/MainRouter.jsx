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
import { LessonPage } from '../LessonPage';
import { ProfilePage } from '../ProfilePage';
import { PromouterPanelPage } from '../PromouterPanelPage';
import { TeatherPanelPage } from '../TeatherPanelPage';
import { CreateCoursePage } from '../CreateCoursePage';
import { AdminPanelPage } from '../AdminPanelPage';
import { ContactsPage } from '../ContactsPage';
import getTheme from '../_styles/theme/base';

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
                <Route exact path="/" component={HomePage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/promouter-panel" component={PromouterPanelPage} />
                <PrivateRoute exact path="/teather-panel/create-course" component={CreateCoursePage} />
                <PrivateRoute exact path="/teather-panel" component={TeatherPanelPage} />
                <PrivateRoute exact path="/admin-panel/create-course" component={CreateCoursePage} />
                <PrivateRoute exact path="/admin-panel" component={AdminPanelPage} />
                <Route exact path="/courses/:category_name/:course/:lesson" component={LessonPage} />
                <Route exact path="/courses/:category_name/:course" component={CoursePage} />
                <Route exact path="/courses/:category_name" component={CoursesPage} />
                <Route exact path="/courses" component={CategoriesPage} />
                <Route exact path="/contacts" component={ContactsPage} />
                <Route exact path="/sign-in" component={SignInPage} />
                <Route exact path="/sign-up" component={SignUpPage} />
                <Route exact path="/sign-up/:promouter_id/:teather_id" component={SignUpPage} />
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

