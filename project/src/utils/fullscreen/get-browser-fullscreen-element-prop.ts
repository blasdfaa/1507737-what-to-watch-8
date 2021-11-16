type FullscreenElement = Document & {
  fullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
};

export const getBrowserFullscreenElementProp = (): Element => {
  const fullscreenElement = document as FullscreenElement;

  if (typeof fullscreenElement.fullscreenElement !== 'undefined') {
    return fullscreenElement.fullscreenElement;
  } else if (typeof fullscreenElement.mozFullScreenElement !== 'undefined') {
    return fullscreenElement.mozFullScreenElement;
  } else if (typeof fullscreenElement.msFullscreenElement !== 'undefined') {
    return fullscreenElement.msFullscreenElement;
  } else if (typeof fullscreenElement.webkitFullscreenElement !== 'undefined') {
    return fullscreenElement.webkitFullscreenElement;
  } else {
    throw new Error('fullscreenElement is not supported by this browser');
  }
};
