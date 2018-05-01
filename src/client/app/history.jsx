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
import Observer from '@researchgate/react-intersection-observer';

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            sectionWidth: 0,
            sectionHeight: 0,
            scrollY: 0,
            section: 0,
            image: new Image()
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.getScrollYPosition = this.getScrollYPosition.bind(this);
        this.loopBackground = this.loopBackground.bind(this);
        this.stopBackground = this.stopBackground.bind(this);
        this.setActive = this.setActive.bind(this);
    }
    componentDidMount() {
        this.updateDimensions();
        this.updateScrollPosition();
        window.addEventListener("resize", this.updateDimensions);
        document.getElementById("history-container").addEventListener("scroll", this.updateScrollPosition);
        let img = new Image();
        img.src = "assets/images/bg/BGGIF1_resized_noloop.gif";
        this.setState({ image: img });
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
    stopBackground(e){
        if (e.isIntersecting) {
            this.setState({
                section: 0});
        }
    }
    loopBackground(e){
        let bg = document.getElementById('history-bg');
        if (e.isIntersecting) {
            if(e.target.id != this.state.section && bg != null){
                
                bg.src = this.state.image.src;
                this.setState({
                    section: e.target.id});
            }
        }
    }
    setActive(to){
        Scroll.animateScroll.scrollToBottom({
            containerId:'history-container',
            duration: 90000,
            smooth: "linear",
        })
    }
    render() {
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        var Element = Scroll.Element;
        return (
            <div className="main" id="main">
                <div className="history">
                    <div style={{position:"fixed", top:16, left:10, zIndex: "10"}}
                        onClick={this.stopScrolling}><i style={{color: "#eaa30d", cursor: "pointer"}} className="far fa-pause-circle"></i>
                    </div>
                    <div className={cx(
                        "history-container",
                        { mask : this.state.scrollY >= '851'})}
                        id="history-container">
                        <Observer
                            onChange={this.stopBackground}>
                        <SectionPart4 id="opening">
                            <div className="sectionPart4__title">
                                <img src="assets/images/title/TheRijsttafelCulture.png" id="opening_title"/>
                                <div id="opening_desc">
                                Rijsttafel come from the word ‘rijst’ which means rice, and ‘tafel’
                                which means table, which when unified have meanings: rice dishes.
                                The Dutch use the word ‘rijsttafel’ for Indonesian cuisines,
                                which served completely on the dine table, like the Western’s style.
                                </div>
                                <Scroll.Link activeClass="active"
                                      to="start"
                                      containerId="history-container"
                                      spy={true}
                                      smooth={true}
                                      hashSpy={true}
                                      offset={590}
                                      duration={2000}
                                      delay={0}
                                      isDynamic={true}
                                      onSetActive={this.setActive}
                                      ignoreCancelEvents={false}
                                ><i className="history-start fas fa-chevron-circle-down"></i></Scroll.Link>
                            </div>
                        </SectionPart4>
                        </Observer>
                        <Scroll.Element name="start">
                        <div style={{
                            height: "50%",
                            background: "linear-gradient(#541e0c, rgba(0,0,0,0.5))"
                        }}></div>
                        </Scroll.Element>
                        <div className="history-content" id="history-content">
                            <img src="assets/images/title/HistoryofRijsttafel.png" id="history_title" style={{paddingTop:"600px"}}/>
                            <svg className="history-line">
                                <line x1="0" y1="0" x2="0" y2="100"
                                    style={tween(this.state.scrollY, [
                                        [[1250], { strokeDashoffset: px(200), ease: easeOutElastic}],
                                        [[3000], { strokeDashoffset: px(0) }],
                                    ])}/>
                            </svg>
                            <Observer onChange={this.loopBackground}>
                            <section className="history-section" id="1">
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
                            </section>
                            </Observer>
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
                            <img className="history-content__bg"
                                id="history-bg"
                                src={this.state.image.src}
                                style={tween(this.state.scrollY, [
                                    [[1400], { opacity: 0, ease: easeOutElastic }],
                                    [[2000], { opacity: 1 }]
                            ])}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}