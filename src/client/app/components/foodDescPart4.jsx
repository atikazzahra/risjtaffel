import cx from 'classnames';
import React, {Component} from 'react';
import {range} from 'd3-array';
import {easeExpInOut} from 'd3-ease';
import Animate from 'react-move/Animate';

export default class FoodDescPart4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.updateShow = this.updateShow.bind(this);
    }
    updateShow(){
        this.setState({ show: !this.state.show });
    }
    renderFoodDesc(opacity, x){
        if (this.props.slide == "Left") {
            return { 
                opacity,
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`}
        } else if (this.props.slide == "Right"){
            return { 
                opacity,
                WebkitTransform: `translate3d(-${x}px, 0, 0)`,
                transform: `translate3d(-${x}px, 0, 0)`}
        } else if (this.props.slide == "Down") {
            return { 
                opacity,
                WebkitTransform: `translate3d(0, -${x}px, 0)`,
                transform: `translate3d(0, -${x}px, 0)`}
        }
    }
    render() {
        return (
        <Animate
          show={this.state.show}
          start={{
            opacity: 0,
            x: 20
          }}
          enter={{
            opacity: [1],
            x: [0],
            timing: { duration: 1000, ease: easeExpInOut },
          }}
          update={{
            opacity: [1],
            x: [20],
            timing: { duration: 1000, ease: easeExpInOut },
          }}
          leave={{
            opacity: [0],
            timing: { duration: 500, ease: easeExpInOut },
          }}>
          {(state) => {
            const { opacity, x } = state;
            return (
                <div className="food-desc"
                    id={this.props.id}
                    style={this.renderFoodDesc(opacity, x)}>
                {this.props.children}</div>
            );
          }}
        </Animate>
        )
    }
}