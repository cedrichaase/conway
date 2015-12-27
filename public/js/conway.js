///<reference path="Vector2D.ts"/>
/// <reference path="../../vendor/jquery.d.ts" />
var Canvas = (function () {
    /**
     * The constructor
     *
     * @param element
     */
    function Canvas(element) {
        /**
         * The rendering interval in milliseconds
         */
        this.renderInterval = 100;
        this.element = element;
        this.$element = $(element);
        this.ctx = element.getContext('2d');
    }
    /**
     * Returns the mouse pointer position in relation to the canvas
     *
     * @param event
     * @returns {Vector2D}
     */
    Canvas.prototype.getMouse = function (event) {
        var offset = this.$element.offset();
        var mx = event.pageX - offset.left;
        var my = event.pageY - offset.top;
        return new Vector2D(mx, my);
    };
    /**
     * Clears the canvas
     */
    Canvas.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    };
    /**
     * starts/stops Canvas rendering
     */
    Canvas.prototype.toggleActive = function () {
        if (this.active)
            this.stop();
        else
            this.start();
    };
    /**
     * Stops Canvas rendering
     */
    Canvas.prototype.stop = function () {
        if (this.active) {
            clearInterval(this.interval);
            this.active = false;
        }
    };
    /**
     * Starts Canvas rendering
     */
    Canvas.prototype.start = function () {
        if (!this.active) {
            var _this = this;
            this.interval = setInterval(function () {
                _this.render();
            }, this.renderInterval);
            this.active = true;
        }
    };
    /**
     * Renders the Canvas
     */
    Canvas.prototype.render = function () {
        this.clear();
    };
    return Canvas;
})();
//# sourceMappingURL=Canvas.js.map
;
/// <reference path="../../vendor/jquery.d.ts" />
///<reference path="Grid.ts"/>
/**
 * Class Cell
 */
