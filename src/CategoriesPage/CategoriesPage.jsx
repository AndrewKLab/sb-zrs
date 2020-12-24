import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryActions } from '../_actions'

import {
    Loading,
    Button,
    Carousel
} from '../_components';
import {ToAllButton} from './'


class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.dispatch(categoryActions.getAllcategories())
    }

    render() {
        const { loading, main, special, social, national } = this.props;

        if (loading == true || loading == undefined) {
            return <Loading />
        }
        return (
            <div className='pb-3'>
                <div>
                    <h2> Основные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={main} course={"main"} />
                    <ToAllButton>Все основные курсы</ToAllButton>
                </div>

                <div >
                    <h2  > Специальные курсы </h2>
                     <Carousel element="carousel-class-to-inject" courses={special} course={"special"} /> 
                    <ToAllButton>Все специальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Социальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={social} course={"social"} /> 
                    <ToAllButton>Все социальные курсы</ToAllButton>
                </div>

                <div>
                    <h2  > Национальные курсы </h2>
                    <Carousel element="carousel-class-to-inject" courses={national} course={"national"} />
                    <ToAllButton>Все национальные курсы</ToAllButton>
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