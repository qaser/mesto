(()=>{"use strict";var e=document.querySelector("#form-place"),t=document.querySelector("#form-profile"),n=document.querySelector("#user-name"),r=document.querySelector("#user-occupation"),o=document.querySelector(".profile__button-avatar"),i=document.querySelector(".intro__edit-button"),a=document.querySelector(".profile__button");function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}t.querySelector(".form__button"),e.querySelector(".form__button");var s=function(){function e(t,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._api=t,this._link=r.link,this._name=r.name,this._cardId=r._id,this._likes=r.likes,this._myId=n,this._ownerId=r.owner._id,this._cardSelector=a,this._handleCardClick=o,this._handleCardBasketClick=i}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".places__item").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".places__image").addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._elementBasket.addEventListener("click",(function(t){e._handleCardBasketClick(t,e._cardId,e._element)})),this._elementFavor.addEventListener("click",(function(t){e._handleFavoriteCard(t)}))}},{key:"_handleFavoriteCard",value:function(){var e=this;this._elementFavor.classList.contains("places__like_active")?this._api.dislikeCard(this._cardId).then((function(t){e._elementLikes.textContent=t.likes.length,e._elementFavor.classList.remove("places__like_active")})):this._api.likeCard(this._cardId).then((function(t){e._elementLikes.textContent=t.likes.length,e._elementFavor.classList.add("places__like_active")}))}},{key:"_checkMyLike",value:function(){var e=this;this._likes.forEach((function(t){t._id===e._myId&&e._elementFavor.classList.add("places__like_active")}))}},{key:"_checkCardOwner",value:function(){this._ownerId===this._myId&&this._elementBasket.classList.add("places__basket_active")}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".places__image"),this._elementFavor=this._element.querySelector(".places__like"),this._elementBasket=this._element.querySelector(".places__basket"),this._elementName=this._element.querySelector(".places__name"),this._elementLikes=this._element.querySelector(".places__like-count"),this._elementImage.src=this._link,this._elementImage.alt=this._name,this._elementLikes.textContent=this._likes.length,this._elementName.textContent=this._name,this._setEventListeners(),this._checkMyLike(),this._checkCardOwner(),this._element}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(t.name),this._occupation=document.querySelector(t.occupation),this._avatar=document.querySelector(t.avatar),this._userId="",this._userData={}}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userData.name=this._name.textContent,this._userData.occupation=this._occupation.textContent,this._userData}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._occupation.textContent=e.about,this._avatar.src=e.avatar,this._userId=e._Id}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"getMyProfile",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"editMyProfile",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.occupation})}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"addNewCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"likeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"dislikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"changeAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}},{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".popup__button-close"),this._handleEscapeClose=this._handleEscapeClose.bind(this),this._handleOverlayClose=this._handleOverlayClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscapeClose),document.addEventListener("click",this._handleOverlayClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscapeClose),document.removeEventListener("click",this._handleOverlayClose)}},{key:"_handleEscapeClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===this._popup&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){e.close()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function b(e,t){return b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},b(e,t)}function k(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._form=r._popup.querySelector(t),r._submitConfirmForm=n,r._submitButton=r._form.querySelector(".form__button"),r}return t=a,(n=[{key:"open",value:function(e,t){this._cardId=e,this._element=t,m(g(a.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;m(g(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitConfirmForm(e._cardId,e._element)}))}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=O(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},C.apply(this,arguments)}function O(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function L(e,t){return L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},L(e,t)}function j(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popup.querySelector(".popup__image"),t._imageTitle=t._popup.querySelector(".popup__image-title"),t}return t=a,(n=[{key:"open",value:function(e,t){this._image.src=t,this._image.alt=e,this._imageTitle.textContent=e,C(P(a.prototype),"open",this).call(this)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function B(){return B="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=T(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},B.apply(this,arguments)}function T(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}function x(e,t){return x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},x(e,t)}function U(e,t){if(t&&("object"===R(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}var F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&x(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(r);if(o){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._form=r._popup.querySelector(t),r._submitForm=n,r._submitButton=r._form.querySelector(".form__button"),r._formInputs=Array.from(r._popup.querySelectorAll(".form__input")),r._buttonText=r._submitButton.textContent,r._formValues={},r}return t=a,n=[{key:"renderLoading",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Сохранение...";this._submitButton.textContent=e?t:this._buttonText}},{key:"_getInputValues",value:function(){var e=this;return this._formInputs.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"_handleSubmitForm",value:function(e){e.preventDefault(),this._submitForm(this._getInputValues())}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){e._handleSubmitForm(t)})),B(A(a.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._form.reset(),B(A(a.prototype),"close",this).call(this)}}],n&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"setItem",value:function(e){this._container.append(e)}},{key:"setItemFront",value:function(e){this._container.prepend(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(e){var t=this;this.clear(),e.forEach((function(e){t._renderer(e)}))}}])&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var N=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._disactiveButtonClass=t.disactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(t.inputSelector))}var t,n;return t=e,(n=[{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._disableButton():this._enableButton()}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_disableButton",value:function(){this._buttonElement.classList.add(this._disactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_enableButton",value:function(){this._buttonElement.classList.remove(this._disactiveButtonClass),this._buttonElement.disabled=!1}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&M(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var J,z,$={},G=new p({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-35",headers:{authorization:"2918e5e1-ec7f-40fa-9e65-9ce4b0a59553","Content-Type":"application/json"}}),K=new V({renderer:function(e){var t=te(e);K.setItem(t)}},".places__items"),Q=new I("#popup-image"),W=new F("#popup-place","#form-place",(function(e){!function(e){var t={name:e.place,link:e.link,likes:[]};W.renderLoading(!0),G.addNewCard(t).then((function(e){var t=te(e);K.setItemFront(t),W.close()})).catch((function(e){console.log("Ошибка: ".concat(e.status))})).finally((function(){return W.renderLoading(!1)}))}(e)})),X=new w("#popup-confirm-delete","#form-delete",(function(e,t){G.deleteCard(e).then((function(){t.remove(),t=null,X.close()})).catch((function(e){console.log("Ошибка: ".concat(e.status))}))})),Y=new F("#popup-profile","#form-profile",(function(e){!function(e){Y.renderLoading(!0),G.editMyProfile(e).then((function(e){ee.setUserInfo(e),Y.close()})).catch((function(e){console.log("Ошибка: ".concat(e.status))})).finally((function(){return Y.renderLoading(!1)}))}(e)})),Z=new F("#popup-avatar","#form-avatar",(function(e){!function(e){Z.renderLoading(!0),G.changeAvatar(e.avatar).then((function(e){ee.setUserInfo(e),Z.close()})).catch((function(e){console.log("Ошибка: ".concat(e.status))})).finally((function(){return Z.renderLoading(!1)}))}(e)})),ee=new l({name:".intro__user-name",occupation:".profile__occupation",avatar:".profile__avatar"});function te(e){return new s(G,J,e,ne,re,".places__item-template").generateCard()}function ne(e,t){Q.open(e,t)}function re(e,t,n){X.open(t,n)}i.addEventListener("click",(function(){var e;e=ee.getUserInfo(),n.value=e.name,r.value=e.occupation,$["edit-user"].resetValidation(),Y.open()})),a.addEventListener("click",(function(){$["add-place"].resetValidation(),W.open()})),o.addEventListener("click",(function(){$["add-avatar"].resetValidation(),Z.open()})),z={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button",disactiveButtonClass:"form__button_disactive",inputErrorClass:"form__input_invalid",errorClass:"form__input-error_active"},Array.from(document.querySelectorAll(z.formSelector)).forEach((function(e){var t=new N(z,e),n=e.getAttribute("name");$[n]=t,t.enableValidation()})),Q.setEventListeners(),W.setEventListeners(),Y.setEventListeners(),Z.setEventListeners(),X.setEventListeners(),Promise.all([G.getMyProfile(),G.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];ee.setUserInfo(o),J=o._id,K.renderItems(i)})).catch((function(e){console.log("Ошибка: ".concat(e.status))}))})();