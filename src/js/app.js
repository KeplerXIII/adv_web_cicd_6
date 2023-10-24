import { ColumnRedactor } from './components/ColumnRedactor'

const board = document.querySelector('.board')

const column1 = new ColumnRedactor(board)
column1.init()
column1.setName('Done')

const column2 = new ColumnRedactor(board)
column2.init()
column2.setName('In progress')

const column3 = new ColumnRedactor(board)
column3.init()
column3.setName('TODO')

// let actualElement

// const onMouseOver = (e) => {
//   actualElement.style.top = e.clientY + 'px'
//   actualElement.style.left = e.clientX + 'px'
// }

// const onMouseUp = () => {
//   actualElement.classList.remove('dragged')
//   document.documentElement.removeEventListener('mouseup', onMouseUp)
//   document.documentElement.removeEventListener('mouseover', onMouseOver)
// }

// board.addEventListener('mousedown', (e) => {
//   actualElement = e.target
//   if (actualElement.classList.contains('task')) {
//     actualElement.classList.add('dragged')
//     document.documentElement.addEventListener('mouseup', onMouseUp)
//     document.documentElement.addEventListener('mouseover', onMouseOver)
//   }
// })
