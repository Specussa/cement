// start right mouse
// document.oncontextmenu = cmenu; function cmenu() { return false; }
// function preventSelection(element){
//   var preventSelection = false;
//   function addHandler(element, event, handler){
//   if (element.attachEvent) element.attachEvent('on' + event, handler);
//   else if (element.addEventListener) element.addEventListener(event, handler, false);  }
//   function removeSelection(){
//   if (window.getSelection) { window.getSelection().removeAllRanges(); }
//   else if (document.selection && document.selection.clear)
//   document.selection.clear();
//   }

//   addHandler(element, 'mousemove', function(){ if(preventSelection) removeSelection(); });
//   addHandler(element, 'mousedown', function(event){ var event = event || window.event; var sender = event.target || event.srcElement; preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i) ;});

//   function killCtrlA(event){
//   var event = event || window.event;
//   var sender = event.target || event.srcElement;
//   if (sender.tagName.match(/INPUT|TEXTAREA/i)) return;
//   var key = event.keyCode || event.which;
//   if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.ctrlKey && key == 'A'.charCodeAt(0)) || (event.ctrlKey && key == 'S'.charCodeAt(0)))
//   { removeSelection();
//   if (event.preventDefault) event.preventDefault();
//   else event.returnValue = false;}}
//   addHandler(element, 'keydown', killCtrlA);
//   addHandler(element, 'keyup', killCtrlA);
// }
// preventSelection(document);
// end right mouse

// start height
let oldWidth = window.innerWidth;
const docheight = document.documentElement
docheight.style.setProperty('--height', `${window.innerHeight}px`);
const appHeight = () => {
  var newWidth = window.innerWidth;
  if (newWidth != oldWidth) {
    docheight.style.setProperty('--height', `${window.innerHeight}px`);
  }
  oldWidth = window.innerWidth;
}
window.addEventListener('resize', appHeight);
appHeight();
// end height

// start year
const year = document.querySelector('.footer__year');
if(!year){} else {
  const currentYear = new Date().getFullYear();
  year.insertAdjacentText('beforebegin', currentYear);
  year.remove();
}
// end year

// start navbar
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const navItems = document.querySelectorAll('.header__nav_item');
const overlay = document.querySelector('.overlay');
const overlayFull = document.querySelector('.overlay_full');
const navContent = document.querySelector('.header__nav_block');
const docsPopup = document.querySelector('.docs__popup');
const heroPopup = document.querySelector('.hero__popup');

// Функция для установки max-height
function setElementHeight(element) {
  if (element.classList.contains('active')) {
    element.style.maxHeight = element.scrollHeight + 'px';
  } else {
    element.style.maxHeight = '';
  }
}

// Обработчик для бургер-меню
if (burger && nav) {
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    
    const isActive = nav.classList.contains('active');
    
    // Переключаем активный класс у навигации
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.documentElement.classList.toggle('noscroll');
    
    if (!isActive) {
      // Открываем навигацию - устанавливаем высоту контента
      const navContentHeight = navContent.scrollHeight;
      nav.style.maxHeight = navContentHeight + 'px';
    } else {
      // Закрываем навигацию
      nav.style.maxHeight = '';
      
      // Закрываем все подменю
      navItems.forEach(item => {
        const subnav = item.querySelector('.header__subnav');
        if (subnav) {
          subnav.classList.remove('active');
          subnav.style.maxHeight = '';
          item.classList.remove('active');
        }
        if(window.innerWidth >= 1280){
          overlay.classList.remove('active');
          overlayFull.classList.remove('active');
          if(docsPopup){docsPopup.classList.remove('active')};
          if(heroPopup){heroPopup.classList.remove('active')};
        }
      });
    }
  });
}

