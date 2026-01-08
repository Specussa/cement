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

// start scroll
// scroll = new LocomotiveScroll({el: document.querySelector('[data-scroll-container]'),smooth:true,getDirection: true,scrollFromAnywhere: true,breakpoint: 0,lerp:0.05,mobile: {breakpoint: 0,smooth: true,inertia: 1,},tablet: {breakpoint: 0,smooth: true,inertia: 1,},smartphone: {breakpoint: 0,smooth: true,inertia: 1,}})
scroll = new LocomotiveScroll({el: document.querySelector('[data-scroll-container]'),smooth: true,getDirection: true,scrollFromAnywhere: true,breakpoint: 0,inertia: 0,tablet: {breakpoint: 0,smooth: false,inertia: 0,}})
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"));

const hn_scroll = document.querySelector('.header__nav_scroll');
const hc_scroll = document.querySelector('.header__consultation_scroll');
const cp_scroll = document.querySelector('.career_popup__scroll');
const fp_scroll = document.querySelector('.feedback_popup__scroll');
const gp_scroll = document.querySelector('.generation_popup__scroll');

Scrollbar.init(hn_scroll);
Scrollbar.init(hc_scroll);
if (cp_scroll) {Scrollbar.init(cp_scroll);}
if (fp_scroll) {Scrollbar.init(fp_scroll);}
if (gp_scroll) {Scrollbar.init(gp_scroll);}

const header = document.querySelector('.header');
const projecttop = document.querySelector('.project_top');
const projecttopinfo = document.querySelector('.project_top__info');

if(projecttop){
  if(
    projecttop.style.background !=  "rgb(255, 255, 255)" && 
    projecttop.style.background !=  "rgb(255, 251, 239)" && 
    projecttop.style.background !=  "rgb(233, 249, 249)" && 
    projecttop.style.background !=  "rgb(255, 248, 246)" && 
    projecttop.style.background !=  "rgb(248, 255, 255)" && 
    projecttop.style.background !=  "rgb(245, 245, 245)" && 
    projecttop.style.background !=  "rgb(255, 253, 248)" && 
    projecttop.style.background !=  "rgb(252, 252, 252)" && 
    projecttop.style.background !=  "rgb(236, 245, 235)" && 
    projecttop.style.background !=  "rgb(255, 248, 246)" && 
    projecttop.style.background !=  "rgb(254, 250, 243)" && 
    projecttop.style.background !=  "rgb(248, 248, 248)" && 
    projecttop.style.background !=  "rgb(210, 227, 240)" && 
    projecttop.style.background !=  "rgb(226, 240, 251)" && 
    projecttop.style.background !=  "rgb(252, 252, 252)" && 
    projecttop.style.background !=  "rgb(241, 240, 235)" && 
    projecttop.style.background !=  "" && 
    projecttop.style.background !=  "var(--bg)"){
    header.classList.add('header__transparent');
    header.classList.add('project_top__white');
    projecttopinfo.classList.add('project_top__white');
  } else if (projecttop && projecttop.style.background === "var(--bg)") {
    header.classList.add('project_top__bg');
    projecttopinfo.classList.add('project_top__bg');
  }
}

const showreelbutton = document.querySelector('.showreel__button');
const showreel = document.querySelector('.showreel');

scroll.on('scroll', (args) => {
  const headerprogress = document.querySelector('.header__progress_bar');
  if (document.querySelector('.has-scroll-smooth')) {
    var scrollY = Math.round(args["scroll"]["y"]);
    var scrollH = Math.round(args["limit"]["y"]);
    let scrollheader = Math.round((scrollY / scrollH) * 100);
    headerprogress.style.flexBasis = scrollheader + '%';
  } else {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let documentHeight = Math.max(
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    );
    let scrollpage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
    headerprogress.style.flexBasis = scrollpage + '%';
  }
  document.documentElement.setAttribute('scroll', `${Math.round(args["scroll"]["y"])}`);

  if(projecttop) {
    if(
      projecttop.style.background !=  "rgb(255, 255, 255)" && 
      projecttop.style.background !=  "rgb(255, 251, 239)" && 
      projecttop.style.background !=  "rgb(233, 249, 249)" && 
      projecttop.style.background !=  "rgb(255, 248, 246)" && 
      projecttop.style.background !=  "rgb(248, 255, 255)" && 
      projecttop.style.background !=  "rgb(245, 245, 245)" && 
      projecttop.style.background !=  "rgb(255, 253, 248)" && 
      projecttop.style.background !=  "rgb(252, 252, 252)" && 
      projecttop.style.background !=  "rgb(236, 245, 235)" && 
      projecttop.style.background !=  "rgb(255, 248, 246)" && 
      projecttop.style.background !=  "rgb(254, 250, 243)" && 
      projecttop.style.background !=  "rgb(248, 248, 248)" && 
      projecttop.style.background !=  "rgb(210, 227, 240)" && 
      projecttop.style.background !=  "rgb(226, 240, 251)" && 
      projecttop.style.background !=  "rgb(252, 252, 252)" && 
      projecttop.style.background !=  "rgb(241, 240, 235)" && 
      projecttop.style.background !=  "" && 
      projecttop.style.background !=  "var(--bg)"){
      if (Math.round(args["scroll"]["y"]) <= 50) {
        header.classList.add('header__transparent');
      } else {
        header.classList.remove('header__transparent');
      }
    }
  }
});
// end scroll

