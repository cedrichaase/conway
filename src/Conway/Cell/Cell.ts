/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="../Vector/Vector.ts"/>
///<reference path="Behavior/ClickBehavior.ts"/>

/**
 * Class Cell
 */
abstract class Cell {

    /**
     * The cell value
     */
    public value: any;

    /**
     * The cell coordinates
     */
    public coords: Vector;

    /**
     * The cell's click behavior
     */
    public clickBehavior: ClickBehavior;

    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    constructor(coords: Vector, value: boolean) {
        this.coords = coords;
        this.value = value;
    }

    /**
     * Use the ClickBehavior's click method
     */
    public click() {
        this.clickBehavior.click(this);
    }

}