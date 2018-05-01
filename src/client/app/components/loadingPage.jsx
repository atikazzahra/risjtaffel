import React, {Component} from 'react';
import { Line } from 'rc-progress';
import Animate from 'react-move/Animate';
import {easeExpInOut} from 'd3-ease';

export default class LoadingPage extends Component {
    render() {
        return (
            <div>
            <Animate
            show={this.props.active}
            start={{
                opacity: 1,
            }}
            enter={{
                opacity: [1],
                timing: { duration: 1000, ease: easeExpInOut },
            }}
            update={{
                opacity: [1],
                timing: { duration: 1000, ease: easeExpInOut },
            }}
            leave={{
                opacity: [0],
                timing: { duration: 500, ease: easeExpInOut },
            }}>
            {(state) => {
                const { opacity } = state;
                return (
                    <div
                        id="load" 
                        style={{background: "#000", 
                            height: "100%",
                            width: "100%",
                            zIndex: "99",
                            position: "fixed",
                            opacity: `${opacity}`}}>
                        <Line percent={this.props.progress} strokeWidth="2" strokeColor="#eaa30d" />
                    </div>
                );
            }}
            </Animate>

            </div>
        )
    }
}