// start cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");
  const cursorBlock = cursor.querySelector(".cursor__block");
  const a = document.querySelectorAll('a');
  const button = document.querySelectorAll('button');
  const label = document.querySelectorAll('label');
  const hslanguageicon = document.querySelectorAll('.header__set_language_icon');
  const sinview = document.querySelectorAll('.showreel__inview');
  const cursorgrab = document.querySelectorAll('.c-scrollbar_thumb');
  const buttonnext = document.querySelectorAll('.swiper-button-next');
  const buttonprev = document.querySelectorAll('.swiper-button-prev');
  const sliders = document.querySelectorAll(".swiper-wrapper");

  document.addEventListener('mousemove', function(e){
    let ctx = e.clientX;
    let cty = e.clientY;
    if (ctx > (document.body.offsetWidth - 5) || cty > (document.body.offsetHeight - 5) || ctx < 5 || cty < 5) {
      cursor.classList.add('leave')
    } else {
      cursor.classList.remove('leave')
    }
  });
  
  function moveCursor(event) {
    var cursorX = event.clientX + "px";
    var cursorY = event.clientY + "px";
    cursor.style.transform = `translate3d(${cursorX}, ${cursorY}, 0)`;
  }

  document.onmousemove = (event) => {
    moveCursor(event);
    cursor.classList.remove("active");
  };

  document.onpointermove = (event) => {
    moveCursor(event);
    cursor.classList.remove("active");
  };

  document.addEventListener('mousedown', function(){
    cursor.classList.add('active')
  });

  document.addEventListener('mouseup', function(){
    cursor.classList.remove('active')
  });
  
  sinview.forEach(item => {
    item.onmouseenter = () => {
      cursor.classList.add("cursor__showreel");
    };
    item.onmouseleave = () => {
      cursor.classList.remove("cursor__showreel");
      cursorBlock.classList.remove("active");
    };
    item.onpointerdown = () => {
      cursorBlock.classList.add("active");
    }
    item.onpointerup = () => {
      cursorBlock.classList.remove("active");
    };
  })
  if (!document.querySelector(".price__swiper")) {
    sliders.forEach(item => {
      item.onmouseenter = () => {
        cursor.classList.add("cursor__slider");
      };
      item.onmouseleave = () => {
        cursor.classList.remove("cursor__slider");
        cursorBlock.classList.remove("active");
      };
      item.onpointerdown = () => {
        cursorBlock.classList.add("active");
      }
      item.onpointerup = () => {
        cursorBlock.classList.remove("active");
      };
    })
  }

  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  button.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  hslanguageicon.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  label.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  cursorgrab.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  buttonnext.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  buttonprev.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })
});
// end cursor

// start year
const year = document.querySelector('.footer__year');
if(!year){} else {
  const currentYear = new Date().getFullYear();
  year.insertAdjacentText('beforebegin', currentYear);
  year.remove();
}
// end year

// start navbar
const bodyoverlay = document.querySelector('.overlay');

const headerlinks = document.querySelector('.header__links');
const headerbuttons = document.querySelector('.header__buttons');

const menu = document.querySelector('.header__nav');
const burger = document.querySelector('.header__burger');

const menu_c = document.querySelector('.header__consultation');
const burger_c = document.querySelector('.button__project');
const contactssb = document.querySelector('.contacts__social_button');

const burger_ctwo = document.querySelector('.button__project_two');
const menuItemActive = document.getElementsByClassName("header__nav_item active");

// button header__burger
burger.addEventListener('click', function() {
  if (burger.classList.contains("active")) {
    bodyoverlay.classList.remove("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    if(menu_c){
      menu_c.classList.remove("active");
      burger_c.classList.remove("active");
    }
    for (var i = 0; i < menuItemActive.length; i++) {
      menuItemActive[i].children[1].style.maxHeight = null;
      menuItemActive[i].children[1].classList.remove("active");
      menuItemActive[i].classList.remove("active");
    }
    scroll.start();
  } else {
    bodyoverlay.classList.add("active");
    menu.classList.add("active");
    burger.classList.add("active");
    header.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    if(menu_c){
      menu_c.classList.remove("active");
      burger_c.classList.remove("active");
    }
    for (var i = 0; i < menuItemActive.length; i++) {
      menuItemActive[i].children[1].style.maxHeight = null;
      menuItemActive[i].children[1].classList.remove("active");
      menuItemActive[i].classList.remove("active");
    }
    header.classList.remove("hidden");
    headerlinks.classList.remove("hidden");
    headerbuttons.classList.remove("active");
    scroll.stop();
  }
})
// end header__burger

// button header__project
burger_c.addEventListener('click', function() {
  if (!burger_c.classList.contains("active")) {
    bodyoverlay.classList.add("active");
    menu_c.classList.add("active");
    burger_c.classList.add("active");
    header.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.add("hidden");
    headerlinks.classList.add("hidden");
    headerbuttons.classList.add("active");
    scroll.stop();
  }
})
if(document.querySelector('.new_project_banner')) {
  document.querySelector('.new_project_banner').addEventListener('click', function() {
    if (!burger_c.classList.contains("active")) {
      bodyoverlay.classList.add("active");
      menu_c.classList.add("active");
      burger_c.classList.add("active");
      header.classList.add("active");
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      menu.classList.remove("active");
      burger.classList.remove("active");
      header.classList.add("hidden");
      headerlinks.classList.add("hidden");
      headerbuttons.classList.add("active");
      scroll.stop();
    }
  })
}
if (contactssb) {
  contactssb.addEventListener('click', function() {
    if (!burger_c.classList.contains("active")) {
      bodyoverlay.classList.add("active");
      menu_c.classList.add("active");
      burger_c.classList.add("active");
      header.classList.add("active");
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      menu.classList.remove("active");
      burger.classList.remove("active");
      header.classList.add("hidden");
      headerlinks.classList.add("hidden");
      headerbuttons.classList.add("active");
      scroll.stop();
    }
  })
}
burger_ctwo.addEventListener('click', function() {
  if (!burger_c.classList.contains("active")) {
    bodyoverlay.classList.add("active");
    menu_c.classList.add("active");
    burger_c.classList.add("active");
    header.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    menu.classList.remove("active");
    burger.classList.remove("active");
    header.classList.add("hidden");
    headerlinks.classList.add("hidden");
    headerbuttons.classList.add("active");
    scroll.stop();
  }
})
// button закрыть для header__consultation
document.querySelector('.header__consultation_burger').addEventListener('click', function() {
  if (burger_c.classList.contains("active")) {
    bodyoverlay.classList.remove("active");
    menu_c.classList.remove("active");
    burger_c.classList.remove("active");
    header.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    header.classList.remove("hidden");
    headerlinks.classList.remove("hidden");
    headerbuttons.classList.remove("active");
    scroll.start();
  }
})
// end header__consultation

// start menu sublist
const subnav = document.querySelectorAll('.header__subnav_list');
[...subnav].forEach(function (li) {
  for (let [index, elem] of [...li.children].entries()){
    elem.style.setProperty('--inc-step', index+1);
  }
});

