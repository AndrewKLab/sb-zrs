import React from 'react';
import { connect } from 'react-redux';
import { categoryActions } from '../_actions'

import {
    Loading,
    Button,
    Carousel
} from '../_components';
import {ToAllButton} from './'


class CategoriesPage extends React.Component {

    render() {
        const { loading, main, special, social, national } = this.props;
        if (loading == true || loading == undefined) {
            return <Loading />
        }
       
        return (
            <div className='pb-3'>
                <div>
                    <h2> Основные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={main} course={main[0].category_name} />
                    <ToAllButton course={main[0].category_name}>Все основные курсы</ToAllButton>
                </div>

                <div >
                    <h2  > Специальные курсы </h2>
                     <Carousel element="carousel-class-to-inject" courses={special} course={special[0].category_name} /> 
                    <ToAllButton course={special[0].category_name}>Все специальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Социальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={social} course={social[0].category_name} /> 
                    <ToAllButton course={social[0].category_name}>Все социальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Национальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={national} course={national[0].category_name} />
                    <ToAllButton course={national[0].category_name}>Все национальные курсы</ToAllButton>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories } = state;
    const { user } = authentication;
    const { main, social, special, national, loading } = categories
    return {
        user,
        main,
        social,
        special,
        national,
        loading
    };
}

const connectedCategoriesPage = connect(mapStateToProps)(CategoriesPage);
export { connectedCategoriesPage as CategoriesPage };