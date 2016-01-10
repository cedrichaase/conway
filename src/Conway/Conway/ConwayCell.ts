///<reference path="../Cell/Cell2DBool.ts"/>
///<reference path="../Cell/Behavior/ToggleClickBehavior.ts"/>

/**
 * Class ConwayCell
 */
class ConwayCell extends Cell2DBool {

    public constructor(coords: Vector2D, value: any) {
        super(coords, value, new ToggleClickBehavior());
    }

    /**
     * Whether or not the Cell is alive
     *
     * @returns {boolean}
     */
    public isAlive() {
        return this.value === true;
    }
}
