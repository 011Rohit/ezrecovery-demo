import React, { Component, useState } from 'react'
import Axios from 'axios';
import '../view_records/Style.css'
import { FaSearch } from 'react-icons/fa';
import Fuse from "fuse.js";
import { Col, Row, Card, Nav, Tab, Form, InputGroup } from '@themesberg/react-bootstrap';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@themesberg/react-bootstrap';
import ImportRecords from './importRecords'
import MuiTable from './muitable'


export default class View_records extends Component {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    constructor(props) {
        super(props);
        this.state = {
            records: [],
            data: [],
            temp: true,
            remaining: '',
            allocated: 'none',
            ofs: 'none',
            all: 'none',
            dataState: false,
            unallocatedRecords: [],
            allocatedRecords: [],
            outOfServiceRecords: []
        };

        this.display = this.display.bind(this);
        this.searchData = this.searchData.bind(this);

    }

    async getArrays(records) {
        let unallocated = []
        let allocated = []
        let oos = []
        records.map(borrower => {
            if (borrower.category == 1) {
                let value = {
                    id: borrower.id,
                    name: borrower.name,
                    bank_name: borrower.bank_name,
                    address: borrower.address,
                    contact_no: borrower.contact_no,
                    debt_to_clear: borrower.debt_to_clear,
                    charges: borrower.charges
                }
                unallocated.push(value)
            }
            else if (borrower.category == 2) {
                let value = {
                    id: borrower.id,
                    name: borrower.name,
                    bank_name: borrower.bank_name,
                    address: borrower.address,
                    contact_no: borrower.contact_no,
                    debt_to_clear: borrower.debt_to_clear,
                    charges: borrower.charges
                }
                allocated.push(value)
            }
            else if (borrower.category == 3) {
                let value = {
                    id: borrower.id,
                    name: borrower.name,
                    bank_name: borrower.bank_name,
                    address: borrower.address,
                    contact_no: borrower.contact_no,
                    debt_to_clear: borrower.debt_to_clear,
                    charges: borrower.charges
                }
                oos.push(value)
            }
        })
        return { unallocated, allocated, oos }
    }

    async componentDidMount() {

        const res = await Axios.get('http://ezrecoveryapi.herokuapp.com/getAllRecords');
        //console.log(res)
        if (res.data.records) {
            this.setState({
                dataState: true
            })
        }
        this.setState({
            records: res.data.records,
            data: res.data.records,
        });

        const result = await this.getArrays(res.data.records)
        this.setState({
            allocatedRecords: result.allocated,
            unallocatedRecords: result.unallocated,
            outOfServiceRecords: result.oos
        })
    }

    display(event) {
        console.log(event.target.innerText)
        if (event.target.innerText === 'Unallocated') {
            this.setState({
                allocated: 'none',
                ofs: 'none',
                remaining: ''
            })
        } else if (event.target.innerText === 'Allocated') {
            this.setState({
                allocated: '',
                ofs: 'none',
                remaining: 'none'
            })
        }
        else {
            this.setState({
                allocated: 'none',
                ofs: '',
                remaining: 'none'
            })
        }
    }

    searchData(pattern) {
        if (!pattern) {
            this.setState({
                data: this.state.records,
                all: 'none',
                remaining: '',
                ofs: 'none',
                allocated: 'none'
            });

            return;
        }

        var filtered;
        if (isNaN(pattern)) {
            filtered = this.state.records.filter(items => {
                if (items.name != null) {
                    return items.name.toLowerCase().includes(pattern.toLowerCase())
                }
            })
        }
        else {
            console.log(pattern)
            filtered = this.state.records.filter(items => {
                return parseInt(items.id) == Number(pattern);
            })

        }
        //setInput(input);
        // setCountryList(filtered);

        this.setState({
            data: filtered,

            all: '',
            remaining: 'none',
            ofs: 'none',
            allocated: 'none'
        })
        // const fuse = new Fuse(this.state.data, {
        //     keys: ["id", "name"],
        // });

        // const result = fuse.search(pattern);
        // const matches = [];
        // if (!result.length) {
        //     this.setState({
        //         data: [],

        //     });
        // } else {
        //     result.forEach(({ item }) => {
        //         matches.push(item);
        //     });
        //     this.setState({
        //         data: matches,
        //         all: '',
        //         remaining: 'none',
        //         ofs: 'none',
        //         allocated: 'none'
        //     });

        // }
    };



