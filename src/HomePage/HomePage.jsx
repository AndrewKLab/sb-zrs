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
                <Carousel
                    width="100%"
                    autoplay
                    renderCenterLeftControls={({ previousSlide }) => (
                        <button className='slider-button' onClick={previousSlide}><i className="fa fa-arrow-left" /></button>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <button className='slider-button' onClick={nextSlide}> <i className="fa fa-arrow-right" /></button>
                    )}
                >
                    <div className='d-flex'>
                        <div className="home-page-main-baner-item">
                            <div className="home-page-main-baner-item-text">
                                <h1>Книга</h1><h1 style={{ marginLeft: '11rem' }}> Книг</h1>
                                <div className="typing-demo">Открывай. Учись. Практикуй.</div>
                            </div>
                        </div>
                        <div className="home-page-main-baner-item home-page-main-baner-item-book ">
                            <div className="panel__image panel__image--book">
                                <a href="/courses" className="books__book__image">
                                    <div className="books__book__img">
                                        <img src="https://kniga-knig.info/assets/img/Перейти_к_Курсам-removebg-preview.png" width="100%" height="100%" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="home-page-main-baner-item">
                            <div className="home-page-main-baner-item-text">
                                <img src="https://kniga-knig.info/assets/img/logo.png" height={'100px'} />
                                <h2>Уважаемый друг!</h2>
                                <p className="typing-demo-text">Приветствуем вас на сайте, где Вы сможете научиться понимать Библию, пройдя понравившиеся Вам циклы уроков</p>
                                <div className='p-relative w-50'>
                                    <a href="/courses">
                                        <img src="https://kniga-knig.info/assets/img/slide-2-button.webp" width="100%" />
                                        <span className='go-to-courses-button-text'>ПЕРЕЙТИ К КУРСАМ</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-main-baner-item">
                            <div className="panel__image panel__image--book">
                                <div className="books__book__image">
                                    <div >
                                        <img src="https://kniga-knig.info/assets/img/slide-2.png" width="100%" height="100%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="home-page-main-baner-item">
                            <div className="home-page-main-baner-item-text">
                                <h2>Все ли уроки одинаковы?</h2>
                                <p className="typing-demo-text">Как в любой школе, обучение имеет разные ступени.</p>
                                <p className="typing-demo-text">Начав учиться, Вы зачисляетесь на основную (базовую) ступень, где Вам доступны уроки об основных вопросах Библии.</p>
                                <p className="typing-demo-text">Следующие ступени предлагают углублённое изучение отдельных тем или книг Библии.</p>
                                <p className="typing-demo-text">Существуют специальные курсы по семье и здоровью. Портал постоянно пополняется!</p>
                            </div>
                        </div>
                        <div className="home-page-main-baner-item">
                            <div className="panel__image panel__image--book">
                                <div className="books__book__image">
                                    <div >
                                        <img src="https://kniga-knig.info/assets/img/slide-3.png" width="100%" height="100%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className="home-page-main-baner-item">
                            <div className="home-page-main-baner-item-text">
                                <h2>Если возникают вопросы?</h2>
                                <p className="typing-demo-text">Содержание уроков на портале таково, что охватывает довольно широкий круг вопросов, и поэтому каждый студент занимается самостоятельно.</p>
                                <p className="typing-demo-text">Но если возникают вопросы, всегда можно обратиться с ними к консультантам в переписке на сайте.</p>
                                <p className="typing-demo-text">Все консультанты имеют высшее богословское образование и с удовольствие помогут Вам.</p>
                            </div>
                        </div>
                        <div className="home-page-main-baner-item">
                            <div className="panel__image panel__image--book">
                                <div className="books__book__image">
                                    <div >
                                        <img src="https://kniga-knig.info/assets/img/slide-4.png" width="100%" height="100%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className="home-page-main-courses">
                <div className="container-content mt-3">
                    <h1>Новые курсы</h1>
                    <ul className="cards">
                        <li>
                            <a href="/courses/basic/199" className="card__pure">
                                <img src="https://kniga-knig.info/assets/img/medicine-5103043_960_720.webp" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div className="card__header-text">
                                            <h3 className="card__title">Проект Здоровье</h3>
                                            <span className="card__status">8 уроков</span>
                                        </div>
                                    </div>
                                    <p className="card__description">В этом курсе собраны факты и современные исследования о здоровом образе жизни. Каждая тема раскрывает один из 8 факторов, которые делают наибольший вклад в наше здоровье, согласно последним исследованиям.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/courses/basic/198" className="card__pure">
                                <img src="https://kniga-knig.info/assets/img/question-mark-1495858_1920.webp" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div className="card__header-text">
                                            <h3 className="card__title">10 вопросов Богу</h3>
                                            <span className="card__status">10 уроков</span>
                                        </div>
                                    </div>
                                    <p className="card__description">10 уроков, которые отвечают на вопросы, волнующие современную молодежь: Есть ли настоящая любовь? Будет ли конец злу, страданиям и смерти? Кто придумал секс? Как попасть на небо? Как Тебе позвонить? И другие…</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-3 d-none">
                <h1 className="text-align-center">Наши преподаватели</h1>
                <Grid container spacing={2} className="mt-3 mb-3">

                    <Grid item sm={3} xs={12} className={'d-flex justify-content-center'} className={'d-flex justify-content-center'}>
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


                            <div className="skills">
                                <ul >
                                    <li><a href="#"><i className="fa fa-vk" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={12} className={'d-flex justify-content-center'}>
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
                            <div className="skills">
                                <ul >
                                    <li><a href="#"><i className="fa fa-vk" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={12} className={'d-flex justify-content-center'}>
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
                            <div className="skills">
                                <ul >
                                    <li><a href="#"><i className="fa fa-vk" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={12} className={'d-flex justify-content-center'}>
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
                            <div className="skills">
                                <ul >
                                    <li><a href="#"><i className="fa fa-vk" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="home-page-main-courses home-page-main-special-courses">
                <div className="container-content  mt-3">
                    <div className="text-align-end"><h1 >Специальные курсы и вебинары</h1></div>
                    <ul className="cards">
                        <li>
                            <a href="/courses/special/197" className="card__pure">
                                <img src="https://kniga-knig.info/assets/img/man-2179326_1920.webp" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div className="card__header-text">
                                            <h3 className="card__title">1 часть. Основы сильной молитвы.</h3>
                                            <span className="card__status">3 урока</span>
                                        </div>
                                    </div>
                                    <p className="card__description">Раскройте для себя потенциал молитвы, как мощного инструмента в решении проблем и в достижении поставленных целей!</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/courses/special/186" className="card__pure">
                                <img src="https://kniga-knig.info/assets/img/berlin-cathedral-3408348_1920.webp" className="card__image" alt="" />
                                <div className="card__overlay">
                                    <div className="card__header">
                                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                        <div className="card__header-text">
                                            <h3 className="card__title">Вера Иисуса</h3>
                                            <span className="card__status">20 уроков</span>
                                        </div>
                                    </div>
                                    <p className="card__description">Начальный курс по изучению Библии. Библия является источником истины, на вдохновлена Святым Духом. Библия — это мерило истины, следовательно, не-разумно отвергать ее учение так же Библия обладает силой изменять жизнь.</p>
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