// Обработчик для элементов навигации с подменю
navItems.forEach(item => {
  const link = item.querySelector('.header__nav_link');
  const subnav = item.querySelector('.header__subnav');
  const arrow = item.querySelector('.header__nav_arrow');
  
  if (link && subnav) {
    link.addEventListener('click', function(e) {
      // Если у элемента есть стрелка (подменю)
      if (arrow) {
        // Блокируем переход по ссылке только если элемент не активен
        if (!item.classList.contains('active')) {
          e.preventDefault();
        }
        
        const wasActive = subnav.classList.contains('active');
        const subnavHeight = subnav.scrollHeight;
        const currentNavHeight = parseFloat(nav.style.maxHeight) || 0;
        
        // Закрываем все другие подменю
        document.querySelectorAll('.header__subnav').forEach(otherSubnav => {
          if (otherSubnav !== subnav && otherSubnav.classList.contains('active')) {
            otherSubnav.classList.remove('active');
            otherSubnav.style.maxHeight = '';
            otherSubnav.closest('.header__nav_item').classList.remove('active');
            if(window.innerWidth >= 1280){
              overlay.classList.remove('active');
              overlayFull.classList.remove('active');
              if(docsPopup){docsPopup.classList.remove('active')};
              if(heroPopup){heroPopup.classList.remove('active')};
            }
            
            // Уменьшаем высоту навигации на высоту закрытого подменю
            const otherHeight = otherSubnav.scrollHeight;
            nav.style.maxHeight = (currentNavHeight - otherHeight) + 'px';
          }
        });
        
        // Получаем текущую высоту навигации после возможного закрытия других подменю
        const updatedNavHeight = parseFloat(nav.style.maxHeight) || navContent.scrollHeight;
        
        if (!wasActive) {
          // Открываем подменю
          e.preventDefault(); // Блокируем переход при открытии подменю
          subnav.classList.add('active');
          item.classList.add('active');
          subnav.style.maxHeight = subnavHeight + 'px';
          nav.style.maxHeight = (updatedNavHeight + subnavHeight) + 'px';
          if(window.innerWidth >= 1280){
            overlay.classList.add('active');
          }
        } else {
          // Закрываем подменю и разрешаем переход по ссылке
          subnav.classList.remove('active');
          item.classList.remove('active');
          subnav.style.maxHeight = '';
          nav.style.maxHeight = (updatedNavHeight - subnavHeight) + 'px';
          if(window.innerWidth >= 1280){
            overlay.classList.remove('active');
            overlayFull.classList.remove('active');
            if(docsPopup){docsPopup.classList.remove('active')};
            if(heroPopup){heroPopup.classList.remove('active')};
          }
        }
      }
    });
  }
});

// Закрытие меню при клике на оверлей
if (overlay) {
  overlay.addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (overlay.classList.contains('active')) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      overlay.classList.remove('active');
      overlayFull.classList.remove('active');
      if(docsPopup){docsPopup.classList.remove('active')};
      if(heroPopup){heroPopup.classList.remove('active')};
      document.documentElement.classList.remove('noscroll');
      
      nav.style.maxHeight = '';
      
      // Закрываем все подменю
      navItems.forEach(item => {
        const subnav = item.querySelector('.header__subnav');
        if (subnav) {
          subnav.classList.remove('active');
          subnav.style.maxHeight = '';
          item.classList.remove('active');
        }
      });
    }
  });
}

// Закрытие меню при клике на оверлей
if (overlayFull) {
  overlayFull.addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (overlayFull.classList.contains('active')) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      overlay.classList.remove('active');
      overlayFull.classList.remove('active');
      if(docsPopup){docsPopup.classList.remove('active')};
      if(heroPopup){heroPopup.classList.remove('active')};
      document.documentElement.classList.remove('noscroll');
      
      nav.style.maxHeight = '';
      
      // Закрываем все подменю
      navItems.forEach(item => {
        const subnav = item.querySelector('.header__subnav');
        if (subnav) {
          subnav.classList.remove('active');
          subnav.style.maxHeight = '';
          item.classList.remove('active');
        }
      });
    }
  });
}

