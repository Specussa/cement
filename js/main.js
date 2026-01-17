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
const navContent = document.querySelector('.header__nav_block');

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
          }
        }
      }
    });
  }
});

// Закрытие меню при клике на оверлей
if (overlay) {
  overlay.addEventListener('click', function() {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      overlay.classList.remove('active');
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

// Получаем все элементы docs__item
const docItems = document.querySelectorAll('.docs__item');

// Функция для открытия попапа
function openPopup(imageSrc, altText) {
  popupImage.src = imageSrc;
  popupImage.alt = altText || 'Увеличенное изображение';
  docsPopup.classList.add('active');
  overlay.classList.add('active');
  document.documentElement.classList.add("noscroll");
}

// Функция для закрытия попапа
function closePopupHandler() {
  docsPopup.classList.remove('active');
  overlay.classList.remove('active');
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

// Закрытие по клику на оверлей (вне изображения)
docsPopup.addEventListener('click', function(event) {
  if (event.target === docsPopup) {
    closePopupHandler();
  }
});

// Предотвращаем закрытие при клике на само изображение
popupImage.addEventListener('click', function(event) {
  event.stopPropagation();
});
// end dosc

// start index animation
const headerform = document.querySelector('.header__forms_form_controls');
const headerforms = document.querySelectorAll('.header__forms_form_controls');
if(headerform){
  [...headerforms].forEach(function (li) {
    for (let [index, elem] of [...li.children].entries()){
      elem.style.setProperty('--inc-step', index+1);
    }
  });
}

const digital = document.querySelector('.digital');
const digitalinfo = document.querySelectorAll('.digital__info');
const digitalsl = document.querySelectorAll('.digital_social_list');
if(digital){
  let digitald = document.querySelectorAll('.digital');
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};
  let digitaldopt = {threshold: [0]};
  let digitaldserv = new IntersectionObserver(onEntry, digitaldopt);
  for (let elm of digitald) {digitaldserv.observe(elm);}

  let digitalopt = {threshold: [0.5]};
  let digitalserv = new IntersectionObserver(onEntry, digitalopt);
  for (let elm of digitalinfo) {digitalserv.observe(elm);}
  const digitalhead = document.querySelectorAll('.digital__head'); 
  [...digitalhead].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let digitallopt = {threshold: [0.5]};
  let digitallserv = new IntersectionObserver(onEntry, digitallopt);
  for (let elm of digitalsl) {digitallserv.observe(elm);}
  [...digitalsl].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const breadcrumb = document.querySelector('.breadcrumbs__item');
const breadcrumbs = document.querySelectorAll('.breadcrumbs__list');
if(breadcrumb){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};
  let breadcrumbopt = {threshold: [0.5]};
  let breadcrumbserv = new IntersectionObserver(onEntry, breadcrumbopt);
  for (let elm of breadcrumbs) {breadcrumbserv.observe(elm);}
  [...breadcrumbs].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const expertise = document.querySelector('.expertise');
const expertiseleft = document.querySelectorAll('.expertise__left');
const expertiseright = document.querySelectorAll('.expertise__right');
if(expertise){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let expertiseleftopt = {threshold: [0.5]};
  let expertiseleftserv = new IntersectionObserver(onEntry, expertiseleftopt);
  for (let elm of expertiseleft) {expertiseleftserv.observe(elm);}
  [...expertiseleft].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let expertiserightopt = {threshold: [0.5]};
  let expertiserightserv = new IntersectionObserver(onEntry, expertiserightopt);
  for (let elm of expertiseright) {expertiserightserv.observe(elm);}
}

const projects = document.querySelector('.projects');
const projectsflex = document.querySelectorAll('.projects__flex');
const projectsallflex = document.querySelector('.projects__all_flex');
const projectsallflexs = document.querySelectorAll('.projects__all_flex');
const projectsitem = document.querySelectorAll('.projects__item');
if(projects){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  if (projectsallflex) {
    let projectsallflexsopt = {threshold: [0.5]};
    let projectsallflexsserv = new IntersectionObserver(onEntry, projectsallflexsopt);
    for (let elm of projectsallflexs) {projectsallflexsserv.observe(elm);}
  }

  let projectsflexopt = {threshold: [0.5]};
  let projectsflexserv = new IntersectionObserver(onEntry, projectsflexopt);
  for (let elm of projectsflex) {projectsflexserv.observe(elm);}

  let projectsitemopt = {threshold: [0.3]};
  let projectsitemserv = new IntersectionObserver(onEntry, projectsitemopt);
  for (let elm of projectsitem) {projectsitemserv.observe(elm);}
}

const projectt = document.querySelector('.project_top');
const projecttopblock = document.querySelectorAll('.project_top__block');
if(projectt){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let projecttopblockopt = {threshold: [0.5]};
  let projecttopblockserv = new IntersectionObserver(onEntry, projecttopblockopt);
  for (let elm of projecttopblock) {projecttopblockserv.observe(elm);}
}

const projecti = document.querySelector('.project__info');
const projectbannerblock = document.querySelectorAll('.project__info');
if(projecti){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let projectbannerblockopt = {threshold: [0.5]};
  let projectbannerblockserv = new IntersectionObserver(onEntry, projectbannerblockopt);
  for (let elm of projectbannerblock) {projectbannerblockserv.observe(elm);}
}

const articles = document.querySelector('.articles');
const articlestop = document.querySelectorAll('.articles__top');
const articlesitem = document.querySelectorAll('.articles__item');
if(articles){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let articlestopopt = {threshold: [0.5]};
  let articlestopserv = new IntersectionObserver(onEntry, articlestopopt);
  for (let elm of articlestop) {articlestopserv.observe(elm);}

  let articlesitemopt = {threshold: [0.5]};
  let articlesitemserv = new IntersectionObserver(onEntry, articlesitemopt);
  for (let elm of articlesitem) {articlesitemserv.observe(elm);}
}

const servicest = document.querySelector('.services_top');
const servicestb = document.querySelectorAll('.services_top__block');
if(servicest){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let servicestbopt = {threshold: [0.5]};
  let servicestbserv = new IntersectionObserver(onEntry, servicestbopt);
  for (let elm of servicestb) {servicestbserv.observe(elm);}
}

const services = document.querySelector('.services');
const servicesleft = document.querySelectorAll('.services__left');
const serviceslleft = document.querySelectorAll('.services__list_left');
const serviceslright = document.querySelectorAll('.services__list_right');
if(services){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let servicesleftopt = {threshold: [0.5]};
  let servicesleftserv = new IntersectionObserver(onEntry, servicesleftopt);
  for (let elm of servicesleft) {servicesleftserv.observe(elm);}

  let serviceslleftopt = {threshold: [0.5]};
  let serviceslleftserv = new IntersectionObserver(onEntry, serviceslleftopt);
  for (let elm of serviceslleft) {serviceslleftserv.observe(elm);}
  [...serviceslleft].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let serviceslrightopt = {threshold: [0.5]};
  let serviceslrightserv = new IntersectionObserver(onEntry, serviceslrightopt);
  for (let elm of serviceslright) {serviceslrightserv.observe(elm);}
  [...serviceslright].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const careert = document.querySelector('.career_top');
const careerti = document.querySelectorAll('.career_top__info');
if(careert){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let careertiopt = {threshold: [0.5]};
  let careertiserv = new IntersectionObserver(onEntry, careertiopt);
  for (let elm of careerti) {careertiserv.observe(elm);}
}

const careerb = document.querySelector('.career_bottom');
const careerbb = document.querySelectorAll('.career_bottom__block');
if(careerb){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let careerbbopt = {threshold: [0.5]};
  let careerbbserv = new IntersectionObserver(onEntry, careerbbopt);
  for (let elm of careerbb) {careerbbserv.observe(elm);}
  [...careerbb].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const career = document.querySelector('.career');
const careerleft = document.querySelectorAll('.career__left');
const careerright = document.querySelectorAll('.career__right');
if(career){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let careerleftopt = {threshold: [0.5]};
  let careerleftserv = new IntersectionObserver(onEntry, careerleftopt);
  for (let elm of careerleft) {careerleftserv.observe(elm);}

  let careerrightopt = {threshold: [0.5]};
  let careerrightserv = new IntersectionObserver(onEntry, careerrightopt);
  for (let elm of careerright) {careerrightserv.observe(elm);}
  [...careerright].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const contacts = document.querySelector('.contacts');
const contactsb = document.querySelectorAll('.contacts__block');
const contactssl = document.querySelectorAll('.contacts__social_list');
const contactssil = document.querySelectorAll('.contacts__social_info_list');
const contactssp = document.querySelectorAll('.contacts__social_project');
if(contacts){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let contactsbopt = {threshold: [0.5]};
  let contactsbserv = new IntersectionObserver(onEntry, contactsbopt);
  for (let elm of contactsb) {contactsbserv.observe(elm);}

  let contactsslopt = {threshold: [0.5]};
  let contactsslserv = new IntersectionObserver(onEntry, contactsslopt);
  for (let elm of contactssl) {contactsslserv.observe(elm);}
  [...contactssl].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let contactssilopt = {threshold: [0.5]};
  let contactssilserv = new IntersectionObserver(onEntry, contactssilopt);
  for (let elm of contactssil) {contactssilserv.observe(elm);}
  [...contactssil].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let contactsspopt = {threshold: [0.5]};
  let contactsspserv = new IntersectionObserver(onEntry, contactsspopt);
  for (let elm of contactssp) {contactsspserv.observe(elm);}
}

const articlespage = document.querySelector('.articles_page');
const articlespageitem = document.querySelectorAll('.articles_page__item');
const articlespageblock = document.querySelectorAll('.articles_page__block');
const articlespagechecks = document.querySelectorAll('.articles_page__checks');
if(articlespage){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let articlespageitemopt = {threshold: [0.3]};
  let articlespageitemserv = new IntersectionObserver(onEntry, articlespageitemopt);
  for (let elm of articlespageitem) {articlespageitemserv.observe(elm);}

  let articlespageblockopt = {threshold: [0.5]};
  let articlespageblockserv = new IntersectionObserver(onEntry, articlespageblockopt);
  for (let elm of articlespageblock) {articlespageblockserv.observe(elm);}
  [...articlespagechecks].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const subscription = document.querySelector('.subscription');
const subscriptionblock = document.querySelectorAll('.subscription__block');
if(subscription){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let subscriptionblockopt = {threshold: [0.5]};
  let subscriptionblockserv = new IntersectionObserver(onEntry, subscriptionblockopt);
  for (let elm of subscriptionblock) {subscriptionblockserv.observe(elm);}
}

const teamtop = document.querySelector('.team__top');
const teamtopblock = document.querySelectorAll('.team__top_block');
if(teamtop){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let teamtopblockopt = {threshold: [0.5]};
  let teamtopblockserv = new IntersectionObserver(onEntry, teamtopblockopt);
  for (let elm of teamtopblock) {teamtopblockserv.observe(elm);}
}

const teambottom = document.querySelector('.team__bottom');
const teambottominfo = document.querySelectorAll('.team__bottom_info');
const teambottomtop = document.querySelectorAll('.team__bottom_top');
const teambottombottom = document.querySelectorAll('.team__bottom_bottom');
if(teambottom){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let teambottominfoopt = {threshold: [0.5]};
  let teambottominfoserv = new IntersectionObserver(onEntry, teambottominfoopt);
  for (let elm of teambottominfo) {teambottominfoserv.observe(elm);}

  let teambottomtopopt = {threshold: [0.5]};
  let teambottomtopserv = new IntersectionObserver(onEntry, teambottomtopopt);
  for (let elm of teambottomtop) {teambottomtopserv.observe(elm);}

  let teambottombottomopt = {threshold: [0.5]};
  let teambottombottomserv = new IntersectionObserver(onEntry, teambottombottomopt);
  for (let elm of teambottombottom) {teambottombottomserv.observe(elm);}
}

const newteam = document.querySelector('.newteam');
const newteamitem = document.querySelectorAll('.newteam__item');
if(newteam) {
  let newteamd = document.querySelectorAll('.newteam');
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {
    change.target.classList.add('animate');
  }});};
  let newteamdopt = {threshold: [0]};
  let newteamdserv = new IntersectionObserver(onEntry, newteamdopt);
  for (let elm of newteamd) {newteamdserv.observe(elm);}

  let newteamopt = {threshold: [0.5]};
  let newteamserv = new IntersectionObserver(onEntry, newteamopt);
  for (let elm of newteamitem) {newteamserv.observe(elm);}
}

const teamslider = document.querySelector('.team_slider');
const teamsliderswiper = document.querySelectorAll('.team_slider__swiper');
if(teamslider){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let teamsliderswiperopt = {threshold: [0.5]};
  let teamsliderswiperserv = new IntersectionObserver(onEntry, teamsliderswiperopt);
  for (let elm of teamsliderswiper) {teamsliderswiperserv.observe(elm);}
}

const teamclients = document.querySelector('.team_clients');
const teamclientsitem = document.querySelectorAll('.team_clients__item');
const teamsliderinfo = document.querySelectorAll('.team_slider__info');
if(teamclients){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let teamsliderinfoopt = {threshold: [0.5]};
  let teamsliderinfoserv = new IntersectionObserver(onEntry, teamsliderinfoopt);
  for (let elm of teamsliderinfo) {teamsliderinfoserv.observe(elm);}

  let teamclientsitemopt = {threshold: [0.5]};
  let teamclientsitemserv = new IntersectionObserver(onEntry, teamclientsitemopt);
  for (let elm of teamclientsitem) {teamclientsitemserv.observe(elm);}
}

const teamcomments = document.querySelector('.team_comments');
const teamscommentsitem = document.querySelectorAll('.team_comments__item');
const teamscommentsbuttons = document.querySelectorAll('.team_comments__buttons');
if(teamcomments){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let teamscommentsitemopt = {threshold: [0.5]};
  let teamscommentsitemserv = new IntersectionObserver(onEntry, teamscommentsitemopt);
  for (let elm of teamscommentsitem) {teamscommentsitemserv.observe(elm);}

  let teamscommentsbuttonsopt = {threshold: [0.5]};
  let teamscommentsbuttonsserv = new IntersectionObserver(onEntry, teamscommentsbuttonsopt);
  for (let elm of teamscommentsbuttons) {teamscommentsbuttonsserv.observe(elm);}
}

const errorpage = document.querySelector('.error_page');
const errorpageflex = document.querySelectorAll('.error_page__flex');
if(errorpage){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let errorpageflexopt = {threshold: [0.5]};
  let errorpageflexserv = new IntersectionObserver(onEntry, errorpageflexopt);
  for (let elm of errorpageflex) {errorpageflexserv.observe(elm);}
}

const article = document.querySelector('.article');
const articleinfoblock = document.querySelectorAll('.article__info_block');
const articleinfoflex = document.querySelectorAll('.article__info_flex');
if(article){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let articleinfoblockopt = {threshold: [0.5]};
  let articleinfoblockserv = new IntersectionObserver(onEntry, articleinfoblockopt);
  for (let elm of articleinfoblock) {articleinfoblockserv.observe(elm);}
  [...articleinfoblock].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});

  let articleinfoflexopt = {threshold: [0.5]};
  let articleinfoflexserv = new IntersectionObserver(onEntry, articleinfoflexopt);
  for (let elm of articleinfoflex) {articleinfoflexserv.observe(elm);}
}

const briefingform = document.querySelector('.briefing__form');
const briefingforms = document.querySelectorAll('.briefing__form');
const briefingleft = document.querySelectorAll('.briefing__left');
if(briefingform){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let briefingformsopt = {threshold: [0.1]};
  let briefingformsserv = new IntersectionObserver(onEntry, briefingformsopt);
  for (let elm of briefingforms) {briefingformsserv.observe(elm);}

  let briefingleftopt = {threshold: [0.1]};
  let briefingleftserv = new IntersectionObserver(onEntry, briefingleftopt);
  for (let elm of briefingleft) {briefingleftserv.observe(elm);}
}

const certificates = document.querySelector('.certificates');
const certificatesblock = document.querySelectorAll('.certificates__block');
const certificatesflex = document.querySelectorAll('.certificates__flex');
if(certificates){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let certificatesblockopt = {threshold: [0.5]};
  let certificatesblockserv = new IntersectionObserver(onEntry, certificatesblockopt);
  for (let elm of certificatesblock) {certificatesblockserv.observe(elm);}

  let certificatesflexopt = {threshold: [0.5]};
  let certificatesflexserv = new IntersectionObserver(onEntry, certificatesflexopt);
  for (let elm of certificatesflex) {certificatesflexserv.observe(elm);}
}

const competencies = document.querySelector('.competencies');
const competenciesblock = document.querySelectorAll('.competencies__block');
const competenciesbottom = document.querySelectorAll('.competencies__bottom');
const competencieslist = document.querySelectorAll('.competencies__list');
if(competencies){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let competenciesblockopt = {threshold: [0.5]};
  let competenciesblockserv = new IntersectionObserver(onEntry, competenciesblockopt);
  for (let elm of competenciesblock) {competenciesblockserv.observe(elm);}

  let competenciesbottomopt = {threshold: [0.5]};
  let competenciesbottomserv = new IntersectionObserver(onEntry, competenciesbottomopt);
  for (let elm of competenciesbottom) {competenciesbottomserv.observe(elm);}

  [...competencieslist].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}

const policy = document.querySelector('.policy');
const policytopblock = document.querySelectorAll('.policy_top__block');
const policyblock = document.querySelectorAll('.policy__block');
if(policy){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let policytopblockopt = {threshold: [0.5]};
  let policytopblockserv = new IntersectionObserver(onEntry, policytopblockopt);
  for (let elm of policytopblock) {policytopblockserv.observe(elm);}

  let policyblockopt = {threshold: [0.3]};
  let policyblockserv = new IntersectionObserver(onEntry, policyblockopt);
  for (let elm of policyblock) {policyblockserv.observe(elm);}
}

const price = document.querySelector('.price');
const priceblock = document.querySelectorAll('.price__block');
const priceitem = document.querySelectorAll('.price__item');
if(price){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let priceblockopt = {threshold: [0.5]};
  let priceblockserv = new IntersectionObserver(onEntry, priceblockopt);
  for (let elm of priceblock) {priceblockserv.observe(elm);}

  let priceitemopt = {threshold: [0.3]};
  let priceitemserv = new IntersectionObserver(onEntry, priceitemopt);
  for (let elm of priceitem) {priceitemserv.observe(elm);}
}

const generationitem = document.querySelector('.generation__item');
const generationitems = document.querySelectorAll('.generation__item');
if(generationitem){
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};

  let generationitemsopt = {threshold: [0.5]};
  let generationitemsserv = new IntersectionObserver(onEntry, generationitemsopt);
  for (let elm of generationitems) {generationitemsserv.observe(elm);}
}

const footer = document.querySelector('.footer');
const footerlist = document.querySelectorAll('.footer__list');
const footerleft = document.querySelectorAll('.footer__left');
const footerrb = document.querySelectorAll('.footer__right_block');
const footerbottom = document.querySelectorAll('.footer__bottom');
const footerinfo = document.querySelectorAll('.footer__info');
if(footer){
  let footerd = document.querySelectorAll('.footer');
  function onEntry(entry) {entry.forEach(change => {if (change.isIntersecting) {change.target.classList.add('animate');}});};
  let footerdopt = {threshold: [0]};
  let footerdserv = new IntersectionObserver(onEntry, footerdopt);
  for (let elm of footerd) {footerdserv.observe(elm);}
  
  let footerlistopt = {threshold: [0.5]};
  let footerlistserv = new IntersectionObserver(onEntry, footerlistopt);
  for (let elm of footerlist) {footerlistserv.observe(elm);}
  
  [...footerlist].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
  let footerleftopt = {threshold: [0.5]};
  let footerleftserv = new IntersectionObserver(onEntry, footerleftopt);
  for (let elm of footerleft) {footerleftserv.observe(elm);}
  
  let footerrbopt = {threshold: [0.5]};
  let footerrbserv = new IntersectionObserver(onEntry, footerrbopt);
  for (let elm of footerrb) {footerrbserv.observe(elm);}
  
  let footerbottomopt = {threshold: [0.5]};
  let footerbottomserv = new IntersectionObserver(onEntry, footerbottomopt);
  for (let elm of footerbottom) {footerbottomserv.observe(elm);}
  
  let footerinfoopt = {threshold: [0.5]};
  let footerinfoserv = new IntersectionObserver(onEntry, footerinfoopt);
  for (let elm of footerinfo) {footerinfoserv.observe(elm);}
}
// end index animation