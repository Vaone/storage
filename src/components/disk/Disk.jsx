import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import {
  setCurrentDir,
  setPopupVisible,
  setFilesView,
} from "../../reducers/fileReducer";
import Btn from "../UI/button/Btn";
import FileList from "./fileList/FileList";
import "./disk.css";
import Popup from "./popup/Popup";
import Uploader from "./uploader/Uploader";

const Disk = () => {
  // hook useDispatch
  const dispatch = useDispatch();
  // get current directory from state
  const currentDir = useSelector((state) => state.files.currentDir);
  // get directoryStack from state
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  // drag and drop state
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    // set files from server to state, once
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  // set popup className - visible
  function showPopup() {
    dispatch(setPopupVisible("popup _visible"));
  }

  function returnPrevDir() {
    // last directory in stack
    const backDirId = dirStack.pop();
    // set last directory in stack as a current directory
    dispatch(setCurrentDir(backDirId));
  }

  //upload function
  function fileUploadHandler(event) {
    // files = files from input
    const files = [...event.target.files];
    // add every file to state
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event) {
    // cancel usual behavior
    event.preventDefault();
    event.stopPropagation();
    //show drag&drop zone
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    // cancel usual behavior
    event.preventDefault();
    event.stopPropagation();
    // hide drag&drop zone
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    // set files from dataTransfer
    let files = [...event.dataTransfer.files];
    // add every file to state
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    // close drag&drop zone
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <Btn onClick={() => {returnPrevDir()}}>Назад</Btn>
        <Btn className="btnGreen"
          onClick={() => {showPopup()}}>
          Создать папку
        </Btn>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => {fileUploadHandler(event)}}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <div className="disk__uiContainter">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="disk__select"
            name="disk__select"
          >
            <option value="name">По имени</option>
            <option value="type">По типу</option>
            <option value="date">По дате</option>
          </select>
          <button className="disk__plate" onClick={()=>dispatch(setFilesView("plate"))} />
          <button className="disk__list" onClick={()=>dispatch(setFilesView("list"))} />
        </div>
      </div>

      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите сюда файлы
    </div>
  );
};

export default Disk;
