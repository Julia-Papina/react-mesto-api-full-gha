import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext); //Чтобы подставить в форму текущие значения, подписалась на контекст.
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  //обработчик сабмита
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="popupEditProfile"
      id="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field">
        <input
          required
          value={name || ""}
          onChange={handleChangeName}
          type="text"
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя"
          id="user-name"
        />
        <span className="popup__error user-name-error" />
        <input
          type="text"
          minLength={2}
          maxLength={200}
          className="popup__input popup__input_type_job"
          name="job"
          required
          value={about || ""}
          onChange={handleChangeAbout}
          placeholder="О вас"
          id="user-job"
        />
        <span className="popup__error user-job-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
