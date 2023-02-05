const IPC_CHANNELS = {
    SCREENSHOT: 'screenshot',
    SCREENSHOT_START: 'screenshot-start',
    SCREENSHOT_SELECT: 'screenshot-select',
    SCREENSHOT_COMPLETE: 'screenshot-complete',
    SCREENSHOT_CANCEL: 'screenshot-cancel',
    SCREENSHOT_SAVE_FILE: 'save-screenshot-file',
    SCREENSHOT_GET_CURRENT_WINDOW: 'get-current-window',
    SCREENSHOT_GET_CURRENT_SCREEN: 'get-current-screen',
    SCREENSHOT_HIDE_CURRENT_WINDOW: 'hide-current-window',
    SCREENSHOT_CLOSE_CURRENT_WINDOW: 'close-current-window',
    SCREENSHOT_REGISTER_SHORTCUTS: 'register-shortcuts',
    SCREENSHOT_UNREGISTER_SHORTCUTS: 'unregister-shortcuts',
    SCREENSHOT_SAVE_DIR: 'screenshot-save-dir',
    ALERT_MSG: 'alert-msg',
    PLAY_STATE: 'play-state',
  };
  
  const SHAPE_TYPE = {
    BACKGROUND_MOSAIC: 0, 
    BACKGROUND_NORMAL: 1, 
    RECT: 2, 
    ELLIPSE: 3, 
    ARROW: 4, 
    BRUSH: 5, 
    MOSAIC: 6, 
    TEXT: 7, 
  };
  
  
  const SHAPE_TYPE_KEY_NAME = {};
  Object.keys(SHAPE_TYPE).forEach(k => SHAPE_TYPE_KEY_NAME[k] = k);
  
  
  module.exports = {
    IPC_CHANNELS,
    SHAPE_TYPE,
    SHAPE_TYPE_KEY_NAME,
  };