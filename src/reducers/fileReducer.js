const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_VISIBLE = "SET_POPUP_VISIBLE";
const PUSH_TO_STACK = "PUSH_TO_STACK";
const DELETE_FILE = "DELETE_FILE";
const SET_FILES_VIEW = "SET_FILES_VIEW";

// default state
const defaultState = {
  files: [],
  currentDir: null,
  popupClass: 'popup',
  dirStack: [],
  filesView: 'list'
}

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      // return state with chanched files by action.payload(files)
      return {...state, files: action.payload}
    case SET_CURRENT_DIR: 
      // return state with changed current directory
      return {...state, currentDir: action.payload}
    case ADD_FILE:
      // return state with added file by action.payload(file)
      return {...state, files: [...state.files, action.payload]}
    case SET_POPUP_VISIBLE:
      // return state with changed popupClass
      return {...state, popupClass: action.payload}
    case PUSH_TO_STACK:
      // return state with pushed dir stack
      return {...state, dirStack: [...state.dirStack, action.payload]}
    case DELETE_FILE:
      // return state but without one file which id will be sended by action.payload(file.id)
      return {...state, files: [...state.files.filter(file => file.id !== action.payload)]}
    case SET_FILES_VIEW:
      return {...state, filesView: action.payload}
    default:
      return state
  }
}


// action creators
export const setFiles = (files) => ({type: SET_FILES, payload: files});
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir});
export const addFile = (file) => ({type: ADD_FILE, payload: file});
export const setPopupVisible = (visible) => ({type: SET_POPUP_VISIBLE, payload: visible});
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir});
export const deleteFileAC = (fileId) => ({type: DELETE_FILE, payload: fileId});
export const setFilesView = (filesView) => ({type: SET_FILES_VIEW, payload: filesView});