require("dotenv").config();

const config = {
    WIDTH: parseInt(process.env.WIDTH) || 1024,
    HEIGHT: parseInt(process.env.HEIGHT) || 720,
    DEBUG: true,
    MAIN_HOST: process.env.MAIN_HOST || "http://andresokol.herokuapp.com/"
};

if (process.env.DEBUG !== undefined) {
    config.DEBUG = true;
}

const electron = require("electron");
const {app, BrowserWindow, dialog} = require("electron");
const path = require("path");
const url = require("url");

let win;

async function createWindow() {
    global.SOCKET_HOST = config.MAIN_HOST;

    const displays = electron.screen.getAllDisplays();

    const message = "Choose display to show overlay:";
    const options = [];

    for (let i = 0; i < displays.length; i += 1) {
        options.push(`Display ${i}. x=${displays[i].bounds.x} y=${displays[i].bounds.y}`);
    }

    let messageBoxResponse = await dialog.showMessageBox({
        type: "info",
        message: `Found ${displays.length} displays:`,
        title: message,
        buttons: options,
    });
    console.log(messageBoxResponse.response);

    let launch_display = displays[messageBoxResponse.response].bounds;

    win = new BrowserWindow({
        x: launch_display.x,
        y: launch_display.y,
        width: parseInt(config.WIDTH),
        height: parseInt(config.HEIGHT),
        transparent: true,
        alwaysOnTop: !config.DEBUG,
        frame: false,
        toolbar: false,
        kiosk: true
    });

    win.setIgnoreMouseEvents(!config.DEBUG);

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});
