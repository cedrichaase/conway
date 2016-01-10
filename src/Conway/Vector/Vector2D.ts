///<reference path="../Vector/Vector.ts"/>

/**
 * Generic 2D Number Vector Class
 */
class Vector2D extends Vector {

    /**
     * x coordinate
     */
    public x: number;

    /**
     * y coordinate
     */
    public y: number;

    /**
     * The constructor
     *
     * @param x
     * @param y
     */
    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
    }
}
