import * as THREE from "three"; 
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement); //DOM elements, handeled by js

const fov = 75; //field of view, 90 degres would be too far and 5 degres would be too narrow
const aspect = w/h;
const near = 0.1; //0.1 is when it starts rendering, anything closer and it will be invisible
const far = 10; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); //initialise a camera
camera.position.z = 2;                               //pulling the camera back on the z axis 

const scene = new THREE.Scene();                     //initialise the scene 

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;


const geo = new THREE.IcosahedronGeometry(1.0,2);    //Geometrical figures as classes
const mat = new THREE.MeshStandardMaterial({         //Mesh"Basic"Material doesnt interact with lights 
   color: 0x500073,                                  //To add a hexadecimal color, create a new const. Only takes numerics for color argument  
   flatShading: true
});                                                  //properties of geometrical figures

const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo,wireMat);
wireMesh.scale.setScalar(1.001);                 //takes away the flickering, scales it up slighty 
mesh.add(wireMesh);                              //adding the wireframe to icosahedron, wireframe mesh becomes a chil to the main geometric mesh


const hemiLight = new THREE.HemisphereLight(0x0099ff,0xaa5500); //white=top, black=bottom
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;                //Every 10 seconds
    renderer.render(scene, camera)               //render the scence 
    controls.update()
}

animate()                                      //dont forget to call it, it gets updated every second       

//Try out different lights, geometrics etc, color of lights