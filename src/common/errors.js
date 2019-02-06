export class ResponseError extends Error {
  constructor(body) {
    super('The server respond with errors.');
    this.name = this.constructor.name;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(`Can not get response. Network error occured: ${message}`);
    this.name = this.constructor.name;
  }
}
