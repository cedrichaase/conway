///<reference path="Cell.ts"/>

class NeighborCoordinates {

    public topLeft: Vector2D;

    public top: Vector2D;

    public topRight: Vector2D;

    public right: Vector2D;

    public bottomRight: Vector2D;

    public bottom: Vector2D;

    public bottomLeft: Vector2D;

    public left: Vector2D;

    constructor(cell: Cell) {
        this.topLeft        = cell.getCoordsTopLeft();
        this.top            = cell.getCoordsTop();
        this.topRight       = cell.getCoordsTopRight();
        this.right          = cell.getCoordsRight();
        this.bottomRight    = cell.getCoordsBottomRight();
        this.bottom         = cell.getCoordsBottom();
        this.bottomLeft     = cell.getCoordsBottomLeft();
        this.left           = cell.getCoordsLeft();
    }
}
