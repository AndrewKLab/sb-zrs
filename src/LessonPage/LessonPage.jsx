import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { lessonActions, courseActions, userActions } from '../_actions'
import ClampLines from 'react-clamp-lines';
import Moment from 'moment';
import 'moment/locale/ru';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import YouTube from 'react-youtube';

import {
    Avatar,
    Loading,
    Paper,
    Button,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemFirstAction,
    ListItemIcon,
    ListItemText,
} from '../_components';

class LessonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        const { dispatch, user } = this.props;
        if (user != undefined) {
            dispatch(lessonActions.getAllLessonsByCourse(
                this.props.match.params.course, user.id, user.teather_id))
        }
    }

    // условный рендеринг кружков прогресса.
    renderCircle(status, number) {
        switch (status) {
            case null:
                return <div className={'step-circle'}>{number}</div>;
            case 'inprocess':
                return <div className={'step-circle step-circle-inprocess'}>{number}</div>;
            case 'finished':
                return <div className={'step-circle step-circle-done'}><DoneIcon /></div>;
            default:
                return null;
        }
    }

    render() {
        const { data, loading, user } = this.props;
        const { category_name, course, lesson } = this.props.match.params;

        var lessons;
        if (loading == true || loading == undefined || user == undefined || data == undefined) {
            return <Loading />
        } else {
            lessons = data.lessons;
        }
        const { teather_status, teather_name, teather_avatar } = data;
        return (
            <div className='py-3'>
                <Grid container spacing={1}>
                    <Grid item xs={9} >
                        {lessons.map((lesson_item, index) => (
                            <div key={index}>
                                {lesson === lesson_item.id &&
                                    <div>
                                        <YouTube videoId={lesson_item.videolink} className={'video-container'} containerClassName={'video-container'} onReady={this._onReady} />
                                        <div className={'mt-3'}>
                                            <Typography variant="h4" component='h4' >{lesson_item.name}</Typography>
                                            <Typography>Описание урока:</Typography>
                                            <Typography>{lesson_item.description}</Typography>
                                            <Typography variant="h4" component='h4' className={'mt-3'} >Текст урока:</Typography>
                                            <Typography>{lesson_item.text}</Typography>
                                            <hr />
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>
                            <h5 className={'pl-2 mb-0 pt-1'} >Уроки:</h5>
                            <div className={'pt-1 w-100'}>
                                {lessons.map((lesson, index) => (
                                    <div key={index}>
                                        <Link to={`/courses/${category_name}/${course}/${lesson.id}`}
                                        // onClick={() => { this.updateLessonProgress(course_id, lesson.id, user.id, user.teather_id); this.getFinishedLessons(course, user.id); }}
                                        >
                                            <ListItem button >
                                                <ListItemFirstAction>
                                                    {this.renderCircle(lesson.status, lesson.number)}
                                                    <Typography className={'pl-3 step-text'}>{lesson.name}</Typography>
                                                </ListItemFirstAction>
                                            </ListItem>
                                        </Link>
                                        {lessons.length !== Number(lesson.number) ? (<div className={'step-line'}></div>) : (<div></div>)}
                                    </div>
                                ))}
                            </div>
                        </Paper>
                        {data.teather_status !== null ? (
                            <Paper className={'p-1 mt-3'}>
                                <h5 className={'pl-2 mb-0 pt-1'} >Учитель:</h5>
                                <div className={'pt-1 w-100'}>
                                    <ListItem button>
                                        <ListItemFirstAction>
                                            <ListItemIcon>
                                                <Avatar alt={teather_name} src={teather_avatar} />
                                            </ListItemIcon>
                                            <ListItemText title={teather_name} subtitle={"Статус: " + teather_status} />
                                        </ListItemFirstAction>
                                    </ListItem>
                                </div>
                            </Paper>
                        ) : (null)}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lesson, authentication, users } = state;
    const { loading, data } = lesson;
    const { user, jwt } = authentication;
    const { teathers } = users;
    return {
        jwt,
        user,
        data,
        teathers,
        loading
    };
}

const connectedLessonPage = connect(mapStateToProps)(LessonPage);
export { connectedLessonPage as LessonPage };