const nav = document.querySelectorAll('.header__nav_list');
[...nav].forEach(function (li) {
  for (let [index, elem] of [...li.children].entries()){
    elem.children[0].style.setProperty('--inc-step', index+1);
  }
});

  var hovermenu = document.querySelector('.header__nav_list');
  var elemHovermenu = false;
  hovermenu.addEventListener('mouseover', function(e) {
    if (document.documentElement.clientWidth > 1439) {
      var target = e.target.closest('.header__nav_item');
      if (elemHovermenu || !target) {return};
      elemHovermenu = target;
      var parent = target.closest('.header__nav_list');
      var old = parent.querySelector('.header__nav_item.active');
      if (old) {old.classList.remove('active')};
      target.classList.add('active');
    };
  })
  hovermenu.addEventListener('mouseout', function(e) {
    if (document.documentElement.clientWidth > 1439) {
      if(!elemHovermenu) return;
      elemHovermenu = null;
    };
  })

var hnl = document.getElementsByClassName("header__nav_link");
var i;
for (i = 0; i < hnl.length; i++) {
  hnl[i].onclick = function(e) {
    if (document.documentElement.clientWidth <= 1439) {
      if (!this.parentElement.classList.contains("active")) {
        var hsl = this.nextElementSibling;
        if (hsl) {
          e.preventDefault();
          var courseHsl = document.getElementsByClassName("header__subnav_list");
          var courseHniActive = document.getElementsByClassName("header__nav_item active");
  
          if (hsl.style.maxHeight) {
            hsl.style.maxHeight = null;
            this.parentElement.classList.remove("active");
            hsl.classList.remove("active");
          } else {
            for (var q = 0; q < courseHniActive.length; q++) {
              courseHniActive[q].classList.remove("active");
              courseHsl[q].classList.remove("active");
            }
            for (var p = 0; p < courseHsl.length; p++) {
              this.parentElement.classList.remove("active");
              courseHsl[p].classList.remove("active");
              courseHsl[p].style.maxHeight = null;
            }
            hsl.style.maxHeight = hsl.scrollHeight + "px";
            hsl.classList.add("active");
            this.parentElement.classList.add("active");
          }
        }
      }
    };
  };
}
// end menu sublist

// button career_popup
const careerpopup = document.querySelector('.career_popup');
if(careerpopup) {
  const careerbutton = document.getElementsByClassName("career_bottom__button");
  const careerpopupclose = document.querySelector('.career_popup__close');
  for (i = 0; i < careerbutton.length; i++) {
    careerbutton[i].onclick = function(e) {
      if (careerpopup.classList.contains("active")) {
        bodyoverlay.classList.remove("active");
        careerpopup.classList.remove("active");
        document.body.style.overflow = null;
        document.body.style.height = null;
        bodyoverlay.style.zIndex = null;
        scroll.start();
      } else {
        document.querySelector('.career_popup__vacancy').innerText = this.closest('.expertise__panel').previousElementSibling.children[0].children[0].children[0].children[0].innerText;
        bodyoverlay.classList.add("active");
        careerpopup.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        bodyoverlay.style.zIndex = "101";
        scroll.stop();
      }
    };
  }
  careerpopupclose.addEventListener('click', function() {
    bodyoverlay.classList.remove("active");
    careerpopup.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    bodyoverlay.style.zIndex = null;
    scroll.start();
  })
}
// end career_popup

// button feedback_popup
const feedbackpopup = document.querySelector('.feedback_popup');
if(feedbackpopup) {
  var feedbackbutton = document.getElementsByClassName("footer_popup__button");
  const feedbackpopupclose = document.querySelector('.feedback_popup__close');
  for (i = 0; i < feedbackbutton.length; i++) {
    feedbackbutton[i].onclick = function(e) {
      if (feedbackpopup.classList.contains("active")) {
        bodyoverlay.classList.remove("active");
        feedbackpopup.classList.remove("active");
        document.body.style.overflow = null;
        document.body.style.height = null;
        bodyoverlay.style.zIndex = null;
        scroll.start();
      } else {
        bodyoverlay.classList.add("active");
        feedbackpopup.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        bodyoverlay.style.zIndex = "101";
        scroll.stop();
      }
    };
  }
  feedbackpopupclose.addEventListener('click', function() {
    bodyoverlay.classList.remove("active");
    feedbackpopup.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    bodyoverlay.style.zIndex = null;
    scroll.start();
  })
}
// end feedback_popup

// button generation_popup
const generationpopup = document.querySelector('.generation_popup');
if(generationpopup) {
  const generationbutton = document.getElementsByClassName("generation_popup__button");
  const generationpopupclose = document.querySelector('.generation_popup__close');
  const generationlistclose = document.querySelector('.generation__list_close');
  for (i = 0; i < generationbutton.length; i++) {
    generationbutton[i].onclick = function(e) {
      if (generationpopup.classList.contains("active")) {
        bodyoverlay.classList.remove("active");
        generationpopup.classList.remove("active");
        document.body.style.overflow = null;
        document.body.style.height = null;
        bodyoverlay.style.zIndex = null;
        scroll.start();
      } else {
        document.getElementById('form__generation').classList.remove("hidden");
        document.getElementById('form__successfully_form__generation').classList.remove("active");
        document.querySelectorAll('#form__generation .success').forEach(n => n.classList.remove("success"));
        document.querySelectorAll('#form__generation .error').forEach(n => n.classList.remove("error"));
        document.querySelector('.generation_popup__head_add').innerText = this.closest('.generation__item').children[0].children[0].innerText;
        bodyoverlay.classList.add("active");
        generationpopup.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        bodyoverlay.style.zIndex = "101";
        scroll.stop();
      }
    };
  }
  generationpopupclose.addEventListener('click', function() {
    bodyoverlay.classList.remove("active");
    generationpopup.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    bodyoverlay.style.zIndex = null;
    scroll.start();
  })
  generationlistclose.addEventListener('click', function() {
    bodyoverlay.classList.remove("active");
    generationpopup.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    bodyoverlay.style.zIndex = null;
    scroll.start();
  })
  const fcitype = [...document.querySelectorAll('.form__checks_type .form__check_input')];
  const fcisum = [...document.querySelectorAll('.form__checks_sum .form__check_input')];
  const fchecktype = document.querySelectorAll('.form__checks_type .form__check');
  const fchecksum = document.querySelectorAll('.form__checks_sum .form__check');

  fcitype.forEach(input => input.addEventListener('input', function(event) {
    if (event.target.checked) {
      for(var i = 0;i < fchecktype.length; i++) {fchecktype[i].classList.remove('active');}
      event.target.closest('.form__check').classList.add('active');
    }
  }))

  fcisum.forEach(input => input.addEventListener('input', function(event) {
    if (event.target.checked) {
      for(var i = 0;i < fchecksum.length; i++) {fchecksum[i].classList.remove('active');}
      event.target.closest('.form__check').classList.add('active');
    }
  }))
}
// end generation_popup

