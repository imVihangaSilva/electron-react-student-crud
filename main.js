"use strict";

// Import parts of electron to use
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

const {
  FETCH_DATA_FROM_STORAGE,
  HANDLE_FETCH_DATA,
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_DATA,
  REMOVE_DATA_FROM_STORAGE,
  HANDLE_REMOVE_DATA,
  HANDLE_ALREADY_EXSITS,
} = require("./utils/constants");
const storage = require("electron-json-storage");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let students = [];

// Keep a reference for dev mode
let dev = false;
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 730,
    show: false,
  });

  // and load the index.html of the app.
  let indexPath;
  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:4000",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (dev) {
      // mainWindow.webContents.openDevTools();
      const template = [
        {
          label: "View",
          submenu: [
            { role: "reload" },
            { type: "separator" },
            { role: "togglefullscreen" },
          ],
        },
        {
          label: "DevTools",
          click: function () {
            mainWindow.webContents.openDevTools();
          },
        },
      ];
      const menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// ============================================================
// IPC Communications
// ============================================================
ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, message) => {
  // console.log("main received FETCH_DATA_FROM_STORAGE with : ", message);

  storage.get(message, (error, data) => {
    students = JSON.stringify(data) === "{}" ? [] : data;
    if (error) {
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: false,
        message: "Couldnt fetch data",
      });
    } else {
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: true,
        message: students,
      });
    }
  });
});
ipcMain.on(SAVE_DATA_IN_STORAGE, (_, message) => {
  // console.log("main received SAVE_DATA_IN_STORAGE with : ", message);

  storage.get("students", (error, data) => {
    const newStudentsList = JSON.stringify(data) === "{}" ? [] : data;
    const found = newStudentsList.find(
      (student) => student.index === message.index
    );

    if (found === undefined) {
      students.push(message);
      storage.set("students", students, (error) => {
        if (error) {
          mainWindow.send(HANDLE_SAVE_DATA, {
            success: false,
            message: "Data not saved",
          });
        } else {
          mainWindow.send(HANDLE_SAVE_DATA, {
            success: true,
            message: message,
          });
        }
      });
    } else {
      mainWindow.send(HANDLE_ALREADY_EXSITS, {
        success: false,
        message: "Sorry, Student already registered.",
      });
    }
  });
});

ipcMain.on(REMOVE_DATA_FROM_STORAGE, (_, message) => {
  students = students.filter((item) => item.index !== message.index);

  storage.set("students", students, (error) => {
    if (error) {
      mainWindow.send(HANDLE_REMOVE_DATA, {
        success: false,
        message: "Cannot delete data",
      });
    } else {
      mainWindow.send(HANDLE_REMOVE_DATA, {
        success: false,
        message: students,
      });
    }
  });
});

// ============================================================
// const defaultDataPath = storage.getDefaultDataPath();
