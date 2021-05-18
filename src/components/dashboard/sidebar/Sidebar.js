// import "./Sidebar.css";
// import logo from "../../../assets/logo.png";
// import { useState } from 'react'
// import { Link } from "react-router-dom";


// const Sidebar = ({ type, sidebarOpen, closeSidebar, }) => {

//   const changeSubState = () => {
//     if (sub) {
//       setSub(false)
//     }
//     else {
//       setSub(true)
//     }
//   }
//   const handleClick = (event, id) => {
//     setActive(id)
//   }

//   const [sub, setSub] = useState(false)
//   const [isActive, setActive] = useState(1)
//   //const [type, setType] = useState(localStorage.getItem('type'));
//   console.log(type + "finally");

//   return (
//     <>{
//       type === "1" &&
//       <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
//         <div className="sidebar__title">
//           <div className="sidebar__img">
//             <img src={logo} alt="logo" />
//             <h1>EzRecovery</h1>
//           </div>
//           <i
//             onClick={() => closeSidebar()}
//             className="fa fa-times"
//             id="sidebarIcon"
//             aria-hidden="true"
//           ></i>
//         </div>


//         <div className="sidebar__menu">
//           <div className="sidebar__link active_menu_link">
//             <i className="fa fa-home"></i>
//             <Link to='/app/dashboard'>Dashboard</Link>
//           </div>

//           <h2>ADMIN</h2>
//           <div className="sidebar__link">
//             <i className="fa fa-user-secret" aria-hidden="true"></i>
//             <Link to="/app/import">Import Records</Link>
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-building-o"></i>
//             <Link to="/app/view">View Records</Link>
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-wrench"></i>
//             <Link to="/app/manage">Manage Field-Staff</Link>
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-archive"></i>
//             <Link to="/app/allocation">Allocate Field-Staff</Link>
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-handshake-o"></i>
//             <Link to="/app/monitor">Monitor Field-Staff</Link>
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-handshake-o"></i>
//             <Link to="/app/reports" onClick={() => changeSubState()}>Reports</Link>
//             <br /><br />
//             {sub &&
//               <div className="sidebar__link">
//                 <i className="fa fa-question"></i>
//                 <Link to="/app/reports/daily">Daily</Link><br /><br />
//                 <i className="fa fa-sign-out"></i>
//                 <Link to="/app/reports/daily">Monthly</Link>
//               </div>
//             }
//           </div>
//           <div className="sidebar__link">
//             <i className="fa fa-money"></i>
//             <Link to="/app/export">Export Details</Link><br /><br />
//           </div>



//           <div className="sidebar__logout">
//             <i className="fa fa-power-off"></i>
//             <a href="#" onClick={() => { localStorage.clear(); window.location.reload(false); }}>Log out</a>
//           </div>
//         </div>

//       </div>

//     }{
//         type === "2" && <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
//           <div className="sidebar__title">
//             <div className="sidebar__img">
//               <img src={logo} alt="logo" />
//               <h1>EzRecovery</h1>
//             </div>
//             <i
//               onClick={() => closeSidebar()}
//               className="fa fa-times"
//               id="sidebarIcon"
//               aria-hidden="true"
//             ></i>
//           </div>

//           <div className="sidebar__menu">
//             { /*<div className="sidebar__link active_menu_link">
//               <i className="fa fa-home"></i>
//               <Link to='/app/dashboard'>Dashboard</Link>
//             </div>

//             <h2>Field-Staff</h2>

//               <div className="sidebar__link">
//                 <i className="fa fa-user-secret" aria-hidden="true"></i>
//                 <Link to="/app/myallocation">My Allocations</Link>
//               </div>


//               <div className="sidebar__link">
//                 <i className="fa fa-handshake-o"></i>
//                 <Link >Leaves</Link>

//                 <br /><br />


//               </div>


//               <div className="sidebar__link">
//                 <i className="fa fa-wrench"></i>
//                 <Link to="/app/location">Location Preference</Link>
//               </div>


//               <div className="sidebar__link">
//                 <i className="fa fa-archive"></i>
//                 <Link to="/app/report">Reports</Link>
//               </div> */}

//             <div onClick={() => handleClick(this, 1)} className={isActive === 1 ? "sidebar__link active_menu_link" : "sidebar__link"}>
//               <i className="fa fa-home"></i>
//               <Link to='/app/dashboard'>Dashboard</Link>
//             </div>

//             <h2>Field-Staff</h2>

