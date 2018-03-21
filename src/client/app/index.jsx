import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { FullPage, Slide } from 'react-full-page';
import scrollToComponent from 'react-scroll-to-component';
import Scroll, {Element} from 'react-scroll';
import cx from 'classnames';
import {Track, TrackedDiv, TrackDocument} from 'react-track';
import {tween, combine} from 'react-imation';
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
        return (
            <div className="main">
                <ButtonGroup></ButtonGroup>
                <SectionPart4 id="opening">
                    <div>
                    Ristajjfel
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
                            className="sectionScroller"
                            style={{height: "3000px"}}
                            formulas={[topTop, bottomBottom]}>
                        {(posTopTop, posBottomBottom) =>
                            <div className={cx("sectionScrollerPlaceholder", {fixed: scrollY >= posTopTop})}>
                                <div style={{position: "fixed", zIndex: "11"}}> {posTopTop} === {scrollY} </div>
                                <SectionPart4
                                    sectionScroller="True"
                                    id="appetizers">
                                    <div>Another slide content</div>
                                    <img 
                                        style={tween(scrollY, [
                                            [[posTopTop-200], { marginTop: px(-200), opacity: 0 }],
                                            [[posTopTop-30], { marginTop: px(0), opacity: 1 }]
                                        ])}
                                        src="assets/images/food/Rissoles-Salad-with-Mustard-Sauce.png" className="sectionPart4__content-img" id="risoles"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop-160], { marginTop: px(-200), opacity: 0 }],
                                            [[posTopTop+10], { marginTop: px(0), opacity: 1 }]
                                        ])} 
                                        src="assets/images/food/Bitterballen.png" className="sectionPart4__content-img" id="bitterballen"/>
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
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+20], { marginTop: px(-500), opacity: 0 }],
                                        [[posTopTop+220], { marginTop: px(0), opacity: 1 }]
                                        ])}
                                        src="assets/images/food/Garnalen-Portuguesche-Kerrie.png" className="sectionPart4__content-img" id="kerrie"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop+50], { marginTop: px(-500), opacity: 0 }],
                                            [[posTopTop+250], { marginTop: px(0), opacity: 1 }]
                                        ])}
                                        src="assets/images/food/Indonesische-Biefstuk-van-Mevrouw-Sonya-Lee.png" className="sectionPart4__content-img" id="biefstuk"/>
                                    <img
                                        style={tween(scrollY, [
                                            [[posTopTop+70], { marginTop: px(-500), opacity: 0 }],
                                            [[posTopTop+270], { marginTop: px(0), opacity: 1 }]
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
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+420], { marginTop: px(-500), opacity: 0 }],
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
                                    <img 
                                        style={tween(scrollY, [
                                        [[posTopTop+1020], { marginTop: px(-500), opacity: 0 }],
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

class ButtonGroup extends Component {
    render() {
        return (
            <div className="button_group">
                <button onClick={() => {
                    Scroll.scroller.scrollTo('opening', {
                    duration: 1200,
                    delay: 70,
                    smooth: true
                    });
                }}>1</button>
                <button onClick={() => {
                    Scroll.scroller.scrollTo('appetizers', {
                    duration: 1200,
                    delay: 70,
                    smooth: true
                    });
                }}>2</button>
                <button onClick={() => {
                    Scroll.scroller.scrollTo('mains', {
                    duration: 1200,
                    delay: 70,
                    smooth: true
                    });
                }}>3</button>
                <button onClick={() => {
                    Scroll.scroller.scrollTo('desserts', {
                    duration: 1200,
                    delay: 70,
                    smooth: true
                    });
                }}>4</button>
                <button onClick={() => {
                    Scroll.scroller.scrollTo('packages', {
                    duration: 1200,
                    delay: 70,
                    smooth: true
                    });
                }}>5</button>
            </div>
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