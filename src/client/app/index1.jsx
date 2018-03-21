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
        <Element name="opening">
          <div
            className="section-1"
            ref={(section) => { this.title = section; }}>
            <div>
              Ristajjfel
            </div>
            <img src="assets/images/food/Kunstkring_Tea.png" className="section-1__img" id="tea"/>
          </div>
        </Element>
        <TrackDocument formulas={[getDocumentElement, getDocumentRect, calculateScrollY,
                               topTop, topBottom, topCenter, centerCenter, bottomBottom,
                               bottomTop]}>
        {(documentElement, documentRect, scrollY, topTop,
          topBottom, topCenter, centerCenter, bottomBottom, bottomTop) =>
          <div>
          <TrackedDiv className="pin-cont" formulas={[topTop, bottomBottom]}>
          {(posTopTop, posBottomBottom) =>
            <section className={cx("section__part4", {fixed: scrollY >= posTopTop})}>
              <div style={{position: "fixed"}}> {posTopTop} === {scrollY} </div>
              <Element name="appetizers">
                <div className="section-2">
                  <div>
                    Another slide content
                  </div>
                  <img src="assets/images/food/Rissoles-Salad-with-Mustard-Sauce.png" className="section-2__img" id="risoles"/>
                  <img src="assets/images/food/Bitterballen.png" className="section-2__img" id="bitterballen"/>
                </div>
              </Element>
              <Element name="mains">
                <div className={cx("slide section-3", {hide: scrollY < posTopTop+20})}
                  style={tween(scrollY, [
                    [[posTopTop+20], {bottom: percent(100)}],
                    [[posTopTop+420], {bottom: percent(0)}]
                  ])}>
                </div>
                <div className={cx("slide section__content", {hide: scrollY < posTopTop+20})}>
                <div>
                    Another slide content
                  </div>
                <img 
                    style={tween(scrollY, [
                      [[posTopTop+20], { marginTop: px(-500), opacity: 0 }],
                      [[posTopTop+220], { marginTop: px(0), opacity: 1 }]
                    ])}
                    src="assets/images/food/Garnalen-Portuguesche-Kerrie.png" className="section-3__img" id="kerrie"/>
                  <img src="assets/images/food/Indonesische-Biefstuk-van-Mevrouw-Sonya-Lee.png" className="section-3__img" id="biefstuk"/>
                  <img src="assets/images/food/Kuah-Acar-Ikan-Blimbing-Wuluh.png" className="section-3__img" id="acarIkan"/>
                </div>
              </Element>
              <Element 
                name="desserts">
                <div 
                  className={cx("slide section-4", {hide: scrollY < posTopTop+420})}
                  style={tween(scrollY, [
                    [[posTopTop+420], {bottom: percent(100)}],
                    [[posTopTop+1020], {bottom: percent(0)}]
                  ])}
                >
                  <img src="assets/images/food/Poffertjes.png" className="section-4__img" id="poffertjes"/>
                </div>
              </Element>
            </section>
          }</TrackedDiv>

          <TrackedDiv className="pin-cont-2" formulas={[topTop, bottomBottom]}>
          {(posTopTop, posBottomBottom) =>
            <Element name="packages">
            <div
              className={cx("section-5", {hide: scrollY < posTopTop})}
              style={tween(scrollY, [
                [[posTopTop], {bottom: percent(100)}],
                [[posTopTop+1019], {bottom: percent(0)}]
              ])}>
              <img src="assets/images/food/Rijsttafel-Package-1.png" className="section-5__img" id="package1"/>
              <img src="assets/images/food/Rijsttafel-Package-2.png" className="section-5__img" id="package2"/>
              <div>
                Another slide content
              </div>
            </div>
          </Element>
          }</TrackedDiv>
          </div>
        }</TrackDocument>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));