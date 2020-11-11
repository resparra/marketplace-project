import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import ProviderForm from './providerform'

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm: null
        };

        this.handleShowForm = this.handleShowForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
    }

    handleShowForm(){
        this.setState({showForm: true})
    }

    handleCloseForm(){
        this.setState({showForm: false})
    }

    render() {
        return (
            <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand >Marketplace</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Form inline>
                        <Button variant="success" onClick={this.handleShowForm}>Register Provider</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <ProviderForm
                showForm={this.state.showForm}
                handleShowForm={this.handleShowForm}
                handleCloseForm={this.handleCloseForm}
            />

            </>
        );
    }
}
