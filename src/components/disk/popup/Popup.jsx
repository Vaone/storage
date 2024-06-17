import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupVisible } from '../../../reducers/fileReducer';
import { createDir } from '../../../actions/file';
import { Btn } from '../../UI/button/Btn';
import { Input } from '../../UI/input/Input';
import './popup.css';

export const Popup = () => {
  // state name of directory
  const [nameDir, setNameDir] = useState('');
  // get popup className from redux-store
  const popupVisibility = useSelector(state => state.files.popupClass);
  // get current directory from redux-store
  const currentDir = useSelector(state => state.files.currentDir);
  // hook dispatch
  const dispatch = useDispatch();

  function createHandler() {
    // create folder
    dispatch(createDir(currentDir, nameDir));
    // clear input (name new directory)
    setNameDir('');
    // close popup
    dispatch(setPopupVisible('popup'));
  }

  return (
    //onclick change popup visibility
    <div className={popupVisibility} onClick={()=>{dispatch(setPopupVisible('popup'))}}>
      <div className="popup__wrapper" onClick={(e)=>{e.stopPropagation()}}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <Btn className="btnClose" onClick={()=>{dispatch(setPopupVisible('popup'))}}>X</Btn>
        </div>
        <Input type="text" placeholder="Введите название папки..." value={nameDir} setValue={setNameDir}/>
        <Btn className='btnGreen' onClick={()=> createHandler()}>Создать</Btn>
      </div>
    </div>
  )
};
