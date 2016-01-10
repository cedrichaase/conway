///<reference path="Cell2D.ts"/>
///<reference path="Behavior/BooleanClickBehavior.ts"/>


/**
 * A 2D Cell that stores a boolean value
 */
class Cell2DBool extends Cell2D {

    /**
     * The cell value
     */
    public value: boolean;

    /**
     * The cell's click behavior
     */
    public clickBehavior: BooleanClickBehavior;

    /**
     * Boolean 2D Cell constructor
     *
     * @param coords
     * @param value
     * @param clickBehavior
     */
    constructor(coords: Vector2D, value: boolean, clickBehavior: BooleanClickBehavior) {
        super(coords, value);

        this.clickBehavior = clickBehavior;
    }

    /**
     * Toggle cell value
     */
    public toggleValue() {
        this.value = !this.value;
    }
}
