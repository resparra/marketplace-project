import React from "react";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {fetchSpecialties, createProviderSubmition} from '../utils/fetchAPI';

export default class ProviderForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            provider_full_name: "",
            country: "",
            city: "",
            description: "",
            specialty: null,
            specialties: []
        }

        this.onChange = this.onChange.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleSubmitProvider = this.handleSubmitProvider.bind(this);
    }

    componentDidMount(){
        fetchSpecialties()
            .then(data => {
                this.setState({specialties: data['results']})
            });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmitProvider(){
        createProviderSubmition(this.state)
            .then(data => {
                if (data.id){
                    console.log(data);
                    this.props.handleCloseForm();
                }
                else {
                    this.setState({errors: data});
                }
            })
            .catch((errors) => {
                this.setState({errors: errors});
            });
    }

    clearState(){
        this.setState({
            provider_full_name: "",
            country: "",
            city: "",
            description: "",
            specialty: null,
        })
    }


    render() {
        return (
            <Modal show={this.props.showForm} onHide={this.props.handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>New Provider Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                { this.state.errors &&
                    <Alert variant="danger">
                        {
                            Object.keys(this.state.errors)
                                .map((key) => <p>{key.replace(/_/g, " ")} : {this.state.errors[key]}</p>)
                        }
                    </Alert>
                }
                <Form>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Provider Name</Form.Label>
                        <Form.Control name="provider_full_name" value={this.state.provider_full_name} size="sm" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Specialty {this.state.specialty}</Form.Label>
                        <Form.Control as="select" name="specialty" size="sm" onChange={this.onChange}>
                            <option value="" >Select specialty ...</option>
                            {
                                this.state.specialties.map((value, index) => {
                                    return <option value={value.name}>{value.name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Country</Form.Label>
                                <Form.Control name="country" value={this.state.country} size="sm" onChange={this.onChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" value={this.state.city} size="sm" onChange={this.onChange}/>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={this.state.description} size="sm" onChange={this.onChange}/>
                    </Form.Group>
                </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            this.clearState();
                            this.props.handleCloseForm()
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmitProvider}>
                        Request Approval
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
