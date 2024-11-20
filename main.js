import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Function to generate random yellowish neon colors
const getRandomYellowCreamColor = () => {
  const yellowCreamColors = [
    0xfff8dc, // Cornsilk
    0xffffe0, // Light Yellow
    0xfffacd, // Lemon Chiffon
    0xffeb99, // Soft Yellow
    0xffd700, // Gold
    0xffe135, // Banana Yellow
    0xfdfd96, // Pastel Yellow
    0xffc87c, // Warm Creamy Orange
  ];
  return yellowCreamColors[Math.floor(Math.random() * yellowCreamColors.length)];
};

// Function to generate a random size for the octahedron
const getRandomSize = () => Math.random() * (0.9 - 0.3) + 0.3;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls for zooming and orbiting
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 5;
controls.maxDistance = 20;

// Lighting
const ambientLight = new THREE.AmbientLight(0xfff8dc, 0.7); // Warm yellow ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffa5, 1.8); // Slightly warmer point light
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create octahedrons with random sizes and yellowish neon cream colors
const octahedrons = [];
for (let i = 0; i < 50; i++) {
  const yellowCreamMaterial = new THREE.MeshStandardMaterial({
    color: getRandomYellowCreamColor(),
    emissive: getRandomYellowCreamColor(),
    emissiveIntensity: 2.0, // Slightly stronger glow
    roughness: 0.15,        // Smooth for a reflective finish
    metalness: 0.8,         // Increased metallic effect
  });

  const octahedronGeometry = new THREE.OctahedronGeometry(getRandomSize());
  const octahedron = new THREE.Mesh(octahedronGeometry, yellowCreamMaterial);
  octahedron.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  scene.add(octahedron);
  octahedrons.push(octahedron);
}

// Add text
const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry("PENASO - ACT 1.6-1.12", {
      font: font,
      size: 0.5,
      height: 0.2,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe0 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3, 0, 0);
    scene.add(textMesh);
  }
);

// Animation
const animate = () => {
  requestAnimationFrame(animate);
  octahedrons.forEach((octahedron) => {
    octahedron.rotation.x += 0.01;
    octahedron.rotation.y += 0.01;
  });
  controls.update();
  renderer.render(scene, camera);
};
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
