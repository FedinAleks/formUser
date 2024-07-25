(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      form: document.querySelector('.form__agreement'),
      name: document.getElementById('name'),
      tel: document.getElementById('tel'),
      email: document.getElementById('email'),
      request: document.getElementById('request'),
      agreement: document.getElementById('policy'),
      successMessage: document.getElementById('success-message')
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.form.addEventListener('submit', validateForm);
    refs.tel.addEventListener('input', formatPhoneNumber);
    refs.name.addEventListener('input', capitalizeName);
  
    function toggleModal() {
      document.body.classList.toggle("modal-open");
      refs.modal.classList.toggle("is-hidden");
    }
  
    function validateForm(event) {
      let isValid = true;
  
      // Очистити попередні повідомлення
      document.querySelectorAll('.error-message').forEach(el => el.remove());
  
      // Перевірка полів
      if (!refs.name.value.trim()) {
        isValid = false;
        showError(refs.name, 'Ім’я є обов’язковим');
      }
      if (!refs.tel.value.trim() || !/^\+380\d{9}$/.test(refs.tel.value.replace(/\s+/g, ''))) {
        isValid = false;
        showError(refs.tel, 'Введіть дійсний номер телефону (формат: +380XXXXXXXXX)');
      }
      if (refs.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(refs.email.value)) {
        isValid = false;
        showError(refs.email, 'Введіть дійсну електронну пошту');
      }
      if (!refs.agreement.checked) {
        isValid = false;
        showError(refs.agreement, 'Ви повинні погодитися на обробку персональних даних');
      }
  
      if (!isValid) {
        event.preventDefault(); // Зупиняємо стандартну відправку форми
      } else {
        event.preventDefault(); // Зупиняємо стандартну відправку форми
  
        // Закриття модального вікна
        toggleModal();
  
        // Показ повідомлення про успішне відправлення
        refs.successMessage.classList.remove('is-hidden');
        
        // Сховати повідомлення через 5 секунд
        setTimeout(() => {
          refs.successMessage.classList.add('is-hidden');
        }, 5000);
      }
    }
  
    function showError(element, message) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = message;
      element.parentElement.appendChild(error);
    }
  
    function formatPhoneNumber(event) {
      let value = event.target.value.replace(/\D/g, '');
      if (!value.startsWith('380')) {
        value = '380' + value;
      }
      value = value.slice(0, 12); // Залишаємо тільки 12 цифр
      event.target.value = '+380 ' + value.slice(3); // Видалено пробіли
    }
  
    function capitalizeName(event) {
      let value = event.target.value;
      if (value.length > 50) {
        value = value.slice(0, 50);
      }
      event.target.value = value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  })();
  
  
  