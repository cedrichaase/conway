/// <reference path="../../vendor/jquery.d.ts" />
/// <reference path="Cell.ts" />
///<reference path="Vector2D.ts"/>
///<reference path="NeighborCoordinates.ts"/>
///<reference path="NeighborCells.ts"/>

/**
 * The Grid class
 *
 * @param width
 * @param height
 * @returns {{width: *, height: *, matrix: *, neighbors: (Grid.getNeighbors|*), getCell: *}}
 * @constructor
 */

class Grid {

    /**
     * The Grid width
     */
    public width: number;

    /***
     * The Grid height
     */
    public height: number;

    /**
     * The Grid Cell matrix
     */
    public matrix: Array<Array<Cell>>;

    /**
     * The constructor
     *
     * @param width
     * @param height
     */
    constructor(width, height) {

        this.width = width;
        this.height = height;
        this.matrix = [];

        for(var column = 0; column < width; column++) {
            this.matrix[column] = [];
            for(var line = 0; line < height; line++) {
                var coords = new Vector2D(column, line);
                this.matrix[column][line] = new Cell(coords, false);
            }
        }
    }


    /**
     * Returns a Cell by coordinates
     *
     * @param coords
     * @returns {Cell}
     */
    getCell(coords: Vector2D): Cell {
        var x = coords.x;
        var y = coords.y;

        var cell = new Cell(coords, false);

        if (!(x < 0 || y < 0 || x >= this.width || y >= this.height))
            cell = this.matrix[x][y];

        return cell;
    }

    /**
     * Returns the neighbor cells surrounding the given cell
     *
     * @param cell
     * @returns {NeighborCells}
     */
    getNeighbors(cell: Cell) {
        var neighborCoords  = new NeighborCoordinates(cell);
        var neighborCells   = new NeighborCells();

        neighborCells.topLeft       = this.getCell(neighborCoords.topLeft);
        neighborCells.top           = this.getCell(neighborCoords.top);
        neighborCells.topRight      = this.getCell(neighborCoords.topRight);
        neighborCells.right         = this.getCell(neighborCoords.right);
        neighborCells.bottomRight   = this.getCell(neighborCoords.bottomRight);
        neighborCells.bottom        = this.getCell(neighborCoords.bottom);
        neighborCells.bottomLeft    = this.getCell(neighborCoords.bottomLeft);
        neighborCells.left          = this.getCell(neighborCoords.left);

        return neighborCells;
    }

    /**
     * Counts the live cells surrounding the given Cell
     *
     * @param cell
     * @returns {number}
     */
    countLiveNeighbors(cell: Cell) {
        var neighbors = this.getNeighbors(cell);

        var count = 0;

        if(neighbors.top.value)
            count++;
        if(neighbors.bottom.value)
            count++;
        if(neighbors.left.value)
            count++;
        if(neighbors.right.value)
            count++;
        if(neighbors.topLeft.value)
            count++;
        if(neighbors.topRight.value)
            count++;
        if(neighbors.bottomLeft.value)
            count++;
        if(neighbors.bottomRight.value)
            count++;

        return count;
    }

    /**
     * Checks if a cell will die in the next generation
     *
     * @param cell
     * @returns {*|boolean}
     */
    cellDies(cell: Cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return cell.value && (neighborCount > 3 || neighborCount < 2);
    }

    /**
     * Check if cell will come alive in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    cellIsBorn(cell: Cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return (!cell.value) && neighborCount == 3;
    }

    executeConway() {
        var nextGen = $.extend(true, {}, this);

        var width = this.width;
        var height = this.height;

        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                var coords = new Vector2D(x, y);
                var oldCell = this.getCell(coords);
                var newCell = nextGen.getCell(coords);

                if(!oldCell.value === true) {
                    if(this.cellIsBorn(oldCell))
                        newCell.value = true;
                }
                else if(oldCell.value === true) {
                    newCell.value = !this.cellDies(oldCell);
                }
            }
        }

        return nextGen;
    }
}