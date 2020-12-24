import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ClampLines from 'react-clamp-lines';

import {
    Typography,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
} from './'

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { onClick, style } = props;
    return (
        <IconButton
            aria-label="share"
            color="primary"
            className='carousel-right-button'
            onClick={onClick}>
            <ChevronRightIcon />
        </IconButton>
    );
}

function SamplePrevArrow(props) {
    const { onClick, style } = props;
    return (
        <IconButton
            aria-label="share"
            color="primary"
            className='carousel-left-button'
            onClick={onClick}>
            <ChevronLeftIcon />
        </IconButton>
    );
}

export class Carousel extends Component {

    render() {
        const { courses } = this.props;
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };


        return (
            <Slider {...settings}>{courses.map((course, index) => (
                <div key={index}>
                    <Card>
                        <Link to={`/courses/${this.props.course}/${course.id}`}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={course.name}
                                    height="140"
                                    image="http://lifestudio-test.ru/assets/img/350x250.png"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
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
                            <IconButton aria-label="add to favorites" color="primary">
                                <FavoriteBorder />
                            </IconButton>
                            <IconButton aria-label="share" color="primary">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>

            )
            )}</Slider>
        );
    }
}
