///<reference path="Cell2D.ts"/>
///<reference path="Behavior/NumberClickBehavior.ts"/>

/**
 * A 2D Cell that stores a boolean value
 */
class Cell2DNumber extends Cell2D {

    /**
     * The cell value
     */
    public value: number;

    /**
     * The cell's click behavior
     */
    public clickBehavior: NumberClickBehavior;

    /**
     * Boolean 2D Cell constructor
     *
     * @param coords
     * @param value
     * @param clickBehavior
     */
    constructor(coords: Vector2D, value: number, clickBehavior: NumberClickBehavior) {
        super(coords, value);

        this.clickBehavior = clickBehavior;
    }

    /**
     * Increment cell value
     */
    public incrementValue() {
        this.setValue(this.value + 1);
    }

    /**
     * Decrement cell value
     */
    public decrementValue() {
        this.setValue(this.value - 1);
    }
}

