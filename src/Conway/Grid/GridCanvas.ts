///<reference path="../Canvas/Canvas.ts"/>
///<reference path="Grid.ts"/>

class GridCanvas extends Canvas implements Observer {

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
    private gridColor: string = '#000';

    /**
     * Show or show not? That is the question.
     */
    private gridNeedsRedraw: boolean;

    /**
     * padding
     *
     * @type {number}
     */
    private padding: number = 15.5;

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

        for(var col of this.grid.matrix) {
            for(var cell of col) {
                cell.registerObserver(this);
            }
        }

        this.gridNeedsRedraw = true;

        this.addEventListeners();
        this.start();
    }

    private drawGrid() {
        var width = this.width;
        var height = this.height;

        var hSpacing = width / this.grid.width;
        var vSpacing = height / this.grid.height;

        this.ctx.save();

        this.ctx.translate(0.5, 0.5);

        for(var hLine = 1; hLine <= this.grid.width; hLine++) {
            var x = hLine * hSpacing;
            this.drawVerticalLine(x, this.lineWidth, this.gridColor);
        }

        for(var vLine = 1; vLine <= this.grid.height; vLine++) {
            var y = vLine * vSpacing;
            this.drawHorizontalLine(y, this.lineWidth, this.gridColor);
        }

        this.ctx.restore();
    }

    private drawVerticalLine(x, lineWidth, color) {
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
    }

    private drawHorizontalLine(y, lineWidth, color) {
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
    }
    /**
     * Fill a Cell at given coords with given color
     *
     * @param coords
     * @param color
     */
    private fillCellAtCoords(coords: Vector2D, color: string) {
        var cellWidth = this.width / this.grid.width;
        var cellHeight = this.height / this.grid.height;

        var xPos = coords.x * cellWidth;
        var yPos = coords.y * cellHeight;

        this.ctx.save();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(xPos, yPos, cellWidth, cellHeight);
        this.ctx.restore();
    }

    private clearCellAtCoords(coords: Vector2D) {
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
    }

    /**
     * Fill a cell at given coords
     *
     * @param coords
     */
    private fillCell(coords: Vector2D) {
        this.fillCellAtCoords(coords, '#000');
    }

    /**
     * Clear a cell at given coords
     *
     * @param coords
     */
    private clearCell(coords: Vector2D) {
        this.fillCellAtCoords(coords, '#FFF');
    }

    private drawGridMatrix() {
        var matrix = this.grid.matrix;

        for(var x = 0; x < matrix.length; x++) {
            for(var y = 0; y < matrix[x].length; y++) {
                if(matrix[x][y].value) {
                    var coords = new Vector2D(x, y);
                    this.fillCell(coords);
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

        var cellX = Math.floor(x / this.width * this.grid.width);
        var cellY = Math.floor(y / this.height * this.grid.height);

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
            cell.click();
            _this.update(cell);
        });
    }

    protected render() {
        if(this.gridNeedsRedraw) {
            super.clear();
            this.drawGrid();
            this.gridNeedsRedraw = false;
        }
        //this.drawGridMatrix();
    }

    public update(cell: Cell2D): void {
        if(cell.value) {
            this.fillCell(cell.coords);
        }
        else {
            this.clearCellAtCoords(cell.coords);
        }
    }
}
