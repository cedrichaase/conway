///<reference path="Observer.ts"/>

interface Observable {
    registerObserver(observer: Observer): void;

    removeObserver(observer: Observer): void;

    publish(): void;
}