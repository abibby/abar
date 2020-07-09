// import { Scene, Engine, Vector3, HemisphericLight, Mesh, UniversalCamera } from 'babylonjs'
import { Engine } from "@babylonjs/core/Engines/engine"
import { Scene } from "@babylonjs/core/scene"
import { Vector3 } from "@babylonjs/core/Maths/math"
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight"
import { Mesh } from "@babylonjs/core/Meshes/mesh"

// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/standardMaterial"
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import "@babylonjs/core/Meshes/Builders/sphereBuilder"
import "@babylonjs/core/Meshes/Builders/groundBuilder"
import "@babylonjs/core/Collisions/collisionCoordinator"

// Get the canvas DOM element
const tmpCanvas = document.querySelector<HTMLCanvasElement>('#renderCanvas')
if (tmpCanvas === null) {
    throw new Error('could not find canvas')
}
const canvas = tmpCanvas

// Load the 3D engine
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
// CreateScene function that creates and return the scene
function createScene(): Scene {
    // Create a basic BJS Scene object
    const scene = new Scene(engine)
    // Enable gravity on the scene. Should be similar to earth's gravity. 
    scene.gravity = new Vector3(0, -0.98, 0)
    // Enable collisions globally. 
    scene.collisionsEnabled = true

    const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 2, -10), scene)
    camera.speed = 0.2
    // camera.invertRotation = true
    camera.checkCollisions = true
    camera.applyGravity = true
    // Set the player size, the camera's ellipsoid. 
    camera.ellipsoid = new Vector3(0.4, 1, 0.4)

    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero())
    // Attach the camera to the canvas
    camera.attachControl(canvas, false)
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = Mesh.CreateSphere('sphere1', 16, 1, scene, false, Mesh.FRONTSIDE)
    sphere.checkCollisions = true
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    const ground = Mesh.CreateGround('ground1', 30, 30, 2, scene, false)
    ground.checkCollisions = true
    // Return the created scene
    return scene
}
// call the createScene function
const scene = createScene()
// run the render loop
engine.runRenderLoop(function () {
    scene.render()
})
// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize()
})