const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");

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
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
    win.openDevTools();
    //win.loadURL("https://google.com");
};

ipcMain.on("toMain", (event, args) => {
    //let responseObj = "hello";

    fs.readdirSync(path.join(__dirname,'pages/'), {withFileTypes: true}).forEach(file => {
        console.log(file.name.split('.')[1]);

        if(file.name.split('.')[1] == 'html') {
            //console.log('upload');
            const data = fs.readFileSync(path.join(__dirname, 'pages/'+file.name),{encoding:'utf8', flag:'r'});
            win.webContents.send("fromMain", data);
        }
    })
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