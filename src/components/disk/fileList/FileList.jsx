import { useSelector } from "react-redux";
import { File } from "./File/File";
import "./fileList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

export const FileList = ({sort}) => {
  const files = useSelector((state) => state.files.files);
  const filesView = useSelector((state) => state.files.filesView);

  if (files.length === 0) {
    return (
      <div className='noFiles'>
        Файлы не найдены
      </div>
    )
  }
  if (filesView === 'plate') {
    return (
      <div className="filelist-plate">
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }
  if (filesView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Название</div>
          <div className="filelist__date">Дата</div>
          <div className="filelist__size">Размер</div>
        </div>
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file._id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File sort={sort} file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
};

FileList.propTypes = {
    sort: PropTypes.string.isRequired,
};
