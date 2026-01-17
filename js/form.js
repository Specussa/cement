class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.log(`Форма ${formId} не найдена на странице`);
      return;
    }
    
    this.inputs = this.form.querySelectorAll('.form__input');
    this.fileInput = this.form.querySelector('.form__input_file');
    this.fileContainer = this.form.querySelector('.form__file_list');
    this.submitBtn = this.form.querySelector('.hero__submit_button, .footer__submit_button');
    
    // Массив для хранения файлов
    this.filesToUpload = [];
    
    // Объект для хранения масок
    this.masks = new Map();
    
    this.init();
  }

  init() {
    // Инициализация счетчиков и масок
    this.inputs.forEach(input => {
      const counterMin = input.parentElement.querySelector('.form__counter_min');
      const counterMax = input.parentElement.querySelector('.form__counter_max');
      
      if (counterMin && counterMax) {
        const maxLength = input.getAttribute('maxl') || (input.type === 'textarea' ? 500 : 50);
        counterMax.textContent = maxLength;
        counterMin.textContent = input.value.length;
      }
      
      // Для телефона используем imask
      if (input.type === 'tel' || input.id.includes('__phone')) {
        this.setupIMask(input);
      } else {
        // Для других полей
        input.addEventListener('input', () => {
          if (counterMin) counterMin.textContent = input.value.length;
          this.validateField(input);
        });
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('focus', () => this.removeError(input));
      }
    });

    // Инициализация загрузки файлов - не показываем ошибку при загрузке страницы
    if (this.fileInput) {
      this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    // При загрузке страницы убираем error у form__file
    const fileControl = this.form.querySelector('.form__file');
    if (fileControl) {
      fileControl.classList.remove('error');
      fileControl.classList.remove('success');
      
      // Очищаем сообщение об ошибке
      const errorElement = fileControl.querySelector('.form__error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  setupIMask(input) {
    const counterMin = input.parentElement.querySelector('.form__counter_min');
    
    // Очищаем значение перед созданием маски
    input.value = '';
    
    // Создаем маску
    const mask = IMask(input, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
      placeholderChar: '_',
      
      onAccept: () => {
        if (counterMin) counterMin.textContent = input.value.length;
        this.validateField(input);
      },
      
      onComplete: () => {
        input.parentElement.classList.add('success');
      }
    });
    
    // Сохраняем маску для использования в resetForm
    this.masks.set(input, mask);
    
    if (counterMin) counterMin.textContent = input.value.length;
    
    input.addEventListener('blur', () => {
      this.validateField(input);
      // Обновляем значение маски при уходе с поля
      mask.updateValue();
    });
    
    input.addEventListener('focus', () => {
      this.removeError(input);
      setTimeout(() => {
        if (input.value === '+7 (___) ___-__-__') {
          try {
            input.setSelectionRange(4, 4);
          } catch (e) {
            // Игнорируем ошибки setSelectionRange
          }
        }
      }, 0);
    });
    
    // Добавляем обработчик input для обновления счетчика
    input.addEventListener('input', () => {
      if (counterMin) counterMin.textContent = input.value.length;
      mask.updateValue(); // Важно: синхронизируем маску
    });
  }

  // Обработка выбора файлов
  handleFileSelect(e) {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Очищаем предыдущие файлы (если нужен только один файл)
    this.filesToUpload = [];
    
    files.forEach(file => {
      // Проверка размера файла (максимум 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Файл "${file.name}" превышает максимальный размер 10MB`);
        return;
      }

      // Проверка типа файла
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 
                           'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert(`Файл "${file.name}" имеет недопустимый тип. Разрешены: JPG, PNG, GIF, PDF, DOC, DOCX`);
        return;
      }

      const fileId = "FID" + (1000 + Math.random() * 9000).toFixed(0);
      
      this.filesToUpload.push({
        file: file,
        id: fileId,
        name: file.name,
        size: this.formatBytes(file.size),
        type: file.type
      });
    });

    this.displayFiles();
    
    // После загрузки файла убираем error и добавляем success
    const fileControl = this.fileInput.closest('.form__file');
    if (fileControl && this.filesToUpload.length > 0) {
      fileControl.classList.remove('error');
      fileControl.classList.add('success');
      
      // Очищаем сообщение об ошибке
      const errorElement = fileControl.querySelector('.form__error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
    
    e.target.value = ''; // Сбрасываем input для возможности повторной загрузки
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  displayFiles() {
    if (!this.fileContainer) return;
    
    this.fileContainer.innerHTML = '';
    
    if (this.filesToUpload.length === 0) {
      return;
    }

    this.filesToUpload.forEach(fileData => {
      const fileItem = document.createElement('li');
      fileItem.className = 'form__file_item text_small';
      fileItem.innerHTML = `
        <span class="form__file_name">${fileData.name}</span>
        <span class="form__file_size">${fileData.size}</span>
        <button type="button" class="form__file_remove" data-id="${fileData.id}">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      `;
      
      this.fileContainer.appendChild(fileItem);
    });

    // Добавляем обработчики для кнопок удаления
    this.fileContainer.querySelectorAll('.form__file_remove').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const fileId = button.getAttribute('data-id');
        this.removeFile(fileId);
      });
    });
  }

  removeFile(fileId) {
    this.filesToUpload = this.filesToUpload.filter(file => file.id !== fileId);
    this.displayFiles();
    
    // После удаления файла проверяем состояние
    const fileControl = this.fileInput.closest('.form__file');
    if (fileControl) {
      if (this.filesToUpload.length === 0) {
        // Если файлов нет, убираем success, но не добавляем error
        fileControl.classList.remove('success');
      }
    }
  }

  validateFileField() {
    if (!this.fileInput) return true;
    
    const fileControl = this.fileInput.closest('.form__file');
    
    // При валидации при отправке формы проверяем наличие файлов
    if (this.filesToUpload.length === 0) {
      if (fileControl) {
        fileControl.classList.add('error');
        fileControl.classList.remove('success');
        
        // Показываем сообщение об ошибке только при попытке отправки
        const errorElement = fileControl.querySelector('.form__error');
        if (errorElement) {
          errorElement.textContent = 'Пожалуйста, загрузите файл';
        }
      }
      return false;
    }
    
    return true;
  }

  validateField(input) {
    const value = input.value.trim();
    const control = input.parentElement;
    
    // Убираем предыдущие ошибки
    this.removeError(input);
    
    // Проверка обязательности
    if (input.hasAttribute('required') && !value) {
      this.showError(input, 'Это поле обязательно для заполнения');
      return false;
    }
    
    // Специфичные проверки
    if (value) {
      // Для телефона
      if (input.type === 'tel' || input.id.includes('__phone')) {
        const mask = this.masks.get(input);
        if (mask) {
          // Проверяем, заполнена ли маска полностью
          if (mask.unmaskedValue && mask.unmaskedValue.replace(/\D/g, '').length !== 11) {
            this.showError(input, 'Введите корректный номер телефона');
            return false;
          }
        } else if (value.includes('_')) {
          this.showError(input, 'Введите корректный номер телефона');
          return false;
        }
      }
      
      // Для имени
      if (input.id.includes('__name')) {
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
          this.showError(input, 'Имя может содержать только буквы, пробелы и дефисы');
          return false;
        }
        if (value.length < 2) {
          this.showError(input, 'Имя должно содержать минимум 2 символа');
          return false;
        }
      }
    }
    
    // Успешная валидация
    if (value || !input.hasAttribute('required')) {
      if (control) {
        control.classList.add('success');
        control.classList.remove('error');
      }
    }
    return true;
  }

  showError(input, message) {
    const control = input.parentElement;
    const errorElement = control ? control.querySelector('.form__error') : null;
    
    if (errorElement) {
      errorElement.textContent = message;
    }
    
    if (control) {
      control.classList.add('error');
      control.classList.remove('success');
    }
  }

  removeError(input) {
    const control = input.parentElement;
    const errorElement = control ? control.querySelector('.form__error') : null;
    
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    if (control) {
      control.classList.remove('error');
      // Не удаляем success здесь, так как поле может быть уже валидным
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Валидируем текстовые поля
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    // Валидируем файловое поле (обязательное) только при отправке
    if (!this.validateFileField()) {
      isValid = false;
    }
    
    if (!isValid) {
      // Находим первое поле с ошибкой для фокуса
      const firstError = this.form.querySelector('.error input, .error .form__file_button');
      if (firstError) {
        firstError.focus();
      }
      return;
    }
    
    // Собираем данные
    const formData = new FormData(this.form);
    const data = {};
    
    // Добавляем текстовые данные
    this.inputs.forEach(input => {
      data[input.id] = input.value.trim();
    });
    
    // Добавляем файлы
    if (this.filesToUpload.length > 0) {
      this.filesToUpload.forEach(fileData => {
        formData.append('files[]', fileData.file);
      });
    }
    
    console.log(`Форма ${this.form.id} отправлена:`, data);
    console.log('Файлы:', this.filesToUpload);
    
    // Показываем успешное сообщение
    this.showSuccessMessage();
    
    // Сбрасываем форму
    this.resetForm();
  }

  showSuccessMessage() {
    // Создаем или находим элемент для сообщения
    let successMsg = this.form.querySelector('.form__success');
    
    if (!successMsg) {
      successMsg = document.createElement('div');
      successMsg.className = 'form__success';
      successMsg.style.cssText = `
        padding: 15px;
        margin-top: 20px;
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
      `;
      successMsg.textContent = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
      
      this.form.appendChild(successMsg);
    } else {
      successMsg.style.display = 'block';
    }
    
    // Автоматически скрываем сообщение через 5 секунд
    setTimeout(() => {
      if (successMsg) {
        successMsg.style.display = 'none';
      }
    }, 5000);
  }

  resetForm() {
    // Сбрасываем текстовые поля
    this.form.reset();
    
    // Очищаем маски телефонов
    this.inputs.forEach(input => {
      if (input.type === 'tel' || input.id.includes('__phone')) {
        const mask = this.masks.get(input);
        if (mask) {
          mask.updateValue(); // Синхронизируем маску
        }
      }
      
      const counterMin = input.parentElement.querySelector('.form__counter_min');
      if (counterMin) {
        counterMin.textContent = '0';
      }
      
      this.removeError(input);
      const control = input.parentElement;
      if (control) {
        control.classList.remove('success');
      }
    });
    
    // Очищаем файлы
    this.filesToUpload = [];
    if (this.fileContainer) {
      this.fileContainer.innerHTML = '';
    }
    
    // Сбрасываем состояние файлового поля (без error)
    const fileControl = this.fileInput ? this.fileInput.closest('.form__file') : null;
    if (fileControl) {
      fileControl.classList.remove('error');
      fileControl.classList.remove('success');
      
      // Очищаем сообщение об ошибке
      const errorElement = fileControl.querySelector('.form__error');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  }
}

// Инициализация всех форм на странице
document.addEventListener('DOMContentLoaded', () => {
  const forms = ['heroForm', 'footerForm'];
  
  forms.forEach(formId => {
    const formElement = document.getElementById(formId);
    if (formElement) {
      console.log(`Инициализация формы: ${formId}`);
      new FormValidator(formId);
    } else {
      console.log(`Форма ${formId} не найдена на странице`);
    }
  });
});