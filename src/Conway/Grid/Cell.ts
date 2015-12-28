/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="Grid.ts"/>

/**
 * Class Cell
 */
class Cell {

    /**
     * The cell value
     */
    public value: boolean;

    /**
     * The cell coordinates
     */
    public coords: Vector2D;

    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    constructor(coords: Vector2D, value: boolean) {
        this.coords = coords;
        this.value = value;
    }

    /**
     * Toggles the cell value
     */
    toggleValue(): void {
        this.value = !this.value;
    }

    /**
     * Return coordinates to this cell's top left
     *
     * @returns {Vector2D}
     */
    getCoordsTopLeft() {
        return new Vector2D(this.coords.x - 1, this.coords.y - 1);
    }

    /**
     * Return coordinates to this cell's top
     *
     * @returns {Vector2D}
     */
    getCoordsTop() {
        return new Vector2D(this.coords.x, this.coords.y - 1);
    }

    /**
     * Return coordinates to this cell's top right
     *
     * @returns {Vector2D}
     */
    getCoordsTopRight() {
        return new Vector2D(this.coords.x + 1, this.coords.y - 1);
    }

    /**
     * Return coordinates to this cell's right
     *
     * @returns {Vector2D}
     */
    getCoordsRight() {
        return new Vector2D(this.coords.x + 1, this.coords.y);
    }

    /**
     * Return coordinates to this cell's bottom right
     *
     * @returns {Vector2D}
     */
    getCoordsBottomRight() {
        return new Vector2D(this.coords.x + 1, this.coords.y + 1);
    }

    /**
     * Return coordinates to this cell's bottom
     *
     * @returns {Vector2D}
     */
    getCoordsBottom() {
        return new Vector2D(this.coords.x, this.coords.y + 1);
    }

    /**
     * Return coordinates to this cell's bottom left
     *
     * @returns {Vector2D}
     */
    getCoordsBottomLeft() {
        return new Vector2D(this.coords.x - 1, this.coords.y + 1);
    }

    /**
     * Return coordinates to this cell's left
     *
     * @returns {Vector2D}
     */
    getCoordsLeft() {
        return new Vector2D(this.coords.x - 1, this.coords.y);
    }
}