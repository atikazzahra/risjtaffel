import React, {Component} from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
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
      <TrackDocument formulas={[topBottom, topCenter]}>
      {(topBottom, topCenter) =>
        <div>
        <TrackedDiv formulas={[topBottom]}>
        {(posTopBottom) =>
          <b>My top is {posTopBottom}px from the viewport's bottom</b>
        }</TrackedDiv>

        <TrackedDiv formulas={[topCenter]}>
        {(posTopCenter) =>
          <b>My top is {posTopCenter}px from the viewport's bottom</b>
        }</TrackedDiv>
        </div>
      }</TrackDocument>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));