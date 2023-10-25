import { ColumnRedactor } from './components/ColumnRedactor'

const board = document.querySelector('.board')

const name1 = 'Done'
const name2 = 'In progress'
const name3 = 'TODO'

const column1 = new ColumnRedactor(board)
column1.init()
column1.setName(name1)

const column2 = new ColumnRedactor(board)
column2.init()
column2.setName(name2)

const column3 = new ColumnRedactor(board)
column3.init()
column3.setName(name3)

if (localStorage.getItem(name3)) {
  column3.restoreData()
} else {
  column3.createTask('Выучить JavaScript до конца.')
  column3.createTask('Посетить психотерапевта.')
  column3.createTask('Ооочент длинная задача с большим текстом для проверки переноса многострочных задач.')
}

if (localStorage.getItem(name2)) {
  column2.restoreData()
} else {
  column2.createTask('Тестовая задача для проверки вставки')
  column2.createTask('Задача для компании')
}

if (localStorage.getItem(name1)) {
  column1.restoreData()
}
