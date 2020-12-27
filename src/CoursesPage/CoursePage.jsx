import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { lessonActions } from '../_actions'
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
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(lessonActions.getAllLessonsByCourse(
            this.props.match.params.course, '0', '0'))
    }

    render() {
        const { data, loading } = this.props;
        var lessons;
        if (loading == true || loading == undefined) {
            return <Loading />
        } else {
            lessons = data;
        }

        return (
            <div className='pb-3'>
                <Paper variant="outlined" square className='d-flex'>
                    <div className='w-70 p-relative'>
                        <img className='w-100' src={lessons.img} alt={lessons.name} height="350" />
                        <div className='wrap-area'>
                            <Typography variant="h2" component="h1">{lessons.name}</Typography>
                        </div>
                    </div>
                    <div className='course-info-area'>
                        <div>
                            <div className='course-info-text'><Typography variant="h6" component="h6">Количество уроков:</Typography><Typography variant="h6" component="h6">123</Typography></div>


                        </div>
                        <div ></div>
                    </div>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lesson } = state;
    const { loading, data } = lesson;
    return {
        data,
        loading
    };
}

const connectedCoursePage = connect(mapStateToProps)(CoursePage);
export { connectedCoursePage as CoursePage };