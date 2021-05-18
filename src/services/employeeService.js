import Axios from 'axios'
import {useState} from 'react'

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Pimpri' },
    { id: '2', title: 'Baner' },
    { id: '3', title: 'Hadapsar' },
    { id: '4', title: 'Kothrud' },
])

export function insertEmployee(data) {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id == data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
    let employees = getAllEmployees();
    employees = employees.filter(x => x.id != id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    //const [employees,setEmployees] = useState([])//JSON.parse(localStorage.getItem(KEYS.employees));
    let employees = []
    Axios.get('http://localhost:3001/getAllFieldStaffRecords')
            .then(res => {
                //console.log(res.data.data)
                employees.push(res.data.data)
                //console.log(employees)
            })
    // console.log(employees) //array is getting stored! 
    // if (localStorage.getItem(KEYS.employees) == null)
    //     localStorage.setItem(KEYS.employees, JSON.stringify([]))
    
    //map departmentID to department title
    // let departments = getDepartmentCollection();
    // return employees.map(x => ({
    //     ...x,
    //     department: departments[x.departmentId - 1].title
    // }))
    return employees;
}