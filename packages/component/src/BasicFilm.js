import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import AutoCenter from './AutoCenter';
import Composer from './Composer';
import Context from './Context';
import createBasicStyleSet from './createBasicStyleSet';
import Dots from './Dots';
import FilmStrip from './FilmStrip';
import Flipper from './Flipper';
import memoize from './memoize';
import ScrollBar from './ScrollBar';

const CAROUSEL_CSS = css({
  overflow: 'hidden',
  position: 'relative'
});

class BasicFilm extends React.Component {
  constructor(props) {
    super(props);

    this.createHeightStyle = memoize(height => ({ height }));
    this.createBasicStyleSet = memoize(({ autoHide, autoHideFlipperOnEdge }) => createBasicStyleSet({ autoHide, autoHideFlipperOnEdge }));
  }

  render() {
    const { props } = this;

    const {
      carousel,
      dotsBox,
      dotsItem,
      leftFlipper,
      rightFlipper,
      scrollBarBox,
      scrollBarHandler,
    } = {
      ...this.createBasicStyleSet(props),
      ...(props.styleSet || {})
    };

    const { dir } = props;
    const rtl = dir === 'rtl';

    const {
      leftFlipperText = rtl ? '>' : '<',
      flipperBlurFocusOnClick,
      numItems,
      rightFlipperText = rtl ? '<' : '>',
      scrollBarWidth,
      scrolling,
      showDots = true,
      showFlipper = true,
      showScrollBar = true
    } = props;

    return (
      <React.Fragment>
        <div className={ props.className } dir={ dir }>
          <div
            className={ classNames(CAROUSEL_CSS + '', { scrolling }, carousel + '') }
            style={ this.createHeightStyle(props.height) }
          >
            { !!numItems && scrollBarWidth !== '100%' && !!showFlipper &&
              <Flipper blurFocusOnClick={ flipperBlurFocusOnClick } className={ leftFlipper + '' } mode="left">
                <div>{ leftFlipperText }</div>
              </Flipper>
            }
            <FilmStrip>
              { props.children }
            </FilmStrip>
            { !!numItems && scrollBarWidth !== '100%' && !!showFlipper &&
              <Flipper blurFocusOnClick={ flipperBlurFocusOnClick } className={ rightFlipper + '' } mode="right">
                <div>{ rightFlipperText }</div>
              </Flipper>
            }
            { !!numItems && scrollBarWidth !== '100%' && !!showScrollBar &&
              <ScrollBar
                className={ scrollBarBox + '' }
                handlerClassName={ scrollBarHandler + '' }
              />
            }
          </div>
          {
            !!numItems && scrollBarWidth !== '100%' && !!showDots &&
              <Dots
                className={ dotsBox + '' }
                itemClassName={ dotsItem + ''}
              >
                { () => <div /> }
              </Dots>
          }
        </div>
        { props.autoCenter !== false && <AutoCenter /> }
      </React.Fragment>
    );
  }
}

export default props =>
  <Composer dir={ props.dir } numItems={ React.Children.count(props.children) }>
    <Context.Consumer>
      { ({ numItems, scrollBarWidth, scrolling }) =>
        <BasicFilm
          { ...props }
          numItems={ numItems }
          scrollBarWidth={ scrollBarWidth }
          scrolling={ scrolling }
        />
      }
    </Context.Consumer>
  </Composer>