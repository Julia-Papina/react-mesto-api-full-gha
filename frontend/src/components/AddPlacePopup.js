import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, onAddPlace, isOpen }) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="popupAddCard"
      id="add-card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="popup__field">
        <input
          required
          type="text"
          value={placeName}
          onChange={handleChangePlaceName}
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_type_place"
          name="name"
          placeholder="Название"
          id="card-name"
        />
        <span className="popup__error card-name-error" />
        <input
          required
          value={placeLink}
          onChange={handleChangePlaceLink}
          type="url"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          id="card-link"
        />
        <span className="popup__error card-link-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
