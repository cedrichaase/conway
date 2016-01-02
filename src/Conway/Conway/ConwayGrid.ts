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
     * Checks if a cell will die in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    private cellDies(cell: Cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return cell.value && (neighborCount > 3 || neighborCount < 2);
    }

    /**
     * Check if cell will come alive in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    private cellIsBorn(cell: Cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return (!cell.value) && neighborCount == 3;
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