// Закрытие подменю при клике вне его
document.addEventListener('click', function(e) {
  // Проверяем, не был ли клик по аккордеону или его элементам
  const isFaqClick = e.target.closest('.faq__item, .faq__button, .faq__info, .faq__question, .faq__answer');
  
  // Если клик был по аккордеону - ничего не делаем с меню
  if (isFaqClick) {
    return;
  }
  
  // Проверяем, не был ли клик по элементам навигации или бургеру
  if (!e.target.closest('.header__nav_item') && !e.target.closest('.header__burger')) {
    navItems.forEach(item => {
      const subnav = item.querySelector('.header__subnav');
      if (subnav && subnav.classList.contains('active')) {
        const subnavHeight = subnav.scrollHeight;
        const currentNavHeight = parseFloat(nav.style.maxHeight) || 0;
        if(window.innerWidth >= 1280){
          overlay.classList.remove('active');
          overlayFull.classList.remove('active');
          if(docsPopup){docsPopup.classList.remove('active')};
          if(heroPopup){heroPopup.classList.remove('active')};
        }
        
        subnav.classList.remove('active');
        item.classList.remove('active');
        subnav.style.maxHeight = '';
        
        // Уменьшаем высоту навигации
        nav.style.maxHeight = (currentNavHeight - subnavHeight) + 'px';
      }
    });
  }
});

// Закрытие попапов при клике на ссылки в хедере (только для реальных переходов)
document.addEventListener('click', function(e) {
  // Проверяем, не был ли клик по аккордеону
  const isFaqClick = e.target.closest('.faq__item, .faq__button, .faq__info, .faq__question, .faq__answer');
  
  // Если клик был по аккордеону - ничего не делаем
  if (isFaqClick) {
    return;
  }
  
  // Находим ссылку в хедере, по которой кликнули
  const headerLink = e.target.closest('.header__nav_link, .header__subnav_link');
  
  if (headerLink) {
    // Проверяем, есть ли у родительского элемента стрелка (подменю)
    const parentItem = headerLink.closest('.header__nav_item');
    const hasArrow = parentItem && parentItem.querySelector('.header__nav_arrow');
    
    // Если это ссылка без стрелки (не открывает подменю) или мы кликнули по ссылке в подменю
    if (!hasArrow || headerLink.closest('.header__subnav')) {
      // Закрываем все попапы
      if (docsPopup) docsPopup.classList.remove('active');
      if (heroPopup) heroPopup.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      if (overlayFull) overlayFull.classList.remove('active');
      document.documentElement.classList.remove('noscroll');
      
      // Закрываем мобильное меню если оно открыто
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        nav.style.maxHeight = '';
        
        if (burger) {
          burger.classList.remove('active');
        }
        
        // Закрываем все подменю
        navItems.forEach(item => {
          const subnav = item.querySelector('.header__subnav');
          if (subnav) {
            subnav.classList.remove('active');
            subnav.style.maxHeight = '';
            item.classList.remove('active');
          }
        });
      }
    }
  }
});
// end navbar

// start select
const SELECT = '[data-select]'
const SELECT_LIST = '[data-select-list]'
const SELECT_ARROW = '[data-select-arrow]'
const SELECT_ACTION = '[data-select-action]'
const SELECT_TITLE = '[data-select-title]'
const SELECT_INPUT = '[data-select-input]'
const SELECT_ITEM = 'selectItem'
const OPEN_SELECT = 'selectOpen'

class Select {
  static attach() {
    document.querySelectorAll(SELECT)
      .forEach(select => new Select().init(select))
  }

