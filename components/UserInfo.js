export default class UserInfo {
  constructor({username,description}) {
    this._userName = username.textContent;
    this._description  = description.textContent;
  }
  getUserInfo() {
    return ({username: this._userName, caption: this._description});
  }

  setUserInfo({username,description}){
    this._userName = username;
    this._description = description;
  }
}