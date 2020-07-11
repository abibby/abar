// import { Scene, Engine, Vector3, HemisphericLight, Mesh, UniversalCamera } from 'babylonjs'
import { Engine } from "@babylonjs/core/Engines/engine"
import { Scene } from "@babylonjs/core/scene"
import { Vector3 } from "@babylonjs/core/Maths/math"
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera"
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight"
import { PointLight } from "@babylonjs/core/Lights/pointLight"
import { Mesh } from "@babylonjs/core/Meshes/mesh"
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial"
import { Texture } from "@babylonjs/core/Materials/Textures/"

// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/standardMaterial"
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import "@babylonjs/core/Meshes/Builders/sphereBuilder"
import "@babylonjs/core/Meshes/Builders/boxBuilder"
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
    camera.ellipsoid = new Vector3(1, 1, 1)

    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero())
    // Attach the camera to the canvas
    camera.attachControl(canvas, false)

    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const globalLight = new HemisphericLight('light1', new Vector3(0.25, 1, 0), scene)
    globalLight.shadowEnabled = true
    globalLight.intensity = 0.5
    const l1 = new PointLight('pointLight1', new Vector3(0, 5, 0), scene)
    l1.shadowEnabled = true
    l1.range = 10
    const l2 = new PointLight('pointLight2', new Vector3(5, 5, 5), scene)
    l2.shadowEnabled = true
    l2.range = 10

    const brickMaterial = new StandardMaterial('wall', scene)
    const brickTexture = new Texture("http://4.bp.blogspot.com/-xLZ3TdKot9s/U9F8Iz-14oI/AAAAAAAAFtg/xDHRNoHLsFA/s1600/Brick+wall+building+texture+ver+6.jpg", scene)
    brickMaterial.diffuseTexture = brickTexture
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = Mesh.CreateSphere('sphere1', 16, 1, scene, false, Mesh.FRONTSIDE)
    sphere.checkCollisions = true
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1
    sphere.material = brickMaterial
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    const ground = Mesh.CreateGround('ground1', 30, 30, 2, scene, false)
    ground.checkCollisions = true
    ground.receiveShadows = true

    const wall1 = Mesh.CreateBox('wall1', 1, scene, false)
    wall1.position.x = 0
    wall1.position.y = 2.5
    wall1.position.z = 15
    wall1.scaling.x = 30
    wall1.scaling.y = 5
    wall1.scaling.z = 1
    wall1.checkCollisions = true
    wall1.material = brickMaterial

    const wall2 = Mesh.CreateBox('wall2', 1, scene, false)
    wall2.position.x = 0
    wall2.position.y = 2.5
    wall2.position.z = -15
    wall2.scaling.x = 30
    wall2.scaling.y = 5
    wall2.scaling.z = 1
    wall2.checkCollisions = true
    wall2.material = brickMaterial

    const wall3 = Mesh.CreateBox('wall3', 1, scene, false)
    wall3.position.x = 15
    wall3.position.y = 2.5
    wall3.position.z = 0
    wall3.scaling.x = 1
    wall3.scaling.y = 5
    wall3.scaling.z = 30
    wall3.checkCollisions = true
    wall3.material = brickMaterial

    const wall4 = Mesh.CreateBox('wall4', 1, scene, false)
    wall4.position.x = -15
    wall4.position.y = 2.5
    wall4.position.z = 0
    wall4.scaling.x = 1
    wall4.scaling.y = 5
    wall4.scaling.z = 30
    wall4.checkCollisions = true
    wall4.material = brickMaterial
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