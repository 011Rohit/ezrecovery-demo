import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faneos, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar, Form } from '@themesberg/react-bootstrap';
// import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ProgressTrackWidget(props) {

  const validate = () => {
    if (numberValue === 0 || numberValue === "") {
      setOpen(true)
      setMessage("Please input a number first")
      setSeverity('error')
    } else if (isNaN(numberValue) || numberValue < 0) {

      //alert("please enter valid number");
      setOpen(true)
      setMessage("Please enter a valid number")
      setSeverity('error')
    }
    else if (props.remaining < (numberValue * props.emp.length)) {
      console.log("ff")
      //alert("sorry, please enter lesser value !! ");
      setOpen(true)
      setMessage("Please enter a value which is less than the current entered value!")
      setSeverity('error')

    } else {

      // alert("ok");
      try {
        const res = Axios.post(
          'http://localhost:3001/xyz',
          {
            // method: "POST",
            data: { perFieldStaff: numberValue, availableEmp: props.emp },
          }
        );
        setOpen(true)
        setMessage("Allocation Successfull!")
        setSeverity('success')

        setTimeout(() => {
          window.location.reload(false);
        }, 2000);

      } catch (err) { }
    }
  }


  // const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('')
  const [numberValue, setNumberValue] = useState(0)

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const Progress = (props) => {
    const { title, overall, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} </span>
              </small>
            </div>
            {/* {console.log(props.overall + "overall")} */}
            <ProgressBar variant={color} now={percentage} min={0} max={overall} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light">
          <h5 className="mb-0" >Allocation of Records(Tickets)</h5>
        </Card.Header>
        <Card.Body>
          <Progress title="Total Not Allocated Records = " color="tertiary" overall={props.overall} percentage={props.remaining} />
          <br />
          <Progress title="Records Allocated Today" color="info" overall={props.overall} percentage={props.today} />
          <br />
          {/* <Progress title="Spaces - Listings Template" color="tertiary" icon={faVuejs} percentage={45} />
          <Progress title="Stellar - Dashboard" color="info" icon={faReact} percentage={35} />
          <Progress last title="Volt - Dashboard" color="purple" icon={faBootstrap} percentage={34} /> */}
          <br />
          <Form.Group id="phone">
            <Form.Label>Enter the number of borrowers to be allocated!</Form.Label>
            <br />
            <Form.Control required type="text" placeholder="enter number of tickets allocated to each field_staff" value={numberValue} onChange={(e) => setNumberValue(e.target.value)} />
          </Form.Group>
          <br /><br />
          <center><Button onClick={validate} variant="primary" type="submit">Allocate</Button></center>
        </Card.Body>
      </Card>
    </>
  );
};