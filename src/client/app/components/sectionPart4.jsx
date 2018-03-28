import cx from 'classnames';
import React, {Component} from 'react';

export default class SectionPart4 extends Component {
    render() {
        return (
            <div 
                id={this.props.id} 
                className={cx(
                    { "sectionPart4": !this.props.sectionTween },
                    { sectionScroller : !this.props.sectionTween && this.props.sectionScroller},
                    { hide : this.props.hide })}>
                <div
                    id={this.props.id+"_bg"}
                    style={this.props.styleBg}
                    className={cx(
                        "sectionPart4__bg",
                        { slide : this.props.slide},
                        { "sectionScroller__bg" : this.props.sectionScroller})}>
                </div>
                <div 
                    id={this.props.id+"_content"}
                    className={cx(
                        "sectionPart4__content")}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}