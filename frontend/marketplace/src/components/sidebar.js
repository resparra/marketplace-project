import React from "react";
import { Card, Form, ListGroup, Button } from "react-bootstrap";

import {fetchSpecialties, fetchFilteredProviders} from '../utils/fetchAPI';


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            providerList: [],
            specialtyList: [],
            selectedProvider : null,

            searchProviderName: "",
            searchProviderSpecialty: ""
        };

        this.handleSearchProvider = this.handleSearchProvider.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.handleSearchProvider()

        fetchSpecialties()
            .then(data => this.setState({ specialtyList: data["results"] }));
    }

    handleSearchProvider() {
        fetchFilteredProviders(this.state.searchProviderName, this.state.searchProviderSpecialty)
            .then(data => this.setState({ providerList: data["results"] }));
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Form.Control
                        type="text"
                        name="searchProviderName"
                        placeholder="Search Providers"
                        onChange={this.onChange}
                    />
                    <br />
                    <Form.Control
                        as="select"
                        name="searchProviderSpecialty"
                        onChange={this.onChange}
                    >
                        <option value={""}>Select specialty ...</option>
                        {
                            this.state.specialtyList.map((value, index) => {
                              return <option value={value.name}>{value.name}</option>
                            })
                        }
                    </Form.Control>
                    <br />
                    <Button variant="primary" block onClick={this.handleSearchProvider}>Search</Button>
                </Card.Header>
                <ListGroup>
                    {
                        this.state.providerList.map((value, index) => {
                            return (
                                <ListGroup.Item
                                    active={this.props.selectedProvider ? this.props.selectedProvider.id === value.id : false}
                                    onClick={() => this.props.handleSelectedProvider(value)}
                                >
                                        <Card.Title>{value.provider_full_name}</Card.Title>
                                        <Card.Text>
                                            {value.specialty}
                                        </Card.Text>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card>
        );
    }
}
