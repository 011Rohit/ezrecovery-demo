import React, { useState, useEffect } from 'react';
import './CardMonitor.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { faClipboard, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CardMonitor() {

    const [cardData, setCardData] = useState([])
    const [nullData, setNullData] = useState(false)


    useEffect(() => {
        Axios.get('http://ezrecoveryapi.herokuapp.com/getFieldStaffNamesCard')
            .then(res => {
                if (res.data.success) {
                    setCardData(res.data.data)
                }
                else {
                    setNullData(true)
                }
            })
    }, [])


    //₹ 

    return (
        <>

            {!nullData &&
                <div className="Cardcontainer">
                    {cardData.map((val) => {
                        return (
                            <Link to={`/app/monitor/details/${val.id}/${val.name}`}><div className="CardForMonitor" key={val.id}>
                                <div className="CardInsidecontainer">
                                    <h4 className="name"><b>Name : {val.name}</b></h4>
                                    <br />
                                    <h5>Collected</h5>
                                    <p>₹ {val.collectedTillNow}</p>
                                    <br />
                                    <h5 >Left to Collect</h5>
                                    <p>₹ {val.leftToCollect}</p>
                                </div>
                            </div>
                            </Link>
                        )
                    })}

                </div>
            }



            {
                nullData &&
                <h3 style={{ textAlign: 'center' }} >The Records are not been allocated yet! Please allocate field staff first to monitor them</h3>
            }
        </>
    );
}