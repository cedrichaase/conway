/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="Cell.ts"/>
///<reference path="../Vector/Vector3D.ts"/>

/**
 * Class Cell
 */
abstract class Cell3D extends Cell {

    /**
     * The cell value
     */
    public value: any;

    /**
     * The cell coordinates
     */
    public coords: Vector3D;

    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    constructor(coords: Vector3D, value: any) {
        super(coords, value);
    }

    // TODO: implement some useful functions here
}