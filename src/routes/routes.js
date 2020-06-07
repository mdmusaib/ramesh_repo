import React from 'react';
import { Switch, Route } from "react-router-dom";

import DummyPage from '../Modules/Dummy/dummy';
import PageNotFound from '../Modules/PageNotFound/PageNotFound';
import ForgetPasswordPage from '../Modules/Users/ForgetPasswordPage/ForgetPassword';
import SignUpPage from '../Modules/Users/SignUpPage/signup';
import LoginPage from '../Modules/Users/LoginPage/login';
import otpVerification from '../Modules/Users/OtpVerification/otpVerification';

const MainRoutes = () => {
    return (
        <Switch>
            <Route path='/otp-verify' component={otpVerification} />
            <Route path='/forgot-password' component={ForgetPasswordPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/dummy' component={DummyPage} />
            <Route path='' component={LoginPage} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    )
}

const AppRoutes = () => {
    return (
        <Switch>
            <Route path='/dummy' component={DummyPage} />
            <Route path='' component={LoginPage} />
            <Route path="*" component={DummyPage} />
        </Switch>
    )
}

export { MainRoutes, AppRoutes };