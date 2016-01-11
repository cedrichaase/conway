var Vector = (function () {
    function Vector() {
    }
    return Vector;
})();
//# sourceMappingURL=Vector.js.map
;
///<reference path="../Vector/Vector.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Generic 2D Number Vector Class
 */
var Vector2D = (function (_super) {
    __extends(Vector2D, _super);
    /**
     * The constructor
     *
     * @param x
     * @param y
     */
    function Vector2D(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
    }
    return Vector2D;
})(Vector);
//# sourceMappingURL=Vector2D.js.map
;
///<reference path="../Vector/Vector.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Generic 3D Number Vector Class
 */
var Vector3D = (function (_super) {
    __extends(Vector3D, _super);
    /**
     * The constructor
     *
     * @param x
     * @param y
     * @param z
     */
    function Vector3D(x, y, z) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Vector3D;
})(Vector);
//# sourceMappingURL=Vector3D.js.map
;
///<reference path="Observer.ts"/>
//# sourceMappingURL=Observable.js.map
;
///<reference path="Observable.ts"/>
//# sourceMappingURL=Observer.js.map
;
///<reference path="ClickBehavior.ts"/>
///<reference path="../Cell2DBool.ts"/>
//# sourceMappingURL=BooleanClickBehavior.js.map
;
//# sourceMappingURL=ClickBehavior.js.map
;
///<reference path="NumberClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>
var DecrementClickBehavior = (function () {
    function DecrementClickBehavior() {
    }
    DecrementClickBehavior.prototype.click = function (cell) {
        cell.decrementValue();
    };
    return DecrementClickBehavior;
})();
//# sourceMappingURL=DecrementClickBehavior.js.map
;
///<reference path="NumberClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>
var IncrementClickBehavior = (function () {
    function IncrementClickBehavior() {
    }
    IncrementClickBehavior.prototype.click = function (cell) {
        cell.incrementValue();
    };
    return IncrementClickBehavior;
})();
//# sourceMappingURL=IncrementClickBehavior.js.map
;
///<reference path="ClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>
//# sourceMappingURL=NumberClickBehavior.js.map
;
///<reference path="BooleanClickBehavior.ts"/>
///<reference path="../Cell2DBool.ts"/>
var ToggleClickBehavior = (function () {
    function ToggleClickBehavior() {
    }
    ToggleClickBehavior.prototype.click = function (cell) {
        cell.toggleValue();
    };
    return ToggleClickBehavior;
})();
//# sourceMappingURL=ToggleClickBehavior.js.map
;
/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="../Vector/Vector.ts"/>
///<reference path="../Observer/Observable.ts"/>
///<reference path="../Observer/Observer.ts"/>
///<reference path="Behavior/ClickBehavior.ts"/>
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
        this.observers = [];
    }
    /**
     * Use the ClickBehavior's click method
     */
    Cell.prototype.click = function () {
        this.clickBehavior.click(this);
    };
    /**
     * Register an observer
     *
     * @param observer
     */
    Cell.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    /**
     * Un-register an observer
     *
     * @param observer
     */
    Cell.prototype.removeObserver = function (observer) {
        // TODO: implement
        return;
    };
    /**
     * Publish state to observers
     */
    Cell.prototype.publish = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    /**
     * Set cell value and publish
     *
     * @param value
     */
    Cell.prototype.setValue = function (value) {
        this.value = value;
        this.publish();
    };
    return Cell;
})();
//# sourceMappingURL=Cell.js.map
;
/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="Cell.ts"/>
///<reference path="../Vector/Vector2D.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class Cell
 */
