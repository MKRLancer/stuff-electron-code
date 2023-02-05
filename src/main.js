const {app, BrowserWindow, ipcMain, dialog, desktopCapturer} = require('electron');
const { IPC_CHANNELS } = require('./enums');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const electron = require('electron');
const shell = electron.shell;

var fs = require('fs');
const os = require('os');
const path = require('path');
const { clearInterval } = require('timers');


let mainWindow, count=0, timerId = -1;
var screenShotPath ='';

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 330,
    height: 700,
    icon: path.join(__dirname, 'assets/icon.ico'),
    autoHideMenuBar: true,
    backgroundColor: '#ffff',
    fullscreenable: true,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    frame: true,
    roundedCorners: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// capture image
ipcMain.on(IPC_CHANNELS.SCREENSHOT, (e, 
  {
  } = {}) => {
    if(timerId == -1) {
      if(screenShotPath == '') {
        e.sender.send(IPC_CHANNELS.ALERT_MSG, {
          msg: "please set url which save ScreenCaptures!"
        });
        return;
      }

      e.sender.send(IPC_CHANNELS.PLAY_STATE, {
        state: "played"
      });

      timerId = setInterval(()=>{
        desktopCapturer.getSources({ 
              types: ['screen'],
              thumbnailSize: {
                  width: 1920,
                  height: 1080
              } 
          }).then( sources => {
          
          for (const source of sources) {
              // Filter: main screen
              if ((source.name === "Entire screen") || (source.name === "Screen 1") || (source.name === "Screen 2")) {
                if(screenShotPath === ''){
                  screenShotPath = 'Downloads';
                }
  
                let fileFullPath = screenShotPath + '\\screen' + getCurrentDateTime() + '.png';
  
                if(source.name === "Screen 1")
                  fileFullPath = screenShotPath + '\\leftscreen' + getCurrentDateTime() + '.png';
                if(source.name === "Screen 2")
                  fileFullPath = screenShotPath + '\\rightscreen' + getCurrentDateTime() + '.png';
  
                fs.writeFile(fileFullPath, source.thumbnail.toPNG(), function (err) {
                    if(err) return console.log(err.message);
  
                    var message = 'Saved SS to ' + fileFullPath;
                    console.log(message);
                });
              }
            }
        });
      }, 3000); //tome in millis
    } else {
      clearInterval(timerId);
      e.sender.send(IPC_CHANNELS.PLAY_STATE, {
        state: "stopped"
      });
      timerId = -1;
    }  
});

// set capture image dir

ipcMain.on(IPC_CHANNELS.SCREENSHOT_SAVE_DIR, (e, 
  {
  } = {}) => {
    // console.log(dialog.showOpenDialog({ properties: ['openDirectory'] }))
    dialog
    .showOpenDialog({
        title: "Select the FilePath to save capture images",
        buttonLabel: "select",
        properties: ['openDirectory'],
    })
    .then((file) => {
        if (!file.canceled) {
            screenShotPath = file.filePaths[0];
            console.log(screenShotPath + ': is saved.')
        }
    })
    .catch((err) => {
        console.log(err);
    });
});

function getCurrentDateTime() {
  var currentdate = new Date();
  // var datetime = currentdate.getDay() + "-" + currentdate.getMonth() 
  // + "-" + currentdate.getFullYear() + " " 
  // + currentdate.getHours() + ":" 
  // + currentdate.getMinutes() + ":" + currentdate.getSeconds();
  var datetime = currentdate.getFullYear() + currentdate.getMonth() + currentdate.getDay() 
  + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
  return datetime;
}



