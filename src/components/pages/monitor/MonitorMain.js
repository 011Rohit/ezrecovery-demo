import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CardMonitor from './CardMonitor'
import DetailsMonitor from './DetailsMonitor'



function MonitorMain() {
    return (
        <Router>
            <Switch>
                <Route exact path='/app/monitor/cardMonitor' component={CardMonitor} />
                <Route exact path='/app/monitor/details/:id/:name' component={DetailsMonitor} />
            </Switch>
        </Router>
    )
}

export default MonitorMain
