import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { courseActions } from '../_actions'
import ClampLines from 'react-clamp-lines';
import config from 'config';

import {
    Loading,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia
} from '../_components';


class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(courseActions.getAllCoursesByCategoryName(this.props.match.params.category_name)).then(
            () => this.setState({ loading: false })
        )
    }

    render() {
        const { courses } = this.props;
        const { loading } = this.state;
        var title;
        switch (this.props.match.params.category_name) {
            case 'basic':
                title = 'Основные курсы'
                break;
            case 'special':
                title = 'Специальные курсы'
                break;
            case 'social':
                title = 'Социальные курсы'
                break;
            case 'national':
                title = 'Национальные курсы'
                break;
            default: ''
                break;
        }
        if (loading) {
            return <Loading />
        }
        return (
            <div className='pb-3'>
                <Typography variant='h2' component='h1'>{title}</Typography>
                <Grid
                    container
                    direction={"row"}
                    justify={"space-around"}
                    alignItems={"flex-start"}
                    spacing={1}>
                    {Object.values(courses).map((course, index) => (
                        <Grid item xs key={index}>
                            <Card>
                                <Link to={`/courses/${this.props.match.params.category_name}/${course.id}`} >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={course.name}
                                            height="140"
                                            image={course.img}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="h6">
                                                {course.name}
                                            </Typography>
                                            <ClampLines
                                                text={course.description}
                                                id="really-unique-id"
                                                lines={3}
                                                ellipsis="..."
                                                buttons={false}
                                                innerElement="p"
                                            />
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>

                    )
                    )}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { course } = state;
    const { courses } = course;
    return {
        courses
    };
}

const connectedCoursesPage = connect(mapStateToProps)(CoursesPage);
export { connectedCoursesPage as CoursesPage };