  init(select) {
    if (this.findSelect(select)) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = this.select.contains(e.target) && e.target.closest(SELECT_ACTION)

      if (this.isCallSelectElement(element)) {
        if (this.isOpened()) {
          this.closeSelectList();
        } else {
          this.openSelectList()
        }
      }

      if (this.isCallSelectItemElement(element)) {
        this.addSelectedValue(element)
      }

      if (this.isCallSelectElement(element) !== true && this.selectOverlayIsClickedElement(element) !== true) {
        this.closeSelectList()
      }
    })
  }

  isCallSelectElement(element, target) {
    return element && OPEN_SELECT in element.dataset
  }

  isCallSelectItemElement(element, target) {
    return element && SELECT_ITEM in element.dataset
  }

  findSelect(select) {

    if (select) {
      this.select = select
      this.selectList = this.select.querySelector(SELECT_LIST)
      this.selectArrow = this.select.querySelector(SELECT_ARROW)
      this.selectTitle = this.select.querySelector(SELECT_TITLE)
      this.selectInput = this.select.querySelector(SELECT_INPUT)
      return true
    }
    return false
  }

  isOpened() {
    return this.selectList.classList.contains('form__select_list_opened')
  }

  openSelectList() {
    this.selectList.style.maxHeight = this.selectList.scrollHeight + "px";
    this.selectList.classList.add('form__select_list_opened')
    this.selectArrow.classList.add('form__select_arrow_rotate')
  }

  closeSelectList() {
    this.selectList.style.maxHeight = null;
    this.selectList.classList.remove('form__select_list_opened')
    this.selectArrow.classList.remove('form__select_arrow_rotate')
  }

  addSelectedValue(element) {
    this.selectTitle.innerHTML = element.innerHTML;
    this.selectInput.value = element.innerHTML;
    element.parentNode.parentNode.classList.add("success");
    element.parentNode.parentNode.classList.remove("error");
    this.selectInput.setAttribute('value', this.selectInput.value);
  }

  selectOverlayIsClickedElement(element, target) {
    return element && 'select' in element.dataset
  }
}

Select.attach()
// end select

// start hero
const heroButtons = document.querySelectorAll('.hero__button');
const heroButton = document.querySelector('.hero__button');
const heroClose = document.querySelector('.hero__popup_close');

if(heroClose) {
  heroClose.addEventListener('click', function() {
    heroPopup.classList.remove('active');
    overlayFull.classList.remove('active');
    document.documentElement.classList.remove('noscroll');
  });
}
heroButtons.forEach(function(button) {
  if(heroButton) {
    button.addEventListener('click', function() {
      if (heroPopup.classList.contains('active')) {
        heroPopup.classList.remove('active');
        overlayFull.classList.remove('active');
        document.documentElement.classList.remove('noscroll');
      } else {
        heroPopup.classList.add('active');
        overlayFull.classList.add('active');
        document.documentElement.classList.add('noscroll');
      }
    });
  }
});
// end hero

// start faq
const accordionItems = document.querySelectorAll('.faq__item');

// Функция для расчета высоты содержимого
function calculateContentHeight(content) {
  // Временно показываем элемент для измерения высоты
  content.style.maxHeight = 'none';
  content.style.visibility = 'hidden';
  content.style.display = 'block';
  
  // Получаем полную высоту содержимого
  const height = content.scrollHeight;
  
  // Возвращаем стили в исходное состояние
  content.style.maxHeight = '';
  content.style.visibility = '';
  content.style.display = '';
  
  return height;
}

// Инициализация аккордеона
function initAccordion() {
  accordionItems.forEach(item => {
    const button = item.querySelector('.faq__button');
    const content = item.querySelector('.faq__info');
    
    // Рассчитываем и сохраняем высоту содержимого
    const contentHeight = calculateContentHeight(content);
    
    // Обработчик клика по кнопке
    button.addEventListener('click', function() {
      // Закрываем все остальные элементы
      if (!item.classList.contains('active')) {
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.faq__info');
            otherContent.style.maxHeight = '0px';
          }
        });
      }
      
      // Переключаем текущий элемент
      item.classList.toggle('active');
      
      // Анимируем высоту содержимого
      if (item.classList.contains('active')) {
        content.style.maxHeight = contentHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
    
    // Устанавливаем начальную высоту для закрытых элементов
    if (!item.classList.contains('active')) {
      content.style.maxHeight = '0px';
    } else {
      content.style.maxHeight = contentHeight + 'px';
    }
  });
}

