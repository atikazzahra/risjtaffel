import cx from 'classnames';
import React, {Component} from 'react';
import Scroll from 'react-scroll';

export default class NavPart4 extends Component {
    render() {
        return (
            <div className={cx(
                "navPart4__dot",
                {active: this.props.active})} 
                style={this.props.styleNav}
                onClick={() => {
                    Scroll.animateScroll.scrollTo(this.props.position, {
                    duration: 1500,
                    delay: 70,
                    smooth: true
                });
            }}></div>
        )
    }
}