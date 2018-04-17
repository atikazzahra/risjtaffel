import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Easer} from 'functional-easing';
import cx from 'classnames';
import {Track, TrackedDiv, TrackDocument} from 'react-track';
import {tween, ease} from 'react-imation';
import {topTop,
        topBottom,
        centerCenter,
        topCenter,
        bottomBottom,
        bottomTop,
        getDocumentRect,
        getDocumentElement,
        calculateScrollY} from 'react-track/tracking-formulas';
import {rgb, rgba, scale, rotate,
        px, percent, translate3d} from 'react-imation/tween-value-factories';
import {tweenState} from 'react-tween-state';
import {SectionPart4, NavPart4, FoodDescPart4} from './components/index.jsx';
import Restaurant from './restaurant.jsx';
import History from './history.jsx';
import Animate from 'react-move/Animate';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul className="Navbar">
                        <li>
                        <Link to="/">History</Link>
                        </li>
                        <li>
                        <Link to="/restaurant">Restaurant</Link>
                        </li>
                    </ul>
                    <Route exact path="/" component={History}/>
                    <Route path="/restaurant" component={Restaurant}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));