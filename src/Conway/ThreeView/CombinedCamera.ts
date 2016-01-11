///<reference path="../../../vendor/three.d.ts"/>
///<reference path="../Vector/Vector3D.ts"/>

import OrthographicCamera = THREE.OrthographicCamera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Camera = THREE.Camera;
import Euler = THREE.Euler;

/**
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	A general perpose camera, for setting FOV, Lens Focal Length,
 *		and switching between perspective and orthographic views easily.
 *		Use this only if you do not wish to manage
 *		both a Orthographic and Perspective Camera
 *
 */

class CombinedCamera extends Camera {

    public near;
    public far;
    public width;
    public height;
    public fov;
    public zoom;
    public cameraO: OrthographicCamera;
    public cameraP: PerspectiveCamera;
    public inPerspectiveMode;
    public left;
    public right;
    public top;
    public bottom;
    public projectionMatrix;
    public inOrthographicMode;
    public rotationAutoUpdate;
    public rotation: Euler;

    constructor(width, height, fov, near, far, orthoNear, orthoFar) {
        super();

        //THREE.Camera.call(this);

        this.fov = fov;

        this.left = - width / 2;
        this.right = width / 2;
        this.top = height / 2;
        this.bottom = - height / 2;

        // We could also handle the projectionMatrix internally, but just wanted to test nested camera objects

        this.cameraO = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 	orthoNear, orthoFar);
        this.cameraP = new THREE.PerspectiveCamera(fov, width / height, near, far);

        this.zoom = 1;

        this.toPerspective();
    }

    /**
     * Switches to perspective camera
     */
    public toPerspective() {
        this.near = this.cameraP.near;
        this.far = this.cameraP.far;

        this.cameraP.fov =  this.fov / this.zoom ;

        this.cameraP.updateProjectionMatrix();

        this.projectionMatrix = this.cameraP.projectionMatrix;

        this.inPerspectiveMode = true;
        this.inOrthographicMode = false;
    }

    /**
     * Switches to the Orthographic camera estimating viewport from Perspective
     */
    public toOrthographic() {
        var fov = this.fov;
        var aspect = this.cameraP.aspect;
        var near = this.cameraP.near;
        var far = this.cameraP.far;

        // The size that we set is the mid plane of the viewing frustum
        var hyperfocus = (near + far) / 2;

        var halfHeight = Math.tan(fov * Math.PI / 180 / 2) * hyperfocus;
        var planeHeight = 2 * halfHeight;
        var planeWidth = planeHeight * aspect;
        var halfWidth = planeWidth / 2;

        halfHeight /= this.zoom;
        halfWidth /= this.zoom;

        this.cameraO.left = -halfWidth;
        this.cameraO.right = halfWidth;
        this.cameraO.top = halfHeight;
        this.cameraO.bottom = -halfHeight;

        // this.cameraO.left = -farHalfWidth;
        // this.cameraO.right = farHalfWidth;
        // this.cameraO.top = farHalfHeight;
        // this.cameraO.bottom = -farHalfHeight;

        // this.cameraO.left = this.left / this.zoom;
        // this.cameraO.right = this.right / this.zoom;
        // this.cameraO.top = this.top / this.zoom;
        // this.cameraO.bottom = this.bottom / this.zoom;

        this.cameraO.updateProjectionMatrix();

        this.near = this.cameraO.near;
        this.far = this.cameraO.far;
        this.projectionMatrix = this.cameraO.projectionMatrix;

        this.inPerspectiveMode = false;
        this.inOrthographicMode = true;
    }

    setSize(width: number, height: number) {
        this.cameraP.aspect = width / height;
        this.left = - width / 2;
        this.right = width / 2;
        this.top = height / 2;
        this.bottom = - height / 2;
    }

    setFov(fov) {
        this.fov = fov;

        if (this.inPerspectiveMode) {
            this.toPerspective();
        } else {
            this.toOrthographic();
        }
    }


    updateProjectionMatrix(): void {
        if (this.inPerspectiveMode) {
            this.toPerspective();
        }
        else {
            this.toPerspective();
            this.toOrthographic();
        }
    }

    /**
     * Uses Focal Length (in mm) to estimate and set FOV
     * 35mm (fullframe) camera is used if frame size is not specified;
     * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
     *
     * @param focalLength
     * @param frameHeight
     * @returns {number}
     */
    setLens(focalLength: number, frameHeight: number = 24): number {

        //if (frameHeight === undefined) frameHeight = 24;

        var fov = 2 * THREE.Math.radToDeg(Math.atan(frameHeight / (focalLength * 2)));

        this.setFov(fov);

        return fov;
    }


    setZoom(zoom) {
        this.zoom = zoom;

        if (this.inPerspectiveMode) {
            this.toPerspective();
        }
        else {
            this.toOrthographic();
        }
    }

    toFrontView() {
        this.rotation.x = 0;
        this.rotation.y = 0;
        this.rotation.z = 0;

        // should we be modifing the matrix instead?
        this.rotationAutoUpdate = false;
    }


    toBackView() {
        this.rotation.x = 0;
        this.rotation.y = Math.PI;
        this.rotation.z = 0;
        this.rotationAutoUpdate = false;
    }

    toLeftView() {
        this.rotation.x = 0;
        this.rotation.y = - Math.PI / 2;
        this.rotation.z = 0;
        this.rotationAutoUpdate = false;
    }

    toRightView() {
        this.rotation.x = 0;
        this.rotation.y = Math.PI / 2;
        this.rotation.z = 0;
        this.rotationAutoUpdate = false;
    }

    toTopView() {
        this.rotation.x = - Math.PI / 2;
        this.rotation.y = 0;
        this.rotation.z = 0;
        this.rotationAutoUpdate = false;
    }

    toBottomView() {
        this.rotation.x = Math.PI / 2;
        this.rotation.y = 0;
        this.rotation.z = 0;
        this.rotationAutoUpdate = false;
    }
}