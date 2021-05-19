import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment'
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
//import { Routes } from "../../../routes";
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

export default function DailyMain(props) {

    //console.log(props.match.params.id

    const [fieldAlloc, setFieldAlloc] = useState([])
    const [dataNull, setDataNull] = useState(false)

    const [debtTotal, setDebtTotal] = useState(0)
    const [collectedTotal, setCollectedTotal] = useState(0)
    const [remainingTotal, setRemainingTotal] = useState(0)

    useEffect(() => {
        Axios.get('http://ezrecoveryapi.herokuapp.com/getDailyReport')
            .then(res => {
                let data = res.data.data
                console.log(data)
                if (res.data.success) {
                    setFieldAlloc(data)
                    setDebtTotal(() => {
                        let total = 0
                        res.data.data.map(value => {
                            return (total += value.debtTotal)
                        })
                        return total
                    })
                    setCollectedTotal(() => {
                        let total = 0
                        res.data.data.map(value => {
                            return (total += value.debtCollectedTotal)
                        })
                        return total
                    })
                    setRemainingTotal(() => {
                        let total = 0
                        res.data.data.map(value => {
                            return (total += value.debtRemaining)
                        })
                        return total
                    })
                }
                else
                    setDataNull(true)
            })

        return () => {

        }
    }, [])

    const classes = useStyles();

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <center>
            <h4>Daily Report for {moment().format('ddd, ll')}</h4>
            <TableContainer className={classes.tablecontainer}>
                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell rowSpan="2" align="right">Loan No.</StyledTableCell>
                            <StyledTableCell rowSpan="2" align="left">Name</StyledTableCell>
                            <StyledTableCell rowSpan="2" align="right">Assigned</StyledTableCell>
                            <StyledTableCell colSpan="3" align="center">Visits</StyledTableCell>
                            <StyledTableCell colspan="3" align="center">Debt (₹)</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="right">Total</StyledTableCell>
                            <StyledTableCell align="right">Successful</StyledTableCell>
                            <StyledTableCell align="right">Left</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                            <StyledTableCell align="right">Collected</StyledTableCell>
                            <StyledTableCell align="right">Remaining</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fieldAlloc.map((detail) => (
                            <StyledTableRow key={detail.id}>
                                <StyledTableCell align="right">{detail.id}</StyledTableCell>
                                <StyledTableCell align="left">{detail.name}</StyledTableCell>
                                <StyledTableCell align="right">{detail.totalAssigned}</StyledTableCell>
                                <StyledTableCell align="right">{detail.totalVisited}</StyledTableCell>
                                <StyledTableCell align="right">{detail.successfulVisits}</StyledTableCell>
                                <StyledTableCell align="right">{detail.totalLeft}</StyledTableCell>
                                <StyledTableCell align="right">{numberWithCommas(detail.debtTotal.toFixed(2))}</StyledTableCell>
                                <StyledTableCell align="right">{numberWithCommas(detail.debtCollectedTotal.toFixed(2))}</StyledTableCell>
                                <StyledTableCell align="right">{numberWithCommas(detail.debtRemaining.toFixed(2))}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                        <StyledTableRow>

                            <StyledTableCell colSpan="6" align="center"><b><i>Aggregate Total</i></b></StyledTableCell>
                            <StyledTableCell align="right"><b>{numberWithCommas(debtTotal.toFixed(2))}</b></StyledTableCell>
                            <StyledTableCell align="right"><b>{numberWithCommas(collectedTotal.toFixed(2))}</b></StyledTableCell>
                            <StyledTableCell align="right"><b>{numberWithCommas(remainingTotal.toFixed(2))}</b></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <StyledTableCell><b>Total : ₹ {numberWithCommas(total.toFixed(2))}</b></StyledTableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>

            </TableContainer>
            <Dropdown.Divider className="my-3 border-indigo" />
        </center>
    );
}


// const DailyMain = () => {

//     const [fieldAlloc, setFieldAlloc] = useState([])
//     const [dataNull, setDataNull] = useState(false)

//     useEffect(() => {
//         Axios.get('http://localhost:3001/getDailyReport')
//             .then(res => {
//                 let data = res.data.data
//                 if (res.data.success)
//                     setFieldAlloc(data)
//                 else
//                     setDataNull(true)
//             })

//         return () => {

//         }
//     }, [])


//     return (
//         <div className="mainContainer">
//             {/* <Fragment> */}
//             {/* <Header title="Daily Report" /> */}
//             {!dataNull &&
//                 <Table
//                     tableData={fieldAlloc}
//                     headingColumns={['No', 'Name', 'Total Assigned', 'Total Visits', 'Successful Visits', 'Left Visits', 'Total Debt (₹)', 'Collected Debt (₹)', 'Remaining Debt (₹)']}
//                     title={`Daily Report for ${moment().format('ddd, ll')}`}
//                 />
//             }
//             {dataNull &&
//                 <h3> Field Staff has not been allocated yet! Please allocate them first to view the report</h3>
//             }
//             {/* </Fragment> */}
//         </div>
//     );
// }

// export default DailyMain;
