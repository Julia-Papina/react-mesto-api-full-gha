function InfoTooltip({ isOpen, onCloseClick, image, title, onClose }) {
  return (
    <div
      className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseClick}
    >
      <div className="popup__content">
        <img className="popup__status" src={image} alt={title} />
        <p className="popup__message">{title}</p>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}
export default InfoTooltip;