// button overlay
bodyoverlay.addEventListener('click', function() {
  if (bodyoverlay.classList.contains("active")) {
    bodyoverlay.classList.remove("active");
    header.classList.remove("active");
    header.classList.remove("hidden");
    headerlinks.classList.remove("hidden");
    headerbuttons.classList.remove("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
    document.body.style.overflow = null;
    document.body.style.height = null;
    if(menu_c){
      menu_c.classList.remove("active");
      burger_c.classList.remove("active");
    }
    if(careerpopup){
      careerpopup.classList.remove("active");
      bodyoverlay.style.zIndex = null;
    }
    if(feedbackpopup){
      feedbackpopup.classList.remove("active");
      bodyoverlay.style.zIndex = null;
    }
    if(generationpopup){
      generationpopup.classList.remove("active");
      bodyoverlay.style.zIndex = null;
    }
    headerlinks.classList.remove("hidden");
    headerbuttons.classList.remove("active");
    scroll.start();
  }
})
// end overlay

// button language
const headerlangbutton = document.querySelector('.header__set_language_icon');
const headerlang = document.querySelector('.header__set_language_control');
headerlangbutton.addEventListener('click', function() {
  if (headerlang.classList.contains("active")) {
    headerlang.classList.remove("active");
    headerlangbutton.classList.add("active");
    headerlang.style.maxWidth = null;
  } else {
    headerlang.classList.add("active");
    headerlangbutton.classList.remove("active");
    headerlang.style.maxWidth = headerlang.scrollWidth + "px";
  }
})
// end language

// start text rotate
let textblock = document.querySelectorAll('.text');
if (document.documentElement.clientWidth >= 1023) {
  textblock.forEach(element => {
    let innerText = element.innerText;
    element.innerHTML = '';
    
    let textContainer = document.createElement('span');
    textContainer.classList.add('text__rotate');
    
    for (let letter of innerText) {
      let span = document.createElement('span');
      // span.innerText = letter.trim() === '' ? span.classList.add('text__space') : letter;
      // span.innerText = letter.trim() === '' ? '\x20': letter;
      span.innerText = letter.trim() === '' ? '\xa0': letter;
      textContainer.appendChild(span);
    }
    
    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
  });
  const textrotate = document.querySelectorAll('.text__rotate');
  [...textrotate].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}
// end text rotate

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

// Change color mode start
const toggleClrMode = document.querySelector('.header__set_mode');
const toggleClrModeBtnArr = document.querySelectorAll('.header__set_mode .header__set_mode_btn');
const toggleClrModeTxt = document.querySelector('.header__set_mode .header__set_mode_name');

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
	document.body.classList.add("dark");
  toggleClrMode.setAttribute('data-clr-mode-active', 'dark');
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('clrMode') === 'dark') {
  document.body.classList.add("dark");
  toggleClrMode.setAttribute('data-clr-mode-active', 'dark');
  toggleClrModeTxt.innerHTML = 'light on';
} else {
  document.body.classList.remove("dark");
  toggleClrMode.setAttribute('data-clr-mode-active', 'light');
  toggleClrModeTxt.innerHTML = 'dark on';
}

// Если меняются системные настройки, меняем тему
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
  const newColorScheme = event.matches ? "dark" : "light";

  if (newColorScheme === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("clrMode", "dark");
    toggleClrMode.setAttribute('data-clr-mode-active', 'dark');
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("clrMode", "light");
    toggleClrMode.setAttribute('data-clr-mode-active', 'light');
  }
});

// переключение темного/светлого режима
toggleClrModeBtnArr.forEach((btn) => {
  btn.addEventListener('click', function () {
    const clrModeAttr = this.getAttribute('data-clr-mode');
    const clrModeName = clrModeAttr === 'dark' ? 'light' : 'dark';

    toggleClrMode.setAttribute('data-clr-mode-active', clrModeAttr);
    toggleClrModeTxt.innerHTML = `${clrModeName} on`;
    localStorage.setItem("clrMode", clrModeAttr);
    document.body.classList.toggle("dark");
  });
});

// var hour = new Date().getHours();
// if (hour >= 5 && hour < 12) {
//   document.body.classList.remove("light");
//   document.body.classList.add("dark");
// } else if (hour >= 5 && hour < 12) {
//   document.body.classList.remove("dark");
//   document.body.classList.add("light");
// }
// Change color mode end

// start expertise
var expertisebutton = document.getElementsByClassName("expertise__button");
var i;

for (i = 0; i < expertisebutton.length; i++) {
  expertisebutton[i].onclick = function(e) {
    var expertise = this.nextElementSibling;
    var courseExpertise = document.getElementsByClassName("expertise__panel");
    var courseExpertiseActive = document.getElementsByClassName("expertise__button active");

    if (expertise.style.maxHeight) {
      expertise.style.maxHeight = null;
      this.classList.remove("active");
      expertise.classList.remove("active");
    } else {
      for (var q = 0; q < courseExpertiseActive.length; q++) {
        courseExpertiseActive[q].classList.remove("active");
        courseExpertise[q].classList.remove("active");
      }
      for (var p = 0; p < courseExpertise.length; p++) {
        this.classList.remove("active");
        courseExpertise[p].classList.remove("active");
        courseExpertise[p].style.maxHeight = null;
      }
      expertise.style.maxHeight = (expertise.scrollHeight + 40) + "px";
      expertise.classList.add("active");
      this.classList.add("active");
    }
  };
}
// end expertise

// start article__heading
var articleheading = document.getElementsByClassName("article__heading");
if (articleheading) {
  for (var i = 0; i < articleheading.length; i++) {
    articleheading[i].onclick = function(e) {
      for (var i = 0; i < articleheading.length; i++) {
        articleheading[i].classList.remove("active");
      }
      this.classList.add("active");
    }
  }
};
// end article__heading

