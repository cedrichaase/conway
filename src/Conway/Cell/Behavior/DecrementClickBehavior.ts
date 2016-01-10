///<reference path="NumberClickBehavior.ts"/>
///<reference path="../Cell2DNumber.ts"/>

class DecrementClickBehavior implements NumberClickBehavior {
    public click(cell: Cell2DNumber): void {
        cell.decrementValue();
    }
}
