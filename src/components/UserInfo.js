export default class UserInfo {
  constructor({username,description, avatar}) {
    this._userName = username;
    this._description = description;
    this._avatar = avatar;
    this._userID = null;
  }
  getUserInfo() {
    return ({name: this._userName.textContent, about: this._description.textContent, _id: this._userID});
  }

  setUserInfo({name, about, _id, avatar}){
    this._userName.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
    this._userID = _id;

  }
}