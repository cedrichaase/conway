/// <reference path="../../../vendor/jquery.d.ts" />
///<reference path="../Vector/Vector.ts"/>
///<reference path="../Observer/Observable.ts"/>
///<reference path="../Observer/Observer.ts"/>
///<reference path="Behavior/ClickBehavior.ts"/>

/**
 * Class Cell
 */
abstract class Cell implements Observable {

    /**
     * The cell value
     */
    public value: any;

    /**
     * The cell coordinates
     */
    public coords: Vector;

    /**
     * The cell's click behavior
     */
    public clickBehavior: ClickBehavior;

    /**
     * Registered observers
     */
    private observers: Array<Observer>;

    /**
     * The constructor
     *
     * @param coords
     * @param value
     */
    constructor(coords: Vector, value: boolean) {
        this.coords = coords;
        this.value = value;
        this.observers = [];
    }

    /**
     * Use the ClickBehavior's click method
     */
    public click() {
        this.clickBehavior.click(this);
    }

    /**
     * Register an observer
     *
     * @param observer
     */
    public registerObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    /**
     * Un-register an observer
     *
     * @param observer
     */
    public removeObserver(observer: Observer): void {
        // TODO: implement
        return;
    }

    /**
     * Publish state to observers
     */
    public publish(): void {
        for(var observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Set cell value and publish
     *
     * @param value
     */
    public setValue(value: any): void {
        this.value = value;
        this.publish();
    }
}