// start articles
const articlesSlider = document.querySelector('.articles__swiper');
if(articlesSlider){
  var aboutusSlider = new Swiper('.articles__swiper', {
    loop: false,
    freeMode: true,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    loopedSlides: 4,
    spaceBetween: 10,
    speed: 1000,
    navigation: {
      nextEl: '.articles__next',
      prevEl: '.articles__prev',
    },
    breakpoints: {
      1919: {
        spaceBetween: 30,
      },
      1023: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    },
    breakpoints: {
      1920: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    },
  });
}
// end articles

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

// start project tab
const projecttabSlider = document.querySelector('.project_tab__swiper');
if(projecttabSlider){
  var ptabSlider = new Swiper('.project_tab__swiper', {
    loop: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    loopedSlides: 1,
    spaceBetween: 0,
    pagination: {
      el: '.project_tab__pagination',
      clickable: true,
    },
  });
}
// end project tab

// start project phone slider
const elsliderphone = document.querySelector('.project_phone');
if(elsliderphone) {
  const projectlists = document.querySelectorAll('.project_phone__list');
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll(".project_phone_item").length <= 1) {
      [...document.querySelectorAll('.project_phone__swiper')].map((n, i) => {
          n.querySelector('.project_phone__list').innerHTML = projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".project_phone_item").length <= 2) {
      [...document.querySelectorAll('.project_phone__swiper')].map((n, i) => {
          n.querySelector('.project_phone__list').innerHTML = projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".project_phone_item").length <= 4) {
      [...document.querySelectorAll('.project_phone__swiper')].map((n, i) => {
          n.querySelector('.project_phone__list').innerHTML = projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".project_phone_item").length <= 5) {
      [...document.querySelectorAll('.project_phone__swiper')].map((n, i) => {
          n.querySelector('.project_phone__list').innerHTML = projectlists[i].innerHTML + projectlists[i].innerHTML + projectlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".project_phone_item").length <= 10) {
      [...document.querySelectorAll('.project_phone__swiper')].map((n, i) => {
          n.querySelector('.project_phone__list').innerHTML = projectlists[i].innerHTML + projectlists[i].innerHTML
      })
    }
    var pphoneSlider = new Swiper(".project_phone__swiper", {
      loop: true,
      slidesPerView: 1.5,
      spaceBetween: 0,
      initialSlide: 2,
      centerSlides: true,
      centeredSlides : true,
      slideToClickedSlide: true,
      allowTouchMove: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : false,
      },
      breakpoints: {
        1025: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 3,
        },
        390: {
          slidesPerView: 2,
        },
      },
    });
  });
}
// end project phone slider

// start project desktop
const projectsSlider = document.querySelector('.projects__swiper');
if(projectsSlider){
  var pSlider = new Swiper('.projects__swiper', {
    loop: false,
    slideToClickedSlide: false,
    allowTouchMove: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    loopedSlides: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '.projects__next',
      prevEl: '.projects__prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
      },
    },
  });
}
// end project desktop

// start newteam slider
const elslidernewteam = document.querySelector('.newteam__slider');
if(elslidernewteam) {
  const sliderSelector = '.newteam__slider',
  options = {
    autoplay: false,
    init: false,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 0,
      slideShadows : false,
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    speed: 700,
    parallax: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.newteam__slider_next',
      prevEl: '.newteam__slider_prev',
    },
    on: {
      imagesReady: function(){
        this.el.classList.remove('loading');
      }
    }
  };
  const mySwiper = new Swiper(sliderSelector, options);
  mySwiper.init();
}
// end newteam slider

// start team
const teamswiperSlider = document.querySelector('.team_slider__swiper');
if(teamswiperSlider){
  const teamlists = document.querySelectorAll('.team_slider__list');
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelectorAll(".team_slider__item").length <= 1) {
      [...document.querySelectorAll('.team_slider__swiper')].map((n, i) => {
          n.querySelector('.team_slider__list').innerHTML = teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".team_slider__item").length <= 2) {
      [...document.querySelectorAll('.team_slider__swiper')].map((n, i) => {
          n.querySelector('.team_slider__list').innerHTML = teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".team_slider__item").length <= 4) {
      [...document.querySelectorAll('.team_slider__swiper')].map((n, i) => {
          n.querySelector('.team_slider__list').innerHTML = teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".team_slider__item").length <= 5) {
      [...document.querySelectorAll('.team_slider__swiper')].map((n, i) => {
          n.querySelector('.team_slider__list').innerHTML = teamlists[i].innerHTML + teamlists[i].innerHTML + teamlists[i].innerHTML
      })
    } else if (document.querySelectorAll(".team_slider__item").length <= 10) {
      [...document.querySelectorAll('.team_slider__swiper')].map((n, i) => {
          n.querySelector('.team_slider__list').innerHTML = teamlists[i].innerHTML + teamlists[i].innerHTML
      })
    }
    var teamSlider = new Swiper(".team_slider__swiper", {
      loop: true,
      slidesPerView: 1,
      loopedSlides: 4,
      spaceBetween: 0,
      loopPreventsSliding: true,
      effect: "coverflow",
      centeredSlides: true,
      slideToClickedSlide: false,
      allowTouchMove: true,
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      breakpoints: {
        1440: {
          slidesPerView: 3.5,
        },
        1024: {
          slidesPerView: 3,
        },
        390: {
          slidesPerView: 1.5,
        },
      },
    });
  });
}
// end team

// start team comments
const teamcommentsSlider = document.querySelector('.team_comments__swiper');
if(teamcommentsSlider){
  var tcSlider = new Swiper('.team_comments__swiper', {
    loop: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
    watchSlidesProgress: true,
    slidesPerView: 1,
    loopedSlides: 1,
    spaceBetween: 80,
    navigation: {
      nextEl: '.team_comments__next',
      prevEl: '.team_comments__prev',
    },
  });
}
// end team comments

// start project present
const projectpresentSlider = document.querySelector('.project_present__swiper');
if(projectpresentSlider){
  var ppresentSlider = new Swiper('.project_present__swiper', {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 2000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      580: {
        slidesPerView: 'auto',
      },
    },
  });
}
// end project present

