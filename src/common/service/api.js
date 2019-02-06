import fetch from 'cross-fetch';
import { ResponseError, NetworkError } from '../errors';

class API {
  static handleAuthentication() {
    const authentication = JSON.parse(localStorage.getItem('auth-data'));
    return authentication ? `${authentication.accessTokenType} ${authentication.accessToken}` : ``;
  }

  constructor() {
    this.baseURI = API_BASE_URL;
  }

  makeRequest(url, requestOptions) {
    const fullUrl = `${this.baseURI}${url}`;
    return fetch(fullUrl, requestOptions)
      .then(response =>
        response.text().then(body => {
          const json = body ? JSON.parse(body) : {};

          if (!response.ok) {
            throw new ResponseError(json);
          }

          return {
            success: true,
            statusCode: response.status,
            headers: response.headers,
            data: json,
            requestOptions
          };
        })
      )
      .catch(error => {
        if (error instanceof ResponseError) {
          throw error;
        }

        throw new NetworkError(error.message);
      });
  }

  get(url, headers) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: API.handleAuthentication(),
        ...headers
      }
    };

    return this.makeRequest(url, requestOptions);
  }

  post(url, data, headers) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: API.handleAuthentication(),
        'Content-Type': 'application/json',
        ...headers
      },
      body: data
    };

    return this.makeRequest(url, requestOptions);
  }

  put(url, data, headers) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: API.handleAuthentication(),
        'Content-Type': 'application/json',
        ...headers
      },
      body: data
    };

    return this.makeRequest(url, requestOptions);
  }

  patch(url, data, headers) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        Authorization: API.handleAuthentication(),
        'Content-Type': 'application/json',
        ...headers
      },
      body: data
    };

    return this.makeRequest(url, requestOptions);
  }

  delete(url, headers) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: API.handleAuthentication(),
        ...headers
      }
    };

    return this.makeRequest(url, requestOptions);
  }
}

export default new API();
