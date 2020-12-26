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
        var courses; 
        if (loading == true || loading == undefined) {
            return <Loading />
        } else {
            courses = categories[this.props.match.params.category_name][this.props.match.params.course];
        }
        
        return (
            <div className='pb-3'>
                <Paper variant="outlined" square>
                                <div >
                                <img src={courses.img} alt={courses.course_name} height="350" />
                                    <div >
                                        <Typography variant="h4">{courses.course_name}</Typography>
                                    </div>
                                </div>
                                <div >
                                    <div>
                                        <div ><Typography variant="h6">Количество уроков:</Typography><Typography variant="h6">123</Typography></div>
           

                                    </div>
                                    <div ></div>
                                </div>
                            </Paper>
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