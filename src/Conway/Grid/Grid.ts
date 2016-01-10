/// <reference path="../../../vendor/jquery.d.ts" />
/// <reference path="../Cell/Cell2D.ts" />
///<reference path="../Vector/Vector2D.ts"/>
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
    public matrix: Array<Array<Cell2D>>;

    /**
     * The constructor
     *
     * @param width
     * @param height
     */
    public constructor(width, height) {

        this.width = width;
        this.height = height;
        this.matrix = [];

        for(var column = 0; column < width; column++) {
            this.matrix[column] = [];
            for(var line = 0; line < height; line++) {
                var coords = new Vector2D(column, line);
                this.matrix[column][line] = new Cell2D(coords, false);
            }
        }
    }


    /**
     * Returns a Cell by coordinates
     *
     * @param coords
     * @returns {Cell2D}
     */
    public getCell(coords: Vector2D) {
        var x = coords.x;
        var y = coords.y;

        var cell = new Cell2D(coords, false);

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
    public getNeighbors(cell: Cell2D) {
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
}