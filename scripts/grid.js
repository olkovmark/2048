import { Cell } from "./cell.js";

const grid_size = 4;
const cells_count = grid_size * grid_size;

export class Grid {
  constructor(gridElement) {
    this.cells = [];
    for (let i = 0; i < cells_count; i++) {
      this.cells.push(
        new Cell(gridElement, i % grid_size, Math.floor(i / grid_size))
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(
      (column) => [...column].reverse()
    );

    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map((column) =>
      [...column].reverse()
    );
  }

  getRandomEmptyCell() {
    const emptyCell = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCell.length);
    return emptyCell[randomIndex];
  }

  groupCellsByColumn() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells;
    }, []);
  }

  groupCellsByRow() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.y] = groupedCells[cell.y] || [];
      groupedCells[cell.y][cell.x] = cell;
      return groupedCells;
    }, []);
  }
}