// Функция для обновления высоты при изменении размера окна
function updateAccordionHeights() {
  accordionItems.forEach(item => {
    const content = item.querySelector('.faq__info');
    
    if (item.classList.contains('active')) {
      // Пересчитываем высоту для открытых элементов
      const contentHeight = calculateContentHeight(content);
      content.style.maxHeight = contentHeight + 'px';
    }
  });
}

// Инициализируем аккордеон
initAccordion();

// Обновляем высоту при изменении размера окна
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateAccordionHeights, 250);
});
// end faq

// start build
// Получаем все кнопки с классом build__button
const buttons = document.querySelectorAll('.build__button');
const swiperBlocks = document.querySelectorAll('.build__swiper');
const swiperButtons = document.querySelectorAll('.swiper__buttons');

// Функция для активации выбранного блока
function activateBlock(blockNumber) {
  // Удаляем класс active у всех кнопок
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Удаляем класс active у всех слайдеров
  swiperBlocks.forEach(block => {
    block.classList.remove('active');
  });
  
  // Удаляем класс active у всех навигационных кнопок слайдера
  swiperButtons.forEach(buttonGroup => {
    buttonGroup.classList.remove('active');
  });
  
  // Добавляем класс active выбранной кнопке
  const selectedButton = document.querySelector(`.build__button_${blockNumber}`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
  
  // Добавляем класс active выбранному слайдеру
  const selectedSwiper = document.querySelector(`.build__swiper_${blockNumber}`);
  if (selectedSwiper) {
    selectedSwiper.classList.add('active');
  }
  
  // Добавляем класс active выбранной группе навигационных кнопок
  const selectedSwiperButtons = document.querySelector(`.swiper__buttons_${blockNumber}`);
  if (selectedSwiperButtons) {
    selectedSwiperButtons.classList.add('active');
  }
}

// Обработчики кликов для кнопок
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Определяем номер блока по классу кнопки
    if (this.classList.contains('build__button_one')) {
      activateBlock('one');
    } else if (this.classList.contains('build__button_two')) {
      activateBlock('two');
    } else if (this.classList.contains('build__button_three')) {
      activateBlock('three');
    }
  });
});

const buildSliderOne = document.querySelector('.build__swiper_one');
if(buildSliderOne){
  var buildSlider = new Swiper('.build__swiper_one', {
    loop: false,
    slidesPerView: 'auto',
    loopedSlides: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.build__next_one',
      prevEl: '.build__prev_one',
    },
    breakpoints: {
      1920: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
    },
  });
}
const buildSliderTwo = document.querySelector('.build__swiper_two');
if(buildSliderTwo){
  var buildSlider = new Swiper('.build__swiper_two', {
    loop: false,
    slidesPerView: 'auto',
    loopedSlides: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.build__next_two',
      prevEl: '.build__prev_two',
    },
    breakpoints: {
      1920: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
    },
  });
}
const buildSliderThree = document.querySelector('.build__swiper_three');
if(buildSliderThree){
  var buildSlider = new Swiper('.build__swiper_three', {
    loop: false,
    slidesPerView: 'auto',
    loopedSlides: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.build__next_three',
      prevEl: '.build__prev_three',
    },
    breakpoints: {
      1920: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
    },
  });
}
// end build

// start project desktop
const projectdesktopSlider = document.querySelector('.project_desktop__swiper');
if(projectdesktopSlider){
  var pdesktopSlider = new Swiper('.project_desktop__swiper', {
    loop: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    loopedSlides: 1,
    spaceBetween: 0,
    pagination: {
      el: '.project_desktop__pagination',
      clickable: true,
    },
  });
}
// end project desktop

// start dosc
const closePopup = document.querySelector('.docs__popup_close');
const popupImage = document.getElementById('popupImage');
const docItems = document.querySelectorAll('.docs__item');

