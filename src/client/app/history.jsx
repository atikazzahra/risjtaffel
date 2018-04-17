import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {Easer} from 'functional-easing';
import cx from 'classnames';
import {tween, ease} from 'react-imation';
import {rgb, rgba, scale, rotate,
        px, percent, translate3d} from 'react-imation/tween-value-factories';
import {tweenState} from 'react-tween-state';
import {SectionPart4, NavPart4, FoodDescPart4} from './components/index.jsx';
import Animate from 'react-move/Animate';
import Scroll from 'react-scroll';

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            sectionWidth: 0,
            sectionHeight: 0,
            scrollY: 0
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.getScrollYPosition = this.getScrollYPosition.bind(this);
    }
    componentDidMount() {
        this.updateDimensions();
        this.updateScrollPosition();
        window.addEventListener("resize", this.updateDimensions);
        document.getElementById("history-container").addEventListener("scroll", this.updateScrollPosition);
    }
    updateDimensions() {
        this.setState({
            sectionWidth: this.getSectionRect().width, 
            sectionHeight: this.getSectionRect().height});
    }
    updateScrollPosition() {
        this.setState({
            scrollY: this.getScrollYPosition()});
    }
    getSectionRect() {
        return document.getElementById("main").getBoundingClientRect();
    }
    getScrollYPosition() {
        return document.getElementById("history-container").scrollTop;
    }
    stopScrolling() {
        window.off();
    }
    render() {
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        return (
            <div className="main" id="main">
                <div className="history">
                    <div style={{position:"fixed", top:16, left:10, zIndex: "10"}}
                        onClick={this.stopScrolling}><i style={{color: "#eaa30d", cursor: "pointer"}} class="far fa-pause-circle"></i>
                    </div>
                    <div className={cx(
                        "history-container",
                        { mask : this.state.scrollY >= '851'})}
                        id="history-container">
                        <div style={{marginRight: "-17px"}}>
                        <SectionPart4 id="opening">
                            <div className="sectionPart4__title">
                                <img src="assets/images/title/1.png" id="opening_title"/>
                                <div id="opening_desc">
                                Rijsttafel come from the word ‘rijst’ which means rice, and ‘tafel’
                                which means table, which when unified have meanings: rice dishes.
                                The Dutch use the word ‘rijsttafel’ for Indonesian cuisines,
                                which served completely on the dine table, like the Western’s style.
                                </div>
                                <i className="history-start fas fa-chevron-circle-down"
                                    onClick={() => {
                                        Scroll.animateScroll.scrollToBottom({
                                            containerId: "history-container",
                                            duration: 100000,
                                            delay: 70,
                                            smooth: true,
                                        });
                                }}></i>
                            </div>
                        </SectionPart4>
                        <div style={{
                            height: "50%",
                            background: "linear-gradient(#541e0c, rgba(0,0,0,0.5))"
                        }}></div>
                        <div className="history-content">
                            <img src="assets/images/title/1.png" id="history_title" style={{paddingTop:"600px"}}/>
                            <svg className="history-line">
                                <line x1="0" y1="0" x2="0" y2="100"
                                    style={tween(this.state.scrollY, [
                                        [[1250], { strokeDashoffset: px(200), ease: easeOutElastic}],
                                        [[3000], { strokeDashoffset: px(0) }],
                                    ])}/>
                            </svg>
                            <div className="history-desc"
                                style={tween(this.state.scrollY, [
                                    [[1400], { opacity: 0, ease: easeOutElastic}],
                                    [[2000], { opacity: 1 }],
                                ])}>
                                <div className="history-desc__title">1596</div>
                                <div className="history-desc__content">
                                The Dutch came to East Indies Archipelago
                                to search spices commodities.</div>
                            </div>
                            <svg className="history-line">
                                <line x1="0" y1="0" x2="0" y2="100" 
                                    style={tween(this.state.scrollY, [
                                        [[1500], { strokeDashoffset: px(200), ease: easeOutElastic}],
                                        [[3000], { strokeDashoffset: px(0) }],
                                    ])}/>
                            </svg>
                            <div className="history-desc"
                                style={tween(this.state.scrollY, [
                                    [[1600], { opacity: 0, ease: easeOutElastic}],
                                    [[2000], { opacity: 1 }],
                                ])}>
                                <div className="history-desc__title">1602</div>
                                <div className="history-desc__content">
                                Vereenigde Oostindische Compagnie (VOC),
                                a Dutch trading company was founded.
                                They made a rule called, vrijgezel cultuur,
                                which only the noblemen of the Dutch were allowed
                                to bring thrir wife to East Indies Archipelago. </div>
                            </div>
                            <div className="history-chapter">
                                <img src="assets/images/photos/gambar1.png"
                                    style={tween(this.state.scrollY, [
                                        [[1500], { marginTop: px(0), ease: easeOutElastic}],
                                        [[2800], { marginTop: px(-10) }],
                                    ])}
                                    id="historyimg1"/>
                                <img src="assets/images/photos/gambar2.png" 
                                    style={tween(this.state.scrollY, [
                                        [[1800], { marginTop: px(100), ease: easeOutElastic}],
                                        [[4000], { marginTop: px(-200) }],
                                    ])}
                                    id="historyimg2"/>
                            </div>
                            <div className="history-desc">
                                <div className="history-desc__content">
                                Differences in culture yet food ingredients, gave a big influence,
                                specially in the eating habits in certain families.</div>
                            </div>
                            <div className="history-chapter">
                                <img src="assets/images/photos/gambar3.png"
                                    style={tween(this.state.scrollY, [
                                        [[2800], { marginTop: px(0), ease: easeOutElastic}],
                                        [[3500], { marginTop: px(-100) }],
                                    ])}
                                    id="historyimg3"/>
                                <img src="assets/images/photos/gambar4.png"
                                    style={tween(this.state.scrollY, [
                                        [[2800], { marginTop: px(0), ease: easeOutElastic}],
                                        [[4000], { marginTop: px(-200) }],
                                    ])}
                                    id="historyimg4"/>
                            </div>
                            <div className="history-chapter">
                                <img src="assets/images/photos/gambar5.gif" id="historyimg5"/>
                            </div>
                            <div className="history-content__bg"
                                style={tween(this.state.scrollY, [
                                    [[980], { opacity: 0, ease: easeOutElastic }],
                                    [[1200], { opacity: 1 }],
                                ])}></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}