import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";

export const ProgressTrackWidget = () => {
    const Progress = (props) => {
      const { title, percentage, icon, color, last = false } = props;
      const extraClassName = last ? "" : "mb-2";
  
      return (
        <Row className={`align-items-center ${extraClassName}`}>
          <Col xs="auto">
            <span className={`icon icon-md text-${color}`}>
              <FontAwesomeIcon icon={icon} className="me-1" />
            </span>
          </Col>
          <Col>
            <div className="progress-wrapper">
              <div className="progress-info">
                <h6 className="mb-0">{title}</h6>
                <small className="fw-bold text-dark">
                  <span>{percentage} %</span>
                </small>
              </div>
              <ProgressBar variant={color} now={percentage} min={0} max={100} />
            </div>
          </Col>
        </Row>
      );
    };
  
    return (
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light">
          <h5 className="mb-0">Progress track</h5>
        </Card.Header>
        <Card.Body>
  
          <Progress title="Rocket - SaaS Template" color="purple" icon={faBootstrap} percentage={34} />
          <Progress title="Pixel - Design System" color="danger" icon={faAngular} percentage={60} />
          <Progress title="Spaces - Listings Template" color="tertiary" icon={faVuejs} percentage={45} />
          <Progress title="Stellar - Dashboard" color="info" icon={faReact} percentage={35} />
          <Progress last title="Volt - Dashboard" color="purple" icon={faBootstrap} percentage={34} />
        </Card.Body>
      </Card>
    );
  };