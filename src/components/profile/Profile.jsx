import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import "./profile.less"

export const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={"addAvatar__wrapper"}>
            <button className={"deleteAvatar__btn"} onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
            <label className={"addAvatar__label"}>
                Загрузить аватар
                <input
                    accept="image/*"
                    className={"addAvatar__input"}
                    onChange={e => changeHandler(e)}
                    type="file"
                />
            </label>
        </div>
    );
};
