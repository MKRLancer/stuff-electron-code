
const { ipcRenderer, dialog, BrowserWindow } = require('electron');
const { IPC_CHANNELS } = require('./enums');

const startCapture = document.getElementById('startCapture');

const folder = document.getElementById('folder');

startCapture.addEventListener('click', e => {
    ipcRenderer.send(IPC_CHANNELS.SCREENSHOT);
});

folder.addEventListener('click', e => {
  ipcRenderer.send(IPC_CHANNELS.SCREENSHOT_SAVE_DIR);
});

// show alert message
ipcRenderer.on(IPC_CHANNELS.ALERT_MSG, (e, {
  msg
} = {}) => {
  alert(msg);
});


// listener changed play state
ipcRenderer.on(IPC_CHANNELS.PLAY_STATE, (e, {
  state
} = {}) => {
  if(state == "played") {
    startCapture.classList.remove('btn-start-capture');
    startCapture.classList.add('btn-stop-capture');
  } 
  else if(state == "stopped") {
    startCapture.classList.remove('btn-stop-capture');
    startCapture.classList.add('btn-start-capture');
  } 
});