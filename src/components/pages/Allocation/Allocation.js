import React, { Component } from 'react'
import Axios from 'axios';
import '../Allocation/AllocationStyle.css'
import Widget from "./widget"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class Allocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remainingRecords: '',
            availableEmp: [],
            todatAllocated: '',
            perFieldStaff: '',
            overall: '',
            outOfService: '',
            severity: '',
            message: '',
            open: false,
            visible: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const res = await Axios.get('http://ezrecoveryapi.herokuapp.com/getAllocationDetails');
        //console.log(res.data['AllocationDetails'][1])
        //const res2 = await Axios.get('http://ezrecoveryapi.herokuapp.com/getAllocationDetails2');


        this.setState({
            availableEmp: res.data['AllocationDetails'][0],

            remainingRecords: res.data['AllocationDetails'][1]['count'],
            overall: res.data['AllocationDetails'][2]['count'],
            todatAllocated: res.data['AllocationDetails'][3]['count'],
            outOfService: res.data['AllocationDetails'][4]['count']


        });


        if (this.state.todatAllocated != 0) {
            this.setState({
                visible: 'none'
            })
        }

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false,
        })
    };

    //validation for number input only

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {


        try {
            if (this.state.perFieldStaff === "") {
                //alert("please enter number first");
                this.setState({
                    open: true,
                    message: "Please enter a number first",
                    severity: 'error'
                })
            }
            else if (isNaN(this.state.perFieldStaff)) {
                // alert("please enter valid number");
                this.setState({
                    open: true,
                    message: "Please enter a valid number",
                    severity: 'error'
                })
            }
            else if ((this.state.remainingRecords ? this.state.remainingRecords : 0) < (this.state.perFieldStaff * this.state.availableEmp.length)) {

                // alert("sorry, please enter lesser value !! ");
                this.setState({
                    open: true,
                    message: "Please enter a value which is smaller than the entered value",
                    severity: 'error'
                })

            }
            else {
                const res = await Axios.post(
                    'http://ezrecoveryapi.herokuapp.com/xyz',
                    {
                        // method: "POST",
                        data: { perFieldStaff: this.state.perFieldStaff, availableEmp: this.state.availableEmp },
                    }
                );
                this.setState({
                    open: true,
                    message: "Allocation Successfull!",
                    severity: 'success'
                })
            }

        } catch (err) { }

    }



    render() {
        return (
            <div className="Allocation_wrapper">
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }} open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <div className="widget123">
                    <Widget outofService={this.state.outOfService ? this.state.outOfService : 0} overall={this.state.overall ? this.state.overall : 0} remaining={this.state.remainingRecords ? this.state.remainingRecords : 0} today={this.state.todatAllocated ? this.state.todatAllocated : 0} emp={this.state.availableEmp} />
                </div>
                <div className="AvailableEmployee" style={{ display: this.state.visible }}>
                    <h2 style={{ marginRight: '1', display: this.state.visible }}>Available for Allocation</h2>
                    {
                        this.state.availableEmp != 0 &&
                        <table class="styled-table1">
                            <thead style={{ textAlign: 'center' }}>
                                <th>ID</th>
                                <th>Name</th></thead>
                            <tbody>
                                {

                                    this.state.availableEmp.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>}
                </div>
                {/* <h1 id="text_align" >Allocation of Records (tickets)</h1>
                <div className="leftSide">

                    <h2 className="headingElement">Total Not Allocated Records = {this.state.remainingRecords}</h2>
                    <h2 className="headingElement">Records Allocated Today = {this.state.todatAllocated}</h2>

                    <div className="headingElement" id="textAndLabel">
                        <h2 id="allocationLabel">Per Field Staff Allocation</h2> <input className="allocationInput" type="text" name="perFieldStaff" placeholder="enter number" required value={this.state.perFieldStaff} onChange={this.handleChange}></input>

                    </div>
                    <button type="submit" onClick={this.handleSubmit}>Allocate</button>
                </div>

                <div className="AvailableEmployee"  >
                    <h2>Available for Allocation</h2>
                    <div className="remaining" >



                        <table class="styled-table1">
                            <thead>Emp_Name</thead>
                            <tbody>

                                {
                                    this.state.availableEmp.map(item => {
                                        return (
                                            <tr>
                                                {/* <td>{item.id}</td> */}
                {/* <td>{item.name}</td>
                                            </tr>
                                        )

                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div > */}
            </div >

        )
    }
}
