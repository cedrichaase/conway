///<reference path="ClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>

interface NumberClickBehavior extends ClickBehavior {
    click(cell: Cell2DNumber): void;
}
