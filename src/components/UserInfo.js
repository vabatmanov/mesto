export default class UserInfo {
  constructor({username,description}) {
    this._userName = username;
    this._description  = description;
  }
  getUserInfo() {
    return ({name: this._userName.textContent, about: this._description.textContent});
  }

  setUserInfo({name,about}){
    this._userName.textContent = name;
    this._description.textContent = about;
  }
}