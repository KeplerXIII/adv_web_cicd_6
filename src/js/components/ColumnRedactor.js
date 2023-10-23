export class ColumnRedactor {
  constructor (board) {
    this.board = board
    this.column = null
  }

  init () {
    this.renderColumn()
  }

  static get markUp () {
    return `
          <div class="column">
              <h2 class="header">test name</h2>
              <div class="task">Test task</div>
              <button class="add-task-button">+ Add another card</button>
              <div class="button-apply-container hidden">
                <button class="apply-button">Add card</button>
                <button class="cancel-button">Cancel</button>
              </div>
          </div>
          `
  }

  get btnContainer () {
    return this.column.querySelector('.button-apply-container')
  }

  get addBtn () {
    return this.column.querySelector('.add-task-button')
  }

  get header () {
    return this.column.querySelector('.header')
  }

  renderColumn () {
    this.board.insertAdjacentHTML('afterbegin', this.constructor.markUp)
    this.column = this.board.querySelector('.column')
  }

  setName (name) {
    this.header.textContent = name
  }
}
