import './file.css';
import dirLogo from '../../../../assets/img/folder.svg';
import fileLogo from '../../../../assets/img/file.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { Btn } from '../../../UI/button/Btn';
import { downloadFile, deleteFile, getFiles } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';
import PropTypes from "prop-types";
import { forwardRef } from "react";

export const File = forwardRef((props, ref) => {
  const {file, sort} = props
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const filesView = useSelector(state => state.files.filesView);

  function openDir(file) {
    if (file.type === 'dir') {
      // push to stack directory currend directory
      dispatch(pushToStack(currentDir));
      // change directory
      dispatch(setCurrentDir(file._id));
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation();
    downloadFile(file);
  }

  function deleteClickHandler(e) {
    e.stopPropagation();
    dispatch(deleteFile(file)).then(()=>{
        dispatch(getFiles(currentDir, sort))
    })
  }

  if (filesView === 'plate') {
    return (
      <div className='file-plate' onClick={() => openDir(file)} ref={ref}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns"> 
          {file.type !== 'dir' && <button className='file-plate__btn' onClick={(e)=> downloadClickHandler(e)}>Delete</button>}
          <button className='file-plate__btn' onClick={(e)=>{deleteClickHandler(e)}}>download</button>
        </div>
      </div>
    )
  }
  if (filesView === 'list') {
    return (
      <div className='file' onClick={() => openDir(file)} ref={ref}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0,10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && <Btn onClick={(e)=> downloadClickHandler(e)} id="btn__download">Скачать</Btn>}
        <Btn id="btn__delete" onClick={(e)=>{deleteClickHandler(e)}}>Удалить</Btn>
      </div>
    )
  }
});

File.propTypes = {
    file: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        size: PropTypes.number,
        date: PropTypes.string.isRequired,
    }).isRequired,
    sort: PropTypes.string.isRequired,
};

