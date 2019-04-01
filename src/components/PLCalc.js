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
    Card } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class PLCalc extends Component {

    constructor (props) {
        super(props);

        let startDateTemp = moment().subtract(1, 'day').toDate();

        this.state = {
            startDate: startDateTemp,
            selectedDate: startDateTemp,
            usdAmount: '',
            collapse: false,
            resultText: '0'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    calculate(e) {
        e.preventDefault();
        let mainDate = this.state.selectedDate;
        axios.get('http://localhost:8080/currcalcback/plcalculator/calculate-usd-rub', {
            params: {
                date: moment(mainDate).format('YYYY-MM-DD'),
                usdAmount: this.state.usdAmount
            }
        })
            .then(res => console.log(res.data));
    }

    handleChange(date) {
        this.setState({
            selectedDate: date
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
                                                onChange={this.handleChange}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="inputAmountUsd">Amount USD: </Label>
                                <InputGroup id="inputAmountUsd">
                                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                    <Input placeholder="Amount" type="number" step="1" min={0}/>
                                    <InputGroupAddon addonType="append">.00</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Button color="primary" onClick={this.calculate}>Calculate</Button>{' '}
                    </FormGroup>

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