export class ColumnRedactor {
  constructor (board) {
    this.board = board
    this.column = null
    this.taskArray = []
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

      if (actualElement && actualElement.classList && actualElement.classList.contains('task') && !actualElement.classList.contains('input-task') && e.button === 0) {
        const height = actualElement.offsetHeight
        e.preventDefault()

        const shiftX = e.clientX - actualElement.getBoundingClientRect().left
        const shiftY = e.clientY - actualElement.getBoundingClientRect().top

        actualElement.classList.add('dragged')

        actualElement.style.left = e.pageX - shiftX + 'px'
        actualElement.style.top = e.pageY - shiftY + 'px'

        function moveAt (pageX, pageY) {
          actualElement.style.left = pageX - shiftX + 'px'
          actualElement.style.top = pageY - shiftY + 'px'
        }

        const onMouseMove = (e) => {
          moveAt(e.pageX, e.pageY)
          const underMouseObj = e.target
          if (!underMouseObj.classList.contains('placeholder')) {
            this.hidePlaceholder()
          }
          if (underMouseObj.parentElement && underMouseObj.parentElement.classList.contains('column') && !underMouseObj.classList.contains('header') && !underMouseObj.classList.contains('placeholder')) {
            this.showPlaceholder(e, height)
          }
        }

        const onMouseUp = (e) => {
          const mouseUpItem = e.target
          if (mouseUpItem.parentElement && mouseUpItem.parentElement.classList.contains('column') && !mouseUpItem.classList.contains('header')) {
            mouseUpItem.parentElement.insertBefore(actualElement, e.target)
            const tempArray = []
            mouseUpItem.parentElement.querySelectorAll('.task').forEach(element => {
              tempArray.push(element.textContent.slice(1))
              localStorage.setItem(mouseUpItem.parentElement.querySelector('.header').textContent, JSON.stringify(tempArray))
            })
          }
          actualElement.style.top = 0 + 'px'
          actualElement.style.left = 0 + 'px'
          actualElement.classList.remove('dragged')
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
          this.hidePlaceholder(e)
          actualElement = undefined
          this.taskArray.length = 0
          this.tasks.forEach(element => {
            this.taskArray.push(element.textContent.slice(1))
          })
          this.saveLocal()
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
    })
  }

  static get markUp () {
    return `
          <div class="column" draggable="true">
              <h2 class="header">test name</h2>
              <textarea class="input-task hidden" style="max-width: 270px; min-width: 270px;">Задачка</textarea>
              <button class="add-task-button" draggable="true">+ Add another card</button>
              <div class="button-apply-container hidden">
                <button class="apply-button">Add card</button>
                <button class="cancel-button">Cancel</button>
              </div>
          </div>
          `
  }

  get tasks () {
    return this.column.querySelectorAll('.task')
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
    const taskHTML = `<div class="task" draggable="true"><span class="close-button">\u00D7</span>${taskText}</div>`
    this.input.insertAdjacentHTML('beforebegin', taskHTML)
    const newTask = this.input.previousElementSibling
    const newCloseBtn = newTask.querySelector('.close-button')
    this.taskArray.push(taskText)
    this.saveLocal()
    newCloseBtn.addEventListener('click', (event) => {
      event.target.parentElement.remove()
      const index = this.taskArray.indexOf(taskText)
      if (index !== -1) {
        this.taskArray.splice(index, 1)
        this.saveLocal()
      }
    })
  }

  showPlaceholder (e, height) {
    e.preventDefault()
    const targetItem = e.target
    if (targetItem.parentElement && targetItem.parentElement.classList.contains('column') && !targetItem.classList.contains('header')) {
      const placeholder = document.createElement('div')
      placeholder.classList.add('placeholder')
      placeholder.textContent = 'куку'
      placeholder.style.height = height + 'px'
      targetItem.parentElement.insertBefore(placeholder, e.target)
    }
  }

  hidePlaceholder () {
    const placeholder = document.querySelector('.placeholder')
    if (placeholder) {
      placeholder.remove()
    }
  }

  setName (name) {
    this.header.textContent = name
  }

  saveLocal () {
    localStorage.setItem(this.header.textContent, JSON.stringify(this.taskArray))
  }

  restoreData () {
    const storeData = localStorage.getItem(this.header.textContent)
    const storeArray = JSON.parse(storeData)
    storeArray.forEach(element => {
      this.createTask(element)
    })
  }
}
