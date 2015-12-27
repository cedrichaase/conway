/**
 * The Grid class
 *
 * @param width
 * @param height
 * @returns {{width: *, height: *, matrix: *, neighbors: (Grid.getNeighbors|*), getCell: *}}
 * @constructor
 */
var Grid = function (width, height) {

    this.init(width, height);

    return {
        width: this.width,
        height: this.height,
        matrix: this.matrix,

        getNeighbors: this.getNeighbors,
        countNeighbors: this.countNeighbors,
        cellIsBorn: this.cellIsBorn,
        cellDies: this.cellDies,
        executeConway: this.executeConway,
        getCell: this.getCell
    };
};

/**
 * Initialize grid
 *
 * @param width
 * @param height
 */
Grid.prototype.init = function (width, height) {
    this.width = width;
    this.height = height;

    this.matrix = [];
    for(var column = 0; column < width; column++) {
        this.matrix[column] = [];
        for(var line = 0; line < height; line++) {
            this.matrix[column][line] = new Cell(column, line, false);
        }
    }
};


/**
 * Returns a Cell by grid coordinates
 *
 * @param x
 * @param y
 * @returns Cell
 */
Grid.prototype.getCell = function(x, y) {
    var cell = new Cell(0, 0, false);

    if (!(x < 0 || y < 0 || x >= this.width || y >= this.height))
        cell = this.matrix[x][y];

    return cell;
};

/**
 * Returns neighboring cells by given grid coordinates
 *
 * @param x
 * @param y
 * @returns {{topLeft: Cell, top: Cell, topRight: Cell, right: Cell, bottomRight: Cell, bottom: Cell, bottomLeft: Cell, left: Cell}}
 */
Grid.prototype.getNeighbors = function(x, y) {
    return {
        topLeft         : this.getCell(x-1,   y-1),
        top             : this.getCell(x,     y-1),
        topRight        : this.getCell(x+1,   y-1),
        right           : this.getCell(x+1,   y),
        bottomRight     : this.getCell(x+1,   y+1),
        bottom          : this.getCell(x,     y+1),
        bottomLeft      : this.getCell(x-1,   y+1),
        left            : this.getCell(x-1,   y)
    };
};

/**
 *
 * @param cell
 */
Grid.prototype.countNeighbors = function(cell) {
    var neighbors = this.getNeighbors(cell.x, cell.y);

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
};

/**
 *
 * CONWAY FUNCTIONS
 *
 */

/**
 * Checks if a cell will die in the next generation
 *
 * @param cell
 * @returns {*|boolean}
 */
Grid.prototype.cellDies = function(cell) {
    var neighborCount = this.countNeighbors(cell);
    return cell.value && (neighborCount > 3 || neighborCount < 2);
};

/**
 * Check if cell will come alive in the next generation
 *
 * @param cell
 * @returns {boolean}
 */
Grid.prototype.cellIsBorn = function(cell) {
    var neighborCount = this.countNeighbors(cell);
    return (!cell.value) && neighborCount == 3;
};

/**
 *
 * @returns {Grid}
 */
Grid.prototype.executeConway = function() {
    var nextGen = $.extend(true, {}, this);

    var width = this.width;
    var height = this.height;

    for(var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            var oldCell = this.getCell(x, y);
            var newCell = nextGen.getCell(x, y);

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
};