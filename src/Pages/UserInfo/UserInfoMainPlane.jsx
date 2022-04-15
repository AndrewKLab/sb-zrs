import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { userActions } from "../../_actions";
import { Grid, Avatar, Typography, } from "../../_components";
import moment from 'moment';

const UserInfoMainPlane = ({ user }) => {
    return (
        <Grid container spacing={2}>

            <Grid item xs={12} sm={3}>
                <div className={'d-flex grid-align-items-xs-center grid-justify-xs-center w-100'}>
                    <Avatar alt={user.firstname + " " + user.lastname} src={user.avatar} className={'w-100 h-100'} />
                </div>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography component={'h1'} variant={'h1'}>{user.firstname + " " + user.lastname}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <strong>Доступ к курсам: </strong>{user.access === 'full' ? <span className='text-success'>Полный</span> : <span className='text-danger'>Ограниченый</span>}<br />
                        <strong>Оффлайн ученик: </strong>{user.offline_user === '1' ? <span className='text-success'>Да</span> : <span className='text-danger'>Нет</span>}<br />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <strong>Роль: </strong>{user.role_name}<br />
                        <strong>Дата регистрации: </strong>{moment(user.created).format('DD/MM/YYYY')}<br />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <strong>Телефон: </strong>{user.phonenumber ? <a href={`tel:+7${user.phonenumber}`}>+7{user.phonenumber}</a> : ''}<br />
                        <strong>Email: </strong>{user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : ''}<br />
                        <strong>Страна: </strong>{user.country}<br />
                        <strong>Город: </strong>{user.sity}<br />
                        <strong>Община: </strong>{user.commune}<br />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <strong>Промоутер: </strong>{!user.promouter ? <span className='text-danger'>НЕТ</span> : `${user.promouter.firstname} ${user.promouter.lastname}`}<br />
                        <strong>Учитель: </strong>{!user.teather ? <span className='text-danger'>НЕТ</span> : `${user.teather.firstname} ${user.teather.lastname}`}<br />
                        <strong>Координатор: </strong>{!user.coordinator ? <span className='text-danger'>НЕТ</span> : `${user.coordinator.firstname} ${user.coordinator.lastname}`}<br />
                        <strong>Администратор: </strong>{!user.admin ? <span className='text-danger'>НЕТ</span> : `${user.admin.firstname} ${user.admin.lastname}`}<br />
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    )
}

function mapStateToProps(state) {
    const { jwt } = state.authentication;
    const { selected_user, read_full_info_by_user_loading, read_full_info_by_user_message, read_full_info_by_user_error } = state.users;

    return {
        jwt,
        selected_user,
        read_full_info_by_user_loading,
        read_full_info_by_user_message,
        read_full_info_by_user_error,
    };
}
const connectedUserInfoMainPlane = connect(mapStateToProps)(UserInfoMainPlane);
export { connectedUserInfoMainPlane as UserInfoMainPlane };