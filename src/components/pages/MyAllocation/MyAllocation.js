import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Allocation from '../Allocation/Allocation';
import '../MyAllocation/MyAllocationStyle.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup, Card, Nav, Tab, Form, InputGroup } from '@themesberg/react-bootstrap';
import { CircleChartWidget, CounterWidget } from "../../Widget/Widgets";
// import { Col, Row, Card, Nav, Tab, Form, InputGroup } from '@themesberg/react-bootstrap';

import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

export default class MyAllocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            field_staff_username: localStorage.getItem('username'),
            allAllocation: [],
            borrowerDetails: [],
            All: '',
            Done: ''


        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.detailPage = this.detailPage.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await Axios.post(
                'http://ezrecoveryapi.herokuapp.com/MyAllocation',
                {
                    // method: "POST",
                    data: { field_staff_username: this.state.field_staff_username },
                }
            );
            this.setState({
                allAllocation: res.data.MyAllocation[0],
                borrowerDetails: res.data.MyAllocation[1]
            })
            // alert(res.status)
            console.log(res.data['MyAllocation'][1]);
            console.log("only allocation " + this.state.allAllocation)
            console.log("borrowers id " + this.state.borrowerDetails);
        } catch (err) { }



    }

    //validation for number input only

    handleChange(event) {
        const value = event.target.innerText;

        if (value === "All Tickets") {
            // console.log(value + "all value")
            this.setState({
                All: '',
                Done: ''
            });
        } else if (value === "Done Tickets") {

            console.log(value + "done value")
            this.setState({
                All: 'none',
                Done: ''
            });
        }

        console.log('tickets my allocation' + event.target.event)

    }
    detailPage(id) {

        console.log(id);
        localStorage.setItem('borrower_id', id);
        this.props.history.push("/app/ticket");
        //  <Redirect push to='/app/import' />
    }

    async handleSubmit(event) {
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div className="MyAllocation_wrapper">

                {/* <span className="dropdown">
                    <select name="category" onChange={this.handleChange}>
                        <option value="" >select </option>
                        <option value="1">All tickets</option>
                        <option value="2">Done tickets</option>
                        {/* <option value="3">current ticket</option> */}
                {/* </select>

                </span>
                <p className="MyAllocation" > MY Allocation (tickets)</p> */}
                <Tab.Container defaultActiveKey="1">
                    <Nav fill variant="pills" className="flex-column flex-sm-row">
                        <Nav.Item>
                            <Nav.Link onClick={this.handleChange} eventKey="1" className="mb-sm-2 mb-md-0">
                                All Tickets
      </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={this.handleChange} eventKey="2" className="mb-sm-2 mb-md-0">
                                Done Tickets
      </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Tab.Container>

                {/* demo */}

                <div style={{ display: this.state.All }}>
                    {
                        this.state.allAllocation.map(item => {
                            // console.log(item.borrower_id, item.field_staff_id)

                            if (item.category === 1) {
                                return (
                                    <Row className="justify-content-md-center" style={{ cursor: 'pointer' }}>
                                        {
                                            this.state.borrowerDetails.map(b => {

                                                if (b.id === item.borrower_id) {
                                                    console.log(b.name)
                                                    return (

                                                        <Col xs={12} sm={6} xl={4} className="mb-4" onClick={() => this.detailPage(b.id)}>
                                                            <CounterWidget
                                                                category={b.name}
                                                                title={b.contact_no}
                                                                period={b.address}
                                                                percentage={this.numberWithCommas((b.debt_to_clear + b.charges).toFixed(2))}
                                                                icon={faChartLine}
                                                                iconColor="shape-secondary"
                                                            // faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield
                                                            />
                                                        </Col>
                                                    )
                                                }

                                            })//inner map

                                        }
                                    </Row>
                                )
                            }
                        })//outer map
                    }
                </div>


                {/* original */}
                {/* <div style={{ display: this.state.All }}>
                    {
                        this.state.allAllocation.map(item => {
                            console.log(item.borrower_id, item.field_staff_id)

                            // if (item.category === 1) {
                            return (
                                <div className="All" >
                                    {
                                        this.state.borrowerDetails.map(b => {

                                            if (b.id === item.borrower_id) {
                                                console.log(b.name)
                                                return (

                                                    <div className="cards" onClick={() => this.detailPage(b.id)}>
                                                        <div className="up">
                                                            <p className="left" id="special"> Loan No : {b.id}</p> <p className="right" id="done"> name : {b.name}</p>
                                                        </div>

                                                        <div className="down">
                                                            <p className="right remaining" id="done">{item.category == 1 ? ' remaining' : 'done'}</p>
                                                            <p className="left location"> Location : {b.address}</p>
                                                            <p class="iconify" data-icon="ion-md-cloud-done" data-inline="false"></p>
                                                        </div>
                                                    </div>

                                                )
                                            }

                                        })//inner map

                                    }
                                </div>
                            )
                            // }
                        })//outer map
                    }
                </div> */}

                <div style={{ display: this.state.Done }}>
                    {
                        this.state.allAllocation.map(item => {
                            // console.log(item.borrower_id, item.field_staff_id)

                            if (item.category === 2) {
                                return (
                                    <Row className="justify-content-md-center done" style={{ cursor: 'pointer' }}>
                                        {
                                            this.state.borrowerDetails.map(b => {

                                                if (b.id === item.borrower_id) {
                                                    console.log(b.name)
                                                    return (

                                                        <Col xs={12} sm={6} xl={4} className="mb-4" onClick={() => this.detailPage(b.id)}>
                                                            <CounterWidget
                                                                category={b.name}
                                                                title={b.contact_no}
                                                                period={b.address}
                                                                percentage={this.numberWithCommas((b.debt_to_clear + b.charges).toFixed(2))}
                                                                icon={faTasks}
                                                                iconColor="shape-secondary"
                                                            />
                                                        </Col>

                                                    )
                                                }

                                            })//inner map

                                        }
                                    </Row>
                                )
                            }
                        })//outer map
                    }
                </div>


                {/* original done */}
                {/* <div style={{ display: this.state.Done }}>
                    {
                        this.state.allAllocation.map(item => {
                            console.log(item.borrower_id, item.field_staff_id)

                            if (item.category == 2) {
                                return (
                                    <div className="All" >
                                        {
                                            this.state.borrowerDetails.map(b => {

                                                if (b.id === item.borrower_id) {
                                                    console.log(b.name)
                                                    return (

                                                        <div className="cards" onClick={() => this.detailPage(b.id)}>
                                                            <div className="up">
                                                                <p className="left" id="special"> Loan No : {b.id}</p> <p className="right" id="done"> name : {b.name}</p>
                                                            </div>

                                                            <div className="down">
                                                                <p className="right" id="done">Done</p>
                                                                <p className="left location"> Location : {b.address}</p>
                                                                <p className="left location"> contact no : {b.contact_no}</p>
                                                                <p class="iconify" data-icon="ion-md-cloud-done" data-inline="false"></p>
                                                            </div>
                                                        </div>

                                                    )
                                                }

                                            })//inner map

                                        }
                                    </div>
                                )
                            }


                        })//outer map

                    }
                </div> */}



            </div >

        )
    }
}