// start video
const preview = document.querySelector('.showreel__button');
const showreelmodal = document.querySelector('.showreel__modal');
const showreelmodalClose = document.querySelector('.showreel__modal_close');
const showreelvideor = document.querySelector('.showreel__video_responsive');
window.onload = function(){
  if(showreelvideor){
    document.querySelector('.showreel__block').innerHTML = '<video poster="./local/templates/anyera.ru2023/img/main/showreel.webp " playsinline autoplay muted loop><source src="./local/templates/anyera.ru2023/img/main/IMG_1308.mov" type="video/mp4"></video>';
    showreelvideor.innerHTML = '<video id="showreel__video" poster="./local/templates/anyera.ru2023/img/main/showreel.webp " playsinline autoplay loop data-overlay="1" data-title="ANYERA"><source src="./local/templates/anyera.ru2023/img/main/IMG_1308.mov" type="video/mp4"></video>';
    setTimeout(function() {
      const showreelvideo = document.getElementById('showreel__video');
      if(showreelvideo){
        showreelvideo.pause();
        showreelvideo.currentTime = 0;
        preview.onclick = function(e) {
          e.preventDefault();
          showreelmodal.classList.add('showreel__modal_visible');
          document.querySelector('.spec__overlay').classList.add('is-playing');
          showreelvideo.play();
          document.body.style.overflow = "hidden";
          document.body.style.height = "100vh";
          var t;
          window.addEventListener('mousemove', () => {
            if (t) {
              showreelmodal.classList.remove('hide')
              clearTimeout(t)
              t = 0
            }
            t = setTimeout(() => showreelmodal.classList.add('hide'), 1500)
          });
          const progress = document.querySelector('.progress');
          const progressLine = document.querySelector('.progress__line');
          progress.addEventListener('mousemove', (e) => {
            progressLine.style.left = e.offsetX + 'px';
          });
        }
        showreelmodalClose.onclick = function() {
          document.querySelector('.spec__overlay').classList.remove('is-playing');
          showreelmodal.classList.remove('showreel__modal_visible');
          showreelvideo.pause();
          showreelvideo.currentTime = 0;
          document.body.style.overflow = null;
          document.body.style.height = null;
        }
      }
      (function () {
        // helpers
        var regExp = function regExp(name) {
            return new RegExp('(^| )' + name + '( |$)');
        };
        var forEach = function forEach(list, fn, scope) {
            for (var i = 0; i < list.length; i++) {
                fn.call(scope, list[i]);
            }
        };
        // class list object with basic methods
        function ClassList(element) {
            this.element = element;
        }
        ClassList.prototype = {
            add: function add() {
                forEach(arguments, function (name) {
                    if (!this.contains(name)) {
                        this.element.className += ' ' + name;
                    }
                }, this);
            },
            remove: function remove() {
                forEach(arguments, function (name) {
                    this.element.className = this.element.className.replace(regExp(name), '');
                }, this);
            },
            toggle: function toggle(name) {
                return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
            },
            contains: function contains(name) {
                return regExp(name).test(this.element.className);
            },
            // bonus..
            replace: function replace(oldName, newName) {
                this.remove(oldName), this.add(newName);
            }
        };
        // IE8/9, Safari
        if (!('classList' in Element.prototype)) {
            Object.defineProperty(Element.prototype, 'classList', {
                get: function get() {
                    return new ClassList(this);
                }
            });
        }
        // replace() support for others
        if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
            DOMTokenList.prototype.replace = ClassList.prototype.replace;
        }
      })();
      (function () {
        if (typeof NodeList.prototype.forEach === "function") return false;
        NodeList.prototype.forEach = Array.prototype.forEach;
      })();
      // Unfortunately, due to scattered support, browser sniffing is required
      function browserSniff() {
        var nVer = navigator.appVersion,
            nAgt = navigator.userAgent,
            browserName = navigator.appName,
            fullVersion = '' + parseFloat(navigator.appVersion),
            majorVersion = parseInt(navigator.appVersion, 10),
            nameOffset,
            verOffset,
            ix;
        // MSIE 11
        if (navigator.appVersion.indexOf("Windows NT") !== -1 && navigator.appVersion.indexOf("rv:11") !== -1) {
            browserName = "IE";
            fullVersion = "11;";
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
                browserName = "IE";
                fullVersion = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
                    browserName = "Chrome";
                    fullVersion = nAgt.substring(verOffset + 7);
                }
                // Safari
                else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
                        browserName = "Safari";
                        fullVersion = nAgt.substring(verOffset + 7);
                        if ((verOffset = nAgt.indexOf("Version")) !== -1) {
                            fullVersion = nAgt.substring(verOffset + 8);
                        }
                    }
                    // Firefox
                    else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
                            browserName = "Firefox";
                            fullVersion = nAgt.substring(verOffset + 8);
                        }
                        // In most other browsers, "name/version" is at the end of userAgent
                        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                                browserName = nAgt.substring(nameOffset, verOffset);
                                fullVersion = nAgt.substring(verOffset + 1);
                                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                                    browserName = navigator.appName;
                                }
                            }
        // Trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
        }
        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }
        return [browserName, majorVersion];
      }
      
      var obj = {};
      obj.browserInfo = browserSniff();
      obj.browserName = obj.browserInfo[0];
      obj.browserVersion = obj.browserInfo[1];
      
      wrapPlayers();
      var players = document.querySelectorAll('.spec__player');
      var iconPlay = '<i class="spec-play"></i>';
      var iconPause = '<i class="spec-pause"></i>';
      var iconVolumeMute = '<i class="spec-volume-mute"></i>';
      var iconVolumeMedium = '<i class="spec-volume-medium"></i>';
      var iconVolumeLow = '<i class="spec-volume-low"></i>';
      var iconExpand = '<i class="spec-expand"></i>';
      var iconCompress = '<i class="spec-compress"></i>';
      
      players.forEach(function (player) {
        var videos = player.querySelector('.showreel__video_responsive video');
        var skin = attachSkin(videos.dataset.spec);
        player.classList.add(skin);
        var overlay = videos.dataset.overlay;
        addOverlay(player, overlay);
        var title = showTitle(skin, videos.dataset.title);
        if (title) {
            player.insertAdjacentHTML('beforeend', title);
        }
        var html = buildControls(skin);
        player.insertAdjacentHTML('beforeend', html);
        var color = videos.dataset.color;
        addColor(player, color);
        var playerControls = player.querySelector('.' + skin + '__controls');
        var progress = player.querySelector('.progress');
        var progressBar = player.querySelector('.progress__filled');
        var toggle = player.querySelectorAll('.toggle');
        var volumeButton = player.querySelector('.volume');
        var fullScreenButton = player.querySelector('.fullscreen');
        if (obj.browserName === "IE" && (obj.browserVersion === 8 || obj.browserVersion === 9)) {
            showControls(videos);
            playerControls.style.display = "none";
        }
        videos.addEventListener('click', function () {
            togglePlay(this, player);
        });
        videos.addEventListener('play', function () {
            updateButton(this, toggle);
        });
        videos.addEventListener('pause', function () {
            updateButton(this, toggle);
        });
        videos.addEventListener('timeupdate', function () {
            handleProgress(this, progressBar);
        });
        toggle.forEach(function (button) {
            return button.addEventListener('click', function () {
                togglePlay(videos, player);
            });
        });
        volumeButton.addEventListener('click', function () {
            toggleVolume(videos, volumeButton);
        });
        var mousedown = false;
        progress.addEventListener('click', function (e) {
            scrub(e, videos, progress);
        });
        progress.addEventListener('mousemove', function (e) {
            return mousedown && scrub(e, videos, progress);
        });
        progress.addEventListener('mousedown', function () {
            return mousedown = true;
        });
        progress.addEventListener('mouseup', function () {
            return mousedown = false;
        });
        fullScreenButton.addEventListener('click', function (e) {
            return toggleFullScreen(player, fullScreenButton);
        });
        addListenerMulti(player, 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
            return onFullScreen(e, player);
        });
      });
      function showControls(videon) {
        videon.setAttribute("controls", "controls");
      }
      function togglePlay(videon, player) {
        var method = videon.paused ? 'play' : 'pause';
        videon[method]();
        videon.paused ? player.classList.remove('is-playing') : player.classList.add('is-playing');
      }
      function updateButton(videon, toggle) {
        var icon = videon.paused ? iconPlay : iconPause;
        toggle.forEach(function (button) {
            return button.innerHTML = icon;
        });
        const progress = document.querySelector('.progress');
        const progress__time = document.getElementById("progress__time");
        progress.addEventListener('mousemove', (e) => {
          var thours = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) / 60 / 60);
          var tminutes = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) / 60) - (thours * 60);
          var tseconds = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) % 60);
          progress__time.innerHTML = [tminutes,tseconds.toString().padStart(2, '0')].join(':');
        });
        var dhours = Math.floor(videon.duration / 60 / 60);
        var dminutes = Math.floor(videon.duration / 60) - (dhours * 60);
        var dseconds = Math.floor(videon.duration % 60);
        progress__duration.innerHTML = [dminutes,dseconds.toString().padStart(2, '0')].join(':');
      }
      function skip() {
        videon.currentTime += parseFloat(this.dataset.skip);
      }
      function toggleVolume(videon, volumeButton) {
        var level = videon.volume;
        var icon = iconVolumeMedium;
        if (level == 1) {
            level = 0;
            icon = iconVolumeMute;
        } else if (level == 0.5) {
            level = 1;
            icon = iconVolumeMedium;
        } else {
            level = 0.5;
            icon = iconVolumeLow;
        }
        videon['volume'] = level;
        volumeButton.innerHTML = icon;
      }
      function handleRangeUpdate() {
        videon[this.name] = this.value;
      }
      function handleProgress(videon, progressBar) {
        var percent = videon.currentTime / videon.duration * 100;
        progressBar.style.flexBasis = percent + '%';
        progress__duration = document.getElementById("progress__duration");
        progress__currenttime = document.getElementById("progress__currenttime");
        var chours = Math.floor(videon.currentTime / 60 / 60);
        var cminutes = Math.floor(videon.currentTime / 60) - (chours * 60);
        var cseconds = Math.floor(videon.currentTime % 60);
        progress__currenttime.innerHTML = [cminutes,cseconds.toString().padStart(2, '0')].join(':');
      }
      function scrub(e, videon, progress) {
        var scrubTime = e.offsetX / progress.offsetWidth * videon.duration;
        videon.currentTime = scrubTime;
      }
      function wrapPlayers() {
        var videol = document.querySelectorAll('.showreel__video_responsive video');
        videol.forEach(function (videon) {
            var wrapper = document.createElement('div');
            wrapper.classList.add('spec__player');
            videon.parentNode.insertBefore(wrapper, videon);
            wrapper.appendChild(videon);
        });
      }
      Number.prototype.lead0 = function(n) {
        var nz = "" + this;
        while (nz.length < n) {
            nz = "0" + nz;
        }
        return nz;
      };
      function buildControls(skin) {
        var html = [];
        html.push('<button class="' + skin + '__button--big toggle">' + iconPlay + '</button>');
        html.push('<div class="' + skin + '__border"></div>');
        html.push('<div class="' + skin + '__controls spec__controls">');
        html.push('<button class="' + skin + '__button toggle">' + iconPlay + '</button>', '<div class="progress">', '<div class="progress__filled"></div>', '<div class="progress__line"><p id="progress__time"></p></div>', '<p id="progress__duration"></p>', '<p id="progress__currenttime"></p>', '</div>', '<button class="' + skin + '__button volume">' + iconVolumeMedium + '</button>', '<button class="' + skin + '__button fullscreen" title="Full Screen">' + iconExpand + '</button>');
        html.push('</div>');
        return html.join('');
      }
      function attachSkin(skin) {
        if (typeof skin != 'undefined' && skin != '') {
            return skin;
        } else {
            return 'spec';
        }
      }
      function showTitle(skin, title) {
        if (typeof title != 'undefined' && title != '') {
            return '<div class="' + skin + '__title">' + title + '</div>';
        } else {
            return false;
        }
      }
      function addOverlay(player, overlay) {
        if (overlay == 1) {
            player.classList.add('spec__overlay');
        } else if (overlay == 2) {
            player.classList.add('spec__overlay--2');
        } else {
            return;
        }
      }
      function addColor(player, color) {
        if (typeof color != 'undefined' && color != '') {
            var buttons = player.querySelectorAll('button');
            var progress = player.querySelector('.progress__filled');
            progress.style.background = color;
            buttons.forEach(function (button) {
                return button.style.color = color;
            });
        }
      }
      function toggleFullScreen(player, fullScreenButton) {
        // let isFullscreen = false;
        if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            player.classList.add('spec__fullscreen');
      
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) {
                player.mozRequestFullScreen(); // Firefox
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen(); // Chrome and Safari
            } else if (player.msRequestFullscreen) {
                player.msRequestFullscreen();
            }
            isFullscreen = true;
      
            fullScreenButton.innerHTML = iconCompress;
        } else {
            player.classList.remove('spec__fullscreen');
      
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
            fullScreenButton.innerHTML = iconExpand;
        }
      }
      
      function onFullScreen(e, player) {
        var isFullscreenNow = document.webkitFullscreenElement !== null;
        if (!isFullscreenNow) {
            player.classList.remove('spec__fullscreen');
            player.querySelector('.fullscreen').innerHTML = iconExpand;
        } else {
            // player.querySelector('.fullscreen').innerHTML = iconExpand;
        }
      }
      
      function addListenerMulti(element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
      }
    }, 1);
  }
}
// end video

