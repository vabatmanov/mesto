export default class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = atob(token);
  }

  _promisResult(promis){
    return promis.then(result => {
      if (result.ok) {
        return result.json();
      } else {
        return Promise.reject(`Ошибка: ${result.status}`);
      }
    })
  }

  _caseMethod(liked) {
    return (liked())?'DELETE':'PUT';
  }

  getUserInfo(){
    return this._promisResult(fetch(`${this._address}users/me`, {
      headers: {
        authorization: this._token
      }
    }))
  }

  getCards(){
    return this._promisResult(fetch(`${this._address}cards`, {
      headers: {
        authorization: this._token
      }
    }))
  }

  editProfile(userData){
    return this._promisResult(fetch(`${this._address}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }))
  }

  addCard(cardData){
    return this._promisResult(fetch(`${this._address}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    }))
  }

  removeCard(cardData){
    return this._promisResult(fetch(`${this._address}cards/${cardData}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }))
  }

  like({cardId, liked}){
    return this._promisResult(fetch(`${this._address}cards/${cardId}/likes`, {
      method: this._caseMethod(liked),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }))
  }

  updateAvatar(avatarUrl){
    return this._promisResult(fetch(`${this._address}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatarUrl)
    }))
  }
}