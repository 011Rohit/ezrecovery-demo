// import "./Navbar.css";
// import avatar from "../../../assets/avatar.svg"; //../../assets/avatar.svg

// const Navbar = ({ sidebarOpen, openSidebar }) => {
//   return (
//     <nav className="navbar">
//       <div className="nav_icon" onClick={() => openSidebar()}>
//         <i className="fa fa-bars" aria-hidden="true"></i>
//       </div>
//       <div className="navbar__left">

//         <a href="/admin" className="active_link">
//           Welcome, Admin
//         </a>
//       </div>
//       <div className="navbar__right">

//         <a href="/avatar">
//           <img width="30" src={avatar} alt="avatar" />
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
// import "./Navbar.css";
import DateTime from "../DateTime";

export default (props) => {

  const handleType = (event) => {
    if (event === "1") {
      localStorage.clear();
      window.location.reload(false);
    }
  }
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <Nav className="align-items-center">
            <Dropdown onSelect={handleType} as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold" color='white'> Welcome, {props.username}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item eventKey="1" className="fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
          {/* <span className="mb-0 font-small fw-bold" color=''><DateTime /></span> */}
        </div>
      </Container>
    </Navbar>
  );
};
