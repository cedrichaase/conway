var Canvas = function(element) {
    this.element = element;
    this.$element = $(element);
    this.ctx = element.getContext('2d');

    return this;
};

/**
 * Returns the mouse position relative to the canvas element
 *
 * @param e
 * @returns {{x: (number|*), y: (number|*)}}
 */
Canvas.prototype.getMouse = function(e) {
    var offset = this.$element.offset();
    var mx = e.pageX - offset.left;
    var my = e.pageY - offset.top;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
};