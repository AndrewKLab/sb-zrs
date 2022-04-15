import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { userActions } from "../../_actions";
import { Grid, Loading, Paper } from "../../_components";
import { UserInfoMainPlane, UserInfoCoursesPlane } from ".";

const UserInfoPage = ({ match, dispatch, jwt, user, selected_user, read_full_info_by_user_loading, read_full_info_by_user_message, read_full_info_by_user_error }) => {
    useEffect(() => {
        const init = async () => { await dispatch(userActions.readFullInfoByUser(match.params.user_id, jwt)) }
        if (user.role_type === 'ROLE_TEATHER') {
            init()
        } else {
            console.log('net dostup')
        }
    }, [])

    if (read_full_info_by_user_loading || !selected_user) return <Loading />
    return (
        <Grid spacing={2} container className={'py-3'}>
            <Grid item md={12} sm={12}>
                <Paper className={'p-3'}>
                    <UserInfoMainPlane user={selected_user} />
                </Paper>
            </Grid>
            <Grid item md={12} sm={12}>
                <Paper className={'p-3'}>
                    <UserInfoCoursesPlane user={selected_user} />
                </Paper>
            </Grid>
        </Grid>
    )
}

function mapStateToProps(state) {
    const { jwt, user } = state.authentication;
    const { selected_user, read_full_info_by_user_loading, read_full_info_by_user_message, read_full_info_by_user_error } = state.users;

    return {
        jwt,
        user,
        selected_user,
        read_full_info_by_user_loading,
        read_full_info_by_user_message,
        read_full_info_by_user_error,
    };
}
const connectedUserInfoPage = connect(mapStateToProps)(UserInfoPage);
export { connectedUserInfoPage as UserInfoPage };