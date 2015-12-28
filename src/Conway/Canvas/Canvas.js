///<reference path="Vector2D.ts"/>
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