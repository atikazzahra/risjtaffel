import cx from 'classnames';
import React, {Component} from 'react';
import Scroll from 'react-scroll';

export default class HistoryBg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
        };
    }
    render() {
        return (
            <div id={this.props.id} 
                className={cx("history-content__bg")}>
            </div>
        )
    }
}