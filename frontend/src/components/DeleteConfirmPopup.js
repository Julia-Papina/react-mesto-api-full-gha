import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup({ isOpen, onClose, onCardDelete, card }) {
  function handleSubmit(event) {
    event.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="popupDeleteConfirm"
      id="delete-popup"
      title="Вы уверены"
      buttonText="Да"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="popup__field"></fieldset>
    </PopupWithForm>
  );
}

export default DeleteConfirmPopup;
