import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import Context from './Context';

const ROOT_CSS = css({
  border: 0,
  outline: 0,
  touchAction: 'none'
});

export default ({ children, className, mode }) =>
  <Context.Consumer>
    { context =>
      <button
        className={ classNames(ROOT_CSS + '', className) }
        onClick={ mode === 'left' ? context.scrollOneLeft : context.scrollOneRight }
      >
        <div className="slider">
          { children }
        </div>
      </button>
    }
  </Context.Consumer>
