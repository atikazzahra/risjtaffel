import React, {Component} from 'react';
import { Line } from 'rc-progress';
import Animate from 'react-move/Animate';
import {easeExpInOut} from 'd3-ease';

export default class HistoryBg extends Component {

    render() {
        const src = this.props.src;
        const show = this.props.show;
        return (
            <div>
            { src != null && show &&
            <Animate
                show={show}
                start={{
                    opacity: 0,
                }}
                enter={{
                    opacity: [1],
                    timing: { duration: 500, ease: easeExpInOut },
                }}
                update={{
                    opacity: [1],
                    timing: { duration: 500, ease: easeExpInOut },
                }}
                leave={{
                    opacity: [0],
                    timing: { duration: 500, ease: easeExpInOut },
                }}>
                {(state) => {
                    const { opacity } = state;
                    return (
                        <img className="history-content__bg"
                            id={this.props.id}
                            src={this.props.src}
                            style={{opacity: `${opacity}`}}/>
                    );
                }}
            </Animate>
            }
            </div>
        )
    }
}