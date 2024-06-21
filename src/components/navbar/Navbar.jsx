import { useState } from "react";
import "./navbar.less";
import Logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { searchFiles, getFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import {DefaultAvatar} from "../../assets/img/defaultAvatar.jsx";

export const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  function searchHandler(searchValue) {
    setSearch(searchValue);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (searchValue !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          searchValue
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} alt="" className="navbar__logo" />
      </Link>
      <div className="navbar__header">
        <Link to="/" className="navbar__name">
          Cloud Strg
        </Link>

        {isAuth && (
          <input
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
            value={search}
            onChange={(e) => searchHandler(e.target.value)}
          />
        )}
      </div>
      <div className="navbar__userUi">
        {!isAuth && (
          <div className="navbar__container">
            <div className="navbar__login">
              <Link to="/login" className="navbar__login-link">
                Войти
              </Link>
            </div>
            <div className="navbar__registration">
              <Link to="/registration" className="navbar__registration-link">
                Регистрация
              </Link>
            </div>
          </div>
        )}
        {isAuth && (
          <div className="navbar__container">
            {isAuth && (
              <Link to="/profile">
                {
                  currentUser.avatar ? <img className="navbar__avatar" src={API_URL + currentUser.avatar} alt=""/> : <DefaultAvatar className="navbar__avatar" />
                }
              </Link>
            )}
              <div className="navbar__logout" onClick={() => dispatch(logout())}>
              Выход
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
