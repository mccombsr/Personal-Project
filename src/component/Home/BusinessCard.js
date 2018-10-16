import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BusinessCard extends Component {
    render() {
        return (
            <div>
                <Link to='/BusinessInfo'>
                    <h1>Business Card</h1>
                </Link>
            </div>
        )
    }
}