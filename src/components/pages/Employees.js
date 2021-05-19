import React, { useState, useEffect } from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../manage employees/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/manage employees/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/manage employees/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../manage employees/Popup";
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../manage employees/Notification";
import ConfirmDialog from "../manage employees/ConfirmDialog";
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    pageContent: {
        left: '300px',
        position: 'absolute',
        width: '75%'
        // margin: theme.spacing(5),
        // padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'mobile', label: 'Contact No' },
    // { id: 'department', label: 'Location Preference' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();

    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [tableState, setTableState] = useState(false)
    // setRecords(employeeService.getAllEmployees());
    useEffect(() => {
        Axios.get('http://ezrecoveryapi.herokuapp.com/getAllFieldStaffRecords')
            .then(res => {
                console.log(res.data.data)
                setRecords(res.data.data)
            })

    }, [tableState])
    console.log(records)
    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else {
                    return items.filter(x => {
                        if (x.name.toLowerCase().includes(target.value)) {
                            return x
                        }
                        else if (x.email.toLowerCase().includes(target.value)) {
                            return x
                        }
                        else if (x.contact_no.toLowerCase().includes(target.value)) {
                            return x
                        }
                    })
                }
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        Axios.post('http://ezrecoveryapi.herokuapp.com/insertFieldStaffRecords', {
            employee: employee
        }).then(res => {
            if (res.data.success) {
                setTableState(!tableState)
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
            }
            else {
                setNotify({
                    isOpen: true,
                    message: res.data.msg,
                    type: 'error'
                })
            }
        })
        resetForm()
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        Axios.post('http://ezrecoveryapi.herokuapp.com/deleteFieldStaff', {
            id: id
        }).then(res => {
            if (res.data.success)
                setTableState(!tableState)
        })
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
            // title="Add/Delete Field-Staff"
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <InputGroup style={{ width: "40rem", fontWeight: 'bold' }}>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="Search by Name, Email or Contact Number " onChange={handleSearch} />
                    </InputGroup>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
                    />
                </Toolbar>
                <TblContainer maxWidth="sm">
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.contact_no}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                {/* <TblPagination /> */}
            </Paper>
            <Popup
                title="Add/Delete Field-Staff"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
