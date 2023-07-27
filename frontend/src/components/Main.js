import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onDeletedCard,
  onDeleteConfirmPopup,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <div className="profile__avatar-edit" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <button
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards" aria-label="Карточки">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            onCardDelete={onDeletedCard}
            onDeleteConfirmPopup={onDeleteConfirmPopup}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
