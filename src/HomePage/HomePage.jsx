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
        <div className="col-md-6 col-md-offset-3 pb-3">
            <div className="home-page-main-baner">
                <div className="home-page-main-baner-item">
                    <div className="home-page-main-baner-item-text">
                        <h1>Книга</h1><h1 style={{ marginLeft: '11rem' }}> Книг</h1>
                        <div class="typing-demo">Открывай. Учись. Практикуй.</div>
                    </div>
                </div>
                <div className="home-page-main-baner-item home-page-main-baner-item-book ">
                    <div class="panel__image panel__image--book">
                        <a href="/courses" class="books__book__image">
                            <div class="books__book__img">
                                <img src="https://kniga-knig.info/assets/img/Перейти_к_Курсам-removebg-preview.png" width="100%" height="100%" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="home-page-main-courses">
                <div class="container-content mt-3">
                    <h1>Новые курсы</h1>
                    <ul class="cards">
                        <li>
                            <a href="/courses/basic/199" class="card__pure">
                                <img src="http://kniga-knig.info/assets/img/medicine-5103043_960_720.webp" class="card__image" alt="" />
                                <div class="card__overlay">
                                    <div class="card__header">
                                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div class="card__header-text">
                                            <h3 class="card__title">Проект Здоровье</h3>
                                            <span class="card__status">8 уроков</span>
                                        </div>
                                    </div>
                                    <p class="card__description">В этом курсе собраны факты и современные исследования о здоровом образе жизни. Каждая тема раскрывает один из 8 факторов, которые делают наибольший вклад в наше здоровье, согласно последним исследованиям.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/courses/basic/198" class="card__pure">
                                <img src="http://kniga-knig.info/assets/img/question-mark-1495858_1920.webp" class="card__image" alt="" />
                                <div class="card__overlay">
                                    <div class="card__header">
                                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div class="card__header-text">
                                            <h3 class="card__title">10 вопросов Богу</h3>
                                            <span class="card__status">10 уроков</span>
                                        </div>
                                    </div>
                                    <p class="card__description">10 уроков, которые отвечают на вопросы, волнующие современную молодежь: Есть ли настоящая любовь? Будет ли конец злу, страданиям и смерти? Кто придумал секс? Как попасть на небо? Как Тебе позвонить? И другие…</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        <div className="mt-3">
            <h1 className="text-align-center">Наши преподаватели</h1>
            <Grid container spacing={2} className="mt-3 mb-3">
            
                <Grid item sm={3} xs={12}>
                    <div className="card-container" >
                        <img className="round" src="https://kniga-knig.info/assets/img/image3.webp" alt="user" width="80%" />
                        <h3>Кудрявцев Глеб</h3>
                        <h6>Москва</h6>
                        <p>Кратокое описание регалий человека <br /> или его личная информация</p>
                        <div className="buttons">
                            <Button onPress={() => { }} variant='outlined' color="primary">
                                Написать
                            </Button>
                        </div>


                        <div class="skills">
                            <ul >
                                <li><a href="#"><i class="fa fa-vk" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="card-container" >
                        <img className="round" src="https://kniga-knig.info/assets/img/image.webp" alt="user" width="80%" />
                        <h3>Беляева Варвара</h3>
                        <h6>Казань</h6>
                        <p>Кратокое описание регалий человека <br /> или его личная информация</p>
                        <div className="buttons">
                            <Button onPress={() => { }} variant='outlined' color="primary">
                                Написать
                            </Button>
                        </div>
                        <div class="skills">
                            <ul >
                                <li><a href="#"><i class="fa fa-vk" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="card-container" >
                        <img className="round" src="https://kniga-knig.info/assets/img/image1.webp" alt="user" width="80%" />
                        <h3>Андреев Павел</h3>
                        <h6>Нижний Новгород</h6>
                        <p>Кратокое описание регалий человека <br /> или его личная информация</p>
                        <div className="buttons">
                            <Button onPress={() => { }} variant='outlined' color="primary">
                                Написать
                            </Button>
                        </div>
                        <div class="skills">
                            <ul >
                                <li><a href="#"><i class="fa fa-vk" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <div className="card-container" >
                        <img className="round" src="https://kniga-knig.info/assets/img/image2.webp" alt="user" width="80%" />
                        <h3>Орлов Александр</h3>
                        <h6>Санкт-Петербург</h6>
                        <p>Кратокое описание регалий человека <br /> или его личная информация</p>
                        <div className="buttons">
                            <Button onPress={() => { }} variant='outlined' color="primary">
                                Написать
                            </Button>
                        </div>
                        <div class="skills">
                            <ul >
                                <li><a href="#"><i class="fa fa-vk" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </Grid>
            </Grid>
            </div>
            <div className="home-page-main-courses home-page-main-special-courses">
                <div class="container-content  mt-3">
                    <div className="text-align-end"><h1 >Специальные курсы и вебинары</h1></div>
                    <ul class="cards">
                        <li>
                            <a href="/courses/special/197" class="card__pure">
                                <img src="http://kniga-knig.info/assets/img/man-2179326_1920.webp" class="card__image" alt="" />
                                <div class="card__overlay">
                                    <div class="card__header">
                                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div class="card__header-text">
                                            <h3 class="card__title">1 часть. Основы сильной молитвы.</h3>
                                            <span class="card__status">3 урока</span>
                                        </div>
                                    </div>
                                    <p class="card__description">Раскройте для себя потенциал молитвы, как мощного инструмента в решении проблем и в достижении поставленных целей!</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/courses/special/186" class="card__pure">
                                <img src="http://kniga-knig.info/assets/img/berlin-cathedral-3408348_1920.webp" class="card__image" alt="" />
                                <div class="card__overlay">
                                    <div class="card__header">
                                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div class="card__header-text">
                                            <h3 class="card__title">Вера Иисуса</h3>
                                            <span class="card__status">20 уроков</span>
                                        </div>
                                    </div>
                                    <p class="card__description">Начальный курс по изучению Библии. Библия является источником истины, на вдохновлена Святым Духом. Библия — это мерило истины, следовательно, не-разумно отвергать ее учение так же Библия обладает силой изменять жизнь.</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
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