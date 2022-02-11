export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._occupation = document.querySelector(data.occupation);
    this._avatar = document.querySelector(data.avatar);
    this._userId = '';
    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.occupation = this._occupation.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._occupation.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._userId = userData._Id;
  }
}
