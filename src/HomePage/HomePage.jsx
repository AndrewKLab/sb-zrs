import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Switch,
    ListItem,
    ListItemFirstAction,
    ListItemSecondAction,
    ListItemIcon,
    ListItemText
} from '../_components';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            switch: false
        }
    }

    handleToggleChange() {
        console.log(this.state.switch)
        this.setState({
            switch: !this.state.switch
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
                <h5>Switch</h5>
                <Switch switched={this.state.switch} onColor="#EF476F" handleToggle={() => { this.handleToggleChange() }} />
                <h5>ListItem</h5>
                <ListItem>
                    <ListItemFirstAction>
                        <ListItemIcon>icon</ListItemIcon>
                        <ListItemText title='Title' subtitle='subtitle'/>
                    </ListItemFirstAction>
                    <ListItemSecondAction>
                        <Switch switched={this.state.switch} onColor="#EF476F" handleToggle={() => { this.handleToggleChange() }} />
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