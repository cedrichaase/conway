///<reference path="../Grid/Grid.ts"/>

class ConwayGrid extends Grid {

    /**
     * Constructor
     *
     * @param width
     * @param height
     */
    public constructor(width: number, height: number) {
        super(width, height);
    }

    /**
     * Counts the live cells surrounding the given Cell
     *
     * @param cell
     * @returns {number}
     */
    private countLiveNeighbors(cell: Cell) {
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
     * Determines whether or not the given cell will survive in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    private livesInNextGeneration(cell: Cell) {
        var neighborCount = this.countLiveNeighbors(cell);

        // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        if(cell.value === true
            && neighborCount < 2) {
            return false;
        }

        // Any live cell with two or three live neighbours lives on to the next generation.
        if(cell.value === true
            && neighborCount < 4
            && neighborCount > 1) {
            return true;
        }

        // Any live cell with more than three live neighbours dies, as if by over-population.
        if(cell.value === true
            && neighborCount > 3) {
            return false;
        }

        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if(cell.value === false
            && neighborCount === 3) {
            return true;
        }

        return false;
    }

    /**
     * Executes one step of the Conway Game Of Life Algorithm
     *
     * @returns {*}
     */
    public executeConway() {
        var nextGen = $.extend(true, {}, this);

        var width = this.width;
        var height = this.height;

        for(var x = 0; x < width; x++) {
            for(var y = 0; y < height; y++) {
                var coords = new Vector2D(x, y);
                var oldCell = this.getCell(coords);
                var newCell = nextGen.getCell(coords);

                newCell.value = this.livesInNextGeneration(oldCell);
            }
        }

        return nextGen;
    }
}
