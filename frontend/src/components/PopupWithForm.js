import React from "react";
//пропс isOpen задает css класс видимости попапа
function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  id,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <form
        name={name}
        id={id}
        onSubmit={onSubmit}
        className="popup__container"
        noValidate
      >
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__button" type="submit">
          {buttonText || "Сохранить"}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
