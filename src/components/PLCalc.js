import React, { Component } from 'react';

class PLCalc extends Component {

    constructor() {
        super()
        this.state = {
            date: '',
            usdAmount: ''
        }
    }

    render() {
        return (
            <div className="PLCalc">
                <header className="App-header">
                    PlCalc
                </header>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputDate">Date:</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsdAmount">Amount USD:</label>
                        <input type="еуче" className="form-control" id="inputUsdAmount"
                               placeholder="Amount USD"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Recalculate</button>
                </form>
            </div>
        );
    }
}

export default PLCalc;