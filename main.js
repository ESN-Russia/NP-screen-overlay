require('dotenv').config()
const config = {
    WIDTH: parseInt(process.env.WIDTH) || 1024,
    HEIGHT: parseInt(process.env.HEIGHT) || 720,
    DEBUG: process.env.DEBUG || false,
    MAIN_HOST: process.env.MAIN_HOST || "https://andresokol.herokuapp.com/",
};

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const log = require('electron-log');

log.transports.file.level = 'silly';
log.transports.console.level = 'silly';

let win

function createWindow () {
    global.SOCKET_HOST = config.MAIN_HOST;

    win = new BrowserWindow({
                              width: parseInt(config.WIDTH),
                              height: parseInt(config.HEIGHT),
                              //transparent: true,
                              //alwaysOnTop: true, 
                              //frame: false,
                              //toolbar: false,
                              //kiosk: true,
    });

    //win.setIgnoreMouseEvents(true);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});