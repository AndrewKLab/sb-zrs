import React from 'react';
import { connect } from 'react-redux';
import { categoryActions } from '../_actions'

import {
    Loading,
    Button,
    Carousel
} from '../_components';
import { ToAllButton } from './'


class CategoriesPage extends React.Component {
    componentDidMount() {
        const { dispatch, history, user } = this.props;
        if (user !== undefined) {
            console.log(user)
            if (user.access === 'limited') {
                history.push(`/courses/basic`)
            }
            else {
                dispatch(categoryActions.getAllCategories())
            }
        } else {
            history.push(`/courses/basic`)
        }
    }
    render() {
        const { loading, basic, special, social, national } = this.props;

        if ((loading == true || loading == undefined) &&
            (basic == undefined, special == undefined, social == undefined, national == undefined)) {
            return <Loading />
        }

        return (
            <div className='pb-3'>
                <div>
                    <h2> Основные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={basic} categoty_name={'basic'} />
                    <ToAllButton categoty_name={'basic'}>Все основные курсы</ToAllButton>
                </div>

                <div >
                    <h2  > Специальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={special} categoty_name={'special'} />
                    <ToAllButton categoty_name={'special'}>Все специальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Социальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={social} categoty_name={'social'} />
                    <ToAllButton categoty_name={'social'}>Все социальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Национальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={national} categoty_name={'national'} />
                    <ToAllButton categoty_name={'national'}>Все национальные курсы</ToAllButton>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories } = state;
    const { user } = authentication;
    const { basic, social, special, national, loading } = categories
    return {
        user,
        basic,
        social,
        special,
        national,
        loading
    };
}

const connectedCategoriesPage = connect(mapStateToProps)(CategoriesPage);
export { connectedCategoriesPage as CategoriesPage };