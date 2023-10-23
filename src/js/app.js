import { ColumnRedactor } from './components/ColumnRedactor'

const board = document.querySelector('.board')

const column1 = new ColumnRedactor(board)
column1.renderColumn()
column1.setName('TODO')
