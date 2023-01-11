const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
require('dotenv').config();
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
global.triggerCloseDB = utils.debounce(() => utils.closeDB())
  

ipcMain.on("loadPages", (event, args) => {
    //let responseObj = "hello";

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
    //fs.readFile("path/to/file", (error, data) => {
    //});
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

     //ipcMain.handle('', handleFileOpen)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

const functions = fs.readdirSync('./scripts').filter(file => file.endsWith('.js'));

for (const func of functions) {
    const item = require(`./scripts/${func}`);
    ipcMain.handle(item.name, (...args) => item.execute(...args));
}