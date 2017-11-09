require('dotenv').config()
const config = {
    WIDTH: parseInt(process.env.WIDTH) || 1024,
    HEIGHT: parseInt(process.env.HEIGHT) || 720,
    DEBUG: process.env.DEBUG || false,
    MAIN_HOST: process.env.MAIN_HOST || "https://andresokol.herokuapp.com/",
};

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const locals = {
    main_host: config.MAIN_HOST,
};
const pug = require('electron-pug')({pretty: true}, locals);
const log = require('electron-log');

log.transports.file.level = 'silly';
log.transports.console.level = 'silly';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
                              width: parseInt(config.WIDTH),
                              height: parseInt(config.HEIGHT),
                              transparent: true,
                              alwaysOnTop: true, 
                              frame: false,
                              toolbar: false,
                              //skipTaskbar: !DEBUG,
                              kiosk: true,
    })

    log.info(config.WIDTH);
    log.info(config.HEIGHT);
    log.info(config.MAIN_HOST);
    //log.info(config.DEBUG)

    //if (!config.DEBUG) win.setIgnoreMouseEvents(true);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.pug'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    //if (config.DEBUG) {
    //    win.webContents.openDevTools("detach");
    //}

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
