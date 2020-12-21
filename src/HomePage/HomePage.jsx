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
} from '../_components';


class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switch: false,
            switchInList: false,
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
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button variant='contained' onPress={() => console.log(123)}>Click Me</Button>
                <Button variant='outlined'>Click Me</Button>
                </div>
                <h5>Switch</h5>
                <Switch isToggled={this.state.switch} onToggle={() => this.handleToggleChange()} />
                <h5>ListItem</h5>
                <ListItem>
                    <ListItemFirstAction>
                        <ListItemIcon>icon</ListItemIcon>
                        <ListItemText title='Title' subtitle='subtitle'/>
                    </ListItemFirstAction>
                    <ListItemSecondAction>
                        <Switch isToggled={this.state.switchInList} onToggle={() => this.handleToggleChangeTwo()} />
                    </ListItemSecondAction>
                </ListItem>
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