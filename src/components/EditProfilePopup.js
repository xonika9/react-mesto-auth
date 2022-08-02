import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
function EditProfilePopup({
  isOpen,
  onClose,
  onOverlay,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formValues, setFormValues] = useState({
    name: {
      value: '',
      error: '',
      isValid: true,
    },
    about: {
      value: '',
      error: '',
      isValid: true,
    },
  });
  useEffect(() => {
    setFormValues({
      name: {
        value: currentUser.name,
        error: '',
        isValid: true,
      },
      about: {
        value: currentUser.about,
        error: '',
        isValid: true,
      },
    });
  }, [currentUser, isOpen]);
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
    onUpdateUser({
      name: formValues.name.value,
      about: formValues.about.value,
    });
  }
  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonContent={!isLoading ? 'Сохранить' : 'Сохранение...'}
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={formValues.name.isValid && formValues.about.isValid}
      onOverlay={onOverlay}
    >
      <input
        className={`popup__input popup__input_type_name ${
          !formValues.name.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='name'
        required
        minLength='2'
        maxLength='40'
        id='name-input'
        placeholder='Имя'
        onChange={handleChange}
        value={formValues.name.value || ''}
      />
      <span
        className={`popup__error name-input-error ${
          !formValues.name.isValid && 'popup__error_visible'
        }`}
      >
        {formValues.name.error}
      </span>
      <input
        className={`popup__input popup__input_type_about ${
          !formValues.about.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='about'
        required
        minLength='2'
        maxLength='200'
        id='about-input'
        placeholder='О себе'
        onChange={handleChange}
        value={formValues.about.value || ''}
      />
      <span
        className={`popup__error about-input-error ${
          !formValues.about.isValid && 'popup__error_visible'
        }`}
      >
        {formValues.about.error}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