    render() {

        return (
            <>
                {this.state.dataState &&
                    <div className="view_record_wrapper">
                        <ImportRecords />
                        <div class="Row" id="text_align">
                            <Tab.Container defaultActiveKey="unallocated">
                                <Nav fill variant="pills" className="flex-column flex-sm-row">
                                    <Nav.Item>
                                        <Nav.Link onClick={this.display} eventKey="unallocated" className="mb-sm-3 mb-md-0">
                                            Unallocated
                                </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={this.display} eventKey="allocated" className="mb-sm-3 mb-md-0">
                                            Allocated
          </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={this.display} eventKey="out_of_service" className="mb-sm-3 mb-md-0">
                                            Out of Service
          </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Tab.Container>
                        </div>
                        <div className="Search">
                            <InputGroup  >
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => this.searchData(e.target.value)} placeholder="Search by Name or Loan Number" />
                            </InputGroup>
                            {/* <span className="SearchSpan">
                        <FaSearch />
                    </span>
                    <input
                        className="SearchInput"
                        type="text"
                        onChange={(e) => this.searchData(e.target.value)}
                        placeholder="type Loan no or name to search"
                    /> */}
                        </div>
                        {/*-------------------- for unallocate------------------- */}

                        <div style={{ display: this.state.remaining }} >
                            <table class="styled-table">
                                <MuiTable viewRecordsArray={this.state.unallocatedRecords} />
                                {/* <thead>
                                    <tr>
                                        <th>Loan No.</th>
                                        <th>Name</th>
                                        <th>Bank</th>

                                        <th>Address</th>
                                        <th>Contact No</th>
                                        <th>Debt</th>

                                        <th>Charges</th>
                                        <th>Status</th>
                                    </tr>
                                </thead> */}
                                {/* <tbody>

                                    {
                                        this.state.records.map(borrower => {
                                            if (borrower.category == 1) {

                                                if (this.state.temp == true)
                                                    this.setState({
                                                        temp: false
                                                    })
                                                return (
                                                    <tr>
                                                        <td>{borrower.id}</td>
                                                        <td>{borrower.name}</td>

                                                        <td>{borrower.bank_name}</td>
                                                        <td>{borrower.address}</td>
                                                        <td>{borrower.contact_no}</td>
                                                        <td>{borrower.debt_to_clear}</td>
                                                        <td>{borrower.charges}</td>
                                                        <td>{borrower.status}</td> */}
                                {/* </tr> */}
                                {/* )
                                            }
                                        })
                                    }
                                    <b>{this.state.temp ? 'There is no data ' : ''}</b>

                                </tbody> */}
                            </table>
                        </div>
                        {/*--------- /*for allocated ------------------- */}

                        <div style={{ display: this.state.allocated }} >



                            <table class="styled-table">
                                <MuiTable viewRecordsArray={this.state.allocatedRecords} />
                                {/* <thead>
                                    <tr>
                                        <th>Loan No.</th>
                                        <th>Name</th>
                                        <th>Bank</th>

                                        <th>Address</th>
                                        <th>Contact No</th>
                                        <th>Debt</th>

                                        <th>Charges</th>
                                        <th>Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.records.map(borrower => {
                                            if (borrower.category == 2) {

                                                if (this.state.temp == true)
                                                    this.setState({
                                                        temp: false
                                                    })
                                                return (
                                                    <tr>
                                                        <td>{borrower.id}</td>
                                                        <td>{borrower.name}</td>

                                                        <td>{borrower.bank_name}</td>
                                                        <td>{borrower.address}</td>
                                                        <td>{borrower.contact_no}</td>
                                                        <td>{borrower.debt_to_clear}</td>
                                                        <td>{borrower.charges}</td>
                                                        <td>{borrower.status}</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    <b>{this.state.temp ? 'There is no data ' : ''}</b>

                                </tbody> */}
                            </table>
                        </div>


                        {/* for out of service */}



                        <div style={{ display: this.state.ofs }} >



                            <table class="styled-table">
                                <MuiTable viewRecordsArray={this.state.outOfServiceRecords} />
                                {/* <thead>
                                    <tr>
                                        <th>Loan No.</th>
                                        <th>Name</th>
                                        <th>Bank</th>

                                        <th>Address</th>
                                        <th>Contact No</th>
                                        <th>Debt</th>

                                        <th>Charges</th>
                                        <th>Status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.records.map(borrower => {
                                            if (borrower.category == 3) {

                                                if (this.state.temp == true)
                                                    this.setState({
                                                        temp: false
                                                    })
                                                return (
                                                    <tr>
                                                        <td>{borrower.id}</td>
                                                        <td>{borrower.name}</td>

                                                        <td>{borrower.bank_name}</td>
                                                        <td>{borrower.address}</td>
                                                        <td>{borrower.contact_no}</td>
                                                        <td>{borrower.debt_to_clear}</td>
                                                        <td>{borrower.charges}</td>
                                                        <td>{borrower.status}</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                    <b>{this.state.temp ? 'There is no data ' : ''}</b>

                                </tbody> */}
                            </table>
                        </div>


                        {/* for search items  */}
                        <div style={{ display: this.state.all }} >



                            <table class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Loan No.</th>
                                        <th>Name</th>
                                        <th>Bank</th>

                                        <th>Address</th>
                                        <th>Contact No</th>
                                        <th>Debt</th>

                                        <th>Charges</th>
                                        <th>Status</th>
                                        {/* <th>category</th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.data.map(borrower => {
                                            // if (borrower.category == 3) {

                                            // if (this.state.temp == true)
                                            //     this.setState({
                                            //         temp: false
                                            //     })
                                            return (
                                                <tr>
                                                    <td>{borrower.id}</td>
                                                    <td>{borrower.name}</td>

                                                    <td>{borrower.bank_name}</td>
                                                    <td>{borrower.address}</td>
                                                    <td>{borrower.contact_no}</td>
                                                    <td>{borrower.debt_to_clear}</td>
                                                    <td>{borrower.charges}</td>
                                                    <td>{borrower.status}</td>
                                                    {/* <td>{borrower.category}</td> */}


                                                </tr>
                                            )
                                            // }
                                        })
                                    }
                                    <b>{this.state.temp ? 'There is no data ' : ''}</b>

                                </tbody>
                            </table>
                        </div>



                        {/* <div >
                    <div className="tbl-content" style={{ display: this.state.all }} >
                        <table cellPadding="0" cellSpacing="0" border="0">
                            {
                                this.state.data.map(borrower => {

                                    return (
                                        <tr>
                                            <td>{borrower.name}</td>

                                        </tr>
                                    )

                                })
                            }
                            <b>{this.state.temp ? 'There is no data ' : ''}</b>
                        </table>
                    </div>
                        </div> */}
                    </div >
                }
                {!this.state.dataState &&
                    <div className="view_record_wrapper">
                        <ImportRecords />
                        <h3>The Records have not been imported yet! Please import the records first to view the records!</h3>
                    </div>
                }
            </>
        )

    }
}
