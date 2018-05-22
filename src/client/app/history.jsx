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
import {Howl, Howler} from 'howler';
import Waypoint from 'react-waypoint';

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            sectionWidth: 0,
            sectionHeight: 0,
            velocity: 0.04,
            scrollY: 0,

            images: [],
            
            loading: true,
            percent: 0,
            percentmusic: 0,
            scroll: false,
            
            audios: {},
            audioId: 0,
            
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.scrollAction = this.scrollAction.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.getScrollYPosition = this.getScrollYPosition.bind(this);
        this.setActive = this.setActive.bind(this);
        this.loadAllImage = this.loadAllImage.bind(this);
        this.loadAllAudio = this.loadAllAudio.bind(this);
        this.getRect = this.getRect.bind(this);
    }
    componentDidMount() {
        this.loadAllAudio();
        this.loadAllImage();
        this.updateDimensions();
        this.updateScrollPosition();
        var self = this;
        window.addEventListener("resize", this.updateDimensions);
        document.getElementById("history-container").addEventListener("scroll", this.updateScrollPosition);
        var events = ['mousedown', 'mousewheel', 'touchmove'];
        for (var i = 0; i < events.length; i++) { 
            document.getElementById("history-container").addEventListener(events[i], function(){
                self.setState({scroll:false});
            });
        }
        window.addEventListener("keydown", function(){
            self.setState({scroll:false});
        });
    }
    loadAllAudio(){
        var self = this;
        var audios = ['music1', 'music2'];
        var loaded = 0;
        var sounds = [];
        for (var i=0; i<audios.length; i++) {
            sounds[audios[i]] = new Howl({
                src: ['assets/music/'+audios[i]+'.mp3'],
                onload: function(){
                    loaded+=1;
                    let percent = loaded/audios.length*50;
                    self.setState({percentaudio: percent});
                    let total = (self.state.percent + self.state.percentaudio);
                    if (total == 100) {
                        setTimeout(function(){
                            self.setState({loading: false})
                        }, 300);
                    }
                },
                loop: true
            });
        }
        this.setState({audios: sounds});
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
                var percent = self.state.images.length/len*50;
                self.setState({percent: percent});
                if ((self.state.percent + self.state.percentaudio) == 100) {
                    setTimeout(function(){
                        self.setState({loading: false})
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
        let height = document.documentElement.clientHeight;
        var bottom = element.getBoundingClientRect().top + this.state.scrollY - height;
        return bottom;
    }
    scrollAction() {
        if (this.state.scroll) {
            this.setState({scroll:false});
        } else {
            this.scrollToDistance();
        }
    }
    setActive(to){
        this.setState({scroll:true});
        this.scrollToDistance();
    }
    scrollToDistance(){
        var this1 = this;
        this1.setState({scroll:true});
        Scroll.animateScroll.scrollToBottom({
            containerId:'history-container',
            duration: function () { 
                var element = document.getElementById("history-container");
                var velocity = this1.state.velocity;
                var distance = element.scrollHeight-this1.getScrollYPosition();
                var duration = distance/velocity;
                return duration; },
            smooth: "linear",
        })
    }
    render() {
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        var Element = Scroll.Element;
        let self = this;
        function startAudio(msc){
            if (Object.keys(self.state.audios).length!=0){
                const sound = self.state.audios[msc];
                if (self.state.audioId ==0){
                    let id1 = sound.play();
                    self.setState({audioId: id1});
                    sound.fade(0, 1, 1000, id1);
                }
            }
        }
        function stopAudio(msc){
            if (Object.keys(self.state.audios).length!=0){
                const sound = self.state.audios[msc];
                sound.fade(1, 0, 1000, self.state.audioId);
                setTimeout(function(){
                    sound.stop();
                    self.setState({audioId: 0});
                }, 1000);
            }
        }
        return (
            <div className="main" id="main">
                {/* <div style={{'position':'fixed', 'zIndex': '999', 'color': 'white'}}> {this.state.scrollY} </div> */}
                <LoadingPage
                    active={this.state.loading}
                    progress={this.state.percent+this.state.percentaudio}></LoadingPage>
                <div className="history">
                    <div
                        style={tween(this.state.scrollY, [
                            [[1100], { opacity:0, ease: easeOutElastic}],
                            [[1300], { opacity:1 }],
                        ])} 
                        className="history-button-scroll"
                        onClick={this.scrollAction}>
                        {this.state.scroll ? (
                            <i style={{color: "#eaa30d", cursor: "pointer"}} className="far fa-pause-circle"></i>
                        ) : (
                            <i style={{color: "#eaa30d", cursor: "pointer"}} className="far fa-play-circle"></i>
                        )}
                        
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
                                      ignoreCancelEvents={true}
                                ><i className="history-start fas fa-chevron-circle-down"></i></Scroll.Link>
                            </div>
                        </SectionPart4>
                        <Scroll.Element name="start" id="start">
                        <div
                            id="history-start" 
                            style={{
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
                                </div>
                                <div className="history-chapter-two space-20" id="chap1">
                                    <img src="assets/images/photos/gambar1.png"
                                        className="history-img-1 img-left"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg1")], { opacity: 0}],
                                            [[this.getRect("historyimg1")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg1")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg1"/>
                                    <img src="assets/images/photos/gambar2.png" 
                                        className="history-img-2"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg2")], { opacity: 0}],
                                            [[this.getRect("historyimg2")+200], { opacity: 0.3 }],
                                            [[this.getRect("historyimg2")+400], { opacity: 1 }]
                                        ])}
                                        id="historyimg2"/>
                                </div>
                                <Waypoint
                                topOffset="100px"
                                bottomOffset="100px"
                                onEnter={function(){startAudio('music1');}}
                                onLeave={function(){stopAudio('music1');}}>
                                <div className="history-chapter" id="chap2">
                                    <div className="history-desc">
                                        <div className="history-desc__content">
                                        Differences in culture yet food ingredients, gave a big influence,
                                        specially in the eating habits in certain families.</div>
                                    </div>
                                </div>
                                </Waypoint>
                                <div className="history-chapter-two" id="chap3">
                                    <img src="assets/images/photos/gambar3.png"
                                        className="history-img-1 img-left"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg3")], { opacity: 0}],
                                            [[this.getRect("historyimg3")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg3")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg3"/>
                                    <img src="assets/images/photos/gambar4.png"
                                        className="history-img-2"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg4")], { opacity: 0}],
                                            [[this.getRect("historyimg4")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg4")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg4"/>
                                </div>
                                <div className="history-chapter-two space-20" id="chap4">
                                    <img src="assets/images/photos/gambar5.gif"
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
                                <div className="history-chapter-two" id="chap6">
                                    <img src="assets/images/photos/gambar6.gif"
                                    className="history-chapter_one-image"
                                    id="historyimg6"
                                    />
                                </div>
                                <div className="history-chapter" id="chap7">
                                    <img className="history-chapter_h-image img-left" src="assets/images/photos/gambar7.gif"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg7")], { opacity: 0}],
                                            [[this.getRect("historyimg7")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg7")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg7"/>
                                    <img className="history-chapter_h-image img-right" src="assets/images/photos/gambar8.gif"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg8")], { opacity: 0}],
                                            [[this.getRect("historyimg8")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg8")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg8"/>
                                </div>
                                <Waypoint
                                topOffset="100px"
                                bottomOffset="100px"
                                onEnter={function(){startAudio('music2');}}
                                onLeave={function(){stopAudio('music2');}}>
                                <div className="history-chapter" id="chap8">
                                    <img className="history-chapter_h-image img-left" src="assets/images/photos/gambar9.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg9")], { opacity: 0}],
                                            [[this.getRect("historyimg9")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg9")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg9"/>
                                    <img className="history-chapter_h-image img-right" src="assets/images/photos/gambar10.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg10")], { opacity: 0}],
                                            [[this.getRect("historyimg10")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg10")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg10"/>
                                </div>
                                </Waypoint>
                                <div className="history-chapter" id="chap9">
                                    <img className="history-chapter_h-image img-left" src="assets/images/photos/gambar11.png"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg11")], { opacity: 0}],
                                            [[this.getRect("historyimg11")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg11")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg11"/>
                                </div>
                            </section>
                            <section 
                                className="history-section" 
                                id="3">
                                <div className="history-chapter-two" id="chap10">
                                    <img src="assets/images/photos/gambar12.png"
                                        className="history-img-1 img-left"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg12")], { opacity: 0}],
                                            [[this.getRect("historyimg12")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg12")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg12"/>
                                    <img src="assets/images/photos/gambar13.png" 
                                        className="history-img-2"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg13")], { opacity: 0}],
                                            [[this.getRect("historyimg13")+200], { opacity: 0.3 }],
                                            [[this.getRect("historyimg13")+400], { opacity: 1 }]
                                        ])}
                                        id="historyimg13"/>
                                </div>
                                <div className="history-chapter-two space-20" id="chap11">
                                    <img src="assets/images/photos/gambar14.png"
                                        className="history-img-1 history-chapter_h-image img-left"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg13")], { opacity: 0}],
                                            [[this.getRect("historyimg13")+200], { opacity: 0.3}],
                                            [[this.getRect("historyimg13")+400], { opacity: 1 }],
                                        ])}
                                        id="historyimg13"/>
                                    <img src="assets/images/photos/gambar15.png" 
                                        className="history-img-2"
                                        style={tween(this.state.scrollY, [
                                            [[this.getRect("historyimg14")], { opacity: 0}],
                                            [[this.getRect("historyimg14")+200], { opacity: 0.3 }],
                                            [[this.getRect("historyimg14")+400], { opacity: 1 }]
                                        ])}
                                        id="historyimg14"/>
                                </div>
                                <div className="history-chapter-two space-20" id="chap12">
                                    <img src="assets/images/photos/gambar16.gif"
                                        className="history-chapter_one-image"
                                        id="historyimg15"/>
                                </div>
                            </section>
                            <section className="history-section" 
                                id="4">
                                <div className="history-chapter space-20" id="chap13">
                                    <div className="history-desc">
                                        <div className="history-desc__content">
                                       However, because of Japan invasion in 1942, Many of the Dutch
                                       returned back to their country, and rijsttafel culture starting to
                                       fade away in Indonesia</div>
                                    </div>
                                </div>
                            </section>
                            <img className="history-content__bg"
                                id="section-1"
                                src="assets/images/bg/BGGIF1.gif"
                                style={tween(this.state.scrollY, [
                                    [[1400], { opacity: 0, ease: easeOutElastic }],
                                    [[2000], { opacity: 1 }],
                            ])}/>
                            <img className="history-content__bg"
                                id="section-2"
                                src="assets/images/bg/BGGIF2.gif"
                                style={tween(this.state.scrollY, [
                                    [[this.getRect("2")+300], { opacity: 0, ease: easeOutElastic }],
                                    [[this.getRect("2")+500], { opacity: 1 }],
                            ])}/>
                            <img className="history-content__bg"
                                id="section-3"
                                src="assets/images/bg/BGGIF3.gif"
                                style={tween(this.state.scrollY, [
                                    [[this.getRect("3")+300], { opacity: 0, ease: easeOutElastic }],
                                    [[this.getRect("3")+500], { opacity: 1 }],
                                    [[this.getRect("4")+300], { opacity: 1, ease: easeOutElastic }],
                            ])}/>
                            <div className="history-content__bg"
                                id="section-4"
                                style={tween(this.state.scrollY, [
                                    [[this.getRect("4")+300], { opacity: 0, ease: easeOutElastic }],
                                    [[this.getRect("4")+600], { opacity: 1 }],
                            ])}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}