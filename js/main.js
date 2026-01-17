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
  burger.addEventListener('click', function() {
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
  overlay.addEventListener('click', function() {
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
  overlayFull.addEventListener('click', function() {
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
const heroButton = document.querySelector('.hero__button');

if(heroPopup) {
  heroButton.addEventListener('click', function() {
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
// end hero

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
      1440: {
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
      1440: {
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
      1440: {
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