//             <div onClick={() => handleClick(this, 2)} className={isActive === 2 ? "sidebar__link active_menu_link" : "sidebar__link"}>
//               <i className="fa fa-user-secret" aria-hidden="true"></i>
//               <Link to="/app/myallocation">My Allocations</Link>
//             </div>


//             <div onClick={() => handleClick(this, 3)} className={isActive === 3 ? "sidebar__link active_menu_link" : "sidebar__link"}>
//               <i className="fa fa-handshake-o"></i>
//               <Link >Leaves</Link>

//             </div>


//             <div onClick={() => handleClick(this, 4)} className={isActive === 4 ? "sidebar__link active_menu_link" : "sidebar__link"}>
//               <i className="fa fa-wrench"></i>
//               <Link to="/app/location">Location Preference</Link>
//             </div>


//             <div onClick={() => handleClick(this, 5)} className={isActive === 5 ? "sidebar__link active_menu_link" : "sidebar__link"}>
//               <i className="fa fa-archive"></i>
//               <Link to="/app/report">Reports</Link>
//             </div>

//             <div className="sidebar__logout">
//               <i className="fa fa-power-off"></i>
//               <button className="logoutbutton" onClick={() => { localStorage.clear(); window.location.reload(false); }} >logout</button>

//             </div>
//           </div>
//         </div>
//       }

//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faChevronDown, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import callExport from '../../pages/export/exportPage'
// import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { Routes } from "../../../routes";
//import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ReactHero from "../../../assets/img/technologies/react-hero-logo.svg";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import logo from "../../../assets/logo.png";
// import { faClipboard,faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  console.log(props.type + "rohit")
  //localStorage.clear()
  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };


  const NavItem = (props) => {

    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState('')


  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.View.path}>
          <Image src={logo} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            {props.type === "1" &&
              <Nav className="flex-column pt-3 pt-md-0">
                {/* <NavItem title="Dashboard" link={Routes.Presentation.path} /> */}
                <Image src={logo} className="navbar-brand-light" height="80px" width="250px" />
                <NavItem title="Manage Records" link={Routes.View.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <NavItem title="Manage Field-Staff" link={Routes.Manage.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <NavItem title="Allocate Field-Staff" link={Routes.Allocate.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <NavItem title="Monitor Field-Staff" link={Routes.Monitor.path}></NavItem>
                <Dropdown.Divider className="my-3 border-indigo" />
                {/* <div className="d-flex ms-auto"> */}

                <CollapsableNavItem title="Reports" >
                  <NavItem title="Daily" link={Routes.Daily.path} />
                  <NavItem title="Monthly" link={Routes.Monthly.path} />

                </CollapsableNavItem>
                <Dropdown.Divider className="my-3 border-indigo" />
                <Button variant="secondary" size="large" className="me-2" onClick={() => {
                  callExport()
                  setOpen(true)
                  setMessage("Records have been exported successfully! An excel file of the same has been stored into the output folder")
                  setSeverity('success')
                }
                }>Export Records</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity={severity}>
                    {message}
                  </Alert>
                </Snackbar>
                <Dropdown.Divider className="my-3 border-indigo" />
                <Button variant="gray" size="large" className="me-2" onClick={() => {
                  localStorage.clear();
                  window.location.reload()
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
          </Button>

                {/* <Link onClick={() => callExport()}><NavItem title="Export Records"/></Link> */}
              </Nav>}
            {
              props.type === "2" &&
              <Nav className="flex-column pt-3 pt-md-0">
                <Image src={logo} className="navbar-brand-light" height="80px" width="250px" />
                <Dropdown.Divider className="my-3 border-indigo" />
                <NavItem title="My Allocation" link={Routes.Myallocation.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <CollapsableNavItem title="Leaves" >
                  <NavItem title="Add" link={Routes.AddLeave.path} />
                  <NavItem title="Revoke" link={Routes.RevokeLeave.path} />
                </CollapsableNavItem>
                <Dropdown.Divider className="my-3 border-indigo" />
                {/* <NavItem title="Allocate Field-Staff"  link={Routes.Settings.path} />
                <NavItem title="Monitor Field-Staff"  link={Routes.Monitor.path} /> */}

                <NavItem title="Location Preference" link={Routes.Location.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <NavItem title="Reports" link={Routes.FSDaily.path} />
                <Dropdown.Divider className="my-3 border-indigo" />
                <Button variant="gray" size="large" className="me-2" onClick={() => {
                  localStorage.clear();
                  window.location.reload()
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
          </Button>
                {/* <NavItem title="Monitor Field-Staff"  link={Routes.Monitor.path} /> */}

              </Nav>
            }
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

