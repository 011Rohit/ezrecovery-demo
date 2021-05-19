import React, { useState } from 'react'
//import Button from '@material-ui/core/Button'
//import './importPage.css'
import { Button } from '@themesberg/react-bootstrap';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ImportRecords() {
    const [title2, setTitle2] = useState('Import')
    const [fileData, setFileData] = useState(null)
    const [updateState, setUpdateState] = useState(false)

    const [severity, setSeverity] = useState('')
    const [message, setMessage] = useState('')

    const reqToUpdate = fileData => {
        const fd = new FormData();
        fd.append('excel', fileData)
        Axios.post('http://ezrecoveryapi.herokuapp.com/updateRecords', fd)
            .then(res => {
                if (res.data.success) { // if success is true
                    setOpen(true)
                    setSeverity("success")
                    setMessage(res.data.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
                else {
                    setOpen(true)
                    setSeverity("error")
                    setMessage(res.data.msg)
                }

            })
            .catch(err => console.log(err.msg))
    }


    const isValidFile = (fileName) => {
        if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))
            return 1;
        return 0;
    }

    const callUpdate = () => {
        if (title2 === "Import") {
            setUpdateState(true);
            setTitle2('DONE')
        }
        else if (title2 === "DONE") {
            if (fileData) {
                if (isValidFile(fileData.name) === 1) {
                    setUpdateState(false)
                    setTitle2('Import')
                    reqToUpdate(fileData);
                    setFileData(null)
                }
                else {
                    setOpen(true)
                    setSeverity("error")
                    setMessage("Please choose excel files only!")
                    setFileData(null)
                }
            }
            else {
                setOpen(true)
                setSeverity("error")
                setMessage("Please select a file first")
            }
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="importContainer">
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            <div className="updatebutton">
                <Button className="m-1" color="primary" variant="outline-primary" onClick={callUpdate}>{title2}</Button>
                {updateState &&
                    <input style={{ marginTop: '20px' }} type="file" onChange={(e) => setFileData(e.target.files[0])} />
                }
            </div>
        </div >
    )
}

export default ImportRecords