var Cell2D = (function (_super) {
    __extends(Cell2D, _super);
    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    function Cell2D(coords, value) {
        _super.call(this, coords, value);
    }
    /**
     * Return coordinates to this cell's top left
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsTopLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's top
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsTop = function () {
        return new Vector2D(this.coords.x, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's top right
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsTopRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y - 1);
    };
    /**
     * Return coordinates to this cell's right
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y);
    };
    /**
     * Return coordinates to this cell's bottom right
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsBottomRight = function () {
        return new Vector2D(this.coords.x + 1, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's bottom
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsBottom = function () {
        return new Vector2D(this.coords.x, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's bottom left
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsBottomLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y + 1);
    };
    /**
     * Return coordinates to this cell's left
     *
     * @returns {Vector2D}
     */
    Cell2D.prototype.getCoordsLeft = function () {
        return new Vector2D(this.coords.x - 1, this.coords.y);
    };
    return Cell2D;
})(Cell);
//# sourceMappingURL=Cell2D.js.map
;
///<reference path="Cell2D.ts"/>
///<reference path="Behavior/BooleanClickBehavior.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A 2D Cell that stores a boolean value
 */
var Cell2DBool = (function (_super) {
    __extends(Cell2DBool, _super);
    /**
     * Boolean 2D Cell constructor
     *
     * @param coords
     * @param value
     * @param clickBehavior
     */
    function Cell2DBool(coords, value, clickBehavior) {
        _super.call(this, coords, value);
        this.clickBehavior = clickBehavior;
    }
    /**
     * Toggle cell value
     */
    Cell2DBool.prototype.toggleValue = function () {
        this.setValue(!this.value);
    };
    return Cell2DBool;
})(Cell2D);
//# sourceMappingURL=Cell2DBool.js.map
;
///<reference path="Cell2D.ts"/>
///<reference path="Behavior/NumberClickBehavior.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A 2D Cell that stores a boolean value
 */
var Cell2DNumber = (function (_super) {
    __extends(Cell2DNumber, _super);
    /**
     * Boolean 2D Cell constructor
     *
     * @param coords
     * @param value
     * @param clickBehavior
     */
    function Cell2DNumber(coords, value, clickBehavior) {
        _super.call(this, coords, value);
        this.clickBehavior = clickBehavior;
    }
    /**
     * Increment cell value
     */
    Cell2DNumber.prototype.incrementValue = function () {
        this.setValue(this.value + 1);
    };
    /**
     * Decrement cell value
     */
    Cell2DNumber.prototype.decrementValue = function () {
        this.setValue(this.value - 1);
    };
    return Cell2DNumber;
})(Cell2D);
//# sourceMappingURL=Cell2DNumber.js.map
;
/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="Cell.ts"/>
///<reference path="../Vector/Vector3D.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class Cell
 */
