import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './component/Auth/Auth';
import Home from './component/Home/Home';
import BusinessAccount from './component/BusinessAccount/BusinessAccount';
import CustomerAccount from './component/CustomerAccount/CustomerAccount';
import BusinessInfo from './component/BusinessInfo/BusinessInfo';
import AccountSetup from './component/AccountSetup/AccountSetup';

export default (
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={Home} path='/home'/>
        <Route component={CustomerAccount} path='/customerAccount'/>
        <Route component={BusinessAccount} path='/businessAccount'/>
        <Route component={BusinessInfo} path='/businessInfo'/>
        <Route component={AccountSetup} path='/accountSetup'/>
    </Switch>
)