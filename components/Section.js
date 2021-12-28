export default class Section {
  constructor({ items, renderer }, containerSelector) {
    // items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector; //тут исправить, пусть приходит константа
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderer() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