var Cell3D = (function (_super) {
    __extends(Cell3D, _super);
    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    function Cell3D(coords, value) {
        _super.call(this, coords, value);
    }
    return Cell3D;
})(Cell);
//# sourceMappingURL=Cell3D.js.map
;
///<reference path="../Vector/Vector2D.ts"/>
/// <reference path="../../../vendor/jquery.d.ts" />
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
        this.renderInterval = 50;
        this.element = element;
        this.$element = $(element);
        this.ctx = element.getContext('2d');
        this.width = element.width;
        this.height = element.height;
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
        this.ctx.clearRect(0, 0, this.width, this.height);
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
    Grid.prototype.getCell = function (coords) {
        var x = coords.x;
        var y = coords.y;
        var cell = new Cell2D(coords, false);
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
    return Grid;
})();
//# sourceMappingURL=Grid.js.map
;
///<reference path="../Canvas/Canvas.ts"/>
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
        /**
         * The grid color
         */
        this.gridColor = '#000';
        /**
         * padding
         *
         * @type {number}
         */
        this.padding = 15.5;
        this.grid = new Grid(hCells, vCells);
        for (var _i = 0, _a = this.grid.matrix; _i < _a.length; _i++) {
            var col = _a[_i];
            for (var _b = 0; _b < col.length; _b++) {
                var cell = col[_b];
                cell.registerObserver(this);
            }
        }
        this.gridNeedsRedraw = true;
        this.addEventListeners();
        this.start();
    }
    GridCanvas.prototype.drawGrid = function () {
        var width = this.width;
        var height = this.height;
        var hSpacing = width / this.grid.width;
        var vSpacing = height / this.grid.height;
        this.ctx.save();
        this.ctx.translate(0.5, 0.5);
        for (var hLine = 1; hLine <= this.grid.width; hLine++) {
            var x = hLine * hSpacing;
            this.drawVerticalLine(x, this.lineWidth, this.gridColor);
        }
        for (var vLine = 1; vLine <= this.grid.height; vLine++) {
            var y = vLine * vSpacing;
            this.drawHorizontalLine(y, this.lineWidth, this.gridColor);
        }
        this.ctx.restore();
    };
    GridCanvas.prototype.drawVerticalLine = function (x, lineWidth, color) {
        var height = this.height;
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
        var width = this.width;
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
    /**
     * Fill a Cell at given coords with given color
     *
     * @param coords
     * @param color
     */
    GridCanvas.prototype.fillCellAtCoords = function (coords, color) {
        var cellWidth = this.width / this.grid.width;
        var cellHeight = this.height / this.grid.height;
        var xPos = coords.x * cellWidth;
        var yPos = coords.y * cellHeight;
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        this.ctx.restore();
    };
    GridCanvas.prototype.clearCellAtCoords = function (coords) {
        var bgcolor = '#FFF';
        var cellWidth = this.width / this.grid.width;
        var cellHeight = this.height / this.grid.height;
        var xPos = coords.x * cellWidth;
        var yPos = coords.y * cellHeight;
        this.ctx.save();
        this.ctx.fillStyle = this.gridColor;
        this.ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.fillStyle = bgcolor;
        this.ctx.fillRect(xPos + 1, yPos + 1, cellWidth - 1, cellHeight - 1);
        this.ctx.restore();
    };
    /**
     * Fill a cell at given coords
     *
     * @param coords
     */
    GridCanvas.prototype.fillCell = function (coords) {
        this.fillCellAtCoords(coords, '#000');
    };
    /**
     * Clear a cell at given coords
     *
     * @param coords
     */
    GridCanvas.prototype.clearCell = function (coords) {
        this.fillCellAtCoords(coords, '#FFF');
    };
    GridCanvas.prototype.drawGridMatrix = function () {
        var matrix = this.grid.matrix;
        for (var x = 0; x < matrix.length; x++) {
            for (var y = 0; y < matrix[x].length; y++) {
                if (matrix[x][y].value) {
                    var coords = new Vector2D(x, y);
                    this.fillCell(coords);
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
        var cellX = Math.floor(x / this.width * this.grid.width);
        var cellY = Math.floor(y / this.height * this.grid.height);
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
            cell.click();
            _this.update(cell);
        });
    };
    GridCanvas.prototype.render = function () {
        if (this.gridNeedsRedraw) {
            _super.prototype.clear.call(this);
            this.drawGrid();
            this.gridNeedsRedraw = false;
        }
        //this.drawGridMatrix();
    };
    GridCanvas.prototype.update = function (cell) {
        if (cell.value) {
            this.fillCell(cell.coords);
        }
        else {
            this.clearCellAtCoords(cell.coords);
        }
    };
    return GridCanvas;
})(Canvas);
//# sourceMappingURL=GridCanvas.js.map
;
///<reference path="../Cell/Cell2D.ts"/>
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
///<reference path="../Vector/Vector2D.ts"/>
///<reference path="../Cell/Cell2D.ts"/>
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
///<reference path="../Grid/GridCanvas.ts"/>
///<reference path="ConwayGrid.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConwayCanvas = (function (_super) {
    __extends(ConwayCanvas, _super);
    /**
     * Constructor
     *
     * @param element
     * @param hCells
     * @param vCells
     */
    function ConwayCanvas(element, hCells, vCells) {
        _super.call(this, element, hCells, vCells);
        this.grid = new ConwayGrid(hCells, vCells, this);
        this.executing = false;
    }
    /**
     * Toggle conway game of life algorithm execution
     */
    ConwayCanvas.prototype.toggleExecution = function () {
        this.executing = !this.executing;
    };
    /**
     * Render method
     */
    ConwayCanvas.prototype.render = function () {
        _super.prototype.render.call(this);
        if (this.executing) {
            this.grid = this.grid.executeConway();
        }
    };
    ConwayCanvas.prototype.setRenderInterval = function (interval) {
        this.stop();
        this.renderInterval = interval;
        this.start();
    };
    return ConwayCanvas;
})(GridCanvas);
//# sourceMappingURL=ConwayCanvas.js.map
;
///<reference path="../Cell/Cell2DBool.ts"/>
///<reference path="../Cell/Behavior/ToggleClickBehavior.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Class ConwayCell
 */
