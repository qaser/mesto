export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._occupation = document.querySelector(data.occupation);
    this._avatar = document.querySelector(data.avatar);
    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.occupation = this._occupation.textContent;
    return this._userData;
  }

  setUserInfo(name, occupation) {
    this._name.textContent = name;
    this._occupation.textContent = occupation;
  }

  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}
