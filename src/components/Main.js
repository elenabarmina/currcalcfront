import React from 'react';
import {Switch, Route} from 'react-router';
import PLCalc from './PLCalc';

const Main = () => (
    <div>
        <main>
            <Switch>
                <Route exact path = "/" component={PLCalc}/>
            </Switch>
        </main>
    </div>
)

export default Main;