///<reference path="Cell.ts"/>
var NeighborCoordinates = (function () {
    function NeighborCoordinates(cell) {
        this.topLeft = cell.getCoordsTopLeft();
        this.top = cell.getCoordsTop();
        this.topRight = cell.getCoordsTopRight();
        this.right = cell.getCoordsRight();
        this.bottomRight = cell.getCoordsBottomRight();
        this.bottom = cell.getCoordsBottom();
        this.bottomLeft = cell.getCoordsBottomLeft();
        this.left = cell.getCoordsLeft();
    }
    return NeighborCoordinates;
})();
//# sourceMappingURL=NeighborCoordinates.js.map