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
    Paper,
    Loading
} from '../_components';
import Carousel from 'nuka-carousel';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { categoryActions } from '../_actions';


const HomePage = ({ dispatch, loading, basic, special, currentTheme }) => {

    useEffect(() => {
        document.getElementById('app').classList.add('back-lines')
        dispatch(categoryActions.getAllCategories())
        return function cleanup() {
            document.getElementById('app').classList.remove('back-lines')
        };
    }, []);

    if (!basic || !special || loading) return <Loading />
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
                                <h1>Книга <br /><div style={{ marginLeft: '11rem' }}>Книг</div></h1>
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
                                <img src={`${config.url}/assets/img/${currentTheme === 'dark' ? 'logo-dark' : 'logo'}.png`} height={'100px'} />
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
                        {basic.map((course, index) =>
                            <li className={course.id === '198' || course.id === '218' ? 'd-block':'d-none' }>
                                <a href={`/courses/${course.category_name}/${course.id}`} className="card__pure">
                                    <img src={course.img} className="card__image" alt={course.name} />
                                    <div className="card__overlay">
                                        <div className="card__header">
                                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                            <div className="card__header-text">
                                                <h3 className="card__title">{course.name}</h3>
                                                <span className="card__status">{course.lessons_count} уроков</span>
                                            </div>
                                        </div>
                                        <p className="card__description">{course.description}</p>
                                    </div>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="mt-3 d-none">
                <h1 className="text-align-center">Наши преподаватели</h1>
                <Grid container spacing={2} className="mt-3 mb-3">

                    <Grid item sm={3} xs={12} className={'d-flex justify-content-center'}>
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
                    {special.map((course, index) =>
                            <li className={course.id === '197' || course.id === '202' ? 'd-block':'d-none' }>
                                <a href={`/courses/${course.category_name}/${course.id}`} className="card__pure">
                                    <img src={course.img} className="card__image" alt={course.name} />
                                    <div className="card__overlay">
                                        <div className="card__header">
                                            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                            <div className="card__header-text">
                                                <h3 className="card__title">{course.name}</h3>
                                                <span className="card__status">{course.lessons_count} уроков</span>
                                            </div>
                                        </div>
                                        <p className="card__description">{course.description}</p>
                                    </div>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    );
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { currentTheme } = state.style;
    const { loading, basic, special } = state.categories;
    return {
        user,
        currentTheme,
        loading, basic, special
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };