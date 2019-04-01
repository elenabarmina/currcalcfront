import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import { InputGroup,
    InputGroupAddon,
    Button,
    Input,
    Container,
    Form,
    FormGroup,
    Label,
    Col,
    Row,
    Card,
    Collapse,
    Alert } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class PLCalc extends Component {

    constructor (props) {
        super(props);

        let startDate = moment().subtract(1, 'day').toDate();

        this.state = {
            startDate: startDate,
            selectedDate: startDate,
            usdAmount: '',

            resultText: '0',
            errorOpen: false,
            requestErrorMsg: '',
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    calculate(e) {
        e.preventDefault();
        let date = this.state.selectedDate;
        let usdAmount = this.state.usdAmount;

        if (isNaN(usdAmount)|| usdAmount <= 0){
            this.setState({
                requestErrorMsg: 'Amount USD must be a positive number',
                errorOpen: true
            });
            return;
        }

        const self = this;
        axios.get(process.env.REACT_APP_API_PLCALCRUBUSD_URL, {
            params: {
                date: moment(date).format('YYYY-MM-DD'),
                usdAmount: usdAmount
            },
            timeout: 5000
        })
            .then(function (response) {
                self.setState({
                    resultText: response.data.result,
                    errorOpen: false
                })
            })
            .catch(function (error) {
                if (error.response) {
                    self.setState({
                        resultText: '0',
                        requestErrorMsg: error.response.data.errorDescription,
                        errorOpen: true
                    })
                } else {
                    self.setState({
                        requestErrorMsg: 'Server not responding. Please, try again later.',
                        errorOpen: true
                    });
                }
            });
    }

    handleDateChange(date) {
        this.setState({
            selectedDate: date
        })
    }

    handleAmountChange(evt) {
        this.setState({
            usdAmount: evt.target.value
        })
    }

    render() {
        return (
            <Container>
                <h4>Profit&Loss Calculator</h4>
                <Form>

                    <Row form>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="inputDate">Date: </Label>
                                <InputGroup id="inputDate">
                                    <DatePicker selected= { this.state.selectedDate }
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={ this.state.startDate }
                                                className="form-control"
                                                onChange={this.handleDateChange}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="inputAmountUsd">Amount USD: </Label>
                                <InputGroup id="inputAmountUsd">
                                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                    <Input onChange={this.handleAmountChange} placeholder="Amount" type="number" step="1" min={0}/>
                                    <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Button color="primary" onClick={this.calculate}>Calculate</Button>{' '}
                    </FormGroup>

                    <Collapse isOpen={this.state.errorOpen}>
                        <Alert color="danger">
                            {this.state.requestErrorMsg}
                        </Alert>
                    </Collapse>

                    <Row form>
                    <Col md={2}>
                    <FormGroup>
                        <Label for="resultCard">Result: </Label>
                            <Card className="form-control">
                                {this.state.resultText}
                            </Card>
                    </FormGroup>
                    </Col>
                    </Row>
                </Form>

            </Container>

        );
    }
}

export default PLCalc;