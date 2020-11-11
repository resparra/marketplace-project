import React from "react";
import { Card, Row, Col, Container, Jumbotron } from "react-bootstrap";
import Appointment from './appointment'

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

export default class Provider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            provider: this.props.selectedProvider.id,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            provider: nextProps.selectedProvider.id
        })
    }

    render() {

        return this.props.selectedProvider ? (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron jumbotron-fluid>
                            <h2>{this.props.selectedProvider.provider_full_name}</h2>
                            <Card.Subtitle className="mb-2 text-muted">{this.props.selectedProvider.description}</Card.Subtitle>
                        </Jumbotron>
                    </Col>
                </Row>
                <h4> Create an Appointment </h4>
                <Appointment selectedProvider={this.props.selectedProvider}/>
            </Container>
        ) : (
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron jumbotron-fluid>
                            <h1>Select Provider</h1>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}
