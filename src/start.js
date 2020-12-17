const {app, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    mainWindow.loadURL(isDev())

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

function isDev() {
    if (process.env.DEV === "dev") {
        return process.env.ELECTRON_START_URL ||
            url.format({
                pathname: path.join(__dirname, '/../public/index.html'),
                protocol: 'file:',
                slashes: true,
            })
    } else {
        return url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true,
        })

    }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
