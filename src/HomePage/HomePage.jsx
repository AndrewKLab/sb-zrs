import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';

import {
    Switch,
    ListItem,
    ListItemFirstAction,
    ListItemSecondAction,
    ListItemIcon,
    ListItemText,
    Button,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    IconButton,
    UserPlane,
    Paper
} from '../_components';
import Carousel from 'nuka-carousel';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const HomePage = () => {

    useEffect(() => {
        document.getElementById('app').classList.add('back-lines')
        return function cleanup() {
          document.getElementById('app').classList.remove('back-lines')
        };
      });

        return (
            <div className="col-md-6 col-md-offset-3 pb-3 pt-3">
                <div id={'back-lines'}></div>
                <Carousel
                    className="home-page-slider"
                    wrapAround={true}
                    dots={false}
                    defaultControlsConfig={{
                        pagingDotsStyle: {
                            display: 'none'
                        }
                    }}
                    renderCenterLeftControls={({ previousSlide }) => (
                        <IconButton
                            aria-label="share"
                            color="primary"
                            className='carousel-right-button'
                            onClick={previousSlide}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <IconButton
                            aria-label="share"
                            color="primary"
                            className='carousel-right-button'
                            onClick={nextSlide}>
                            <ChevronRightIcon />
                        </IconButton>
                    )}>
                    <img className="slider-slide-img" src={`${config.url}/assets/img/top-baner-1.webp`} />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                    <img className="slider-slide-img" src="https://picsum.photos/1000/400" />
                </Carousel>
                <Grid container spacing={2} className="mt-3">

                    <Grid item sm={6} xs={12}>
                        <Card className={'d-flex h-100'}>
                            <CardActionArea>
                                <div >
                                    <CardMedia
                                        component="img"
                                        height="195"
                                        image={`${config.url}/assets/img/new_courses.webp`}
                                        title="Contemplative Reptile"
                                    />
                                    <div className="card-inside-text">
                                        <Typography variant="h1" component="h1">
                                            Новые курсы
                                        </Typography>
                                    </div>
                                </div>
                                <CardContent className="card-height-100">
                                    <Typography variant="span" component="span">
                                        Новинки в курсах. Самые новые и самые интересные курсы.
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Card className="h-100">
                            <CardActionArea className="h-100">
                                <div className="h-100">
                                    <CardMedia
                                        className="h-100"
                                        component="img"
                                        height="252"
                                        image={`${config.url}/assets/img/our_teathers.webp`}
                                        title="Contemplative Reptile"
                                    />
                                    <div className="card-inside-full-text">
                                        <div className="card-inside-full-text-container">
                                            <Typography variant="h5" component="h2"> Наши учителя:</Typography>
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                        </div>
                                    </div>
                                </div>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <Card className="h-100">
                            <CardActionArea className="h-100">
                                <div className="h-100">
                                    <CardMedia
                                    className="h-100"
                                        component="img"
                                        height="252"
                                        image={`${config.url}/assets/img/our_teathers.webp`}
                                        title="Contemplative Reptile"
                                    />
                                    <div className="card-inside-full-text">
                                        <div className="card-inside-full-text-container">
                                            <Typography variant="h5" component="h2">Отзывы:</Typography>
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                            <UserPlane avatar={'https://kniga-knig.info/assets/img/unnamed.png'} name={'Имя Фамилия'} />
                                        </div>
                                    </div>
                                </div>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Card className={'d-flex h-100'}>
                            <CardActionArea>
                                <div >
                                    <CardMedia
                                        component="img"
                                        height="195"
                                        image={`${config.url}/assets/img/special_cources.webp`}
                                        title="Contemplative Reptile"
                                    />
                                    <div className="card-inside-text">
                                        <Typography variant="h1" component="h1">
                                            Специальные курсы
                                        </Typography>
                                    </div>
                                </div>
                                <CardContent className="card-height-100">
                                    <Typography variant="span" component="span">
                                        Специальные курсы - это курсы, которые созданы специально для вас.
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                </Grid>
            </div>
        );
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };