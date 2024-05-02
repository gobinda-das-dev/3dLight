import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls from the correct path
import * as dat from 'dat.gui';

// Controls
const gui = new dat.GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* Lights */
const ambientLight = new THREE.AmbientLight(0xdddddd, 0.9); // Adjust ambient light color and intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Add a directional light for more pronounced lighting
directionalLight.position.set(1, 1, 1); // Set light direction
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadow mapping
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.1; // Adjust material properties for more realistic lighting
material.metalness = 0.9;

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6), material);
const donut = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.2), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), material);
scene.add(cube, sphere, donut, plane);
sphere.position.x = -2;
donut.position.x = 2;
plane.position.y = -1;
plane.rotation.x = -Math.PI / 2;

camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();


function guiControls() {
  gui.add(ambientLight, 'intensity').name('uniform Light').min(0).max(1).step(0.01);
  gui.add(directionalLight, 'intensity').name('directional Light').min(0).max(1).step(0.01);
  gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.01);
  gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.01);
  gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.01);
  gui.add(material, 'metalness').min(0).max(1).step(0.01);
  gui.add(material, 'roughness').min(0).max(1).step(0.01);
}
guiControls();