import { useState } from "react";
import "./App.css";
//import Main from "./components/main/Main";
// import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from "./components/pages/login/Login";
import { ProtectedRoute } from './protected.route'
import { Redirect } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import "./scss/volt.scss";

const App = () => {

  { document.title = "EzRecovery Dashboard" }
  //localStorage.clear()
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [type, setType] = useState(localStorage.getItem('type'));
  return (
    <div>
      {/* <Login></Login> */}
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => {
            if (username == null)
              return <Login setUsername={setUsername} setType={setType} />;
            else
              return <Redirect push to='/app' />;
          }
          }>
          </Route>
          <ProtectedRoute path='/app' isAuth={username} setUsername={setUsername} type={type} setType={setType} />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