// start accordion projects__filter
const projectsfilters = document.querySelector('.projects__filter');
if(projectsfilters) {
  var projectsfilter = document.getElementsByClassName("projects__filter_button");
  for (i = 0; i < projectsfilter.length; i++) {
    projectsfilter[i].onclick = function(e) {
      var projectsfilterordion = this.nextElementSibling;
      var courseprojectsfilterordion = document.getElementsByClassName("projects__filter_sublist");
      var courseprojectsfilterordionActive = document.getElementsByClassName("projects__filter_button active");

      if (projectsfilterordion.style.maxHeight) {
        projectsfilterordion.style.maxHeight = null;
        this.classList.remove("active");
        projectsfilterordion.classList.remove("active");
      } else {
        for (var q = 0; q < courseprojectsfilterordionActive.length; q++) {
          courseprojectsfilterordionActive[q].classList.remove("active");
          courseprojectsfilterordion[q].classList.remove("active");
        }
        for (var p = 0; p < courseprojectsfilterordion.length; p++) {
          this.classList.remove("active");
          courseprojectsfilterordion[p].classList.remove("active");
          courseprojectsfilterordion[p].style.maxHeight = null;
        }
        projectsfilterordion.style.maxHeight = (projectsfilterordion.scrollHeight * 2) + "px";
        projectsfilterordion.classList.add("active");
        this.classList.add("active");
      }
      window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.projects__filter')) {
          for (var q = 0; q < courseprojectsfilterordionActive.length; q++) {
            courseprojectsfilterordionActive[q].classList.remove("active");
            courseprojectsfilterordion[q].classList.remove("active");
          }
          projectsfilterordion.style.maxHeight = null;
          this.classList.remove("active");
          projectsfilterordion.classList.remove("active");
        }
      })
    };
  }

  const pfc = [...document.querySelectorAll('.projects__filter_check')];
  const pfclear = document.querySelector('.projects__filter_clear');
  const pfla = document.querySelectorAll('.projects__filter_label');

  const onChecked = () => {
    if(document.querySelector('.projects__filter_label.active')) {
      pfclear.classList.add("active");
    } else {
      pfclear.classList.remove("active");
    }
  }

  pfc.forEach(input => input.addEventListener('input', function(event) {
    if (event.target.checked) {
      event.target.closest('.projects__filter_label').classList.add('active');
    } else {
      event.target.closest('.projects__filter_label').classList.remove('active');
    }
    onChecked()
  }))

  pfclear.addEventListener('click', function() {
    for(var i = 0;i < pfc.length; i++) {pfc[i].checked = false;};
    for(var i = 0;i < pfla.length; i++) {pfla[i].classList.remove('active');};
    pfclear.classList.remove("active");
  })

  const projectsfs = document.querySelectorAll('.projects__filter_sublist');
  [...projectsfs].forEach(function (li) {for (let [index, elem] of [...li.children].entries()){elem.style.setProperty('--inc-step', index+1);}});
}
// end accordion projects__filter

