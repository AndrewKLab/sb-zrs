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
                <p>Hi!</p>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                <p>
                    <Link to="/profile">Profile</Link><br />
                    <Link to="/sign-in">Logout</Link>
                </p>

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