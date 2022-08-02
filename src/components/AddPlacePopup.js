import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({ isOpen, onClose, onOverlay, onAddPlace, isLoading }) {
  const [formValues, setFormValues] = useState({
    title: {
      value: '',
      error: '',
      isValid: true,
    },
    link: {
      value: '',
      error: '',
      isValid: true,
    },
  });
  useEffect(() => {
    setFormValues({
      title: {
        value: '',
        error: '',
        isValid: true,
      },
      link: {
        value: '',
        error: '',
        isValid: true,
      },
    });
  }, [isOpen]);
  function handleChange(e) {
    const {
      name,
      value,
      validity: { valid },
      validationMessage,
    } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: { value, isValid: valid, error: validationMessage },
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: formValues.title.value, link: formValues.link.value });
  }
  return (
    <PopupWithForm
      name='add-element'
      title='Новое место'
      buttonContent={!isLoading ? 'Создать' : 'Сохранение...'}
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={formValues.title.isValid && formValues.link.isValid}
      onOverlay={onOverlay}
    >
      <input
        className={`popup__input popup__input_type_card-title ${
          !formValues.title.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='title'
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        id='title-input'
        onChange={handleChange}
        value={formValues.title.value}
      />
      <span
        className={`popup__error title-input-error ${
          !formValues.title.isValid && 'popup__error_visible'
        }`}
      >
        {formValues.title.error}
      </span>
      <input
        className={`popup__input popup__input_type_image-link ${
          !formValues.link.isValid && 'popup__input_type_error'
        }`}
        type='url'
        name='link'
        placeholder='Ссылка на картинку'
        required
        id='link-input'
        onChange={handleChange}
        value={formValues.link.value}
      />
      <span
        className={`popup__error link-input-error ${
          !formValues.link.isValid && 'popup__error_visible'
        }`}
      >
        {formValues.link.error}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
