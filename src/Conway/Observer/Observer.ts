///<reference path="Observable.ts"/>

interface Observer {
    update(subject: Observable): void;
}
