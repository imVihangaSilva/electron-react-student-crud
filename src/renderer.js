const { ipcRenderer } = require("electron");
const {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  REMOVE_DATA_FROM_STORAGE,
} = require("../utils/constants");

const loadSavedData = () => {
  // console.log("Renderer sending: FETCH_DATA_FROM_STORAGE");
  ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "students");
};

const saveDataInStorage = (item) => {
  // console.log("Renderer sending: SAVE_DATA_IN_STORAGE");
  ipcRenderer.send(SAVE_DATA_IN_STORAGE, item);
};

const removeDataFromStorage = (item) => {
  ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, item);
};

module.exports = { loadSavedData, saveDataInStorage, removeDataFromStorage };
