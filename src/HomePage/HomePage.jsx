import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    IconButton
} from '../_components';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';


class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switch: false,
            switchInList: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }

    handleToggleChange() {
        this.setState({
            switch: !this.state.switch
        })
    }

    handleToggleChangeTwo() {
        this.setState({
            switchInList: !this.state.switchInList
        })
    }

    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
<h3>Что сделанно:</h3>
                    <ul>
                        <li>ПОСЕТИТЕЛЬ (внешний статус):</li>
                        <ul>
                            <li className={"done"}>Доступна через поиск только Основная Категория с уроками</li>
                            <li className={"done"}>Любой, кто нашёл сайт самостоятельно</li>
                            <li className={"done"}>После РЕГИСТРАЦИИ присваивается статус ИСКАТЕЛЬ</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>ИСКАТЕЛЬ (внешний статус):</li>
                        <ul>
                            <li className={"done"}>Также тот, кто пришёл на конкретный курс по ССЫЛКЕ от ПРОМОУТЕРА и выше и зарегистрировался</li>
                            <li className={"done"}>Получает возможность выбрать Курс для изучения из Основной Категории</li>
                            <li className={"done"}>Если нашёл сайт самостоятельно - может выбрать себе УЧИТЕЛЯ из списка или БОТА</li>
                            <li >Если пришёл по ссылке - попадает в группу к УЧИТЕЛЮ, к которому прикреплён его ПРОМОУТЕР</li>
                            <li className={"done"}>После прохождения одного курса присваивается статус УЧЕНИК</li>
                            <li >Имеет доступ к чату с УЧИТЕЛЕМ; если выбрал БОТА - в любое время может выбрать УЧИТЕЛЯ</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>УЧЕНИК (внешний статус):</li>
                        <ul>
                            <li >После успешного прохождения одного курса УЧИТЕЛЬ может открыть доступ к Специальным Категориям</li>
                            <li >Может получить функцию ПРОМОУТЕРа для распространения ссылок, после прохождения одного курса</li>
                            <li >Имеет доступ к Чату с учителем</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>ПРОМОУТЕР (внутренний статус):</li>
                        <ul>
                            <li >Статус присваивается УЧИТЕЛЕМ после регистрации</li>
                            <li >Могут быть все члены общины</li>
                            <li >Может распространять ССЫЛКИ на Курсы из Основного списка</li>
                            <li >Видит всех своих ИСКАТЕЛЕЙ (Имя и телефон), их прогресс и отправленные им ССЫЛКИ</li>
                            <li >Но не имеет доступа к чату</li>
                        </ul>
                        <br />
                    </ul>

                    <ul>
                        <li>УЧИТЕЛЬ (внутренний статус):</li>
                        <ul>
                            <li >После Регистрации статус присваивается АДМИНОМ</li>
                            <li >Приоритет имеют: (A) Пасторы; (B) одобренные общиной руководители отделов или пресвитеры; (C) руководители филиалов Школы Библии в Церковных и (D) Поддерживающих организациях</li>
                            <li className={"done"}>Видит всех своих ПРОМОУТЕРОВ и их деятельность, а также УЧЕНИКОВ и их прогресс</li>
                            <li >Может присваивать статус УЧЕНИКА и ПРОМОУТЕРА</li>
                            <li >Имеет доступ к Чату</li>
                            <li >Обладает функциями ПРОМОУТЕРА</li>
                            <li >Имеет доступ к СПЕЦИАЛЬНЫМ КУРСАМ, может открывать ссылки на них ПРОМОУТЕРАМ или УЧЕНИКАМ</li>
                            <li >Может создавать ЧАСТНЫЕ курсы (добавлять видео, в т.ч. ссылки на прямые эфиры, тексты, задания) для своих УЧЕНИКОВ и ПРОМОУТЕРОВ, с приватной ССЫЛКОЙ</li>
                            <li >Может делать Ученикам и Искателям Специальные (индивидуальные) предложения - ССЫЛКИ, книги...</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>АДМИН (внутренний статус):</li>
                        <ul>
                            <li >Руководитель Конференционного уровня, статус присваивается СУПЕРАДМИНОМ</li>
                            <li >Обладает всеми функциями УЧИТЕЛЯ и ПРОМОУТЕРА</li>
                            <li >Видит всех своих УЧИТЕЛЕЙ, может управлять их статусами</li>
                            <li >Может управлять ЧАСТНЫМИ курсами, менять им Категорию списка</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>СУПЕРАДМИН (внутренний статус):</li>
                        <ul>
                            <li>Руководитель Унионного уровня</li>
                            <li >Обладает всеми функциями от ПРОМОУТЕРА до АДМИНА</li>
                            <li >Управляет статусами АДМИНОВ</li>
                            <li >Сотрудничает с Разработчиком</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>УРОКИ:</li>
                        <ul>
                            <li className={"done"}>Все уроки портала разделены на 4 КАТЕГОРИИ</li>
                            <li className={"done"}>1. ОСНОВНАЯ Категория. Состоит из базовых курсов по изучению Библии ("Так говорит Библия", "В поисках истины", "Удивительные открытия" и др.)</li>
                            <li className={"done"}>2. СПЕЦИАЛЬНАЯ Категория. Состоит из курсов по углублённому изучению Библии (Даниил, Откровение и др.)</li>
                            <li className={"done"}>3. СОЦИАЛЬНАЯ Категория. Состоит из курсов, ориентированных на разные социальные группы (Для молодёжи, Для детей, Для женщин, Для семьи, По ЗОЖ и др.)</li>
                            <li className={"done"}>4. НАЦИОНАЛЬНАЯ категория. Состоит из курсов, ориентированных на разные религиозные и национальные группы (Уроки для мусульман, на национальных языках и др.</li>
                            <li className={"done"}>Курсы ОСНОВНОЙ категории видны списком, который доступен в поиске.</li>
                            <li className={"done"}>Курсы остальных категорий доступны через ПОИСК каждый по отдельности, и по ССЫЛКЕ</li>
                        </ul>
                    </ul>
                    <br />
                    <ul>
                        <li> ДИЗАЙН:</li>
                        <ul>
                            <li className={"done"}>Нужен промолодёжный дизайн</li>
                            <li className={"done"}>С дружественным интерфейсом</li>
                            <li className={"done"}>Чтобы присутствовала возможность выбора тёмной темы</li>
                            <li >Нужна система накопления "звёзд" - за выполненные задания с возможностью их дальнейшего обмена</li>
                            <li >Для "Исламской" категории нужен специальный дизайн</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>ОБУЧЕНИЕ:</li>
                        <ul>
                            <li >При первом использовании нужен обучающий интерактивный курс</li>
                            <li >Неплохо иметь Бота-подсказчика, с возможностью вкл/выкл</li>

                        </ul>
                    </ul>

                    <br />

                    <ul>

                        <li>РЕГИСТРАЦИЯ:</li>
                        <ul>
                            <li className={"done"}>Регистрация нужна для статусов от ИСКАТЕЛЯ до АДМИНА</li>
                            <li className={"done"}>Для Регистрации Внешних статусов необходимы: Имя, Сотовый, Город</li>
                            <li className={"done"}>Для Регистрации Внутренних статусов необходимы: ФИО, Сотовый, Церковь (город, община, конференция)</li>
                        </ul>
                    </ul>

                    <br />

                    <ul>
                        <li>CRM:</li>
                        <ul>
                            <li >Нужно, чтобы все данные после регистрации накапливались в CRM</li>
                            <li >Нужна возможность внесения новых людей в CRM в ручном режиме на уровне УЧИТЕЛЬ и выше</li>
                            <li >Нужна возможность оперативного контакта из CRM через Push-сообщения, SMS и @ на уровне Учитель и выше</li>
                            <li >Нужна фиксация прогресса каждого ученика в CRM</li>
                            <li >Нужна возможность выборки в CRM по любому показателю на уровне Учитель и выше</li>
                        </ul>
                    </ul>

                <p>Компоненты:</p>
                <h5>Button</h5>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='contained' onPress={() => console.log('home')}>Click Me</Button>
                    <Button variant='outlined' onPress={() => console.log('home')}>Click Me</Button>
                </div>
                <h5>Switch</h5>
                <Switch isToggled={this.state.switch} onToggle={() => this.handleToggleChange()} />
                <h5>ListItem</h5>
                <ListItem>
                    <ListItemFirstAction>
                        <ListItemIcon>icon</ListItemIcon>
                        <ListItemText title='Title' subtitle='subtitle' />
                    </ListItemFirstAction>
                    <ListItemSecondAction>
                        <Switch isToggled={this.state.switchInList} onToggle={() => this.handleToggleChangeTwo()} />
                    </ListItemSecondAction>
                </ListItem>
                <h5>Card</h5>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="http://lifestudio-test.ru/assets/img/350x250.png"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                1231231231
                                </Typography>
                                123123123123123123123123123123123123123123123
                            </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton
                            aria-label="add to favorites"
                        >
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                <h5>Grid</h5>
                <Grid container spacing={2}>
                    {this.state.items.map((item, index) => (
                        <Grid key={index} item sm={3} xs={4}>
                            <div className='box'>{item}</div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
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