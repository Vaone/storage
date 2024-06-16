import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUploadFile } from '../../../reducers/uploadReducer';
import Btn from '../../UI/button/Btn';

const UploadFile = ({file}) => {

  const dispatch = useDispatch();

  function removeFileHandles(e) {
    e.stopPropagation();
    dispatch(removeUploadFile(file.id))
  }

  return (
    <div className='upload-file'>
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <Btn className="btnClose _sm" onClick={(e)=>{removeFileHandles(e)}}>X</Btn>
      </div>
      <div className="upload-file__progressBar">
        <div className="upload-file__uploadBar" style={{width: file.progress + '%'}}/>
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  )
};

export default UploadFile;