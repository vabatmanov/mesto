export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector; //тут исправить, пусть приходит константа
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer(cards) {
    cards.forEach(item => {
      this._renderer(item);
    });
  }
}
