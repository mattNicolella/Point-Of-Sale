const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
require('dotenv').config()
const mysql = require('mysql');

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


//THIS DOESNT QUITE WORK YET
global.query = function (str = '', callbackfunc = null) {
    let connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWD,
        database: process.env.DATABASE
    });

    connection.connect();
    connection.query(str, function (error, results, fields) {
        if (error) throw error;
        if (callbackfunc != null)
            callbackfunc(results);
    });

    connection.end();
};

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
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

const functions = fs.readdirSync('./scripts').filter(file => file.endsWith('.js'));

for (const func of functions) {
    const item = require(`./scripts/${func}`);
    ipcMain.on(item.name, (...args) => item.execute(...args));
}