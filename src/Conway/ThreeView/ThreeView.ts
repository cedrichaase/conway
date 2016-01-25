///<reference path="../../../vendor/three.d.ts"/>
///<reference path="../../../vendor/three-canvasrenderer.d.ts"/>
///<reference path="../../../vendor/three-projector.d.ts"/>
///<reference path="CombinedCamera.ts"/>
///<reference path="../Vector/Vector2D.ts"/>
///<reference path="../Conway/ConwayGrid.ts"/>

import Raycaster = THREE.Raycaster;
import Vector2 = THREE.Vector2;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;

class ThreeView {

    public container;

    public camera;

    private scene;

    public renderer;

    public lookAtScene: boolean;

    public size: number = 500;

    public gridWidth: number = 50;

    public rotating: boolean = true;

    public width: number = 20;

    public height: number = 20;

    public grid: ConwayGrid;

    public objects: Array<Object3D>;

    public raycaster: Raycaster;

    public mouse: Vector2;

    public plane: Mesh;

    public rollOverMesh: Mesh;

    public constructor(element) {
        this.lookAtScene = true;

        this.container = element;

        this.grid = new ConwayGrid(this.width, this.height, this);

        //this.camera = new CombinedCamera(window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000, - 500, 1000);

        this.getCamera().position.x = 200;
        this.getCamera().position.y = 100;
        this.getCamera().position.z = 200;

        this.objects = [];

        this.scene = new THREE.Scene();

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.addGridToScene();
        this.addPlaneToScene();
        this.addCubesToScene();
        this.addLightsToScene();
        this.addRollOverHelpersToScene();

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
//        document.addEventListener( 'keydown', onDocumentKeyDown, false );
//        document.addEventListener( 'keyup', onDocumentKeyUp, false );

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        //stats = new Stats();
        //stats.domElement.style.position = 'absolute';
        //stats.domElement.style.top = '0px';
        //this.container.appendChild(stats.domElement);

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    /*
     * @returns {Camera}
     */
    private getCamera(): Camera {
        if(typeof this.camera === "undefined") {
            this.camera = new THREE.OrthographicCamera(
                window.innerWidth / - 2,
                window.innerWidth / 2,
                window.innerHeight / 2,
                window.innerHeight / - 2,
                -500,
                1000
            );
        }

        return this.camera;
    }

    /**
     * Add a grid to the scene
     */
    private addGridToScene(): void {
        // Grid
        var size = this.size;
        var step = 50;

        var geometry = new THREE.Geometry();

        for (var i = - size; i <= size; i += step) {
            geometry.vertices.push(new THREE.Vector3(- size, 0, i));
            geometry.vertices.push(new THREE.Vector3(  size, 0, i));

            geometry.vertices.push(new THREE.Vector3(i, 0, - size));
            geometry.vertices.push(new THREE.Vector3(i, 0,   size));
        }

        var lineBasicMaterial = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 });

        var line = new THREE.LineSegments(geometry, lineBasicMaterial);
        this.scene.add(line);
    }

    /**
     * Add a plane to the scene
     */
    private addPlaneToScene(): void {
        var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        geometry.rotateX( - Math.PI / 2 );

        this.plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
        this.scene.add( this.plane );

        this.objects.push(this.plane);
    }

    /**
     * Add cubes to the scene
     */
    private addCubesToScene(): void {
        for(var column of this.grid.matrix) {
            for (var cell of column) {
                if(cell.isAlive()) {
                    this.drawCubeAtCoords(cell.coords);
                }
            }
        }
    }

    /**
     * Draw a cube at given coords
     *
     * @param coords
     */
    private drawCubeAtCoords(coords: Vector2D): void {
        // Cubes
        var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
        var material = new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 });

        var x = coords.x;
        var z = coords.y;

        var cube = new THREE.Mesh(boxGeometry, material);

        //cube.scale.y = Math.floor(Math.random() * 2 + 1);
        cube.scale.y = 1;

        cube.position.x = Math.floor((x * 50 - 500) / 50) * 50 + 25;
        cube.position.y = (cube.scale.y * 50) / 2;
        cube.position.z = Math.floor((z * 50 - 500) / 50) * 50 + 25;

        this.scene.add(cube);
    }

    /**
     * Add lights to the scene
     */
    private addLightsToScene(): void {
        // Lights
        var ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
        this.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);

        var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);
    }

    private addRollOverHelpersToScene(): void {
        // roll-over helpers
        var rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
        var rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
        this.rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
        this.scene.add(this.rollOverMesh);
    }

    public render() {
        var camera = this.getCamera();

        if (this.lookAtScene) camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, camera);
    }

    public animate = () => {
        if(this.rotating) {
            var timer = Date.now() * 0.0001;

            this.camera.position.x = Math.cos(timer) * 200;
            this.camera.position.z = Math.sin(timer) * 200;
        }

        requestAnimationFrame(this.animate);

        this.render();
    };

    setFov(fov) {
        this.getCamera().setFov(fov);
        console.log('FOV '+ fov.toFixed(2) +'&deg;');
    }

    setLens(lens) {
        // try adding a tween effect while changing focal length, and it'd be even cooler!
        var fov = this.getCamera().setLens(lens);
        console.log('Converted ' + lens + 'mm lens to FOV '+ fov.toFixed(2) +'&deg;');
    }

    /*
    setOrthographic() {
        this.camera.toOrthographic();
        console.log('Orthographic mode');
    }

     setPerspective() {
        this.camera.toPerspective();
        console.log('Perspective mode');
    }
    */

    //init() {
    //
    //}


    onWindowResize() {
        this.getCamera().setSize(window.innerWidth, window.innerHeight);
        this.getCamera().updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public update(cell: Cell2D): void {
        if(cell.value) {
            this.drawCubeAtCoords(cell.coords);
        }
        //else {
        //    this.removeCubeAtCoords(cell.coords);
        //}
    }


    public onDocumentMouseMove = (event) => {
        event.preventDefault();
        this.mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        this.raycaster.setFromCamera(this.mouse, this.getCamera());
        var intersects = this.raycaster.intersectObjects( this.objects );
        if ( intersects.length > 0 ) {
            var intersect = intersects[ 0 ];
            this.rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
            this.rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        }

        this.render();
    };

    public onDocumentMouseDown = (event) => {
        event.preventDefault();
        this.mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
        this.raycaster.setFromCamera(this.mouse, this.getCamera());
        var intersects = this.raycaster.intersectObjects(this.objects);

        if(intersects.length > 0) {
            var intersect = intersects[0];

            // delete cube
            if (intersect.object != this.plane) {
                this.scene.remove( intersect.object );
                this.objects.splice(this.objects.indexOf( intersect.object ), 1);
            }

            else {
                var voxel = this.cube();

                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                this.scene.add(voxel);

                this.objects.push(voxel);
            }

            this.render();
        }

    };

    /**
     *
     * @returns {THREE.Mesh}
     */
    private cube(): Mesh {
        var cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 });
        return new THREE.Mesh(cubeGeo, cubeMaterial);
    }

}