if(popupImage){
  // Функция для открытия попапа
  function openPopup(imageSrc, altText) {
    popupImage.src = imageSrc;
    popupImage.alt = altText || 'Увеличенное изображение';
    docsPopup.classList.add('active');
    overlayFull.classList.add('active');
    document.documentElement.classList.add("noscroll");
  }

  // Функция для закрытия попапа
  function closePopupHandler() {
    docsPopup.classList.remove('active');
    overlay.classList.remove('active');
    overlayFull.classList.remove('active');
    document.documentElement.classList.remove("noscroll");
  }

  // Добавляем обработчики кликов на каждый элемент docs__item
  docItems.forEach(item => {
    item.addEventListener('click', function(event) {
      // Ищем изображение внутри текущего элемента
      const image = this.querySelector('.docs__image img');
      const altText = this.querySelector('.docs__heading')?.textContent || '';
      
      if (image && image.src) {
        openPopup(image.src, altText);
      }
    });
  });

  // Закрытие по клику на крестик
  closePopup.addEventListener('click', closePopupHandler);

  // Предотвращаем закрытие при клике на само изображение
  popupImage.addEventListener('click', function(event) {
    event.stopPropagation();
  });
}
// end docs

// start breadcrumbs__back
const backButton = document.querySelector('.breadcrumbs__back');
if (backButton) {
  backButton.addEventListener('click', function() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });
  
  // Опционально: добавляем атрибут для доступности
  backButton.setAttribute('title', 'Назад');
  backButton.setAttribute('aria-label', 'Вернуться на предыдущую страницу');
} else {
  console.warn('Кнопка с классом .breadcrumbs__back не найдена');
}
// end breadcrumbs__back

// start fade-in-up (текст и изображения; без попапов, модалок, шапки и фонов)
(function() {
  var textImageSelectors = 'h1, h2, h3, h4, h5, h6, p, li, figcaption, blockquote, img';
  var excludeContainers = '.hero__popup, .docs__popup, .overlay, .overlay_full, .header, [class*="__bg"], [class*="background"]';

  function isInsideExcluded(el) {
    return el.closest(excludeContainers) !== null;
  }

  var elements = document.querySelectorAll(textImageSelectors);
  var targets = [];
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (!isInsideExcluded(el)) {
      targets.push(el);
    }
  }

  targets.forEach(function(el) {
    el.classList.add('fade-in-up');
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up_visible');
      }
    });
  }, { rootMargin: '0px 0px -25px 0px', threshold: 0.05 });

  targets.forEach(function(el) {
    observer.observe(el);
  });
})();
// end fade-in-up


// Функции для работы с cookies
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

// Основная функция для показа уведомления
function showCookieConsent() {
    // Проверяем, было ли уже дано согласие
    if (getCookie('cookieConsent') === 'accepted') {
        return;
    }
    
    const consentElement = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');
    
    // Показываем уведомление с задержкой
    setTimeout(() => {
        consentElement.style.display = 'block';
        
        // Анимация появления
        setTimeout(() => {
            consentElement.style.opacity = '1';
            consentElement.style.transform = 'translateY(0)';
        }, 10);
    }, 1000); // 1 секунда после загрузки страницы
    
    // Обработчик для кнопки согласия
    acceptButton.addEventListener('click', function() {
        // Сохраняем согласие в cookies на 365 дней
        setCookie('cookieConsent', 'accepted', 365);
        
        // Скрываем с анимацией
        consentElement.style.opacity = '0';
        consentElement.style.transform = 'translateY(20px)';
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            consentElement.style.display = 'none';
        }, 500);
    });
}

// Запускаем при полной загрузке страницы
window.addEventListener('load', showCookieConsent);

// Альтернативный запуск на случай, если load не сработал
document.addEventListener('DOMContentLoaded', function() {
    // Если уже загрузилось, то не запускаем повторно
    if (document.readyState === 'complete') {
        return;
    }
    
    // Запускаем с небольшим таймаутом
    setTimeout(showCookieConsent, 1500);
});