///<reference path="NumberClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>

class IncrementClickBehavior implements NumberClickBehavior {
    public click(cell: Cell2DNumber): void {
        cell.incrementValue();
    }
}

