document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const email = document.getElementById('email');
    const terminosCheckbox = document.getElementById('terminos');
    const btnSubmit = form.querySelector('button[type="submit"]');
  
    // Función para dar feedback visual
    function setFieldStatus(input, isValid, message = '') {
      const feedback = input.parentElement.querySelector('.invalid-feedback');
      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.setCustomValidity('');
        if (feedback) {
          feedback.textContent = ''; // Limpiar mensaje de error
        }
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        input.setCustomValidity(message);
        if (feedback) {
          feedback.textContent = message; // Mostrar mensaje de error
        }
      }
    }
  
    // Validación de email con expresión regular simple
    email.addEventListener('input', function() {
      const emailValue = email.value;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular básica
      if (emailPattern.test(emailValue)) {
        setFieldStatus(email, true);
      } else {
        setFieldStatus(email, false, 'Por favor, ingrese un email válido (ej. ejemplo@dominio.com).');
      }
    });
  
    // Validación de contraseñas
    password1.addEventListener('input', function() {
      if (password1.value.length >= 6) {
        setFieldStatus(password1, true);
      } else {
        setFieldStatus(password1, false, 'La contraseña debe tener al menos 6 caracteres.');
      }
  
      // Validar "Repetir contraseña" sólo si "Contraseña" es válida
      if (password1.value === password2.value) {
        setFieldStatus(password2, true);
      } else {
        setFieldStatus(password2, false, 'Las contraseñas no coinciden.');
      }
    });
  
    // Validación de repetición de contraseña
    password2.addEventListener('input', function() {
      if (password1.value === password2.value) {
        setFieldStatus(password2, true);
      } else {
        setFieldStatus(password2, false, 'Las contraseñas no coinciden.');
      }
    });
  
    // Validación de términos y condiciones
    terminosCheckbox.addEventListener('change', function() {
      if (terminosCheckbox.checked) {
        btnSubmit.disabled = false;
      } else {
        btnSubmit.disabled = true;
      }
    });
  
    // Validación al hacer submit
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
  
      let isFormValid = true;
  
      // Validamos cada campo
      if (!email.validity.valid) {
        setFieldStatus(email, false, 'Por favor, ingrese un email válido (ej. ejemplo@dominio.com).');
        isFormValid = false;
      }
  
      if (password1.value.length < 6) {
        setFieldStatus(password1, false, 'La contraseña debe tener al menos 6 caracteres.');
        isFormValid = false;
      }
  
      if (password1.value !== password2.value) {
        setFieldStatus(password2, false, 'Las contraseñas no coinciden.');
        isFormValid = false;
      }
  
      if (!terminosCheckbox.checked) {
        alert('Debe aceptar los términos y condiciones.');
        isFormValid = false;
      }
  
      // Si el formulario es válido, puedes proceder con el envío
      if (isFormValid) {
        alert('Formulario enviado correctamente');
        // Aquí puedes activar el envío del formulario si todo es válido
        // form.submit();
      }
    });
  
    // Deshabilitar el botón de envío si no se marcan los términos
    btnSubmit.disabled = !terminosCheckbox.checked;
  });
  
  