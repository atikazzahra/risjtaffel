import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {Easer} from 'functional-easing';
import cx from 'classnames';
import {Track, TrackedDiv, TrackDocument} from 'react-track';
import {tween, ease} from 'react-imation';
import {topTop,
        topBottom,
        centerCenter,
        topCenter,
        bottomBottom,
        bottomTop,
        getDocumentRect,
        getDocumentElement,
        calculateScrollY} from 'react-track/tracking-formulas';
import {rgb, rgba, scale, rotate,
        px, percent, translate3d} from 'react-imation/tween-value-factories';
import {tweenState} from 'react-tween-state';
import {SectionPart4, NavPart4, FoodDescPart4, LoadingPage} from './components/index.jsx';
import Scroll from 'react-scroll';
import {Howl, Howler} from 'howler';
import Waypoint from 'react-waypoint';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class Restaurant extends Component {
    constructor(props){
        super(props);
        this.foodDesc = [];
        this.state = {
            scrollDiff: 400,
            sectionWidth: 0,
            sectionHeight: 0,
            navTweenPostion: [],
            navScrollPosition: [],
            images: [],
            loading: true,
            percent: 0,
            scrollY: 0,
            audio: null,
            played: false
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.updateNavData = this.updateNavData.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.loadAllImage = this.loadAllImage.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
    }
    componentDidMount() {
        this.loadAllImage();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
        let self = this;
        let sound = new Howl({
            src: ['assets/music/restaurant.mp3'],
            onload: function(){
                self.setState({audio: sound});
            },
        });
    }
    updateScrollPosition() {
        var y = document.body.scrollTop;
        var offset = y-this.state.scrollY;
        var scroll = 0;
        var len = 4;
        console.log(offset);
        if (offset >= 0){
            /* down */
            var found = false;
            var idx = 0;
            while (!found && idx < len) {
                if (y <= this.state.navScrollPosition[idx]) {
                    scroll = this.state.navScrollPosition[idx];
                    found = true;
                }
                idx++;
            }
        } else {
            var found = false;
            var idx = len;
            while (!found && idx+1 > 0) {
                if (y >= this.state.navScrollPosition[idx]) {
                    scroll = this.state.navScrollPosition[idx];
                    found = true;
                }
                idx--;
            }
        }
        this.setState({scrollY: y});
        Scroll.animateScroll.scrollTo(scroll, {
            duration: 1500,
            smooth: true});
    }
    loadAllImage(){
        var imgs = document.images,
            len = imgs.length,
            counter = 0,
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
                counter++;

                if (self.state.images.length === len ) {
                    setTimeout(function(){
                        self.setState({loading:false})
                    }, 300);
                }
             }
        }
    }

    showDescription(props) {
        this.foodDesc[String(props.target.id)].updateShow();
    }
    getSectionRect(){
        return document.getElementById("opening").getBoundingClientRect();
    }
    updateNavData(){
        var navScroll = [];
        navScroll.push(0);
        for (var i = 0; i < 4; i++) { 
            let pos = this.getSectionRect().height + (i*this.state.scrollDiff);
            navScroll.push(pos);
        }
        return navScroll;
    }
    updateDimensions() {
        this.setState({
            sectionWidth: this.getSectionRect().width, 
            sectionHeight: this.getSectionRect().height,
            navScrollPosition: this.updateNavData()});
    }
    componentDidUpdate() {
        if (this.state.loading == false && this.state.audio!= null) {
            if (this.state.played == false){
                this.setState({played: true});
                const sound = this.state.audio;
                let id1 = sound.play();
                sound.fade(0, 0.3, 4000, id1);
            }
        }
      }
    componentWillUnmount() {
        if (this.state.played == true){
            const sound = this.state.audio;
            let id1 = sound.stop();
        }
    }
    render() {
        const navTweenPostion = [0, 359, 390, 846, 847, 1327, 1346, 1844, 1860];
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        let self = this;
        return (
            <div className="main">
                <ul className="Navbar">
                    <li>
                    <Link to="/">History</Link>
                    </li>
                </ul>
                <LoadingPage
                    active={this.state.loading}
                    progress={this.state.percent}></LoadingPage>
                <div className="restaurant">
                    <div className="restaurant-container" id="restaurant-container">
                        <SectionPart4 id="opening">
                            <img src="assets/images/photos/nongif_2.jpg" className="sectionPart4__content-gif" id="gif1"/>
                            <img src="assets/images/photos/todaysrijsttafel_gif2.gif" className="sectionPart4__content-gif" id="gif2"/>
                            <img src="assets/images/photos/todaysrijsttafel_gif1.gif" className="sectionPart4__content-gif" id="gif3"/>
                            
                            <div className="sectionPart4__gif-overflow">
                                <img src="assets/images/photos/nongif_4.jpg" className="sectionPart4__content-gif" id="gif4"/>
                            </div>
                            <div className="sectionPart4__title">
                                <div id="opening_subtitle">
                                based on Tugu Kunstkring Paleis’ Menu
                                </div>
                                <img src="assets/images/title/1.png" id="opening_title"/>
                                <div id="opening_desc">
                                Some <span className="italic">rijsttafel’s</span> menu which still available in the present day, chosen from
                                the menu of Tugu Kunstkring Paleis, one of the restaurants in Indonesia
                                that still have <span className="italic">rijsttafel’s</span> dishes and servings.
                                </div>
                            </div>
                            <img src="assets/images/food/Kunstkring_Tea.png" className="sectionPart4__content-img" id="tea"/>
                        </SectionPart4>
                        <TrackDocument formulas={[getDocumentElement, getDocumentRect, calculateScrollY,
                            topTop, topBottom, topCenter, centerCenter, bottomBottom,
                            bottomTop]}>
                            {(documentElement, documentRect, scrollY, topTop,
                            topBottom, topCenter, centerCenter, bottomBottom, bottomTop) =>
                            <div>
                                <TrackedDiv
                                    formulas={[topTop, bottomBottom]}>
                                {(posTopTop, posBottomBottom) =>
                                    <ul className="navPart4">
                                        <NavPart4
                                            position={this.state.navScrollPosition? this.state.navScrollPosition[0] : '0'}
                                            active={this.state.navScrollPosition? scrollY < this.state.navScrollPosition[1]/2 : '659/2'}
                                            styleNav=
                                            {tween(scrollY, [
                                                [ navTweenPostion[0], { backgroundColor: rgb(221,145,95), height: px(15), width: px(15) } ],
                                                [ navTweenPostion[1], { backgroundColor: rgb(194,83,28), height: px(12), width: px(12) } ],

                                                [ navTweenPostion[2], { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[3], { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[4], { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[5], { backgroundColor: rgb(20,58,77), height: px(8), width: px(8)} ],

                                                [ navTweenPostion[6], { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[7], { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[8], { backgroundColor: rgb(205,133,87), height: px(8), width: px(8) } ]
                                            ])}
                                        ></NavPart4>
                                        <NavPart4
                                            position={this.state.navScrollPosition? this.state.navScrollPosition[1] : '659'}
                                            active={this.state.navScrollPosition? scrollY < this.state.navScrollPosition[2]/2 : '1079/2'}
                                            styleNav=
                                            {tween(scrollY, [
                                                [ navTweenPostion[0], { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[1]-20, { backgroundColor: rgb(194,83,28), height: px(9), width: px(9) } ],

                                                [ navTweenPostion[2]-20, { backgroundColor: rgb(235,222,110), height: px(12), width: px(12) } ],
                                                [ 659, { backgroundColor: rgb(235,222,110), height: px(15), width: px(15) } ],
                                                [ navTweenPostion[3]-20, { backgroundColor: rgb(235,222,110), height: px(12), width: px(12) } ],

                                                [ navTweenPostion[4]-20, { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[5]-20, { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[6]-20, { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[7]-20, { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                
                                                [ navTweenPostion[8]-20, { backgroundColor: rgb(205,133,87), height: px(8), width: px(8) } ]
                                            ])}
                                        ></NavPart4>
                                        <NavPart4
                                            position={this.state.navScrollPosition? this.state.navScrollPosition[2] : '1079'}
                                            active={this.state.navScrollPosition? scrollY < this.state.navScrollPosition[3]/2 : '1479/2'}
                                            styleNav=
                                            {tween(scrollY, [
                                                [ navTweenPostion[0], { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[1]-40, { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[2]-40, { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[3]-40, { backgroundColor: rgb(143,110,112), height: px(9), width: px(9) } ],

                                                [ navTweenPostion[4]-40, { backgroundColor: rgb(85,29,12), height: px(12), width: px(12) } ],
                                                [ 1079, { backgroundColor: rgb(85,29,12), height: px(15), width: px(15) } ],
                                                [ navTweenPostion[5]-40, { backgroundColor: rgb(85,29,12), height: px(12), width: px(12) } ],

                                                [ navTweenPostion[6]-40, { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[7]-40, { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                
                                                [ navTweenPostion[8]-40, { backgroundColor: rgb(205,133,87), height: px(8), width: px(8) } ]
                                            ])}
                                        ></NavPart4>
                                        <NavPart4
                                            position={this.state.navScrollPosition? this.state.navScrollPosition[3] : '1479'}
                                            active={this.state.navScrollPosition? scrollY < this.state.navScrollPosition[4]/2 : '1879/2'}
                                            styleNav=
                                            {tween(scrollY, [
                                                [ navTweenPostion[0], { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[1]-60, { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[2]-60, { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[3]-60, { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[4]-60, { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[5]-60, { backgroundColor: rgb(20,58,77), height: px(9), width: px(9) } ],

                                                [ navTweenPostion[6]-60, { backgroundColor: rgb(235,222,110), height: px(12), width: px(12) } ],
                                                [ 1679, { backgroundColor: rgb(235,222,110), height: px(15), width: px(15) } ],
                                                [ navTweenPostion[7]-60, { backgroundColor: rgb(235,222,110), height: px(12), width: px(12) } ],
                                                
                                                [ navTweenPostion[8]-60, { backgroundColor: rgb(205,133,87), height: px(8), width: px(8) } ]
                                            ])}
                                        ></NavPart4>
                                        <NavPart4
                                            position={this.state.navScrollPosition? this.state.navScrollPosition[4] : '1879'}
                                            active={scrollY < 659/2}
                                            styleNav=
                                            {tween(scrollY, [
                                                [ navTweenPostion[0], { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[1]-80, { backgroundColor: rgb(194,83,28), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[2]-80, { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[3]-80, { backgroundColor: rgb(143,110,112), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[4]-80, { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[5]-80, { backgroundColor: rgb(20,58,77), height: px(8), width: px(8) } ],

                                                [ navTweenPostion[6]-80, { backgroundColor: rgb(225,136,125), height: px(8), width: px(8) } ],
                                                [ navTweenPostion[7]-80, { backgroundColor: rgb(225,136,125), height: px(9), width: px(9) } ],
                                                
                                                [ navTweenPostion[8]-80, { backgroundColor: rgb(235,222,110), height: px(12), width: px(12) } ],
                                                [ 2080, { backgroundColor: rgb(235,222,110), height: px(15), width: px(15) } ]
                                            ])}
                                        ></NavPart4>
                                    </ul>
                                }</TrackedDiv>

                                <TrackedDiv
                                    className="sectionScroller"
                                    style={{height: "3000px"}}
                                    formulas={[topTop, bottomBottom]}>
                                {(posTopTop, posBottomBottom) =>
                                    <div className={cx("sectionScrollerPlaceholder", {fixed: scrollY > posTopTop})}>
                                        {/* <div style={{position: "fixed", zIndex: "20", fontSize: "50"}}>{scrollY} === {posTopTop}</div> */}
                                        <SectionPart4
                                            sectionScroller="True"
                                            id="appetizers">
                                            <div id="desc_tea">
                                                <span className="desc_tea" id="desc_tea1">start</span>
                                                <span className="desc_tea" id="desc_tea2">with a</span>
                                                <span className="desc_tea" id="desc_tea3">cup of</span>
                                                <span className="desc_tea" id="desc_tea4">Kuntskring's</span>
                                                <span className="desc_tea" id="desc_tea5">special</span>
                                                <span className="desc_tea" id="desc_tea6">tea</span>
                                            </div>
                                            <img 
                                                style={tween(scrollY, [
                                                    [[posTopTop-300], { marginTop: px(-200), opacity: 0, ease: easeOutElastic}],
                                                    [[posTopTop-10], { marginTop: px(0), opacity: 1 }],
                                                    [[posTopTop-10], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+180], { marginTop: px(200), opacity: 0 }]
                                                ])}
                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Rissoles-Salad-with-Mustard-Sauce.png" className="sectionPart4__content-img" id="rissoles"/>
                                            <FoodDescPart4
                                                slide="Left"
                                                id="rissoles_desc" 
                                                ref={(desc) => { this.foodDesc["rissoles"] = desc; }}>
                                                <div className="food-desc__title">Rissoles Salad</div>
                                                <div className="food-desc__subtitle">with Mustard Sauce</div>
                                                <div className="food-desc__fulldesc">
                                                    Dutch-style rissoles stuffed with prawns, served on the top of huzaren sla salad with pineapple, apple, cucumber, onion, carrot, potato, and mayonaise-based sauce.</div>
                                            </FoodDescPart4>
                                            <FoodDescPart4 
                                                slide="Right"
                                                id="bitterballen_desc" 
                                                ref={(desc) => { this.foodDesc["bitterballen"] = desc; }}>
                                                <div className="food-desc__title">Bitterballen</div>
                                                <div className="food-desc__fulldesc">
                                                Crusted, breaded minced beef ball with
                                                aromatic truffle oil, served with mustard
                                                and white soybean dip.</div>
                                            </FoodDescPart4>
                                            <img
                                                style={tween(scrollY, [
                                                    [[posTopTop-230], { marginTop: px(-200), opacity: 0, ease: easeOutElastic}],
                                                    [[posTopTop], { marginTop: px(0), opacity: 1 }],
                                                    [[posTopTop], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+190], { marginTop: px(200), opacity: 0 }]
                                                ])}
                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Bitterballen.png" className="sectionPart4__content-img" id="bitterballen"/>
                                            <div id="appetizers_title"
                                                style={tween(scrollY, [
                                                    [[posTopTop-90], { left: percent(20), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop], { left: percent(50), opacity: 1 }],
                                                    [[posTopTop+220], { left: percent(50), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+this.state.scrollDiff], { left: percent(70), opacity: 0 }]
                                                ])}>Appetizers</div>
                                        </SectionPart4>
                                        <SectionPart4
                                            sectionScroller="True"
                                            sectionTween="True"
                                            id="mains"
                                            slide="True"
                                            hide={scrollY <= posTopTop+20}
                                            styleBg={tween(scrollY, [
                                                [[posTopTop], {bottom: percent(100)}],
                                                [[posTopTop+this.state.scrollDiff], {bottom: percent(0)}]
                                            ])}>
                                            <div id="mains_title"
                                                style={tween(scrollY, [
                                                    [[posTopTop+110], { left: percent(20), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+220], { left: percent(50), opacity: 1 }],
                                                    [[posTopTop+(this.state.scrollDiff)], { left: percent(50), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+(this.state.scrollDiff+30)], { left: percent(70), opacity: 0 }]
                                                ])}>Main Course</div>
                                            <FoodDescPart4
                                                slide="Down"
                                                id="kerrie_desc" 
                                                ref={(desc) => { this.foodDesc["kerrie"] = desc; }}>
                                                <div className="food-desc__subtitle">Garnalen</div>
                                                <div className="food-desc__title">Portuguesche Kerrie</div>
                                                <div className="food-desc__fulldesc">
                                                Stew of giant prawns in red Portuguese curry, served with
                                                bamboo shoots, cherry tomatoes, green chilli and
                                                kaffir lime leaves.</div>
                                            </FoodDescPart4>
                                            <FoodDescPart4
                                                slide="Down"
                                                id="biefstuk_desc" 
                                                ref={(desc) => { this.foodDesc["biefstuk"] = desc; }}>
                                                <div className="food-desc__title">Indonesische Biefstuk</div>
                                                <div className="food-desc__subtitle">van Mevrouw Sonya Lee</div>
                                                <div className="food-desc__fulldesc">
                                                Prime Australian tenderloin steak in its own juicy reduction,
                                                served with potato au gratin, stir fried carrots, baby french beans
                                                and cherry tomatoes.</div>
                                            </FoodDescPart4>
                                            <FoodDescPart4
                                                slide="Down"
                                                id="acarIkan_desc" 
                                                ref={(desc) => { this.foodDesc["acarIkan"] = desc; }}>
                                                <div className="food-desc__title">Kuah Acar Ikan</div>
                                                <div className="food-desc__subtitle">Blimbing Wuluh</div>
                                                <div className="food-desc__fulldesc">
                                                Yellow stewed fish in tamarind soup.</div>
                                            </FoodDescPart4>
                                            <img 
                                                style={tween(scrollY, [
                                                    [[posTopTop+50], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+220], { marginTop: px(0), opacity: 1 }],
                                                    [[posTopTop+220], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+680], { marginTop: px(200), opacity: 0 }]
                                                ])}
                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Garnalen-Portuguesche-Kerrie.png" className="sectionPart4__content-img" id="kerrie"/>
                                            <img
                                                style={tween(scrollY, [
                                                    [[posTopTop+70], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+250], { marginTop: px(0), opacity: 1 }],
                                                    [[posTopTop+250], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+700], { marginTop: px(200), opacity: 0 }]
                                                ])}

                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Indonesische-Biefstuk-van-Mevrouw-Sonya-Lee.png" className="sectionPart4__content-img" id="biefstuk"/>
                                            <img
                                                style={tween(scrollY, [
                                                    [[posTopTop+90], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+270], { marginTop: px(0), opacity: 1 }],
                                                    [[posTopTop+270], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+720], { marginTop: px(200), opacity: 0 }]
                                                ])}
                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Kuah-Acar-Ikan-Blimbing-Wuluh.png" className="sectionPart4__content-img" id="acarIkan"/>
                                        </SectionPart4>
                                        <SectionPart4
                                            sectionScroller="True"
                                            sectionTween="True"
                                            id="desserts"
                                            slide="True"
                                            hide={scrollY <= posTopTop+this.state.scrollDiff}
                                            styleBg={tween(scrollY, [
                                                [[posTopTop+this.state.scrollDiff], {bottom: percent(100)}],
                                                [[posTopTop+(2*this.state.scrollDiff)], {bottom: percent(0)}]
                                            ])}>
                                            <div id="desserts_title"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(this.state.scrollDiff+30)], { left: percent(20), opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+(this.state.scrollDiff+60)], { left: percent(50), opacity: 1 }],
                                                    [[posTopTop+(2*this.state.scrollDiff)], { left: percent(50), opacity: 1, ease: easeInElastic }],
                                                    [[posTopTop+(2*this.state.scrollDiff+30)], { left: percent(70), opacity: 0 }]
                                                ])}>Dessert</div>
                                            <FoodDescPart4
                                                slide="Down"
                                                id="poffertjes_desc" 
                                                ref={(desc) => { this.foodDesc["poffertjes"] = desc; }}>
                                                <div className="food-desc__title">Poffertjes</div>
                                                <div className="food-desc__fulldesc">
                                                Small puffed cakes with tropical fruit compote
                                                and crusted hazelnuts.</div>
                                            </FoodDescPart4>
                                            <img 
                                                style={tween(scrollY, [
                                                [[posTopTop+420], { marginTop: px(-500), opacity: 0, ease: easeOutElastic}],
                                                [[posTopTop+602], { marginTop: px(0), opacity: 1 }],
                                                [[posTopTop+800], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                                [[posTopTop+(2*this.state.scrollDiff+300)], { marginTop: px(200), opacity: 0}],
                                                ])}
                                                onMouseOver={this.showDescription.bind(this)}
                                                onMouseOut={this.showDescription.bind(this)}
                                                src="assets/images/food/Poffertjes.png" className="sectionPart4__content-img" id="poffertjes"/>
                                        </SectionPart4>
                                        <SectionPart4
                                            sectionScroller="True"
                                            sectionTween="True"
                                            id="packages1"
                                            slide="True"
                                            hide={scrollY <= posTopTop+(2*this.state.scrollDiff)}
                                            styleBg={tween(scrollY, [
                                                [[posTopTop+(2*this.state.scrollDiff)], {bottom: percent(100)}],
                                                [[posTopTop+(3*this.state.scrollDiff)], {bottom: percent(0)}]
                                            ])}>
                                            <div id="packages_title"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(2*this.state.scrollDiff)], { left: -500, opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+(3*this.state.scrollDiff)], { left: 0, opacity: 1 }],
                                                    [[posTopTop+(3*this.state.scrollDiff)], { top: 0, opacity: 1 }],
                                                    [[posTopTop+(4*this.state.scrollDiff)], { top: -700, opacity: 1 }]
                                                    ])}>
                                                <div id="packages1__title">Rijsttafel Package</div>
                                                <div id="packages1__subtitle">available for 2 persons and 5 persons</div>
                                            </div>
                                            <img 
                                                style={tween(scrollY, [
                                                [[posTopTop+(2*this.state.scrollDiff)], { top: -500, opacity: 0, ease: easeOutElastic }],
                                                [[posTopTop+(3*this.state.scrollDiff)], { top: 0, opacity: 1 }],
                                                [[posTopTop+(3*this.state.scrollDiff)], { top: 0, opacity: 1 }],
                                                [[posTopTop+(4*this.state.scrollDiff)], { top: -700, opacity: 1 }]
                                                ])}
                                                src="assets/images/food/Rijsttafel-Package-1.png" className="sectionPart4__content-img" id="package1"/>
                                            <div id="packages1__fulldesc"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(3*this.state.scrollDiff-30)], { top: 0, opacity: 0, ease: easeOutElastic }],
                                                    [[posTopTop+(3*this.state.scrollDiff)], { top: 0, opacity: 1 }],
                                                    [[posTopTop+(3*this.state.scrollDiff)], { top: 0, opacity: 1 }],
                                                    [[posTopTop+(4*this.state.scrollDiff)], { top: -700, opacity: 1 }]
                                                    ])}>
                                                Karedok Betawi<i className="fas fa-circle"></i>Nasi Uduk<i className="fas fa-circle"></i>Bebek Opor<i className="fas fa-circle"></i>
                                                Semur Lidah Sapi Betawi<i className="fas fa-circle"></i>Sate Lembut Betawi<i className="fas fa-circle"></i>
                                                Sayur Gambas Udang<i className="fas fa-circle"></i>Tempe Lombok Ijo en Tauco<i className="fas fa-circle"></i>
                                                Udang Goreng Kering<i className="fas fa-circle"></i>Sambal Ijo Teri<i className="fas fa-circle"></i>Acar Kuning<i className="fas fa-circle"></i>
                                                Krupuk Udang<i className="fas fa-circle"></i>Emping</div>
                                                <img src="assets/images/photos/nongif_1.jpg"
                                                    className="sectionPart4__content-gif"
                                                    id="gif5"
                                                    style={tween(scrollY, [
                                                        [[posTopTop+(2*this.state.scrollDiff+200)], { left: -500, opacity: 0, ease: easeOutElastic }],
                                                        [[posTopTop+(3*this.state.scrollDiff)], { left: 100, opacity: 1 }],
                                                        [[posTopTop+(3*this.state.scrollDiff)], { top: 250, opacity: 1 }],
                                                        [[posTopTop+(4*this.state.scrollDiff)], { top: -450, opacity: 1 }]
                                                        ])}/>
                                                <img src="assets/images/photos/todaysrijsttafel_gif4.gif"
                                                    className="sectionPart4__content-gif"
                                                    id="gif6"
                                                    style={tween(scrollY, [
                                                        [[posTopTop+(2*this.state.scrollDiff+100)], { right: -500, opacity: 0, ease: easeOutElastic }],
                                                        [[posTopTop+(3*this.state.scrollDiff)], { right: 100, opacity: 1 }],
                                                        [[posTopTop+(3*this.state.scrollDiff)], { top: 100, opacity: 1 }],
                                                        [[posTopTop+(4*this.state.scrollDiff)], { top: -600, opacity: 1 }]
                                                        ])}/>
                                        </SectionPart4>
                                        <SectionPart4
                                            sectionScroller="True"
                                            sectionTween="True"
                                            id="packages2"
                                            slide="True"
                                            hide={scrollY < posTopTop+(3*this.state.scrollDiff)}>
                                            <img 
                                                style={tween(scrollY, [
                                                [[posTopTop+(3*this.state.scrollDiff)], { top: 100, opacity: 0 }],
                                                [[posTopTop+(4*this.state.scrollDiff)], { top: -600, opacity: 1 }]
                                                ])}
                                                src="assets/images/food/Rijsttafel-Package-2.png" className="sectionPart4__content-img" id="package2"/>
                                            <div id="packages2__fulldesc"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(3*this.state.scrollDiff)], { marginTop: px(500), opacity: 0 }],
                                                    [[posTopTop+(4*this.state.scrollDiff)], { marginTop: px(-155), opacity: 1 }]])}>
                                                Es Selendang Mayang</div>
                                            <img src="assets/images/photos/nongif_3.jpg"
                                                className="sectionPart4__content-gif"
                                                id="gif7"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(3*this.state.scrollDiff)], { marginTop: px(500), opacity: 0 }],
                                                    [[posTopTop+(4*this.state.scrollDiff)], { marginTop: px(0), opacity: 1 }]])}/>
                                            <img src="assets/images/photos/todaysrijsttafel_gif3.gif"
                                                className="sectionPart4__content-gif"
                                                id="gif8"
                                                style={tween(scrollY, [
                                                    [[posTopTop+(3*this.state.scrollDiff)], { marginTop: px(500), opacity: 0 }],
                                                    [[posTopTop+(4*this.state.scrollDiff)], { marginTop: px(0), opacity: 1 }]])}/>
                                        </SectionPart4>
                                    </div>
                                }</TrackedDiv>
                            </div>
                        }</TrackDocument>
                    </div>
                </div>
            </div>
        )
    }
}