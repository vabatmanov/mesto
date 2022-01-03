export default class UserInfo {
  constructor({username,description}) {
    this._userName = username;
    this._description  = description;
  }
  getUserInfo() {
    return ({username: this._userName.textContent, description: this._description.textContent});
  }

  setUserInfo({username,description}){
    this._userName.textContent = username;
    this._description.textContent = description;
  }
}