var ConwayCell = (function (_super) {
    __extends(ConwayCell, _super);
    function ConwayCell(coords, value) {
        _super.call(this, coords, value, new ToggleClickBehavior());
    }
    /**
     * Whether or not the Cell is alive
     *
     * @returns {boolean}
     */
    ConwayCell.prototype.isAlive = function () {
        return this.value === true;
    };
    return ConwayCell;
})(Cell2DBool);
//# sourceMappingURL=ConwayCell.js.map
;
///<reference path="../Grid/Grid.ts"/>
///<reference path="ConwayCell.ts"/>
///<reference path="ConwayCanvas.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConwayGrid = (function (_super) {
    __extends(ConwayGrid, _super);
    /**
     * Constructor
     *
     * @param width
     * @param height
     * @param canvas
     */
    function ConwayGrid(width, height, canvas) {
        _super.call(this, width, height);
        for (var column = 0; column < width; column++) {
            this.matrix[column] = [];
            for (var line = 0; line < height; line++) {
                var coords = new Vector2D(column, line);
                this.matrix[column][line] = new ConwayCell(coords, false);
            }
        }
        this.canvas = canvas;
    }
    /**
     * Counts the live cells surrounding the given Cell
     *
     * @param cell
     * @returns {number}
     */
    ConwayGrid.prototype.countLiveNeighbors = function (cell) {
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
     * Determines whether or not the given cell will survive in the next generation
     *
     * @param cell
     * @returns {boolean}
     */
    ConwayGrid.prototype.livesInNextGeneration = function (cell) {
        var neighborCount = this.countLiveNeighbors(cell);
        // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        if (cell.isAlive()
            && neighborCount < 2) {
            return false;
        }
        // Any live cell with two or three live neighbours lives on to the next generation.
        if (cell.isAlive()
            && neighborCount < 4
            && neighborCount > 1) {
            return true;
        }
        // Any live cell with more than three live neighbours dies, as if by over-population.
        if (cell.isAlive()
            && neighborCount > 3) {
            return false;
        }
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if (!cell.isAlive()
            && neighborCount === 3) {
            return true;
        }
        return false;
    };
    /**
     * Executes one step of the Conway Game Of Life Algorithm
     *
     * @returns {ConwayGrid}
     */
    ConwayGrid.prototype.executeConway = function () {
        var nextGen = new ConwayGrid(this.width, this.height, this.canvas);
        var width = this.width;
        var height = this.height;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var coords = new Vector2D(x, y);
                var oldCell = this.getCell(coords);
                var newCell = nextGen.getCell(coords);
                var lives = this.livesInNextGeneration(oldCell);
                newCell.setValue(lives);
                if (newCell.value !== oldCell.value) {
                    this.canvas.update(newCell);
                }
            }
        }
        return nextGen;
    };
    /**
     * Returns a Cell by coordinates
     *
     * @param coords
     * @returns {ConwayCell}
     */
    ConwayGrid.prototype.getCell = function (coords) {
        var x = coords.x;
        var y = coords.y;
        var cell = new ConwayCell(coords, false);
        if (!(x < 0 || y < 0 || x >= this.width || y >= this.height))
            cell = this.matrix[x][y];
        return cell;
    };
    return ConwayGrid;
})(Grid);
//# sourceMappingURL=ConwayGrid.js.map