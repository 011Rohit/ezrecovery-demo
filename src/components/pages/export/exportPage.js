import Axios from 'axios'

const returnTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + mm + yyyy;
    return today;
}

export default function CallExport() {
    const today = returnTodaysDate().toString()
    Axios.post('http://ezrecoveryapi.herokuapp.com/exportDetails', {
        today: today,
    }).then(resolve => {
    })
}