import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { courseActions } from '../_actions'
import ClampLines from 'react-clamp-lines';

import {
    Loading,
    Paper,
    Button,
    Carousel,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia
} from '../_components';


class CoursePage extends React.Component {

    render() {
        const { categories, loading } = this.props;

        if (loading == true || loading == undefined) {
            return <Loading />
        } else {
            const courses = categories[this.props.match.params.category_name];
            console.log(JSON.stringify(courses))
        }
        return (
            <div className='pb-3'>
123
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { categories } = state;
    const { loading } = categories;
    return {
        categories,
        loading
    };
}

const connectedCoursePage = connect(mapStateToProps)(CoursePage);
export { connectedCoursePage as CoursePage };