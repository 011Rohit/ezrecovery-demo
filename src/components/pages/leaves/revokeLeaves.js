import React, { useState, useEffect, Children } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import Axios from 'axios';
import ReactTooltip from 'react-tooltip'
import './addLeave.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import { Tooltip, OverlayTrigger } from '@themesberg/react-bootstrap';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function RevokeLeaves() {

    const [leaves, setLeaves] = useState([])
    const [leftLeaves, setLeftLeaves] = useState(0)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpen(false);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [calendarState, setCalendarState] = useState(false)

    const revokeLeaves = () => {
        setOpen(false)
        Axios.post('http://ezrecoveryapi.herokuapp.com/revokeLeaves', {
            start: startDate,
            end: endDate,
            id: localStorage.getItem('id'),
        })
            .then(res => {
                setCalendarState(!calendarState)
                setOpenSnackbar(true)
                if (res.data.success) {
                    setMessage(res.data.msg)
                    setSeverity("success")
                }
                else {
                    setMessage(res.data.msg)
                    setSeverity("error")
                }
            })
    }

    useEffect(() => {
        Axios.post('http://ezrecoveryapi.herokuapp.com/getLeaves', {
            id: localStorage.getItem('id'),
        }).then(res => {
            setLeaves(res.data.data)
            setLeftLeaves(res.data.left)
        })
            .catch(rej => console.log(rej))
    }, [calendarState])


    const hover = (info) => {
        info.el.setAttribute("data-tip", "ON LEAVE")
        ReactTooltip.rebuild();
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate() - 1),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <div className="addLeaveContainer">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Confirm REVOKING a leave?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NO
                        </Button>
                    <Button onClick={revokeLeaves} color="primary">
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            <div className="head">
                <h5 >Revoke Leaves</h5>
                <OverlayTrigger
                    placement="bottom"
                    trigger={['hover', 'focus']}
                    overlay={
                        <Tooltip>You have {leftLeaves} leaves remaining out of 20 annual leaves</Tooltip>
                    }>
                    <h5>Leaves Left = {leftLeaves}/20</h5>
                </OverlayTrigger>
            </div>
            <div className="addLeave">
                <FullCalendar
                    height={550}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: ''
                    }}
                    weekends={false}
                    events={leaves}
                    eventContent={() => {
                        return (
                            <ReactTooltip place="bottom" effect="float" backgroundColor="orange" textColor="black" >
                            </ReactTooltip>
                        );
                    }}
                    selectable={true}
                    eventMouseEnter={hover}
                    select={function (info) {
                        let end = formatDate(info.endStr)
                        setStartDate(info.startStr)
                        setEndDate(end)
                        if (end === info.startStr)
                            setMessage(`You have marked ${info.startStr} for REVOKING a leave! Are you sure you want to revoke a leave on this day?`)
                        else
                            setMessage(`You have marked a range from ${info.startStr} to ${end} for REVOKING a leave! Are you sure you want to REVOKE leaves on these days?`)
                        setOpen(true)
                    }}
                    selectAllow={function (info) {
                        let start = info.start
                        if (moment(start).isBefore(moment()))
                            return false;
                        return true;
                    }}
                />
            </div>
        </div>
    )
}

export default RevokeLeaves