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
        this.grid = new ConwayGrid(hCells, vCells);
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
            this.grid.executeConway();
        }
    };
    return ConwayCanvas;
})(GridCanvas);
//# sourceMappingURL=ConwayCanvas.js.map