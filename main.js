import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Function to generate random vibrant cream neon colors
const getRandomCreamNeonColor = () => {
  const creamNeonColors = [
    0xfff5ba, // Light Cream Yellow
    0xffe4b5, // Moccasin
    0xffdab9, // Peach Puff
    0xfff8dc, // Cornsilk
    0xffffe0, // Light Yellow
    0xfdfd96, // Pastel Yellow
    0xffd700, // Gold
    0xffa500, // Vibrant Orange
    0xffc0cb, // Pink Cream
    0xf5deb3, // Wheat
  ];
  return creamNeonColors[Math.floor(Math.random() * creamNeonColors.length)];
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Brighter ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create octahedrons with random sizes and vibrant cream neon colors
const octahedrons = [];
for (let i = 0; i < 50; i++) {
  const creamMaterial = new THREE.MeshStandardMaterial({
    color: getRandomCreamNeonColor(),
    emissive: getRandomCreamNeonColor(),
    emissiveIntensity: 1.8, // Increased intensity for more glow
    roughness: 0.1,         // Less rough for a shinier appearance
    metalness: 0.7,         // Higher metallic effect
  });

  const octahedronGeometry = new THREE.OctahedronGeometry(getRandomSize());
  const octahedron = new THREE.Mesh(octahedronGeometry, creamMaterial);
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
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
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
