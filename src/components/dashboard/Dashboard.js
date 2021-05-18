import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//Navbar and Sidebar
// import Navbar from "../dashboard/navbar/Navbar";
import Navbar from "../../components/dashboard/navbar/Navbar"
// import Sidebar from "../dashboard/sidebar/Sidebar";
import Sidebar from "../../components/dashboard/sidebar/Sidebar"
//pages
//import DashboardPage from "../pages/DashboardPage";
import ExportPage from "../pages/export/exportPage";
import ImportPage from "../pages/import/ImportPage";
import AddLeaves from "../pages/leaves/addLeave";
import RevokeLeaves from "../pages/leaves/revokeLeaves";
import DailyMain from "../pages/Reports/Daily/main";
import Allocation from "../pages/Allocation/Allocation";
import View_records from "../pages/view_records/View_records";
import Manage from "../pages/Manageemp";
import MyAllocation from "../pages/MyAllocation/MyAllocation";
import Ticket from "../pages/Ticket/Ticket";
import MonitorMain from '../pages/monitor/MonitorMain'
import LocationPreference from "../pages/LocationPreference/LocationPreference"
import MonthlyMain from "../pages/Reports/Monthly/main";
import DailyMainFS from "../pages/Reports/DailyFS/main";

const Dashboard = (props) => {
    const [sidebarOpen, setsidebarOpen] = useState(false);
    console.log(localStorage.getItem('type') + " = type")
    console.log(props.type)



    // setType(props.type)
    const openSidebar = () => {
        setsidebarOpen(true);
    };
    const closeSidebar = () => {
        setsidebarOpen(false);
    };
    return (
        <Router>
            <div>
                {/* <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} /> */}
                {/* <Navbar></Navbar> */}
                <Sidebar type={props.type}></Sidebar>
                <main className="content">
                    <Navbar username={props.username} />

                    {/* <Component {...props} /> */}
                    {props.type === "1" && <  Redirect to={"/app/view"} />}
                    {props.type === "2" && <  Redirect to={"/app/myallocation"} />}
                </main>
                <Switch>
                    {/* <Route exact path='/app/dashboard' component={DashboardPage} /> */}
                    <Route exact path='/app/import' component={ImportPage} />
                    <Route exact path='/app/reports/daily' component={DailyMain} />
                    <Route exact path='/app/reports/monthly' component={MonthlyMain} />
                    <Route exact path='/app/reports/fsdaily' component={DailyMainFS} />
                    <Route exact path='/app/manage' component={Manage} />
                    <Route exact path='/app/view' component={View_records} />
                    <Route path='/app/monitor' component={MonitorMain} />
                    <Route exact path='/app/allocation' component={Allocation} />
                    <Route exact path='/app/myallocation' component={MyAllocation} />
                    <Route exact path='/app/ticket' component={Ticket} />
                    <Route exact path='/app/location' component={LocationPreference} />
                    <Route exact path='/app/leaves/add' component={AddLeaves} />
                    <Route exact path='/app/leaves/revoke' component={RevokeLeaves} />
                </Switch>


            </div>
        </Router>
    );
};

export default Dashboard;
