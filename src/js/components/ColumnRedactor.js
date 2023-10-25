export class ColumnRedactor {
  constructor (board) {
    this.board = board
    this.column = null
  }

  init () {
    this.renderColumn()

    const toggleElements = () => {
      this.btnContainer.classList.toggle('hidden')
      this.addBtn.classList.toggle('hidden')
      this.input.classList.toggle('hidden')
    }

    this.addBtn.addEventListener('click', toggleElements)
    this.cancelBtn.addEventListener('click', toggleElements)

    this.applyBtn.addEventListener('click', () => {
      const inputValue = this.input.value
      if (inputValue) {
        this.createTask(inputValue)
        toggleElements()
      }
    })

    this.column.addEventListener('mousedown', (e) => {
      let actualElement = e.target
      if (actualElement && actualElement.classList && actualElement.classList.contains('task') && e.button === 0) {
        e.preventDefault()
        actualElement.classList.add('dragged')

        const onMouseMove = (event) => {
          actualElement.style.top = event.clientY + 'px'
          actualElement.style.left = event.clientX + 'px'
        }

        const onMouseUp = (e) => {
          const mouseUpItem = e.target
          if (mouseUpItem.parentElement && mouseUpItem.parentElement.classList.contains('column')) {
            mouseUpItem.parentElement.insertBefore(actualElement, null)
          }
          actualElement.classList.remove('dragged')
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
          actualElement.style.top = 0 + 'px'
          actualElement.style.left = 0 + 'px'
          actualElement = undefined
        }
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
    })
  }

  static get markUp () {
    return `
          <div class="column">
              <h2 class="header">test name</h2>
              <input class="task input-task hidden" value="default_task">
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

  get applyBtn () {
    return this.column.querySelector('.apply-button')
  }

  get cancelBtn () {
    return this.column.querySelector('.cancel-button')
  }

  get input () {
    return this.column.querySelector('.input-task')
  }

  get header () {
    return this.column.querySelector('.header')
  }

  get closeBtn () {
    return this.column.querySelector('.close-button')
  }

  renderColumn () {
    this.board.insertAdjacentHTML('afterbegin', this.constructor.markUp)
    this.column = this.board.querySelector('.column')
  }

  createTask (taskText) {
    const taskHTML = `<div class="task"><span class="close-button">\u00D7</span>${taskText}</div>`
    this.input.insertAdjacentHTML('beforebegin', taskHTML)
    const newTask = this.input.previousElementSibling
    const newCloseBtn = newTask.querySelector('.close-button')
    newCloseBtn.addEventListener('click', (event) => {
      event.target.parentElement.remove()
    })
  }

  setName (name) {
    this.header.textContent = name
  }
}