// start mask phone
const phone_input = document.querySelector('[data-phone-pattern]');
if (phone_input) {
  document.addEventListener("DOMContentLoaded", function () {
    var eventCalllback = function (e) {
      var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
      if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
          e.target.value = '';
          return;
        }
      }
      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
    }
    var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
      }
    }
  });
}
// end mask phone

// start autosize textarea
autosize(document.querySelectorAll('textarea'));
// end autosize textarea

// start price-list
const pricelist = document.querySelector("[price-list]");
if (pricelist) {
  const pricelists = document.querySelectorAll("[price-list]");
  document.addEventListener("DOMContentLoaded", () => {
    for (i = 0; i < pricelists.length; i++) {
      pricelists[i].textContent = pricelists[i].parentElement.parentElement.children[0].children[1].textContent - (pricelists[i].parentElement.parentElement.children[0].children[1].textContent / 100 * pricelists[i].previousElementSibling.textContent.replace(/\%/, ""));
    }
  });
  document.querySelectorAll('.price__sublist').forEach(n => {
    const priceswiper = new Swiper(n.querySelector('.price__swiper'), {
      slidesPerView: 1,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      breakpoints: {
        1024: {
          slidesPerView: 'auto',
        },
        768: {
          slidesPerView: 3,
        },
        580: {
          slidesPerView: 2,
        },
        390: {
          slidesPerView: 1,
        },
      },
    });
  });
}
// end price-list

// start digital__square
const digitalsquare = document.querySelector('#digital__square');
if (digitalsquare) {
  particlesJS("digital__square", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": ["#44959F", "#C7E3E7", "#4BA5B1", "#644BB1", "#5A449F", "#CFC7E7"]
      },
      "shape": {
        "type": "star",
        "stroke": {
          "width": 0,
          "color": "rgba(255, 255, 255, 0.3)"
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 5,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "top",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 3000,
          "rotateY": 1500
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}
// end digital__square

// start digital__square
const projecttopstar = document.querySelector('#project_top__star');
if (projecttopstar) {
  particlesJS("project_top__star", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": ["#44959F", "#C7E3E7", "#4BA5B1", "#644BB1", "#5A449F", "#CFC7E7"]
      },
      "shape": {
        "type": "star",
        "stroke": {
          "width": 0,
          "color": "rgba(255, 255, 255, 0.3)"
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 5,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "top",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 3000,
          "rotateY": 1500
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}
// end project_top__star

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