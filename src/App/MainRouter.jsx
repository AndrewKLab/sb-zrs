import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions, userActions, lessonActions } from '../_actions';
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
import { DialogsPage } from '../Pages/DialogsPage';
import { CourseCountructor } from '../Pages/CourseCounstructor';
import { UserInfoPage } from '../Pages/UserInfo';
import { PrivacyPolitic } from '../Pages/Documents';

const currentTheme = localStorage.getItem('appTheme') || 'light'

class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
            dispatch(userActions.selectUser(null))
            dispatch(lessonActions.setInprocessLesson(null))
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={props => <HomePage {...props} />} />
                <PrivateRoute exact path="/profile" component={props => <ProfilePage {...props} />} />
                <PrivateRoute exact path="/promouter-panel" component={props => <PromouterPanelPage {...props} />} />
                <PrivateRoute exact path="/teather-panel/user-info/:user_id" component={props => <UserInfoPage {...props} />} />
                <PrivateRoute exact path="/teather-panel/create-course" component={props => <CourseCountructor {...props} />} />
                <PrivateRoute exact path="/teather-panel" component={props => <TeatherPanelPage {...props} />} />
                <PrivateRoute exact path="/admin-panel/create-course" component={props => <CourseCountructor {...props} />} />
                <PrivateRoute exact path="/admin-panel" component={props => <AdminPanelPage {...props} />} />
                <Route exact path="/courses/:category_name/:course/:lesson" component={props => <LessonPage {...props} />} />
                <Route exact path="/courses/:category_name/:course" component={props => <CoursePage {...props} />} />
                <Route exact path="/courses/:category_name" component={props => <CoursesPage {...props} />} />
                <Route exact path="/courses" component={props => <CategoriesPage {...props} />} />
                <Route exact path="/contacts" component={props => <ContactsPage {...props} />} />
                <Route exact path="/dialogs" component={props => <DialogsPage {...props} />} />
                <Route exact path="/privacy" component={props => <PrivacyPolitic {...props} />} />
                <Route exact path="/sign-in" component={props => <SignInPage {...props} />} />
                <Route exact path="/sign-up" component={props => <SignUpPage {...props} />} />
                <Route exact path="/sign-up/:promouter_id/:teather_id" component={props => <SignUpPage {...props} />} />
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

