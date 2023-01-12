const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
require('dotenv').config();
const {execSync} = require('child_process');
const utils = require('./utils/functions.js');

let win;
const path = require("path");
const fs = require("fs");

const createWindow = () => {
    const { screen } = require('electron');

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    win = new BrowserWindow({
        width: width / 2,
        height: height / 2,
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
    win.openDevTools();
    //win.loadURL("https://google.com");
};

global.query = utils.query;
global.triggerCloseDB = utils.debounce(() => utils.closeDB());

global.sendOrderUpdate = function(orderId) {
    const output = execSync(`php ./php/order.php `+orderId).toString();
    win.webContents.send('orderUpdate', output)
};

global.sendBackOrder = function(orderId) {
    win.webContents.send('orderId', orderId)
    console.log("Sending it back");
};

ipcMain.on("loadPages", (event, args) => {
    const files = fs.readdirSync(path.join(__dirname,'pages/'), {withFileTypes: true});
    
    for(const file of files) {
        console.log(file);

        if(file.name.split('.')[1] == 'html') {
            //console.log('upload');
            const data = fs.readFileSync(path.join(__dirname, 'pages/'+file.name),{encoding:'utf8', flag:'r'});
            win.webContents.send("sendPages", data);
        }
    };

    win.webContents.send('loadComplete');
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

const functions = fs.readdirSync('./scripts').filter(file => file.endsWith('.js'));
for (const func of functions) {
    const item = require(`./scripts/${func}`);
    if(typeof item.handle === 'undefined' || item.handle)
        ipcMain.handle(item.name, (...args) => item.execute(...args));
    else
        ipcMain.on(item.name, (...args) => item.execute(...args));
}