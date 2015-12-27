///<reference path="Vector2D.ts"/>
/// <reference path="../../vendor/jquery.d.ts" />

abstract class Canvas {

    /**
     * The canvas HTML element
     */
    protected element: HTMLCanvasElement;

    /**
     * The canvas HTML element JQuery object
     */
    protected $element: JQuery;

    /**
     * The canvas rendering context
     */
    protected ctx: CanvasRenderingContext2D;

    /**
     * The rendering interval in milliseconds
     */
    private renderInterval: number = 100;

    /**
     * The rendering interval
     */
    private interval: number;

    /**
     * Whether or not the canvas is active
     */
    private active: boolean;

    /**
     * The constructor
     *
     * @param element
     */
    constructor(element: HTMLCanvasElement) {
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
    protected getMouse(event: MouseEvent) {
        var offset = this.$element.offset();

        var mx = event.pageX - offset.left;
        var my = event.pageY - offset.top;

        return new Vector2D(mx, my);
    }

    /**
     * Clears the canvas
     */
    protected clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }

    /**
     * starts/stops Canvas rendering
     */
    protected toggleActive() {
        if (this.active) this.stop(); else this.start();
    }

    /**
     * Stops Canvas rendering
     */
    protected stop() {
        if(this.active) {
            clearInterval(this.interval);
            this.active = false;
        }
    }

    /**
     * Starts Canvas rendering
     */
    protected start() {
        if(!this.active) {
            var _this = this;
            this.interval = setInterval(function() {
                _this.render();
            }, this.renderInterval);
            this.active = true;
        }
    }

    /**
     * Renders the Canvas
     */
    protected render() {
        this.clear();
    }
}
