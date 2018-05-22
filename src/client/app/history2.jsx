import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {Easer} from 'functional-easing';
import cx from 'classnames';
import {tween, ease} from 'react-imation';
import {rgb, rgba, scale, rotate,
        px, percent, translate3d} from 'react-imation/tween-value-factories';
import {tweenState} from 'react-tween-state';
import {SectionPart4, LoadingPage, HistoryBg} from './components/index.jsx';
import Animate from 'react-move/Animate';
import Scroll from 'react-scroll';
import Observer from '@researchgate/react-intersection-observer';
import inView from 'in-view';

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            sectionWidth: 0,
            sectionHeight: 0,
            scrollY: 0,

            section: 0,
            images: [],
            
            loading: true,
            percent: 0
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.getScrollYPosition = this.getScrollYPosition.bind(this);
        this.updateBackground = this.updateBackground.bind(this);
        this.stopBackground = this.stopBackground.bind(this);
        this.setActive = this.setActive.bind(this);
        this.loadAllImage = this.loadAllImage.bind(this);
        this.getRect = this.getRect.bind(this);
    }
    componentDidMount() {
        this.loadAllImage();
        this.updateDimensions();
        this.updateScrollPosition();
        window.addEventListener("resize", this.updateDimensions);
        document.getElementById("history-container").addEventListener("scroll", this.updateScrollPosition);
        // inView('.history-section')
        //     .on('enter', this.updateBackground);
        // inView('#start')
        //     .on('enter', ()=>{ console.log("start");this.setState({section: 0})});

    }
    loadAllImage(){
        var imgs = document.images,
            len = imgs.length,
            self = this;

        [].forEach.call( imgs, function( img ) {
            imageLoaded(img)
        });

        function imageLoaded(img) {
            var newImage = new Image();
            newImage.src = img.src;
            newImage.onload = function () {
                var newState = self.state.images;
                newState.push(newImage);
                img.src = newImage.src;
                var percent = self.state.images.length/len*100;
                self.setState({percent: percent});
                if (self.state.percent == 100) {
                    setTimeout(function(){
                        self.setState({loading:false})
                    }, 300);
                }
             }
        }
    }
    updateDimensions() {
        this.setState({
            sectionWidth: this.getSectionRect().width, 
            sectionHeight: this.getSectionRect().height});
    }
    updateScrollPosition() {
        this.setState({scrollY: this.getScrollYPosition()});
    }
    getSectionRect() {
        return document.getElementById("main").getBoundingClientRect();
    }
    getScrollYPosition() {
        return document.getElementById("history-container").scrollTop;
    }
    getRect(id){
        var element = document.getElementById(id);
        if (element == null) {
            return "0";
        }
        var top = element.getBoundingClientRect().top +this.state.scrollY;
        return top;
    }
    stopScrolling() {
        window.off();
    }
    stopBackground(e){
        if (e.isIntersecting) {
            this.setState({section: 0});
        }
    }
    updateBackground(e){
        if (e.id != this.state.section) {
            bg.src = bg.src;
            this.setState({ section: e.id });
        }
    }
    setActive(to){
        Scroll.animateScroll.scrollToBottom({
            containerId:'history-container',
            duration: 200000,
            smooth: "linear",
        })
    }
    render() {
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        var Element = Scroll.Element;
        return (
            <div className="main" id="main">
                {/* <div style={{'position':'fixed', 'zIndex': '999', 'color': 'white'}}> {this.state.scrollY} </div> */}
                <LoadingPage
                    active={this.state.loading}
                    progress={this.state.percent}></LoadingPage>
                <div className="history">
                    <div style={{position:"fixed", top:16, left:10, zIndex: "10"}}
                        onClick={this.stopScrolling}><i style={{color: "#eaa30d", cursor: "pointer"}} className="far fa-pause-circle"></i>
                    </div>
                    <div className={cx(
                        "history-container",
                        { mask : this.state.scrollY >= '851'})}
                        id="history-container">
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
                        <Scroll.Element name="start" id="start">
                        <div style={{
                            height: "50%",
                            background: "linear-gradient(#541e0c, rgba(0,0,0,0.5))"
                        }}></div>
                        </Scroll.Element>
                        <div className="history-content"
                            id="history-content">
                            <img src="assets/images/title/HistoryofRijsttafel.png" id="history_title" style={{paddingTop:"600px"}}/>
                            <svg className="history-line">
                                <line x1="0" y1="0" x2="0" y2="100"
                                    style={tween(this.state.scrollY, [
                                        [[1250], { strokeDashoffset: px(200), ease: easeOutElastic}],
                                        [[3000], { strokeDashoffset: px(0) }],
                                    ])}/>
                            </svg>
                            <section className="history-section" 
                                id="1" 
                                bg="assets/images/bg/BGGIF1.gif">
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
                                    id="desc2"
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
                                    <div style={{'height':'100px'}}></div>
                                </div>
                                <div className="history-chapter" id="chap1">
                                    <img src="assets/images/photos/gambar1.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap1")-500], { marginTop: px(300), opacity: 0}],
                                            [[this.getRect("chap1")-250], { marginTop: px(150), opacity: 0.3}],
                                            [[this.getRect("chap1")], { marginTop: px(0), opacity: 1 }],
                                            [[this.getRect("chap1")+250], { marginTop: px(-150), opacity: 1 }],
                                        ])}
                                        id="historyimg1"/>
                                    <img src="assets/images/photos/gambar2.png" 
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap1")-100], { marginTop: px(200), opacity: 0}],
                                            [[this.getRect("chap1")+150], { marginTop: px(50), opacity: 0.85 }],
                                            [[this.getRect("chap1")+400], { marginTop: px(-100), opacity: 1 }],
                                            [[this.getRect("chap1")+650], { marginTop: px(-250), opacity: 1 }],
                                        ])}
                                        id="historyimg2"/>
                                </div>
                                <div className="history-chapter" id="chap2">
                                    <div className="history-desc">
                                        <div className="history-desc__content">
                                        Differences in culture yet food ingredients, gave a big influence,
                                        specially in the eating habits in certain families.</div>
                                    </div>
                                </div>
                                <div className="history-chapter" id="chap3">
                                    <img src="assets/images/photos/gambar3.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap3")-500], { marginTop: px(0), opacity: 0}],
                                            [[this.getRect("chap3")-250], { marginTop: px(-150), opacity: 1}],
                                            [[this.getRect("chap3")], { marginTop: px(-300), opacity: 1 }],
                                            [[this.getRect("chap3")+250], { marginTop: px(-450), opacity: 1 }],
                                        ])}
                                        id="historyimg3"/>
                                    <img src="assets/images/photos/gambar4.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap3")-200], { marginTop: px(50), opacity: 0}],
                                            [[this.getRect("chap3")-50], { marginTop: px(-150), opacity: 1 }],
                                            [[this.getRect("chap3")+200], { marginTop: px(-300), opacity: 1 }],
                                            [[this.getRect("chap3")+550], { marginTop: px(-450), opacity: 1 }],
                                        ])}
                                        id="historyimg4"/>
                                </div>
                                <div className="history-chapter" id="chap4">
                                    <img src="assets/images/photos/gambar5.gif"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap4")-400], { marginTop: px(-100)}],
                                            [[this.getRect("chap4")], { marginTop: px(-200) }],
                                        ])}
                                        className="history-chapter_one-image"
                                        id="historyimg5"/>
                                </div>
                            </section>
                            <section className="history-section"
                                id="2"
                                bg="assets/images/bg/BGGIF2.gif">
                                <div className="history-chapter" id="chap5">
                                    <div className="history-desc">
                                        <div className="history-desc__content">
                                        Differences in culture yet food ingredients, gave a big influence,
                                        specially in the eating habits in certain families.</div>
                                    </div>
                                </div>
                                <div className="history-chapter" id="chap6">
                                    <img src="assets/images/photos/gambar6.gif"
                                    className="history-chapter_one-image"
                                    id="historyimg6"
                                    style={tween(this.state.scrollY, [
                                        [[this.getRect("chap6")-400], { marginTop: px(200)}],
                                        [[this.getRect("chap6")], { marginTop: px(-100) }],
                                    ])}/>
                                </div>
                                <div className="history-chapter" id="chap7">
                                    <img className="history-chapter_h-image" src="assets/images/photos/gambar7.gif"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap7")-500], { marginTop: px(300), opacity: 0}],
                                            [[this.getRect("chap7")-250], { marginTop: px(150), opacity: 0.3}],
                                            [[this.getRect("chap7")], { marginTop: px(0), opacity: 1 }],
                                            [[this.getRect("chap7")+250], { marginTop: px(-150), opacity: 1 }],
                                        ])}
                                        id="historyimg3"/>
                                    <img className="history-chapter_h-image" src="assets/images/photos/gambar8.gif"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap7")-100], { marginTop: px(200), opacity: 0}],
                                            [[this.getRect("chap7")+50], { marginTop: px(0), opacity: 0.85 }],
                                            [[this.getRect("chap7")+200], { marginTop: px(-200), opacity: 1 }],
                                            [[this.getRect("chap7")+350], { marginTop: px(-400), opacity: 1 }],
                                        ])}
                                        id="historyimg4"/>
                                </div>
                                <div className="history-chapter short-chap" id="chap8">
                                    <img className="history-chapter_h-image" src="assets/images/photos/gambar9.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap8")-650], { marginTop: px(0), opacity: 0}],
                                            [[this.getRect("chap8")-400], { marginTop: px(-150), opacity: 1}],
                                            [[this.getRect("chap8")-150], { marginTop: px(-300), opacity: 1 }],
                                            [[this.getRect("chap8")+50], { marginTop: px(-450), opacity: 1 }],
                                        ])}
                                        id="historyimg3"/>
                                    <img className="history-chapter_h-image" src="assets/images/photos/gambar10.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap8")-450], { marginTop: px(200), opacity: 0}],
                                            [[this.getRect("chap8")-300], { marginTop: px(0), opacity: 0.5 }],
                                            [[this.getRect("chap8")-150], { marginTop: px(-200), opacity: 1 }],
                                            [[this.getRect("chap8")], { marginTop: px(-400), opacity: 1 }],
                                        ])}
                                        id="historyimg4"/>
                                </div>
                                <div className="history-chapter short-chap" id="chap9">
                                    <img className="history-chapter_h-image" src="assets/images/photos/gambar11.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("chap9")-650], { marginTop: px(0), opacity: 0}],
                                            [[this.getRect("chap9")-400], { marginTop: px(-150), opacity: 1}],
                                            [[this.getRect("chap9")-150], { marginTop: px(-300), opacity: 1 }],
                                            [[this.getRect("chap9")+50], { marginTop: px(-450), opacity: 1 }],
                                        ])}
                                        id="historyimg3"/>
                                </div>
                            </section>
                            <img className="history-content__bg"
                                id="section-1"
                                src="assets/images/bg/BGGIF1.gif"
                                style={tween(this.state.scrollY, [
                                    [[1400], { opacity: 0, ease: easeOutElastic }],
                                    [[2000], { opacity: 1 }]
                            ])}/>
                            <img className="history-content__bg"
                                id="section-2"
                                src="assets/images/bg/BGGIF2.gif"
                                style={tween(this.state.scrollY, [
                                    [[this.getRect("2")-500], { opacity: 0, ease: easeOutElastic }],
                                    [[this.getRect("2")+200], { opacity: 1 }]
                            ])}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}