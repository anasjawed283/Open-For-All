import * as THREE from "https://cdn.skypack.dev/three@0.141.0";

const createWorld = (target) => {
  const renderer = new THREE.WebGLRenderer();
  document.querySelector(target).appendChild(renderer.domElement);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  
  const light = new THREE.PointLight(0xffffff, 1, 0);
  scene.add(light);
  
  const setCanvasSize = () => 
  {
    camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  setCanvasSize();
  window.onresize = setCanvasSize;

  return {renderer, scene, camera, light}
}

const {renderer, scene, camera, light} = createWorld("#demo");

const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({color: 0xffffff});
  
  return new THREE.Mesh(geometry, material);
}

const cube = createCube();
cube.rotation.y = Math.PI / 4;
scene.add(cube);

camera.position.z = 10;
light.position.copy(camera.position);

renderer.render(scene, camera);

let startTime;
let previousTimeStamp = 0;

const step = (timestamp) => {
  if (!startTime) startTime = timestamp;
  if (!timestamp) timestamp = 0;
  const elapsed = timestamp - startTime;
  const delta = (timestamp - previousTimeStamp) / 1000
  
  cube.rotation.x += 0.5 * delta;
  cube.rotation.y += 0.5 * delta;
  cube.rotation.z += 0.5 * delta;
  
  cube.position.x = 2 * Math.cos(elapsed / 1000);
  cube.position.z = 2 * Math.sin(elapsed / 1000);
  
  renderer.render(scene, camera);
  previousTimeStamp = timestamp;
  window.requestAnimationFrame(step);
}

step();
