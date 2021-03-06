'use strict';

const path = require('path');
const fs = require('fs');
const { app, BrowserWindow } = require('electron');
const Server = require('open-streamdeck-server').Server;

try {
    // Use electron-reloader reload electron when changes have been made.
    require('electron-reloader')(module, { ignore: path.join(__dirname, '..', 'src') });
} catch (_) {}

const isDevelopment = process.env.NODE_ENV === 'development';

const srv = new Server();

// Keep a global reference of the window object. If you don't, the window will
// be closed automatically when the JS object is garbage collected.
let win;

/**
 * Creates the browser window with the specified options.
 *
 * We also use a preload script to pass functions to the front-end but it can
 * be removed if you don't need it.
 */
const createWindow = async () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // The html file used should be the one generated by the `build` command in
    // the `dist` directory.
    const index = path.join(
        __dirname,
        isDevelopment ? '../..' : '',
        '/node_modules/open-streamdeck-web/dist/open-streamdeck-web/index.html'
    );
    win.loadFile(index);

    // Open the dev tools if in development. This can also be removed if not needed.
    if (isDevelopment) {
        win.webContents.openDevTools();
    }
};

/**
 * Called when Electron has finished initialization and is ready to create
 * browser windows.
 *
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', () => {
    srv.start();

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the dock icon
        // is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

/**
 * Quit when all windows are closed, except on macOS. There, it's common for
 * applications and their menu bar to stay active until the user quits
 * explicitly with Cmd + Q.
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        srv.stop();

        win = null;
        app.quit();
    }
});

// Below you can include the rest of your app's specific main process code.
// You can also put them in separate files and require them here.
