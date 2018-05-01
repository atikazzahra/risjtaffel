import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {SectionPart4, NavPart4, FoodDescPart4, LoadingPage} from './components/index.jsx';
import Restaurant from './restaurant.jsx';
import History from './history.jsx';
import OnImagesLoaded from 'react-on-images-loaded'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            progress: 0,
        };
        this.updateProgressLoader = this.updateProgressLoader.bind(this);
    }
    updateProgressLoader(){
        this.setState({loading: false});
    }
    runAfterImagesLoaded(){
        this.setState({progress: 100});
        setTimeout(this.updateProgressLoader, 300);
    }
    render() {
        return (
            <Router>
                <div>
                    <LoadingPage
                        active={this.state.loading}
                        progress={this.state.progress}></LoadingPage>
                    <OnImagesLoaded
                    onLoaded={this.runAfterImagesLoaded.bind(this)}>
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
                    </OnImagesLoaded>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));