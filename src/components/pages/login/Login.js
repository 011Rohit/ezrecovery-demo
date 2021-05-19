//import { logDOM } from '@testing-library/dom'
import React, { Component } from 'react'
//import './Login.css'
//import logo from "../../../../src/assets/logo.png"
// import { IconName } from "react-icons/fa";
import Axios from 'axios';
import cookies from 'js-cookie';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
// import { mdiAccount } from '@mdi/js'; 
//new
// import BgImage from ".../../../src/assets/signin.svg";
import BgImage from ".../../../src/assets/img/illustrations/signin.svg";
// import BgImage from ".../../../src/assets/img/illustrations/"
import { faBoxOpen, faChevronDown, faClipboard, faStore } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
            auth: false,
            type: '',
            role: 'Role',
            severity: '',
            message: '',
            open: false,
            vertical: 'top',
            horizontal: 'center',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleType = this.handleType.bind(this);

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false,
        })
    };


    isAuthenticated() {
        return this.state.auth;
    }
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        console.log("changing" + value)
        this.setState({
            [name]: value
        });
    }

    handleType(event) {
        console.log("changing" + event.target.value)

        this.setState({
            type: event.target.value
        });

        // if (event === "1") {
        //     this.setState({
        //         role: "Admin"
        //     });
        // } else if (event === "2") {
        //     this.setState({
        //         role: "Field staff"
        //     });
        // }
    }

    async handleSubmit(event) {
        event.preventDefault();
        // console.log("rohittt");
        try {
            if (this.state.username != '' && this.state.password != '' && this.state.type != '') {

                if (this.state.type === '1') {
                    const res = await Axios.post(
                        'http://ezrecoveryapi.herokuapp.com/login',
                        {
                            // method: "POST",
                            data: { username: this.state.username, password: this.state.password },
                        }
                    );
                    if (res.status === 200) {
                        this.props.setUsername(this.state.username);

                        localStorage.setItem('username', this.state.username);
                        this.props.setType(this.state.type);
                        localStorage.setItem('type', this.state.type);
                        this.setState({ redirect: true });

                        //   alert("success full");
                        let date = 1 / 48; //30 min
                        cookies.set('admin-token', res.data.token, {
                            expires: date,
                        });

                        console.log(cookie.get('admin-token'));

                        // this.props.history.push("/app");
                    }
                }//innder if
                else {


                    const res = await Axios.post(
                        'http://ezrecoveryapi.herokuapp.com/loginFieldStaff',
                        {
                            // method: "POST",
                            data: { username: this.state.username, password: this.state.password },
                        }
                    );
                    if (res.status === 200) {
                        this.props.setUsername(this.state.username);

                        localStorage.setItem('username', this.state.username);
                        localStorage.setItem('id', res.data.id);
                        this.props.setType(this.state.type);
                        localStorage.setItem('type', this.state.type);
                        this.setState({ redirect: true });

                        //alert("success full");
                        let date = 1 / 48; //30 min
                        cookies.set('admin-token', res.data.token, {
                            expires: date,
                        });

                        console.log(cookie.get('admin-token'));

                        // this.props.history.push("/app");
                    }
                }
            }
            else {
                //alert('Enter Credentials First');
                this.setState({
                    open: true,
                    message: "Enter credentials first",
                    severity: 'error'
                })
            }
        } catch (err) {

            console.log(err);
            if (err.response) {
                console.log(err.response);
                if (err.response.status === 401) {
                    //alert(err)
                    this.setState({
                        open: true,
                        message: "Invalid Credentials",
                        severity: 'error'
                    })
                }
            }
        }
    }

    render() {

        if (this.state.redirect == false) {
            return (
                <main>
                    <Snackbar anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }} open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity={this.state.severity}>
                            {this.state.message}
                        </Alert>
                    </Snackbar>
                    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                        <Container>
                            {/* <p className="text-center">
                      <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
                        <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
                      </Card.Link>
                    </p> */}
                            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                                <Col xs={12} className="d-flex align-items-center justify-content-center">
                                    <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                        <div className="text-center text-md-center mb-4 mt-md-0">
                                            <h3 className="mb-0">Sign in to EzRecovery</h3>
                                        </div>


                                        <div className="d-flex  justify-content-center align-items-center mt-4">
                                            <span className="fw-normal">
                                                {/* <Dropdown name="type" onSelect={this.handleType}>
                                                    <Dropdown.Toggle as={Button} variant="primary">
                                                        <FontAwesomeIcon icon={faClipboard} className="me-2" /> {this.state.role}
                                                        <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                                                        <Dropdown.Item eventKey="1">

                                                            Admin
                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">

                                                            Field-Staff
                        </Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown> */}

                                            </span>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" onChange={this.handleType} />
                                                <label class="form-check-label" for="inlineRadio1">Admin</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" onChange={this.handleType} />
                                                <label class="form-check-label" for="inlineRadio2">Field Staff</label>
                                            </div>
                                        </div>
                                        <Form className="mt-4">
                                            <Form.Group id="email" className="mb-4">
                                                <Form.Label>Username</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>
                                                        {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                                    </InputGroup.Text>
                                                    <Form.Control required name="username" type="email" onChange={this.handleChange} placeholder="Username" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Group id="password" className="mb-4">
                                                    <Form.Label>Password</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            {/* <FontAwesomeIcon icon={faUnlockAlt} /> */}
                                                        </InputGroup.Text>
                                                        <Form.Control required type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    {/* <Form.Check type="checkbox">
                                                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                                                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                                                    </Form.Check> */}
                                                </div>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" onClick={this.handleSubmit} className="w-100">
                                                Sign in
                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>


            );
        }

        else
            return (
                <Redirect push to='/app' />
            )

    }
}

export default Login

//to logout from the sytem after a certain time period we can again call an API from app.js for every request

