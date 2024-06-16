import React from 'react';
import './uploader.css';
import Btn from '../../UI/button/Btn';
import UploadFile from './UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploder } from '../../../reducers/uploadReducer';

const Uploader = () => {

  const files = useSelector(state => state.upload.files)

  const isVisible = useSelector(state => state.upload.isVisible);
  const dispatch = useDispatch();

  return ( isVisible &&
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">
          Загрузки
        </div>
        <Btn className='btnClose _sm' onClick={()=>{dispatch(hideUploder())}}> X </Btn>
      </div>
      {files.map(file=> <UploadFile key={file.id} file={file}/>)}
    </div>
  )
};

export default Uploader;