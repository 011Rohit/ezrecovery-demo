import React, { Component } from 'react'
import Axios from 'axios';

import '../Ticket/TicketStyle.css'
import { CircleChartWidget, CounterWidget } from "../../Widget/Widgets";
import { Col, Row, Button, Dropdown, ButtonGroup, Card, Nav, Tab, Form, InputGroup } from '@themesberg/react-bootstrap';
import { faSignOutAlt, faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BasicTable from './table'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Borrower_data: [],
            status: '',
            special_note: '',
            category: '',
            severity: '',
            message: '',
            open: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false,
        })
    };

    async componentDidMount() {
        var id = localStorage.getItem('borrower_id');


        try {

            const r = await Axios.get(
                'http://ezrecoveryapi.herokuapp.com/getIsDone?id=' + id,

            );

            this.setState({
                category: r.data.Category.category

            })

            const res = await Axios.post(
                'http://ezrecoveryapi.herokuapp.com/getBorrowerById',
                {
                    // method: "POST",
                    data: { Borrower_id: id },
                }
            );
            this.setState({
                Borrower_data: res.data.Borrower_data
            })

            console.log(r)
        } catch (err) {

        }


        console.log("category = " + this.state.category)
        console.log(this.state.Borrower_data)


    }

    //validation for number input only


    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {


        if (this.state.special_note === "" || this.state.status === "") {
            //alert("Fill the information first and then submit");
            this.setState({
                open: true,
                message: "Fill the information first and then submit",
                severity: 'error'
            })

        } else {
            try {
                console.log(this.state.status)
                console.log(this.state.special_note)
                const res = await Axios.post(
                    'http://ezrecoveryapi.herokuapp.com/updateStatus',
                    {
                        data: { Borrower_id: localStorage.getItem('borrower_id'), status: this.state.status, special_note: this.state.special_note },
                    }
                );
                this.setState({
                    open: true,
                    message: res.status,
                    severity: 'success'
                })

            } catch (err) { }
        }
    }


    render() {
        return (
            <div className="content">
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }} open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <div className="Ticket_wrapper">
                    {/* <p className="psize">Particular Ticket</p>
                    <div className="ticketdropdown">
                        <div id="one">
                            status : <select name="status" required onChange={this.handleChange} >
                                <option value="">None</option>
                                <option value="Paid">Paid</option>
                                <option value="ptp">Promise to Pay</option>
                                <option value="notAvailable">not Available</option>
                            </select>
                        </div>
                        <br></br>
                        <div id="on">
                            special note : <input type="textfield" name="special_note" required onChange={this.handleChange}></input>
                        </div>
                    </div>
                    {this.state.Borrower_data.map(item => {
                        return (
                            <div className="borrower_container">
                                <p className="borrowerdetails">Loan No : {item.id}</p>
                                <p className="borrowerdetails">Name : {item.name}</p>
                                <p className="borrowerdetails">Address : {item.address}</p>
                                <p className="borrowerdetails">Contact No. : {item.contact_no}</p>
                                <p className="borrowerdetails">Alternate No.: {item.contact_no_1}</p>
                                <p className="borrowerdetails">Bank Name :  {item.bank_name}</p>
                                <p className="borrowerdetails">Current Status:  {item.status}</p>
                                <p className="borrowerdetails">Debt money :  {item.debt_to_clear}</p>
                                <p className="borrowerdetails">total : {item.debt_to_clear}</p> */}
                    {/* <p>{item.}</p> */}

                    {/* </div>
                        )
                    }
                    )}
                    <hr className="HR"></hr>
                    <div className="resonsive-ticketdropdown  ">
                        <span>  status : <select name="status" required onChange={this.handleChange} >
                            <option value="">None</option>
                            <option value="Paid">Paid</option>
                            <option value="ptp">Promise to Pay</option>
                            <option value="notAvailable">not Available</option>
                        </select>
                        </span>
                        <br></br>
                        <span className="special_note">
                            special note : <input type="textfield" name="special_note" required onChange={this.handleChange}></input>
                        </span>
                    </div>
                    <button className="ticketbutton" type="submit" onClick={this.handleSubmit}>Done</button> */}
                    <Card className="bg-secondary-alt shadow-sm">
                        <Card.Header className="d-flex flex-row align-items-center flex-0">
                            <div className="d-block">
                                <h5 className="fw-normal mb-2">
                                    Ticket Details
          </h5>
                            </div>
                        </Card.Header>
                        {/* <CounterWidget> */}
                        <Card.Body className="p-2">

                            {/* <div className="ticketdropdown">
        <div id="one">
            Status : 
            <div className="d-flex">
          <Dropdown name="status" required onChange={this.handleChange}>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" value=""/> None
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" value="Paid" /> Paid
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" value="ptp"/> Promise To Pay
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" value="notAvailable"/> Not Available
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
            {/* <select name="status" required onChange={this.handleChange} >
                <option value="">None</option>
                <option value="Paid">Paid</option>
                <option value="ptp">Promise to Pay</option>
                <option value="notAvailable">Not Available</option>
            </select> */}
                            {/* </div>
        <br></br>
        <div id="on">
            Special Note : <input type="textfield"  name="special_note" required onChange={this.handleChange}></input>
        </div>
    </div> */}


                            {this.state.Borrower_data.map(item => {

                                return (
                                    <div className="borrower_container">
                                        {/* <p className="borrowerdetails">Loan No : {item.id}</p>
                <p className="borrowerdetails">Name : {item.name}</p>
                <p className="borrowerdetails">Address : {item.address}</p>
                <p className="borrowerdetails">Contact No. : {item.contact_no}</p>
                <p className="borrowerdetails">Alternate No.: {item.contact_no_1}</p>
                <p className="borrowerdetails">Bank Name :  {item.bank_name}</p>
                <p className="borrowerdetails">Current Status:  {item.status}</p>
                <p className="borrowerdetails">Debt money :  {item.debt_to_clear}</p>
                <p className="borrowerdetails">Total : {item.debt_to_clear}</p>  */}
                                        {/* <p>{item.}</p> */}
                                        {/* <div className="ticketdropdown">
                <div id="one">
            Status : 
             <div className="d-flex">
          <Dropdown name="status" required onChange={this.handleChange}>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" value=""/> None
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" value="Paid" /> Paid
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" value="ptp"/> Promise To Pay
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" value="notAvailable"/> Not Available
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
                                        {/* <select name="Status" required onChange={this.handleChange} >
                <option value="">None</option>
                <option value="Paid">Paid</option>
                <option value="ptp">Promise to Pay</option>
                <option value="notAvailable">Not Available</option>
            </select> */}
                                        {/* </div>
        <br></br>
        <div id="on">
            Special Note : <input type="textfield"  name="special_note" required onChange={this.handleChange}></input>
        </div>
    </div>
            <Button variant="primary" size="large" className="me-2" onClick={this.handleSubmit}> 
            Done
          </Button>

            */}

                                        {   this.state.category === 2 ? <h1 style={{ textAlign: "center" }}>You have already submited it</h1> : <div><BasicTable Data={this.state.Borrower_data} ></BasicTable></div>}
                                    </div>


                                )


                            }

                            )}
                            <hr className="HR"></hr>

                            <div className="resonsive-ticketdropdown  ">

                                <span>  Status : <select name="status" required onChange={this.handleChange} >
                                    <option value="">None</option>
                                    <option value="Paid">Paid</option>
                                    <option value="ptp">Promise to Pay</option>
                                    <option value="notAvailable">Not Available</option>
                                </select>
                                </span>
                                <br></br>
                                <span className="special_note">
                                    Special Note : <input type="textfield" name="special_note" required onChange={this.handleChange}></input>
                                </span>
                            </div>

                        </Card.Body>
                        {/* </ CounterWidget > */}
                    </Card>

                </div >
            </div>
        )


    }
}