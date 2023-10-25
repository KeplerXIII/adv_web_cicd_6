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
