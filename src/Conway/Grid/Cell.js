/// <reference path="../../../vendor/jquery.d.ts" />
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