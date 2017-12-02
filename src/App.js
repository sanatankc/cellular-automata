import React, { Component } from 'react'
import rules from './rules'

const rowStyle = {
  display: 'flex',
}

const cellStyle = state => ({
  width: '10px',
  height: '10px',
  background: state ? '#6290C3' : '#C2E7DA'
})

const flexCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const cellLength = 100
class App extends Component {
  constructor(props) {
    super(props)
    this.generateCellsState = this.generateCellsState.bind(this)
  }
  state = {
    cells: []
  }

  rule = rules[0]
  componentDidMount() {
    this.generateCellsState()
  }

  generateCellsState() {
    const cells = []
    const initialCell = Array(cellLength).fill(10)
      .map(() => Math.floor(Math.random() * 2))
    cells.push(initialCell)

    for (let j = 0; j < cellLength; j++) {
      const cell = []
      for (let i = 0; i < cellLength; i++) {
        const ruleCellsLocations = [i - 1, i, i + 1]
        if (i === 0) {
          ruleCellsLocations[0] = cellLength - 1
        }
        if (i === cellLength - 1) {
          ruleCellsLocations[2] = 0
        }
        const lastRowIndex = cells.length - 1
        const firstCell = cells[lastRowIndex][ruleCellsLocations[0]]
        const secondCell =  cells[lastRowIndex][ruleCellsLocations[1]]
        const thirdCell =  cells[lastRowIndex][ruleCellsLocations[2]]
        cell.push(this.rule[`${firstCell}${secondCell}${thirdCell}`])
      }
      cells.push(cell)
    }
    cells.shift()
    this.setState({ cells })
  }

  generateCells() {
    return this.state.cells
      .map((cell, index) =>
        <div className='row' key={index} style={rowStyle}>
          {cell.map((val, key) =>
            <div className='cell' data-val={val} data-key={key} key={key} style={cellStyle(val)}/>
          )}
        </div>
      )
  }



  render() {
    return (
      <div style={flexCenter} onClick={this.generateCellsState}>
        {this.generateCells()}
      </div>
    )
  }
}

export default App
