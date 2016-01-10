///<reference path="../Vector/Vector.ts"/>

/**
 * Generic 3D Number Vector Class
 */
class Vector3D extends Vector {

    /**
     * x coordinate
     */
    public x: number;

    /**
     * y coordinate
     */
    public y: number;

    /**
     * z coordinate
     */
    public z: number;

    /**
     * The constructor
     *
     * @param x
     * @param y
     * @param z
     */
    constructor(x: number, y: number, z: number) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
    }
}
