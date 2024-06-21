import './file.less';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { Btn } from '../../../UI/button/Btn';
import { downloadFile, deleteFile, getFiles } from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { TrashIcon } from "../../../../assets/img/trashIcon.jsx";
import { DownloadIcon } from "../../../../assets/img/downloadIcon.jsx";
import { FileIcon } from "../../../../assets/img/fileIcon.jsx";
import {DirIcon} from "../../../../assets/img/dirIcon.jsx";

// eslint-disable-next-line react/display-name
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
      <div className="file-plate" onClick={() => openDir(file)} ref={ref}>
        <div className="file-plate__img-wrapper">{file.type === 'dir' ? <DirIcon className={"file__img"}/> : <FileIcon className={"file__img"}/>}</div>
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          <Btn className='file-plate__btn' onClick={(e)=>{deleteClickHandler(e)}} id="btn__delete"><TrashIcon height={80}/></Btn>
          {file.type !== 'dir' && <Btn className='file-plate__btn' onClick={(e)=> downloadClickHandler(e)} id="btn__download"><DownloadIcon height={80} /></Btn>}
        </div>
      </div>
    )
  }

  if (filesView === 'list') {
    return (
        <div className="file" onClick={() => openDir(file)} ref={ref}>
            <div className="file__img-wrapper">{file.type === 'dir' ? <DirIcon className={"file__img"}/> :
                <FileIcon className={"file__img"}/>}</div>
            <div className="file__name">{file.name}</div>

            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            <div>{file.type !== 'dir' &&
                <Btn onClick={(e) => downloadClickHandler(e)} id="btn__download">
                    <DownloadIcon height={80}/>
                </Btn>}
            </div>
            <div>
                <Btn id="btn__delete" onClick={(e) => {
                    deleteClickHandler(e)
                }}><TrashIcon height={80}/></Btn>
            </div>
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
