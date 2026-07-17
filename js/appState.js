// All sessionStorage keys and accessors live here.
// NOTE: index.html's inline <head> script cannot import modules and
// reads these keys directly — that is intentional and expected.

const KEYS = {
  FROM_PROJECT: 'fromProject',
  INTRO_SEEN:   'introSeen',
  TICKER_START: 'tickerStart',
  TICKER_WIDTH: 'tickerWidth',
  SCROLL_Y:     'scrollY',
};

export const getTickerStart = () => parseFloat(sessionStorage.getItem(KEYS.TICKER_START));
export const getScrollY     = () => parseFloat(sessionStorage.getItem(KEYS.SCROLL_Y));

export const setFromProject = ()  => sessionStorage.setItem(KEYS.FROM_PROJECT, '1');
export const setIntroSeen   = ()  => sessionStorage.setItem(KEYS.INTRO_SEEN,   '1');
export const setTickerStart = (t) => sessionStorage.setItem(KEYS.TICKER_START, t);
export const setTickerWidth = (w) => sessionStorage.setItem(KEYS.TICKER_WIDTH, w);
export const setScrollY     = (y) => sessionStorage.setItem(KEYS.SCROLL_Y,     y);
