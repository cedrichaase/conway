///<reference path="ClickBehavior.ts"/>
///<reference path="../Cell2DBool.ts"/>

interface BooleanClickBehavior extends ClickBehavior {
    click(cell: Cell2DBool): void;
}
