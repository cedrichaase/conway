///<reference path="../../../vendor/three.d.ts"/>
///<reference path="../../../vendor/three-canvasrenderer.d.ts"/>
///<reference path="../../../vendor/three-projector.d.ts"/>
///<reference path="CombinedCamera.ts"/>

class ThreeView {

    public container;

    public camera;

    private scene;

    public renderer;

    public lookAtScene: boolean;

    public constructor() {
        this.lookAtScene = true;

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.camera = new CombinedCamera(window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000, - 500, 1000);

        this.camera.position.x = 200;
        this.camera.position.y = 100;
        this.camera.position.z = 200;

        this.scene = new THREE.Scene();

        // Grid
        var size = 500, step = 50;
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

        // Cubes

        var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
        var material = new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 });

        for (var i = 0; i < 100; i ++) {

            var cube = new THREE.Mesh(boxGeometry, material);

            cube.scale.y = Math.floor(Math.random() * 2 + 1);

            cube.position.x = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
            cube.position.y = (cube.scale.y * 50) / 2;
            cube.position.z = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;

            this.scene.add(cube);

        }

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

    public render() {
        var timer = Date.now() * 0.0001;

        this.camera.position.x = Math.cos(timer) * 200;
        this.camera.position.z = Math.sin(timer) * 200;
        if (this.lookAtScene) this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    };

    public animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    };

    setFov(fov) {
        this.camera.setFov(fov);
        console.log('FOV '+ fov.toFixed(2) +'&deg;');
    }

    setLens(lens) {
        // try adding a tween effect while changing focal length, and it'd be even cooler!
        var fov = this.camera.setLens(lens);
        console.log('Converted ' + lens + 'mm lens to FOV '+ fov.toFixed(2) +'&deg;');
    }

    setOrthographic() {
        this.camera.toOrthographic();
        console.log('Orthographic mode');
    }

     setPerspective() {
        this.camera.toPerspective();
        console.log('Perspective mode');
    }

    //init() {
    //
    //}


    onWindowResize() {
        this.camera.setSize(window.innerWidth, window.innerHeight);
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    /**
     * Get or initialize the camerathis.
     *
     * @returns {Camera}
     */
    public getCamera(): Camera {
        if(typeof this.camera === undefined) {

        }

        return this.camera;
    }

}
