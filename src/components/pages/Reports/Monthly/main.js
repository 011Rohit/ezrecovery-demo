import React, { useState, useEffect } from 'react';
import './Main.scss';
import Table from './Table';
import Axios from 'axios'


const MonthlyMain = () => {

    const [fieldAlloc, setFieldAlloc] = useState([])
    const [dataNull, setDataNull] = useState(false)

    useEffect(() => {
        Axios.get('http://localhost:3001/getMonthlyReport')
            .then(res => {
                let data = res.data.data
                if (res.data.success)
                    setFieldAlloc(data)
                else
                    setDataNull(true)
            })

        return () => {

        }
    }, [])


    return (
        <div className="mainContainer">
            {!dataNull &&
                <Table
                    tableData={fieldAlloc}
                    headingColumns={['No', 'Name', 'Total Assigned', 'Successful Visits', 'Debt to be collected', 'Total Debt Collected']}
                    title="Monthly Report"
                />
            }
            {dataNull &&
                <h3> Field Staff has not been allocated yet! Please allocate them first to view the report</h3>
            }
        </div>
    );
}

export default MonthlyMain;
