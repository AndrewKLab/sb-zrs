import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IconButton } from './'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { CourseCardItem } from "../CoursesPage";

function SampleNextArrow(props) {
    const { onClick, style } = props;
    return (
        <IconButton
            aria-label="share"
            color="primary"
            className='carousel-right-button'
            style={{height: 44}}
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
            style={{height: 44}}
            onClick={onClick}>
            <ChevronLeftIcon />
        </IconButton>
    );
}

export const Carousel = ({ courses, categoty_name }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: courses.length > 3 ? 3 : courses.length,
        slidesToScroll: 1,
        initialSlide: 0,
        //adaptiveHeight: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: courses.length > 3 ? 3 : courses.length,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: courses.length > 2 ? 2 : courses.length,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: courses.length > 1 ? 1 : courses.length,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {Object.values(courses).map((course, index) => { return <CourseCardItem slideritem key={index} categoty_name={categoty_name} course={course} /> })}
        </Slider>
    );

}
