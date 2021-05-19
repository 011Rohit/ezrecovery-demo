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

function AddLeave() {

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

    const insertLeaves = () => {
        setOpen(false)
        Axios.post('http://ezrecoveryapi.herokuapp.com/insertLeaves', {
            start: startDate,
            end: endDate,
            id: localStorage.getItem('id'),
        }).then(res => {
            setCalendarState(!calendarState)
            setOpenSnackbar(true)
            if (res.data.success) {
                setMessage("Leave added successfully!")
                setSeverity("success")
            }
            else {
                if (res.data.limit) {
                    setMessage(`Leaves limit exceeded! You have opted for ${res.data.exceedNumber} extra leave(s) which cannot be granted! Please contact the admin!`)
                    setSeverity("error")
                }
                else {
                    let data = res.data.data
                    let string = ''
                    for (let i = 0; i < data.length; i++) {
                        string += JSON.stringify(data[i])
                    }
                    setMessage("You have already taken leave(s) on" + string + "Please select some other days!")
                    setSeverity("error")
                }
            }
        })
    }

    useEffect(() => {
        Axios.post('http://ezrecoveryapi.herokuapp.com/getLeaves', {
            id: localStorage.getItem('id'),
        }).then(res => {
            //setCalendarState(!calendarState)
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
                <DialogTitle id="alert-dialog-slide-title">{"Confirm taking a leave?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NO
                        </Button>
                    <Button onClick={insertLeaves} color="primary">
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
                <h5 >Add Leaves</h5>
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
                    weekends={false}
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: ''
                    }}
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
                            setMessage(`You have marked ${info.startStr} for taking a leave! Are you sure you want to take a leave on this day?`)
                        else
                            setMessage(`You have marked a range from ${info.startStr} to ${end} for taking a leave! Are you sure you want to take a leaves on these days?`)

                        setOpen(true)
                    }}
                    selectAllow={function (info) {
                        let start = info.start
                        if (moment(start).isBefore(moment()))
                            return false;
                        return true;
                    }}
                />
                {/* <br /><br /><br /> */}
                {/* <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /> */}
                {/* <Button onClick={insertLeaves}> Submit Here</Button> */}
            </div>

        </div>

    )
}

export default AddLeave









// class CalendarLeaves extends React.Component {


//     state = {
//         weekendsVisible: true,
//         currentEvents: []
//     }
//     // componentDidMount() {
//     //     this.handleDateSelect()
//     // }


//     render() {
//         return (
//             <div className='calendar'>
//                 <FullCalendar
//                     //height={650}
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                     headerToolbar={{
//                         left: 'prev,next,today',
//                         center: 'title',
//                         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                     }}
//                     initialView='dayGridMonth'
//                     editable={true}
//                     selectable={true}
//                     selectMirror={true}
//                     dayMaxEvents={true}
//                     weekends={this.state.weekendsVisible}
//                     initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//                     select={this.handleDateSelect}
//                     eventChange={this.handleDateSelect}
//                     eventContent={() => {
//                         return (
//                             <ReactTooltip place="bottom" effect="float" backgroundColor="black" textColor="white" >
//                             </ReactTooltip>
//                         );
//                     }}
//                     eventMouseEnter={this.hover}
//                     eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//                     weekends={false}
//                 />
//             </div>
//         )
//     }

//     hover(info) {
//         //console.log(events)
//         info.el.setAttribute("data-tip", "ON LEAVE")
//         ReactTooltip.rebuild();
//     }

//     handleDateSelect = (selectInfo) => {
//         //console.log("Anish")
//         Axios.post("http://localhost:3001/getLeaves", {
//             eno: 1,
//         }).then(response => {
//             var res = response.data;
//             res.map((value) => {
//                 var title = value.emp_name;
//                 var start = value.start_date;
//                 var end = value.end_date;
//                 var t = new Date(end);
//                 t.setDate(t.getDate() + 1);
//                 let calendarApi = selectInfo.view.calendar
//                 if (res) {
//                     calendarApi.addEvent({
//                         title: title,
//                         start: start,
//                         end: t,
//                         backgroundColor: "blue",
//                         display: "background",
//                         allDay: selectInfo.allDay
//                     })
//                 }
//             })

//         })

//     }
//     handleEvents = (events) => {
//         this.setState({
//             currentEvents: events
//         })
//     }

// }



// export default CalendarLeaves;


// import React from 'react'
// import FullCalendar, { formatDate } from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import Axios from 'axios';
// import ReactTooltip from 'react-tooltip'
// import './calender.css'

// class CalendarLeaves extends React.Component {
//     state = {
//         count: 0,
//     }

//     render() {
//         return (
//             <div className='calendar'>
//                 <FullCalendar
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                     headerToolbar={{
//                         left: 'prev,next,today',
//                         center: 'title',
//                         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                     }}
//                     events={this.state.data}
//                     initialView='dayGridMonth'
//                     editable={true}
//                     selectMirror={true}
//                     select={this.handleDateSelect}
//                     eventContent={() => {
//                         return (
//                             <ReactTooltip place="bottom" effect="float" backgroundColor="black" textColor="white" >
//                             </ReactTooltip>
//                         );
//                     }}
//                     eventMouseEnter={this.hover}
//                     weekends={false}
//                     events={this.state.data}
//                 />
//             </div>
//         )
//     }


//     componentDidMount() {
//         this.handleDateSelect()
//     }

//     componentDidUpdate(prevState) {
//         // if (this.state.count != prevState.count) {
//         // this.handleDateSelect()
//         console.log(prevState.count)
//         console.log("Update")
//     }

//     hover(info) {
//         info.el.setAttribute("data-tip", "YOU ARE ON LEAVE HERE!")
//         ReactTooltip.rebuild();
//     }

//     handleDateSelect = () => {
//         console.log(this.state.count)
//         var array;
//         Axios.post("http://localhost:3001/getLeaves", {
//             eno: 1,
//         }).then(response => {

//             if (this.state.count == 0)
//                 array = []
//             else
//                 array = this.state.data

//             var res = response.data;

//             res.map((value) => {
//                 var title = value.emp_name;
//                 var start = value.start_date;

//                 var end = value.end_date;
//                 var t = new Date(end);
//                 t.setDate(t.getDate() + 1);
//                 console.log(end)
//                 array.push({ title: title, start: start, end: t, backgroundColor: "blue", display: "background" })
//             })
//             this.setState({
//                 data: array,
//                 count: this.state.count + 1,
//             })
//         })

//     }

// }
// export default CalendarLeaves;