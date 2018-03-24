import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { FullPage, Slide } from 'react-full-page';
import {Easer} from 'functional-easing';
import scrollToComponent from 'react-scroll-to-component';
import Scroll, {Element} from 'react-scroll';
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

class App extends Component {
    render() {
        const navTweenPostion = [0, 359, 390, 846, 847, 1327, 1346, 1844, 1860];
        const easeOutElastic = new Easer().using('out-elastic').withParameters(0.7, 2);
        const easeInElastic = new Easer().using('in-elastic').withParameters(2, 0.7);
        return (
            <div className="main">
                <SectionPart4 id="opening">
                    <div className="sectionPart4__title">
                        <div id="opening_subtitle">
                        based on Tugu Kunstkring Paleis’ Menu
                        </div>
                        <img src="assets/images/title/1.png" id="opening_title"/>
                        <div id="opening_desc">
                        Some rijsttafel’s menu which still available in the present day, chosen from
                        the menu of Tugu Kunstkring Paleis, one of the restaurants in Indonesia
                        that still have rijsttafel’s dishes and servings.
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
                                    position="0"
                                    active={scrollY < 659/2}
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
                                    position="659"
                                    active={scrollY < 1079/2}
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
                                    position="1079"
                                    active={scrollY < 1679/2}
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
                                    position="1679"
                                    active={scrollY < 2080/2}
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
                                    position="2080"
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
                                <SectionPart4
                                    sectionScroller="True"
                                    id="appetizers">
                                    <img 
                                        style={tween(scrollY, [
                                            [[posTopTop-300], { marginTop: px(-200), opacity: 0, ease: easeOutElastic}],
                                            [[posTopTop-10], { marginTop: px(0), opacity: 1 }],
                                            [[posTopTop-10], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                            [[posTopTop+180], { marginTop: px(200), opacity: 0 }]
                                        ])}
                                        src="assets/images/food/Rissoles-Salad-with-Mustard-Sauce.png" className="sectionPart4__content-img" id="risoles"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop-230], { marginTop: px(-200), opacity: 0, ease: easeOutElastic}],
                                            [[posTopTop], { marginTop: px(0), opacity: 1 }],
                                            [[posTopTop], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                            [[posTopTop+190], { marginTop: px(200), opacity: 0 }]
                                        ])} 
                                        src="assets/images/food/Bitterballen.png" className="sectionPart4__content-img" id="bitterballen"/>
                                    <div id="appetizers_title">Appetizers</div>
                                </SectionPart4>
                                <SectionPart4
                                    sectionScroller="True"
                                    sectionTween="True"
                                    id="mains"
                                    slide="True"
                                    hide={scrollY < posTopTop+20}
                                    styleBg={tween(scrollY, [
                                        [[posTopTop+20], {bottom: percent(100)}],
                                        [[posTopTop+420], {bottom: percent(0)}]
                                    ])}>
                                    <div id="mains_title">Main Course</div>
                                    <img 
                                        style={tween(scrollY, [
                                            [[posTopTop+50], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                            [[posTopTop+220], { marginTop: px(0), opacity: 1 }],
                                            [[posTopTop+220], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                            [[posTopTop+680], { marginTop: px(200), opacity: 0 }]
                                        ])}
                                        src="assets/images/food/Garnalen-Portuguesche-Kerrie.png" className="sectionPart4__content-img" id="kerrie"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop+70], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                            [[posTopTop+250], { marginTop: px(0), opacity: 1 }],
                                            [[posTopTop+250], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                            [[posTopTop+700], { marginTop: px(200), opacity: 0 }]
                                        ])}
                                        src="assets/images/food/Indonesische-Biefstuk-van-Mevrouw-Sonya-Lee.png" className="sectionPart4__content-img" id="biefstuk"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop+90], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                            [[posTopTop+270], { marginTop: px(0), opacity: 1 }],
                                            [[posTopTop+270], { marginTop: px(0), opacity: 1, ease: easeInElastic }],
                                            [[posTopTop+720], { marginTop: px(200), opacity: 0 }]
                                        ])}
                                        src="assets/images/food/Kuah-Acar-Ikan-Blimbing-Wuluh.png" className="sectionPart4__content-img" id="acarIkan"/>
                                </SectionPart4>
                                <SectionPart4
                                    sectionScroller="True"
                                    sectionTween="True"
                                    id="desserts"
                                    slide="True"
                                    hide={scrollY < posTopTop+420}
                                    styleBg={tween(scrollY, [
                                        [[posTopTop+420], {bottom: percent(100)}],
                                        [[posTopTop+1020], {bottom: percent(0)}]
                                    ])}>
                                    <div id="desserts_title">Dessert</div>
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+420], { marginTop: px(-500), opacity: 0, ease: easeOutElastic}],
                                        [[posTopTop+720], { marginTop: px(0), opacity: 1 }]
                                        ])}
                                        src="assets/images/food/Poffertjes.png" className="sectionPart4__content-img" id="poffertjes"/>
                                </SectionPart4>
                                <SectionPart4
                                    sectionScroller="True"
                                    sectionTween="True"
                                    id="packages1"
                                    slide="True"
                                    hide={scrollY < posTopTop+1020}
                                    styleBg={tween(scrollY, [
                                        [[posTopTop+1020], {bottom: percent(100)}],
                                        [[posTopTop+1420], {bottom: percent(0)}]
                                    ])}>
                                    <div id="packages1__title">Rijsttafel Package</div>
                                    <div id="packages1__subtitle">available for 2 persons and 5 persons</div>
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+1020], { marginTop: px(-500), opacity: 0, ease: easeOutElastic }],
                                        [[posTopTop+1220], { marginTop: px(0), opacity: 1 }],
                                        [[posTopTop+1420], { marginTop: px(0), opacity: 1 }],
                                        [[posTopTop+1820], { marginTop: px(-500), opacity: 1 }],
                                        ])}
                                        src="assets/images/food/Rijsttafel-Package-1.png" className="sectionPart4__content-img" id="package1"/>
                                </SectionPart4>
                                <SectionPart4
                                    sectionScroller="True"
                                    sectionTween="True"
                                    id="packages2"
                                    slide="True"
                                    hide={scrollY < posTopTop+1420}>
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+1420], { bottom: -500, opacity: 0 }],
                                        [[posTopTop+1820], { bottom: 0, opacity: 1 }]
                                        ])}
                                        src="assets/images/food/Rijsttafel-Package-2.png" className="sectionPart4__content-img" id="package2"/>
                                </SectionPart4>
                            </div>
                        }</TrackedDiv>
                    </div>
                }</TrackDocument>
            </div>

        
        )
    }
}

class NavPart4 extends Component {
    render() {
        return (
            <div className={cx(
                "navPart4__dot",
                {active: this.props.active})} 
                style={this.props.styleNav}
                onClick={() => {
                    Scroll.animateScroll.scrollTo(this.props.position, {
                    duration: 1500,
                    delay: 70,
                    smooth: true
                });
            }}></div>
        )
    }
}

class SectionPart4 extends Component {
    render() {
        return (
            <Element 
                name={this.props.id} 
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
            </Element>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));