import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { FullPage, Slide } from 'react-full-page';
import scrollToComponent from 'react-scroll-to-component';
import Scroll, {Element} from 'react-scroll';

class App extends Component {
  componentDidMount() {
    scrollToComponent(this.title, { offset: 0, align: 'middle', duration: 500, ease:'inCirc'});
  }
  render() {
    return (
      <div className="main">
        <div className='button_group'>
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
          <section className="section-1" ref={(section) => { this.title = section; }}>
            <div>
              Ristajjfel
            </div>
            <img src="assets/images/food/Kunstkring_Tea.png" className="section-1__img" id="tea"/>
          </section>
        </Element>
        <Element name="appetizers">
          <section className="section-2">
            <div>
              Another slide content
            </div>
            <img src="assets/images/food/Rissoles-Salad-with-Mustard-Sauce.png" className="section-2__img" id="risoles"/>
            <img src="assets/images/food/Bitterballen.png" className="section-2__img" id="bitterballen"/>
          </section>
        </Element>
        <Element name="mains">
          <section className="section-3">
            <img src="assets/images/food/Garnalen-Portuguesche-Kerrie.png" className="section-3__img" id="kerrie"/>
            <img src="assets/images/food/Indonesische-Biefstuk-van-Mevrouw-Sonya-Lee.png" className="section-3__img" id="biefstuk"/>
            <img src="assets/images/food/Kuah-Acar-Ikan-Blimbing-Wuluh.png" className="section-3__img" id="acarIkan"/>
            <div>
              Another slide content
            </div>
          </section>
        </Element>
        <Element name="desserts">
          <section className="section-4">
            <div>
              Another slide content
            </div>
            <img src="assets/images/food/Poffertjes.png" className="section-4__img" id="poffertjes"/>
          </section>
        </Element>
        <Element name="packages">
          <section className="section-5">
            <img src="assets/images/food/Rijsttafel-Package-1.png" className="section-5__img" id="package1"/>
            <img src="assets/images/food/Rijsttafel-Package-2.png" className="section-5__img" id="package2"/>
            <div>
              Another slide content
            </div>
          </section>
        </Element>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));