///<reference path="BooleanClickBehavior.ts"/>
///<reference path="../Cell2DBool.ts"/>

class ToggleClickBehavior implements BooleanClickBehavior {

    public click(cell: Cell2DBool): void {
        cell.toggleValue();
    }

}
