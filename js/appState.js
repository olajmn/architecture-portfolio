// All sessionStorage keys and accessors live here.
// NOTE: index.html's inline <head> script cannot import modules and
// reads these keys directly — that is intentional and expected.

const KEYS = {
  FROM_PROJECT:  'fromProject',
  INTRO_SEEN:    'introSeen',
  INTRO_PLAYING: 'introPlaying',
  SAVED_LOGO_H:  'savedLogoH',
};

export const isFromProject  = () => sessionStorage.getItem(KEYS.FROM_PROJECT)  === '1';
export const isIntroSeen    = () => sessionStorage.getItem(KEYS.INTRO_SEEN)    === '1';
export const isIntroPlaying = () => sessionStorage.getItem(KEYS.INTRO_PLAYING) === '1';
export const getSavedLogoH  = () => parseFloat(sessionStorage.getItem(KEYS.SAVED_LOGO_H));

export const setFromProject  = ()  => sessionStorage.setItem(KEYS.FROM_PROJECT,  '1');
export const setIntroSeen    = ()  => sessionStorage.setItem(KEYS.INTRO_SEEN,    '1');
export const setIntroPlaying = ()  => sessionStorage.setItem(KEYS.INTRO_PLAYING, '1');
export const setSavedLogoH   = (h) => sessionStorage.setItem(KEYS.SAVED_LOGO_H,   h);

export const clearFromProject  = () => sessionStorage.removeItem(KEYS.FROM_PROJECT);
export const clearIntroPlaying = () => sessionStorage.removeItem(KEYS.INTRO_PLAYING);
export const clearSavedLogoH   = () => sessionStorage.removeItem(KEYS.SAVED_LOGO_H);
