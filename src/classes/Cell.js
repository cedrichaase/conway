/**
 * The Cell class
 *
 * @param x
 * @param y
 * @param value
 * @returns {{value: *, x: *, y: *}}
 * @constructor
 */
var Cell = function (x, y, value) {

    this.init(x, y, value);

    return {
        value: this.value,

        toggleValue: this.toggleValue,

        x: this.x,
        y: this.y
    };
};

/**
 * Initialize cell
 *
 * @param x
 * @param y
 * @param value
 */
Cell.prototype.init = function(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
};

/**
 * Toggles the cell value
 */
Cell.prototype.toggleValue = function() {
    this.value = !this.value;
};