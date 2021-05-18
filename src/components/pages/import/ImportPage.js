import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './importPage.css'
import Axios from 'axios';

function ImportPage() {
    const [title2, setTitle2] = useState('UPDATE')
    const [title1, setTitle1] = useState('IMPORT')
    const [fileName, setFilename] = useState('')
    const [importState, setImportState] = useState(false)
    const [updateState, setUpdateState] = useState(false)


    const reqToInsert = filename => {
        Axios.post('http://localhost:3001/insertRecords', {
            filename: filename,
        }).then(res => alert(res.data.msg))
            .catch(err => console.log(err.msg))
    }

    const reqToUpdate = filename => {
        Axios.post('http://localhost:3001/updateRecords', {
            filename: filename,
        }).then(res => alert(res.data.msg))
            .catch(err => console.log(err.msg))
    }


    const isValidFile = (fileName) => {
        if (fileName.length === 0)
            return -1
        if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls'))
            return 1;
        return 0;
    }

    const callImport = () => {
        if (title1 === "IMPORT") {
            setImportState(true);
            setTitle1('DONE')
        }
        else if (title1 === "DONE") {
            let isValid = isValidFile(fileName.toLowerCase());
            if (isValid === 1) {
                window.alert("Successful Operation!")
                setImportState(false)
                setTitle1('IMPORT')
                reqToInsert(fileName);
                setFilename('')
            }
            else if (isValid === 0) {
                window.alert("Error! Please upload only excel files!!!")
                setFilename('')
            }
            else {
                window.alert("Please select a file first!")
            }
        }

    }

    const callUpdate = () => {
        if (title2 === "UPDATE") {
            setUpdateState(true);
            setTitle2('DONE')
        }
        else if (title2 === "DONE") {
            let isValid = isValidFile(fileName.toLowerCase());
            if (isValid === 1) {
                window.alert("Successful Operation!")
                setUpdateState(false)
                setTitle2('UPDATE')
                reqToUpdate(fileName);
                setFilename('')
            }
            else if (isValid === 0) {
                window.alert("Error! Please upload only excel files!!!")
                setFilename('')
            }
            else {
                window.alert("Please select a file first!")
            }
        }
    }

    return (
        <div className="importContainer">
            <div className="buttons">
                <div className="importButton">
                    <Button style={{ borderRadius: "50px" }} disabled={updateState} color="primary" variant="contained" onClick={() => callImport()}>{title1}</Button>
                </div>
                <div className="vLine"></div>
                <div className="updateButton">
                    <Button style={{ borderRadius: "50px" }} disabled={importState} color="primary" variant="contained" onClick={callUpdate}>{title2}</Button>
                </div >
            </div>
            <div className="selectorArea">
                <div className="selectImport">
                    {importState &&
                        <input type="file" value={fileName} accept=".xls,.xlsx" onChange={(e) => setFilename(e.target.value)} />
                    }
                </div>
                <div className="selectUpdate">
                    {updateState &&
                        <input type="file" value={fileName} accept=".xls,.xlsx" onChange={(e) => setFilename(e.target.value)} />
                    }
                </div>
            </div>
            <div className="descArea">
                <div className="importDesc">
                    By clicking on IMPORT button <br /> you agree the terms i.e.,<br /><br />
                    <ul>
                        <li>It will clear all the records in the database</li><br />
                        <li>It will add a whole bunch of new records to deal with!</li><br />
                    </ul>
                </div>
                <div className="updateDesc">
                    By clicking on UPDATE button <br /> you agree the terms i.e.,<br /><br />
                    <ul>
                        <li>It will retain all the records in the database</li><br />
                        <li>It will append the new records(currently which are not in existance)</li><br />
                        <li>It will update the exisitng record details</li><br />
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default ImportPage