var Cell = (function () {
    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    function Cell(coords, value) {
        this.coords = coords;
        this.value = value;
    }
    /**
     * Toggles the cell value
     */
    Cell.prototype.toggleValue = function () {
        this.value = !this.value;
    };
    /**
     * Return coordinates to this cell's top left
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsTopLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's top
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsTop = function () {
        return new Vector2D(this.coords.x, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's top right
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsTopRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's right
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y);
    };
    /**
     * Return coordinates to this cell's bottom right
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsBottomRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's bottom
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsBottom = function () {
        return new Vector2D(this.coords.x, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's bottom left
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsBottomLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's left
     *
     * @returns {Vector2D}
     */
    Cell.prototype.getCoordsLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y);
    };
    return Cell;
})();
//# sourceMappingURL=Cell.js.map
;
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
var Grid = (function () {
    /**
     * The constructor
     *
     * @param width
     * @param height
     */
    function Grid(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = [];
        for (var column = 0; column < width; column++) {
            this.matrix[column] = [];
            for (var line = 0; line < height; line++) {
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
    Grid.prototype.getCell = function (coords) {
        var x = coords.x;
        var y = coords.y;
        var cell = new Cell(coords, false);
        if (!(x < 0 || y < 0 || x >= this.width || y >= this.height))
            cell = this.matrix[x][y];
        return cell;
    };
    /**
     * Returns the neighbor cells surrounding the given cell
     *
     * @param cell
     * @returns {NeighborCells}
     */
    Grid.prototype.getNeighbors = function (cell) {
        var neighborCoords = new NeighborCoordinates(cell);
        var neighborCells = new NeighborCells();
        neighborCells.topLeft = this.getCell(neighborCoords.topLeft);
        neighborCells.top = this.getCell(neighborCoords.top);
        neighborCells.topRight = this.getCell(neighborCoords.topRight);
        neighborCells.right = this.getCell(neighborCoords.right);
        neighborCells.bottomRight = this.getCell(neighborCoords.bottomRight);
        neighborCells.bottom = this.getCell(neighborCoords.bottom);
        neighborCells.bottomLeft = this.getCell(neighborCoords.bottomLeft);
        neighborCells.left = this.getCell(neighborCoords.left);
        return neighborCells;
    };
    /**
     * Counts the live cells surrounding the given Cell
     *
     * @param cell
     * @returns {number}
     */
    Grid.prototype.countLiveNeighbors = function (cell) {
        var neighbors = this.getNeighbors(cell);
        var count = 0;
        if (neighbors.top.value)
            count++;
        if (neighbors.bottom.value)
            count++;
        if (neighbors.left.value)
            count++;
        if (neighbors.right.value)
            count++;
        if (neighbors.topLeft.value)
            count++;
        if (neighbors.topRight.value)
            count++;
        if (neighbors.bottomLeft.value)
            count++;
        if (neighbors.bottomRight.value)
            count++;
        return count;
    };
    /**
     * Checks if a cell will die in the next generation
     *
     * @param cell
     * @returns {*|boolean}
     */
    Grid.prototype.cellDies = function (cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return cell.value && (neighborCount > 3 || neighborCount < 2);
    };
    /**
     * Check if cell will come alive in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    Grid.prototype.cellIsBorn = function (cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        return (!cell.value) && neighborCount == 3;
    };
    Grid.prototype.executeConway = function () {
        var nextGen = $.extend(true, {}, this);
        var width = this.width;
        var height = this.height;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var coords = new Vector2D(x, y);
                var oldCell = this.getCell(coords);
                var newCell = nextGen.getCell(coords);
                if (!oldCell.value === true) {
                    if (this.cellIsBorn(oldCell))
                        newCell.value = true;
                }
                else if (oldCell.value === true) {
                    newCell.value = !this.cellDies(oldCell);
                }
            }
        }
        return nextGen;
    };
    return Grid;
})();
//# sourceMappingURL=Grid.js.map
;
///<reference path="Canvas.ts"/>
///<reference path="Grid.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GridCanvas = (function (_super) {
    __extends(GridCanvas, _super);
    /**
     *
     *
     * @param element
     * @param hCells
     * @param vCells
     */
    function GridCanvas(element, hCells, vCells) {
        _super.call(this, element);
        this.grid = new Grid(hCells, vCells);
        this.addEventListeners();
        this.start();
    }
    GridCanvas.prototype.drawGrid = function () {
        var width = this.element.width;
        var height = this.element.height;
        var hSpacing = width / this.grid.width;
        var vSpacing = height / this.grid.height;
        for (var hLine = 0; hLine <= this.grid.width; hLine++) {
            var x = hLine * hSpacing;
            this.drawVerticalLine(x, this.lineWidth, this.gridColor);
        }
        for (var vLine = 0; vLine <= this.grid.height; vLine++) {
            var y = vLine * vSpacing;
            this.drawHorizontalLine(y, this.lineWidth, this.gridColor);
        }
    };
    GridCanvas.prototype.drawVerticalLine = function (x, lineWidth, color) {
        var height = this.element.height;
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
        this.ctx.restore();
    };
    GridCanvas.prototype.drawHorizontalLine = function (y, lineWidth, color) {
        var width = this.element.width;
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
        this.ctx.restore();
    };
    GridCanvas.prototype.fillCellAtCoords = function (coords) {
        var cellWidth = this.element.width / this.grid.width;
        var cellHeight = this.element.height / this.grid.height;
        var xPos = coords.x * cellWidth;
        var yPos = coords.y * cellHeight;
        this.ctx.save();
        this.ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        this.ctx.restore();
    };
    GridCanvas.prototype.drawGridMatrix = function () {
        var matrix = this.grid.matrix;
        for (var x = 0; x < matrix.length; x++) {
            for (var y = 0; y < matrix[x].length; y++) {
                if (matrix[x][y].value) {
                    var coords = new Vector2D(x, y);
                    this.fillCellAtCoords(coords);
                }
            }
        }
    };
    /**
     * Convert canvas coordinates to grid coordinates
     *
     * @param canvasCoords
     * @returns {Vector2D}
     */
    GridCanvas.prototype.canvasToGridCoords = function (canvasCoords) {
        var x = canvasCoords.x;
        var y = canvasCoords.y;
        var cellX = Math.floor(x / this.element.width * this.grid.width);
        var cellY = Math.floor(y / this.element.height * this.grid.height);
        return new Vector2D(cellX, cellY);
    };
    /**
     * Adds event listeners to the DOM element
     */
    GridCanvas.prototype.addEventListeners = function () {
        var _this = this;
        this.element.addEventListener('mousedown', function (e) {
            var canvasCoords = _this.getMouse(e);
            var gridCoords = _this.canvasToGridCoords(canvasCoords);
            var cell = _this.grid.getCell(gridCoords);
            cell.toggleValue();
        });
    };
    GridCanvas.prototype.render = function () {
        _super.prototype.clear.call(this);
        this.drawGrid();
        this.drawGridMatrix();
    };
    return GridCanvas;
})(Canvas);
//# sourceMappingURL=GridCanvas.js.map
;
///<reference path="Cell.ts"/>
var NeighborCells = (function () {
    /**
     * The constructor
     */
    function NeighborCells() {
        // no-op
    }
    return NeighborCells;
})();
//# sourceMappingURL=NeighborCells.js.map
;
///<reference path="Cell.ts"/>
var NeighborCoordinates = (function () {
    function NeighborCoordinates(cell) {
        this.topLeft = cell.getCoordsTopLeft();
        this.top = cell.getCoordsTop();
        this.topRight = cell.getCoordsTopRight();
        this.right = cell.getCoordsRight();
        this.bottomRight = cell.getCoordsBottomRight();
        this.bottom = cell.getCoordsBottom();
        this.bottomLeft = cell.getCoordsBottomLeft();
        this.left = cell.getCoordsLeft();
    }
    return NeighborCoordinates;
})();
//# sourceMappingURL=NeighborCoordinates.js.map
;
/**
 * Generic 2D Number Vector Class
 */
var Vector2D = (function () {
    /**
     * The constructor
     *
     * @param x
     * @param y
     */
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2D;
})();
//# sourceMappingURL=Vector2D.js.map