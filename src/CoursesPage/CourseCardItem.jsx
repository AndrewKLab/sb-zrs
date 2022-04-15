import React, { useState } from 'react';
import config from 'config';
import {
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Typography,
    CardActions,
    Share,
    ShareButton
} from '../_components';

import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';

export const CourseCardItem = ({slideritem, categoty_name, course }) => {
    const [openShareMenu, setOpenShareMenu] = useState(false)

    return (
        <div className={slideritem ? `slider-width-400 h-100`: ''}>
            <Card className="h-100">
                <Link to={`/courses/${categoty_name}/${course.id}`}>

                    <CardActionArea className="h-100">
                        <div className="course-image-container">
                            <CardMedia
                                component="img"
                                alt={course.name}
                                image={course.img}
                                className="course-image"
                                title="Contemplative Reptile"
                            />
                        </div>
                        <CardContent className="h-100">
                            <Typography gutterBottom variant="h5" component="h2">
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

                <CardActions className='grid-justify-xs-flex-end'>
                    <Share
                        cleanLink={`${config.url}/courses/${categoty_name}/${course.id}`}
                        link={`${course.name ? course.name + '%0A' : ''}${config.url}/courses/${categoty_name}/${course.id}`}
                        show={openShareMenu}
                        close={() => setOpenShareMenu(false)}
                        whatsapp
                        viber
                        telegram
                        sms
                        copy
                    />
                    <ShareButton toogleShare={() => setOpenShareMenu(!openShareMenu)} />
                </CardActions>
            </Card>
        </div>
    )
}