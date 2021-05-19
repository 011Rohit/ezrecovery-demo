import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup, Card, Nav, Tab, Form, InputGroup } from '@themesberg/react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { Routes } from "../../../routes";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    minWidth: 440,
    height: '600px'
  },
});

export default function BasicTable(props) {

  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const classes = useStyles();
  const [status, setStatus] = useState("Select Status")
  const [special_note, setSpecialNote] = useState("")


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  };

  function handleSelect(event) {

    if (event === "1") {
      setStatus("Paid");
    } else if (event === "2") {
      setStatus("Ptp");
    } else if (event === "3")
      setStatus("Not Available")
  }

  function handleChange(event) {

    console.log(event.target.value)
    setSpecialNote(event.target.value)

  }

  function handleSubmit(event) {




    console.log(localStorage.getItem('borrower_id'))
    if (special_note === "" || status === "choose status") {
      //alert("Fill the information first and then submit");
      setOpen(true)
      setMessage("Fill the information first and then submit")
      setSeverity('error')

    } else {
      try {

        const res = Axios.post(
          'http://ezrecoveryapi.herokuapp.com/updateStatus',
          {

            data: { Borrower_id: localStorage.getItem('borrower_id'), status: status, special_note: special_note },
          }
        );

        //alert("done")
        setOpen(true)
        setMessage("Done!")
        setSeverity('success')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } catch (err) { }
    }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <TableContainer component={Paper}>
      {console.log(props.Data)}
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.Data.map((row) => (
            <>
              <TableRow key={row.id}>
                <TableCell align="left" component="th" scope="row"> Loan No </TableCell>
                <TableCell align="right">{row.id}</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell component="th" scope="row"> Name </TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell component="th" scope="row"> Bank Name </TableCell>
                <TableCell align="right">{row.bank_name}</TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell component="th" scope="row"> Contact No </TableCell>
                <TableCell align="right">+91-{row.contact_no}</TableCell>
              </TableRow>
              <TableRow key={5}>
                <TableCell component="th" scope="row"> Alternate no </TableCell>
                <TableCell align="right">+91-{row.contact_no_1}</TableCell>
              </TableRow>
              <TableRow key={6}>
                <TableCell component="th" scope="row"> Debt </TableCell>
                <TableCell align="right">₹ {numberWithCommas(row.debt_to_clear.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow key={7}>
                <TableCell component="th" scope="row"> Charges </TableCell>
                <TableCell align="right">₹ {numberWithCommas(row.charges.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow key={9}>
                <TableCell component="th" scope="row"> Total Debt </TableCell>
                <TableCell align="right">₹ {numberWithCommas((row.debt_to_clear + row.charges).toFixed(2))}</TableCell>
              </TableRow>
              <TableRow key={8}>
                <TableCell component="th" scope="row"> Status </TableCell>
                <TableCell align="right">
                  <div className="d-flex" style={{ marginLeft: "10rem" }}>
                    <Dropdown name="status" required onSelect={handleSelect}>
                      <Dropdown.Toggle as={Button} variant="primary">
                        <FontAwesomeIcon className="me-2" value="" align="right" /> {status}
                        <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
                        <Dropdown.Item eventKey="1">
                          <FontAwesomeIcon className="me-2" value="Paid" /> Paid
              </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          <FontAwesomeIcon className="me-2" value="ptp" /> Promise To Pay
              </Dropdown.Item>
                        <Dropdown.Item eventKey="3">
                          <FontAwesomeIcon className="me-2" value="notAvailable" /> Not Available
              </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow key={8}>
                <TableCell component="th" scope="row"> Special Note </TableCell>
                <TableCell align="center">
                  <textarea rows="3" cols="40" name="special_note" required onChange={handleChange}> </textarea>
                </TableCell>
              </TableRow>
              <TableRow key={8}>
                <TableCell align="center"></TableCell>

                <TableCell component="th" scope="row">
                  <Button as={Link} variant="primary" className="animate-hover" to={Routes.Myallocation.path}>
                    <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Back
                </Button>
                  -
                  <Button variant="primary" size="large" className="me-2" onClick={handleSubmit} >Done</Button>

                </TableCell>
              </TableRow>
            </>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
