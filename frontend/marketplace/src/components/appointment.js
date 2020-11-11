import React from "react";

import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

import moment from "moment";
import getTimeSpots from '../utils/timeslots'
import {fetchProviderAppointments, createAppointment} from '../utils/fetchAPI'

const localizer = momentLocalizer(moment);

export default class Appointment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            provider: this.props.selectedProvider.id,
            firstName: "",
            lastName: "",
            initial : "",
            phone: "",
            birthDate: "",
            gender: "F",
            date: moment().toDate(),
            startTime: "08:00",
            endTime: "08:15",
            reason: "",
            events: [],
            isSubmiting: false,
            submited: false,
            errors: null
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmitAppointment = this.handleSubmitAppointment.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.updateEvents = this.updateEvents.bind(this);
        this.clearState = this.clearState.bind(this);

    }

    componentDidMount(){
        this.updateEvents(this.state.date, this.props.selectedProvider.id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            provider: nextProps.selectedProvider.id,
            event: []
        })
        this.updateEvents(this.state.date, nextProps.selectedProvider.id);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange(date){
        this.setState({
            date: date
        })
        this.updateEvents(date, this.state.provider);
    }

    updateEvents(date, provider){
        fetchProviderAppointments(date, provider)
            .then(data => {
                var eventList = data["results"].map((event) => {
                    return {
                        id: event.id,
                        start: moment(event.start_time).toDate(),
                        end: moment(event.end_time).toDate()
                    }
                });
                this.setState({events: eventList})
            });
    }

    handleSubmitAppointment(event) {
        event.preventDefault();

        if (this.state.startTime && this.state.endTime) {
            this.setState({isSubmiting: true});
            createAppointment(this.state)
                .then(data => {
                    if (data.id){
                        console.log(data)
                        this.updateEvents(this.state.date, this.state.provider);
                        this.clearState(true);
                    }
                    else {
                        this.setState({errors: data, isSubmiting: false });
                    }
                })
                .catch((errors) => {
                    this.setState({errors: errors, isSubmiting: false});
                });
        }
    }

    clearState(submited){
        this.setState({
            firstName: "",
            lastName: "",
            initial : "",
            phone: "",
            birthDate: "",
            gender: "F",
            startTime: "08:00",
            endTime: "08:15",
            reason: "",
            isSubmiting: false,
            errors: null,
            submited: submited
        });
    }

    renderCalendar(){
        var today = this.state.date;

        return (
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                date={this.state.date}
                views={["day"]}
                view="day"
                max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17)}
                min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
                toolbar={false}
                events={this.state.events}
                style={{ height: 500 }}
            />
        )
    }

    render(){

        var startTimeSlots = getTimeSpots("08:00", "17:45")
        var endTimeSlots = getTimeSpots(this.state.startTime, "18:00")

        return (

            <Row>
                <Col xs={8}>
                    { this.state.errors &&
                        <Alert variant="danger">
                        {
                            Object.keys(this.state.errors)
                                .map((key) => <p>{key.replace(/_/g, " ")} : {this.state.errors[key]}</p>)

                        }
                        </Alert>
                    }
                    { this.state.submited &&
                        <Alert variant="success">
                            Appointment created successfully
                        </Alert>
                    }
                    <Form onSubmit={this.handleSubmitAppointment}>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="firstName" value={this.state.firstName} size="sm" onChange={this.onChange}/>
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Initial</Form.Label>
                                    <Form.Control name="initial" value={this.state.initial} size="sm" onChange={this.onChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="lastName" value={this.state.lastName} size="sm" onChange={this.onChange}/>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control name="birthDate" value={this.state.birthDate} placeholder="YYYY-MM-DD" size="sm" onChange={this.onChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control name="phone" value={this.state.phone} placeholder="+19999999999" size="sm" onChange={this.onChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control name="gender" as="select" size="sm" onChange={this.onChange}>
                                        <option value="F">Female</option>
                                        <option value="M">Male</option>
                                        <option value="O">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Appointment Reason</Form.Label>
                            <Form.Control name="reason" value={this.state.reason} size="sm" onChange={this.onChange}/>
                        </Form.Group>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                   <Form.Label>Appointment Date</Form.Label>
                                   <DatePicker inline onChange={this.handleDateChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control as="select" value={this.state.startTime} name="startTime" size="sm" onChange={this.onChange}>
                                        {
                                            startTimeSlots.map((value, index) => {
                                                return <option value={value}>{value}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control as="select" value={this.state.endTime} name="endTime" size="sm" onChange={this.onChange}>
                                        {
                                            endTimeSlots.map((value, index) => {
                                                return <option value={value}>{value}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Button variant="primary" type="submit" disabled={this.state.isSubmiting}> Submit </Button>
                    </Form>
                </Col>
                <Col xs={4}>{ this.renderCalendar() }</Col>
            </Row>
        )
    }
}
