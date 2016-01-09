///<reference path="../Grid/GridCanvas.ts"/>
///<reference path="ConwayGrid.ts"/>

class ConwayCanvas extends GridCanvas {

    /**
     * The Conway Grid
     */
    public grid: ConwayGrid;

    /**
     * Whether or not the game of life algorithm is executing
     */
    public executing: boolean;

    /**
     * Constructor
     *
     * @param element
     * @param hCells
     * @param vCells
     */
    public constructor(element: HTMLCanvasElement, hCells: number, vCells: number) {
        super(element, hCells, vCells);
        this.grid = new ConwayGrid(hCells, vCells);
        this.executing = false;
    }

    /**
     * Toggle conway game of life algorithm execution
     */
    public toggleExecution() {
       this.executing = !this.executing;
    }

    /**
     * Render method
     */
    protected render() {
        super.render();

        if(this.executing) {
            this.grid = this.grid.executeConway();
        }
    }
}
