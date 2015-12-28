///<reference path="../Canvas/Canvas.ts"/>
///<reference path="Grid.ts"/>

class GridCanvas extends Canvas {

    /**
     * The grid data structure
     */
    public grid: Grid;

    /**
     * The grid line width
     */
    private lineWidth: number;

    /**
     * The grid color
     */
    private gridColor: string;

    /**
     * Show or show not? That is the question.
     */
    private showGrid: boolean;

    /**
     *
     *
     * @param element
     * @param hCells
     * @param vCells
     */
    public constructor(element: HTMLCanvasElement, hCells: number, vCells: number) {
        super(element);

        this.grid = new Grid(hCells, vCells);

        this.showGrid = true;

        this.addEventListeners();
        this.start();
    }

    /**
     * Toggle showing the grid
     */
    public toggleShowGrid() {
        this.showGrid = !this.showGrid;
    }

    private drawGrid() {
        var width = this.element.width;
        var height = this.element.height;

        var hSpacing = width / this.grid.width;
        var vSpacing = height / this.grid.height;

        for(var hLine = 0; hLine <= this.grid.width; hLine++) {
            var x = hLine * hSpacing;
            this.drawVerticalLine(x, this.lineWidth, this.gridColor);
        }

        for(var vLine = 0; vLine <= this.grid.height; vLine++) {
            var y = vLine * vSpacing;
            this.drawHorizontalLine(y, this.lineWidth, this.gridColor);
        }
    }

    private drawVerticalLine(x, lineWidth, color) {
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
    }

    private drawHorizontalLine(y, lineWidth, color) {
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
    }

    private fillCellAtCoords(coords: Vector2D) {
        var cellWidth = this.element.width / this.grid.width;
        var cellHeight = this.element.height / this.grid.height;

        var xPos = coords.x * cellWidth;
        var yPos = coords.y * cellHeight;

        this.ctx.save();
            this.ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        this.ctx.restore();
    }

    private drawGridMatrix() {
        var matrix = this.grid.matrix;

        for(var x = 0; x < matrix.length; x++) {
            for(var y = 0; y < matrix[x].length; y++) {
                if(matrix[x][y].value) {
                    var coords = new Vector2D(x, y);
                    this.fillCellAtCoords(coords);
                }
            }
        }
    }

    /**
     * Convert canvas coordinates to grid coordinates
     *
     * @param canvasCoords
     * @returns {Vector2D}
     */
    private canvasToGridCoords(canvasCoords: Vector2D) {
        var x = canvasCoords.x;
        var y = canvasCoords.y;

        var cellX = Math.floor(x / this.element.width * this.grid.width);
        var cellY = Math.floor(y / this.element.height * this.grid.height);

        return new Vector2D(cellX, cellY);
    }

    /**
     * Adds event listeners to the DOM element
     */
    private addEventListeners() {
        var _this = this;

        this.element.addEventListener('mousedown', function(e) {
            var canvasCoords = _this.getMouse(e);
            var gridCoords = _this.canvasToGridCoords(canvasCoords);
            var cell = _this.grid.getCell(gridCoords);
            cell.toggleValue();
        });
    }

    protected render() {
        super.clear();
        if(this.showGrid) {
            this.drawGrid();
        }
        this.drawGridMatrix();
    }
}
