import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, onUpdateAvatar, isOpen }) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value, //значение инпута, полученное с помощью рефа
    });
  }

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      name="popupEditAvatar"
      id="add-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="popup__field">
        <input
          required
          onChange={handleChangeAvatar}
          ref={avatarRef}
          type="url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          id="edit-avatar"
        />
        <span className="popup__error edit-avatar-error" />
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
