class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }

    _getResponseData = (res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
    }
      
    getUser() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      })
      .then(res => this._getResponseData(res));
    }
    
    getCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      }) 
      .then(res => this._getResponseData(res));
    }

    updateUser(data) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
      .then(res => this._getResponseData(res));
    }
  }

  
  
 