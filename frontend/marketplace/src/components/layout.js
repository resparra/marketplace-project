import React from "react";
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import Sidebar from "./sidebar";
import Header from "./navbar";
import Provider from "./provider";


class Layout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedProvider: null
        };

        this.handleSelectedProvider = this.handleSelectedProvider.bind(this);
    }

    handleSelectedProvider(provider) {
        this.setState({
            selectedProvider: provider
        })
    }

    renderSelectProvider(){
        return (
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

    render() {
        return (
            <>
                <Header />
                <Container fluid h-100>
                    <Row>
                        <Col xs={3}>
                            <Sidebar
                                handleSelectedProvider={this.handleSelectedProvider}
                                selectedProvider={this.state.selectedProvider}
                            />
                        </Col>
                        <Col>
                            {
                                this.state.selectedProvider ?
                                    <Provider selectedProvider={this.state.selectedProvider}/>
                                    : this.renderSelectProvider()
                            }

                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Layout;
