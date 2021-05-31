(()=>{"use strict";var t={33:(t,e,n)=>{n.r(e)},309:(t,e,n)=>{n.r(e)},76:(t,e,n)=>{n.r(e)},80:(t,e,n)=>{n.r(e)},528:(t,e,n)=>{n.r(e)},498:(t,e,n)=>{n.r(e)},580:(t,e,n)=>{n.r(e)},603:(t,e,n)=>{n.r(e)},387:(t,e,n)=>{n.r(e)},105:(t,e,n)=>{n.r(e)},752:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function a(t){try{l(i.next(t))}catch(t){o(t)}}function s(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}l((i=i.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0,n(33);var s=n(229),l=n(583),u=n(981),c=n(419),p=n(42),d=n(226),h=function(t){function e(){var e=t.call(this,"main",["main"])||this;return e.images=[],e.header=new c.HeaderMain,document.body.appendChild(e.element),e.aboutGame=new d.AboutGame,e.router=new p.Router({mode:"hash",root:"/"}),e.startApp(),window.location.hash||e.startAboutGame(),e}return r(e,t),e.prototype.startApp=function(){var t=this;this.router.add("//",(function(){return t.startAboutGame()})),this.router.add("/Game/",(function(){return t.startGame(0)})),this.router.checkAfterReloadPage()},e.prototype.startGame=function(t){return void 0===t&&(t=0),o(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return this.element.innerHTML="",this.timer=new u.Timer(this.element),this.game=new s.Game(this.element,this.timer),[4,this.GameCategory(t)];case 1:return e.sent(),document.body.appendChild(this.element),this.game.newGame(this.images),[2]}}))}))},e.prototype.GameCategory=function(t){return o(this,void 0,void 0,(function(){var e,n;return a(this,(function(i){switch(i.label){case 0:return[4,fetch("./images.json")];case 1:return[4,i.sent().json()];case 2:return e=i.sent(),n=e[t],this.images=n.images.map((function(t){return n.category+"/"+t})),[2]}}))}))},e.prototype.startAboutGame=function(){var t;this.element.innerHTML="",this.header=new c.HeaderMain,document.body.appendChild(this.element),this.aboutGame&&(null===(t=this.aboutGame)||void 0===t||t.showPage(this.element))},e}(l.BaseComponent);e.App=h},226:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.AboutGame=void 0;var o=n(583);n(309);var a=function(t){function e(){var e=t.call(this,"section",["about-game"])||this;return e.element.innerHTML='\n        <div class="about-game__block">\n        <div class="about-game__inner">\n          <div class="about-game__number">1</div>\n          <p class="about-game__text">Register new player in game</p>\n        </div>\n      </div>\n      <div class="about-game__image_1"></div>\n      <div class="about-game__block">\n        <div class="about-game__inner">\n          <div class="about-game__number">2</div>\n          <p class="about-game__text">Configure your game settings</p>\n        </div>\n      </div>\n\n      <div class="about-game__image_2"></div>\n\n      <div class="about-game__block">\n        <div class="about-game__inner">\n          <div class="about-game__number">3</div>\n          <p class="about-game__text">Start you new game! Remember card positions and match it before times up.</p>\n        </div>\n      </div>\n\n      <div class="about-game__image_3"></div> \n    ',e.makeTitle(),e}return r(e,t),e.prototype.makeTitle=function(){var t=document.createElement("h3");t.classList.add("about-game__title"),this.element.appendChild(t)},e.prototype.showPage=function(t){t.insertAdjacentElement("afterbegin",this.element)},e}(o.BaseComponent);e.AboutGame=a},583:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BaseComponent=void 0;e.BaseComponent=function(t,e){var n;void 0===t&&(t="div"),void 0===e&&(e=[]),this.element=document.createElement(t),(n=this.element.classList).add.apply(n,e)}},977:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Card=void 0,n(76);var o=function(t){function e(e){var n=t.call(this,"div",["card-container"])||this;return n.image=e,n.element.innerHTML='\n      <div class="card">\n        <div class="card__front"></div>\n        <div style="background-image: url(\'images/'+e+'\')" class="card__back"><div class="card__state"></div></div>\n      </div>\n    ',n}return r(e,t),e.prototype.flipToBack=function(){return this.flip(!0)},e.prototype.flipToTop=function(){return this.flip(!1)},e.prototype.showWrong=function(){this.element.classList.add("wrong")},e.prototype.showRight=function(){this.element.classList.add("right")},e.prototype.showClear=function(){this.element.classList.remove("wrong"),this.element.classList.remove("right")},e.prototype.flip=function(t){var e=this;return void 0===t&&(t=!1),new Promise((function(n){e.element.classList.toggle("flipped",!t),e.element.addEventListener("transitionend",(function(){return n()}),{once:!0})}))},e}(n(583).BaseComponent);e.Card=o},610:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.CardsField=void 0,n(80);var o=function(t){function e(){var e=t.call(this,"div",["cards-field"])||this;return e.cards=[],e}return r(e,t),e.prototype.clear=function(){this.cards=[],this.element.innerHTML=""},e.prototype.addCards=function(t){var e=this;this.cards=t,this.cards.forEach((function(t){e.element.appendChild(t.element)})),this.cards.forEach((function(t){t.flipToTop()})),setTimeout((function(){e.cards.forEach((function(t){t.flipToBack()}))}),7e3)},e}(n(583).BaseComponent);e.CardsField=o},229:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function a(t){try{l(i.next(t))}catch(t){o(t)}}function s(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}l((i=i.apply(t,e||[])).next())}))},r=this&&this.__generator||function(t,e){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var o=n(610),a=n(977),s=n(680),l=n(539),u=function(){function t(t,e,n){void 0===n&&(n=4),this.isAnimation=!1,this.matches=0,this.totalMatches=0,this.amountCard=4,this.cardsField=new o.CardsField,this.timer=e,t.appendChild(this.cardsField.element),this.rootElement=t}return t.prototype.newGame=function(t){return i(this,void 0,void 0,(function(){var e,n,i=this;return r(this,(function(r){return this.cardsField.clear(),e=t.sort((function(){return Math.random()-.5})).slice(0,2*this.amountCard),(n=e.concat(e).map((function(t){return new a.Card(t)})).sort((function(){return Math.random()-.5}))).forEach((function(t){t.element.addEventListener("click",(function(){i.cardHandler(t)}))})),this.cardsField.addCards(n),setTimeout((function(){return i.timer.startTimer()}),7e3),[2]}))}))},t.prototype.endGame=function(){var t=this.timer.stopTimer(),e={time:t||1,score:100*(this.matches-(this.matches-this.totalMatches))-10*t};new l.PopUpEndGame(e).showPopUp()},t.prototype.cardHandler=function(t){return i(this,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return this.matches++,this.isAnimation?[2]:(this.isAnimation=!0,[4,t.flipToTop()]);case 1:return e.sent(),this.activeCard?this.activeCard.image===t.image?[3,5]:[4,s.delay(200)]:(this.activeCard=t,this.isAnimation=!1,[2]);case 2:return e.sent(),this.activeCard.showWrong(),t.showWrong(),[4,s.delay(500)];case 3:return e.sent(),[4,Promise.all([this.activeCard.flipToBack(),t.flipToBack()])];case 4:return e.sent(),this.activeCard.showClear(),t.showClear(),[3,8];case 5:return this.totalMatches++,[4,s.delay(200)];case 6:return e.sent(),this.activeCard.showRight(),t.showRight(),[4,s.delay(500)];case 7:e.sent(),this.activeCard.showClear(),t.showClear(),this.totalMatches===2*this.amountCard&&this.endGame(),e.label=8;case 8:return this.activeCard=void 0,this.isAnimation=!1,[2]}}))}))},t}();e.Game=u},419:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HeaderMain=void 0;var i=n(366),r=function(){function t(){this.header=new i.Header,this.showHeader()}return t.prototype.showHeader=function(){document.body.appendChild(this.header.element)},t.prototype.HeaderLogin=function(){this.header.HeaderLogin()},t.prototype.HeaderLogOut=function(){this.header.HeaderLogOut()},t}();e.HeaderMain=r},366:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Header=void 0;var o=n(583),a=n(942);n(528);var s=function(t){function e(){var e=t.call(this,"header",["header"])||this;return e.isLogin=!1,e.makeHeader(),e.popUpRegister=new a.PopUpRegister(e),e.isLogin&&e.HeaderLogin(),"#Game"===window.location.hash&&(window.location.hash=""),e}return r(e,t),e.prototype.makeHeader=function(){var t,e=this;this.element.innerHTML='\n    <div class="header__wrapper">\n    <div class="header__logo"></div>\n    <nav class="header__nav">\n      <ul>\n        <li class="header__link nav__link_active" id="aboutGame"><a href="#">About Game</a></li>\n        <li class="header__link" id="bestScore"><a href="#BestScore">Best Score</a></li>\n        <li class="header__link" id="GameSettings"><a href="#GameSettings">Game Settings</a></li>\n      </ul>\n    </nav>\n    <div class="header__state"> \n      <div class="header__state_logOut">register new player</div>\n    </div>\n  </div>\n  ',null===(t=this.element.querySelector(".header__state_logOut"))||void 0===t||t.addEventListener("click",(function(){return e.openPopUpRegister()}))},e.prototype.HeaderLogin=function(){var t=this.element.querySelector(".header__state");t&&(t.innerHTML='\n      <div class="header__state_start"><a href="#Game">Start game</a></div>\n      <div class="header__state_avatar"></div>\n      ',t.classList.toggle("header__state_logIn"),this.isLogin=!0)},e.prototype.openPopUpRegister=function(){this.popUpRegister.showPopUp(this.element)},e.prototype.HeaderLogOut=function(){var t,e=this,n=document.querySelector(".header__state");n&&(n.innerHTML='\n      <div class="header__state_logOut">register new player</div>\n      ',n.classList.toggle("header__state_logIn"),null===(t=this.element.querySelector(".header__state_logOut"))||void 0===t||t.addEventListener("click",(function(){return e.openPopUpRegister()})),this.isLogin=!1)},e}(o.BaseComponent);e.Header=s},539:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.PopUpEndGame=void 0;var o=n(765);n(105);var a=function(t){function e(e){var n=t.call(this)||this;n.gameResult=e;var i=Math.floor(e.time/60),r=e.time-60*i;return n.element.firstElementChild&&(n.element.firstElementChild.innerHTML='\n        <div class="end-game__popUp__wrapper">\n          <p>Congrats! You found all matches on '+i+":"+r+"</p>\n          <p>Your score: "+e.score+'</p>\n          <div class="popUp__ok">OK</div>\n        </div>\n    '),n}return r(e,t),e.prototype.showPopUp=function(){var t,e=this;setTimeout((function(){return e.element.classList.remove("popUp_delay")}),0),document.body.appendChild(this.element),null===(t=document.querySelector(".popUp__ok"))||void 0===t||t.addEventListener("click",(function(t){e.closePopUp(t,!0)}))},e}(o.PopUp);e.PopUpEndGame=a},942:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.PopUpRegister=void 0;var o=n(765);n(498);var a=function(t){function e(e){var n,i,r,o=t.call(this)||this;return o.header=e,o.element.firstElementChild&&(o.element.firstElementChild.innerHTML='\n      <div class="popUp__wrapper">\n        <h2 class=\'form-register__title\'>Register new Player</h2>\n        <form id="formRegister" class="form-register">\n          <div class="form-register__input_wrapper">\n            <label class="label">\n              <input required minlength = "3" maxlength = "30" type=\'text\' pattern="[A-Za-zА-Яа-яЁё0-9]{3,30}" placeholder="Name" autocomplete="off" id="inputFirstName">\n            </label>\n\n            <label class="label">\n              <input required minlength = "3" maxlength = "30" type=\'text\' pattern="[A-Za-zА-Яа-яЁё0-9]{3,30}" placeholder="Last name" autocomplete="off" id=\'inputLastName\'>\n            </label>\n\n            <label class="label">\n              <input required type=\'email\' placeholder="Email" id=\'inputEmail\'>\n            </label>\n          </div>\n          <input type=\'file\' id=\'inputAvatar\'>\n          <div class="form-register__btnWrapper">\n            <button id=\'buttonAdd\'>Register</button>\n            <div id=\'buttonCancel\'>Cancel</div>\n          </div>\n        </form>\n      </div>\n    '),o.inputAvatar=o.element.querySelector("#inputAvatar"),o.formRegister=o.element.querySelector("#formRegister"),o.inputAvatar&&o.inputAvatar.addEventListener("change",(function(t){return o.changeAvatar.call(o,t)})),o.formRegister&&o.formRegister.addEventListener("submit",(function(t){return o.formRegisterSubmit(t)})),o.inputAvatar=o.element.querySelector("#inputAvatar"),o.formRegister=o.element.querySelector("#formRegister"),o.inputFirstName=null===(n=o.formRegister)||void 0===n?void 0:n.querySelector("#inputFirstName"),o.inputLastName=null===(i=o.formRegister)||void 0===i?void 0:i.querySelector("#inputLastName"),o.inputEmail=null===(r=o.formRegister)||void 0===r?void 0:r.querySelector("#inputEmail"),o.inputFirstName.addEventListener("input",(function(){return o.isValidFirstName()})),o.inputLastName.addEventListener("input",(function(){return o.isValidLastName()})),o.inputEmail.addEventListener("input",(function(){return o.isValidEmail()})),o.inputAvatar&&o.inputAvatar.addEventListener("change",(function(t){return o.changeAvatar.call(o,t)})),o.formRegister&&o.formRegister.addEventListener("submit",(function(t){return o.formRegisterSubmit(t)})),o}return r(e,t),e.prototype.showPopUp=function(t){var e,n=this;document.body.appendChild(this.element),setTimeout((function(){return n.element.classList.remove("popUp_delay")}),0),null===(e=null===document||void 0===document?void 0:document.querySelector("#buttonCancel"))||void 0===e||e.addEventListener("click",(function(t){n.resetValidateClass(),n.formRegister&&n.formRegister.reset(),n.closePopUp(t,!0)}))},e.prototype.changeAvatar=function(t){var e=this,n=t.target.files,i=this.inputAvatar;if(n){var r=new FileReader;r.readAsDataURL(n[0]),r.onloadend=function(){i&&(e.currentAvatarBase64=r.result,i.style.backgroundImage="url("+r.result+")")}}},e.prototype.formRegisterSubmit=function(t){t.preventDefault(),this.closePopUp(t,!0),this.header.HeaderLogin()},e.prototype.isValidLastName=function(){var t;if(this.inputLastName){if(this.inputLastName.checkValidity(),!this.inputLastName.value)return this.inputLastName.setCustomValidity("Это поле не может быть пустым"),this.inputLastName.parentElement&&this.addInvalidClass(this.inputLastName.parentElement),void this.inputLastName.reportValidity();if(!Number.isNaN(parseInt(this.inputLastName.value)))return this.inputLastName.setCustomValidity("Фамилия не может начинаться с цифры"),this.inputLastName.parentElement&&this.addInvalidClass(this.inputLastName.parentElement),void this.inputLastName.reportValidity();if(null===(t=this.inputLastName)||void 0===t?void 0:t.validity.tooShort)return this.inputLastName.setCustomValidity("Фамилия должна быть длиной более 3х символов"),this.inputLastName.parentElement&&this.addInvalidClass(this.inputLastName.parentElement),void this.inputLastName.reportValidity();if(this.inputLastName.validity.patternMismatch)return this.inputLastName.setCustomValidity("Фамилия должна содержать только символы русского/латинского алфавитов и цифры"),this.inputLastName.parentElement&&this.addInvalidClass(this.inputLastName.parentElement),void this.inputLastName.reportValidity();this.inputLastName.setCustomValidity(""),this.inputLastName.parentElement&&this.addValidClass(this.inputLastName.parentElement)}},e.prototype.isValidEmail=function(){this.inputEmail&&(this.inputEmail.validity.valid?this.inputEmail.parentElement&&this.addValidClass(this.inputEmail.parentElement):(this.inputEmail.parentElement&&this.addInvalidClass(this.inputEmail.parentElement),this.inputEmail.reportValidity()))},e.prototype.isValidFirstName=function(){var t;if(this.inputFirstName){if(this.inputFirstName.checkValidity(),!this.inputFirstName.value)return this.inputFirstName.setCustomValidity("Это поле не может быть пустым"),this.inputFirstName.parentElement&&this.addInvalidClass(this.inputFirstName.parentElement),void this.inputFirstName.reportValidity();if(!Number.isNaN(parseInt(this.inputFirstName.value)))return this.inputFirstName.setCustomValidity("Имя не может начинаться с цифры"),this.inputFirstName.parentElement&&this.addInvalidClass(this.inputFirstName.parentElement),void this.inputFirstName.reportValidity();if(null===(t=this.inputFirstName)||void 0===t?void 0:t.validity.tooShort)return this.inputFirstName.setCustomValidity("Имя должно быть длиной более 3х символов"),this.inputFirstName.parentElement&&this.addInvalidClass(this.inputFirstName.parentElement),void this.inputFirstName.reportValidity();if(this.inputFirstName.validity.patternMismatch)return this.inputFirstName.setCustomValidity("Имя должно содержать только символы русского/латинского алфавитов и цифры"),this.inputFirstName.parentElement&&this.addInvalidClass(this.inputFirstName.parentElement),void this.inputFirstName.reportValidity();this.inputFirstName.setCustomValidity(""),this.inputFirstName.parentElement&&this.addValidClass(this.inputFirstName.parentElement)}},e.prototype.addInvalidClass=function(t){t.classList.remove("label_valid"),t.classList.add("label_invalid")},e.prototype.addValidClass=function(t){t.classList.add("label_valid"),t.classList.remove("label_invalid")},e.prototype.resetValidateClass=function(){var t,e,n,i,r,o,a,s,l,u,c,p;null===(e=null===(t=this.inputFirstName)||void 0===t?void 0:t.parentElement)||void 0===e||e.classList.remove("label_valid"),null===(i=null===(n=this.inputLastName)||void 0===n?void 0:n.parentElement)||void 0===i||i.classList.remove("label_valid"),null===(o=null===(r=this.inputEmail)||void 0===r?void 0:r.parentElement)||void 0===o||o.classList.remove("label_valid"),null===(s=null===(a=this.inputFirstName)||void 0===a?void 0:a.parentElement)||void 0===s||s.classList.remove("label_invalid"),null===(u=null===(l=this.inputLastName)||void 0===l?void 0:l.parentElement)||void 0===u||u.classList.remove("label_invalid"),null===(p=null===(c=this.inputEmail)||void 0===c?void 0:c.parentElement)||void 0===p||p.classList.remove("label_invalid")},e}(o.PopUp);e.PopUpRegister=a},42:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Router=void 0;var n=function(){function t(t){var e=this;this.routes=[],this.mode=null,this.root="/",this.current="",this.add=function(t,n){return e.routes.push({path:t,cb:n}),e},this.remove=function(t){for(var n=0;n<e.routes.length;n+=1)if(e.routes[n].path===t)return e.routes.slice(n,1),e;return e},this.flush=function(){return e.routes=[],e},this.clearSlashes=function(t){return t.toString().replace(/\/$/,"").replace(/^\//,"")},this.getFragment=function(){var t,n=window.location.hash.match(/#(.*)$/);return t=n?n[1]:"",e.clearSlashes(t)},this.navigate=function(t){return void 0===t&&(t=""),window.location.href=window.location.href.replace(/#(.*)$/,"")+"#"+t,e},this.checkAfterReloadPage=function(){e.interval()},this.mode="hash",t.mode&&(this.mode=t.mode),t.root&&(this.root=t.root),window.addEventListener("hashchange",this.interval.bind(this),!1)}return t.prototype.interval=function(){var t=this;if(this.current!==this.getFragment()){this.current=this.getFragment();var e=this.current;this.routes.forEach((function(n){var i;return e===t.clearSlashes(n.path)&&((null===(i=document.body.firstElementChild)||void 0===i?void 0:i.nextElementSibling)&&(document.body.firstElementChild.nextElementSibling.innerHTML=""),n.cb()),!1}))}},t}();e.Router=n},981:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Timer=void 0;var o=n(583);n(580);var a=function(t){function e(e){var n=t.call(this,"div",["timer"])||this;return n.minutes=0,n.seconds=0,n.amountTick=0,n.runTimer=!0,n.element.innerHTML='\n      <div class="timer__inner">00:00</div>\n    ',e.appendChild(n.element),n.runTimer=!0,n.amountTick=0,n}return r(e,t),e.prototype.startTimer=function(){var t=this;this.runTimer&&(this.timeOutFunc=setInterval((function(){return t.updateValue()}),1e3))},e.prototype.stopTimer=function(){return this.runTimer=!1,this.timeOutFunc&&clearTimeout(this.timeOutFunc),this.element.firstElementChild&&(this.element.firstElementChild.textContent="00:00"),this.amountTick},e.prototype.updateValue=function(){this.amountTick++,this.minutes=Math.floor(this.amountTick/60),this.seconds=this.amountTick-60*this.minutes,this.element.firstElementChild&&(this.minutes<10&&this.seconds<10?this.element.firstElementChild.textContent="0"+this.minutes+":0"+this.seconds:this.minutes<10?this.element.firstElementChild.textContent="0"+this.minutes+":"+this.seconds:this.seconds<10?this.element.firstElementChild.textContent=this.minutes+":0"+this.seconds:this.element.firstElementChild.textContent=this.minutes+":"+this.seconds)},e}(o.BaseComponent);e.Timer=a},680:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.delay=void 0,e.delay=function(t){return new Promise((function(e){setTimeout(e,t)}))}},765:function(t,e,n){var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(r,o){function a(t){try{l(i.next(t))}catch(t){o(t)}}function s(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}l((i=i.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.PopUp=void 0;var s=n(583);n(603);var l=function(t){function e(){var e=t.call(this,"div",["popUp","popUp_delay"])||this,n=document.createElement("div");return n.classList.add("popUp__body"),e.element.appendChild(n),e.element.addEventListener("click",(function(t){return e.closePopUp(t)})),e}return r(e,t),e.prototype.closePopUp=function(t,e){return void 0===e&&(e=!1),o(this,void 0,void 0,(function(){return a(this,(function(n){switch(n.label){case 0:return e?[4,this.removePopUp()]:[3,2];case 1:return n.sent(),[2];case 2:return t.target.closest(".popUp__body")?[3,4]:[4,this.removePopUp()];case 3:n.sent(),n.label=4;case 4:return[2]}}))}))},e.prototype.removePopUp=function(){var t=this;return new Promise((function(e){var n,i;t.element.removeEventListener("click",(function(e){return t.closePopUp(e)})),null===(n=document.querySelector(".popUp"))||void 0===n||n.classList.add("popUp_delay"),null===(i=document.querySelector(".popUp"))||void 0===i||i.addEventListener("transitionend",e)}))},e}(s.BaseComponent);e.PopUp=l}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,n),o.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{n(387);var t=n(752);window.onload=function(){new t.App}})()})();