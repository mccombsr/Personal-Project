import React from 'react';
import Reviews from '../Reviews/Reviews';

export default function BusinessInfo() {
    return (
        <div className="businessInfoContainer">
            <h1 className="businessName">Bussiness Name will go here</h1>
            <div className="businessPicture">
                <img src="https://cdn2.iconfinder.com/data/icons/at-the-office/100/mop-512.png" alt="placeholder"/>
            </div>
            <div className='contactInfo'>
                <p>Phone: 509-230-2539</p>
                <p>Email: cleaner@housecleaning.com</p>
            </div>
            <div className='zipContainer'>
                <ul>
                    <li>84045</li>
                    <li>84045</li>
                    <li>84045</li>
                </ul>
            </div>
            <p className='blurb'>
                Business Blurb
            </p>
            <Reviews />
        </div>
    )
}