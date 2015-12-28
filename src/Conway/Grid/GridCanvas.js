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
        this.grid = new Grid(hCells, vCells);
        this.showGrid = true;
        this.addEventListeners();
        this.start();
    }
    /**
     * Toggle showing the grid
     */
    GridCanvas.prototype.toggleShowGrid = function () {
        this.showGrid = !this.showGrid;
    };
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
        if (this.showGrid) {
            this.drawGrid();
        }
        this.drawGridMatrix();
    };
    return GridCanvas;
})(Canvas);
//# sourceMappingURL=GridCanvas.js.map