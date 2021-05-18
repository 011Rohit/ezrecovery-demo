import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { Routes } from "../../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from '@themesberg/react-bootstrap';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#006eb2',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const rows = [

];

const useStyles = makeStyles({
    table: {
        minWidth: 375,
        maxWidth: 800,
        align: 'center'
    },
    tablecontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridArea: 'main',
    }
});

export default function DetailsMonitor(props) {

    //console.log(props.match.params.id)
    const id = props.match.params.id

    const [details, setDetails] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        Axios.post('http://localhost:3001/getDetailsForPerticularFieldStaff', {
            id: id
        })
            .then(res => {
                setDetails(res.data.data)
                setTotal(() => {
                    let total = 0
                    res.data.data.map(value => {
                        return (total += value.collected)
                    })
                    return total
                })
            })
    }, [])

    const classes = useStyles();

    return (
        <center>
            <TableContainer className={classes.tablecontainer} component={Paper}>

                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Loan No.</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Bank Name</StyledTableCell>
                            <StyledTableCell align="center">Total Debt(in Rs.)</StyledTableCell>
                            <StyledTableCell align="center">Collected Debt (in Rs.)</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.map((detail) => (
                            <StyledTableRow key={detail.id}>
                                <StyledTableCell align="center">{detail.id}</StyledTableCell>
                                <StyledTableCell align="center">{detail.name}</StyledTableCell>
                                <StyledTableCell align="center">{detail.bank_name}</StyledTableCell>
                                <StyledTableCell align="center">{detail.totalDebt}</StyledTableCell>
                                <StyledTableCell align="center">{detail.collected}</StyledTableCell>
                                <StyledTableCell align="center">{detail.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <StyledTableCell>Total Collected Amount = {total}</StyledTableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

            </TableContainer>

            <Dropdown.Divider className="my-3 border-indigo" />

            <Button as={Link} variant="primary" className="animate-hover" to={Routes.Monitor.path}>
                <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Go back
                </Button>
        </center>
    );
}
