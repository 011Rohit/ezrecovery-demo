import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    }
});

export default function MUITable(props) {
    const classes = useStyles();
    const [records, setRecords] = useState([])
    console.log("Records", props.viewRecordsArray)
    const [debtTotal, setDebtTotal] = useState(0)

    useEffect(() => {
        setRecords(props.viewRecordsArray)
    }, [props])


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <center>
            <TableContainer className={classes.tablecontainer}>
                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Loan No.</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Bank Name</StyledTableCell>
                            <StyledTableCell align="left">Address</StyledTableCell>
                            <StyledTableCell align="right">Contact No</StyledTableCell>
                            <StyledTableCell align="right">Debt (₹)</StyledTableCell>
                            <StyledTableCell align="right">Charges(₹)</StyledTableCell>
                            <StyledTableCell align="left">Total(₹)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((detail) => (
                            <StyledTableRow key={detail.id}>
                                <StyledTableCell align="right">{detail.id}</StyledTableCell>
                                <StyledTableCell align="left">{detail.name}</StyledTableCell>
                                <StyledTableCell align="right">{detail.bank_name}</StyledTableCell>
                                <StyledTableCell align="right">{detail.address}</StyledTableCell>
                                <StyledTableCell align="right">{detail.contact_no}</StyledTableCell>
                                <StyledTableCell align="right">{numberWithCommas(detail.debt_to_clear.toFixed(2))}</StyledTableCell>
                                <StyledTableCell align="right">{numberWithCommas(detail.charges.toFixed(2))}</StyledTableCell>
                                <StyledTableCell align="right"><b>{numberWithCommas(debtTotal.toFixed(2))}</b></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            {/* <Dropdown.Divider className="my-3 border-indigo" /> */}
        </center>
    );
}