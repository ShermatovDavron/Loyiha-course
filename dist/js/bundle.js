/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/class.js":
/*!*********************************!*\
  !*** ./src/js/modules/class.js ***!
  \*********************************/
/***/ ((module) => {

function clas(){
      // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.classes = classes
      this.parent = document.querySelector(parentSelector)
      this.transfer = 11000
      this.chageToUZS()
    }

    chageToUZS() {
      this.price = this.price * this.transfer
    }

    render() {
      const element = document.createElement('div')

      if (this.classes.length === 0) {
        this.element = 'menu__item'
        element.classList.add(this.element)
      } else {
        this.classes.forEach((classname) => element.classList.add(classname))
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      `

      this.parent.append(element)
    }
  }

  new MenuCard(
    'img/tabs/1.png',
    'usual',
    'Plan "Usual"',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    10,
    '.menu .container'
  ).render()

  new MenuCard(
    'img/tabs/2.jpg',
    'plan',
    'Plan “Premium”',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    20,
    '.menu .container',
    'menu__item'
  ).render()

  new MenuCard(
    'img/tabs/3.jpg',
    'vip',
    'Plan VIP',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    30,
    '.menu .container',
    'menu__item'
  ).render()
}

module.exports = clas

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((module) => {

function form(){
    //Form

  const forms =document.querySelectorAll('form')

  forms.forEach((form)=>{
    postData(form)
  })

  const msg = {
    loading: "Loading...",
    success:"thank's for submitting for info",
    failure:'Something went wrong'
  }

  function postData(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.textContent = msg.loading
      form.append(statusMessage)

      const request = new XMLHttpRequest
      request.open('Post', 'server.php')
      // request.setRequestHeader('content-Type', 'multipart/form-data')
      const formData = new FormData(form)
      request.send(formData)

      request.addEventListener('load', ()=>{
        if(request.status ===200){
          console.log(request.response)
          statusMessage.textContent = msg.success
          form.reset()
          setTimeout(()=>{
            statusMessage.remove()
          }, 2000)
        }
        else{
          statusMessage.textContent= msg.failure
        }
      })
    })
  }
  fetch('db.json')
  .then((data)=>data.json())
  .then((res)=>console.log(res))
}

module.exports = form

/***/ }),

/***/ "./src/js/modules/loader.js":
/*!**********************************!*\
  !*** ./src/js/modules/loader.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function loader(){
    loader = document.querySelector('.loader')

  // Loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }, 2000)
}

module.export = loader

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

function modal(){
    // Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal'),
modalCloseBtn = document.querySelector('[data-close]')

function closeModal() {
modal.classList.add('hide')
modal.classList.remove('show')
document.body.style.overflow = ''
}

function openModal() {
modal.classList.add('show')
modal.classList.remove('hide')
document.body.style.overflow = 'hidden'
clearInterval(modalTimerId)
}

modalTrigger.forEach((item) => {
item.addEventListener('click', openModal)
})

modalCloseBtn.addEventListener('click', closeModal)

modal.addEventListener('click', (e) => {
if (e.target == modal) {
  closeModal()
}
})

document.addEventListener('keydown', (e) => {
if (e.code === 'Escape' && modal.classList.contains('show')) {
  closeModal()
}
})

const modalTimerId = setTimeout(openModal, 50000)

function showModalByScroll() {
if (
  window.pageYOffset + document.documentElement.clientHeight >=
  document.documentElement.scrollHeight
) {
  openModal()
  window.removeEventListener('scroll', showModalByScroll)
}
}

window.addEventListener('scroll', showModalByScroll)
}

module.exports = modal

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs(){
    // Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent')
    
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide')
      item.classList.remove('show', 'fade')
    })

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent()
          showTabContent(idx)
        }
      })
    }
  })

}

module.exports = tabs

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

 function timer(){
  // Timer

 const deadline = '2022-08-11'

 function getTimeRemaining(endtime) {
   let days, hours, minutes, seconds
   const timer = Date.parse(endtime) - Date.parse(new Date())

   if (timer <= 0) {
     days = 0
     hours = 0
     minutes = 0
     seconds = 0
   } else {
     days = Math.floor(timer / (1000 * 60 * 60 * 24))
     hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
     minutes = Math.floor((timer / 1000 / 60) % 60)
     seconds = Math.floor((timer / 1000) % 60)
   }

   return { timer, days, hours, minutes, seconds }
 }

 function getZero(num) {
   if (num >= 0 && num < 10) {
     return `0${num}`
   } else {
     return num
   }
 }
 function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updatClock, 1000)

    updatClock()

    function updatClock() {
      const t = getTimeRemaining(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.timer <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock('.timer', deadline)

 }
 module.exports = timer

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
window.addEventListener('DOMContentLoaded', () => {

const clas = __webpack_require__(/*! ./modules/class */ "./src/js/modules/class.js")
const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js")
const form = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js")
const loader = __webpack_require__(/*! ./modules/loader */ "./src/js/modules/loader.js")
const modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js")
const timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js")
 
  clas()
  tabs()
  form()
  // loader()
  modal()
  timer()
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map