import React from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export class Nav extends React.Component {

    render() {
        const {children, link} = this.props; 
        return (
            <li>
        <Link to={link}>
            {children}
        </Link>
        </li>
        )
    }
}
