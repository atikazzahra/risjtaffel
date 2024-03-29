import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Restaurant from './restaurant.jsx';
import History from './history.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={History}/>
                    <Route path="/restaurant" component={Restaurant}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));