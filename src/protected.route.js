import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard'


// setEmpid={Rest.setEmpid} emp_name={Rest.emp_name}

export const ProtectedRoute = ({ isAuth: isAuth, type: type, ...Rest }) => {
    return (
        <Route
            render={() => {
                console.log(type + "in pro")
                if (isAuth != null) {
                    return <Dashboard username={isAuth} setUsername={Rest.setUsername} type={type} setType={Rest.setType} />;
                }
                else {
                    return <Redirect to='/' />;
                }
            }
            }
        />
    );
};