import axios from 'axios';
import { setFiles, addFile, deleteFileAC } from '../reducers/fileReducer';
import { addUploadFile, changeUploadFile, showUploder } from '../reducers/uploadReducer';
import { hideLoader, showLoader } from '../reducers/appReducer';
import {API_URL} from '../config';

// action get File
export function getFiles(dirId, sort) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      let url = `${API_URL}api/files`
      if (dirId) {
        url = `${API_URL}api/files?parent=${dirId}`
      }
      if (sort) {
        url = `${API_URL}api/files?sort=${sort}`
      }
      if (dirId && sort) {
        url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
      }
      // get response from server
      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      //dispatch this response through action creator
      dispatch(setFiles(response.data))
    } catch(e) {
      alert(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}api/files`,
      // body of request
      {
        name,
        parent: dirId,
        type: 'dir'
      }, 
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(addFile(response.data))
    } catch(e) {
      alert(e.response.data.message)
    }
  }
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      // set file to formData
      formData.append('file', file);
      if (dirId) {
        //set parentFolder if exist
        formData.append('parent', dirId)
      }
      const uploadFile = {name: file.name, progress: 0, id: Date.now()};
      dispatch(showUploder());
      dispatch(addUploadFile(uploadFile))
      // send files to server
      const response = await axios.post(`${API_URL}api/files/upload`, formData,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        // progress event listener
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          // console.log('total', totalLength);
          if (totalLength) {
            uploadFile.progress = Math.round((progressEvent.loaded)*100 / totalLength)
            dispatch(changeUploadFile(uploadFile))
          }
        }
      })
      // add files to state
      dispatch(addFile(response.data))
    } catch(e) {
      alert(e.response.data.message)
    }
  }
}

export async function downloadFile(file) {
  const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // add files to state
      dispatch(deleteFileAC(file._id));
      alert(response.data.message);
    } catch(e) {
      alert(e.response.data.message)
    }
  }
}

export function searchFiles(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}api/files/search?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // add files to state
      dispatch(setFiles(response.data));
    } catch(e) {
      alert(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}