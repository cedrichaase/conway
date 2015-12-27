# Conway

---

A modest implementation of conway's game of life

See the widget in action [here](http://cedrichaase.github.io/conway/).

## Dependencies

- [jQuery v2.1.3 (>= 1.9.0)](http://jquery.com/)

### Usage

Add the following resources for conway.js to function correctly.

```html
<!-- Required Javascript -->
<script src="jquery.js"></script>
<script src="conway.js"></script>
```

Create a canvas dom element with width and height attributes set:

```html
<canvas id='canvas1' width='640' height='480'></div>
```

Initialize conway.js:

```javascript
$('#canvas1').conway();
```


## Methods

The conway widget can be interacted with using the following methods, like so:

```javascript
$('#canvas1').conway('toggleExecution');
```

### List of methods

Following methods are available:

| method | arguments | description                                                                    |
|--------|-----------|--------------------------------------------------------------------------------|
| toggleExecution  | -         | Toggles execution of the game of life algorithm |
| execute   | -         | Executes one interation of the game of life algorithm                                                     |
