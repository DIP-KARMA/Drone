// DOM elements
const canvasContainer = document.getElementById('canvas-container');
const loadingContainer = document.querySelector('.loading-container');
const progressBar = document.querySelector('.progress-bar');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
canvasContainer.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(5, 5, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-5, -5, -5);
scene.add(directionalLight2);

// Add a subtle blue spotlight for premium effect
const spotLight = new THREE.SpotLight(0x0088ff, 1);
spotLight.position.set(0, 10, 0);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;
scene.add(spotLight);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 10;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

// Initial camera position
camera.position.set(0, 0, 5);
controls.update();

// Model loading
const loader = new THREE.GLTFLoader();
let drone;

loader.load(
    'flying_quadcopter.glb',
    function (gltf) {
        drone = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(drone);
        const center = box.getCenter(new THREE.Vector3());
        drone.position.sub(center);
        
        // Scale the model appropriately
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        drone.scale.set(scale, scale, scale);
        
        // Add model to scene
        scene.add(drone);
        
        // Hide loading screen
        loadingContainer.style.opacity = 0;
        setTimeout(() => {
            loadingContainer.style.display = 'none';
        }, 500);
    },
    function (xhr) {
        // Update progress bar
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        progressBar.style.width = percentComplete + '%';
    },
    function (error) {
        console.error('An error occurred loading the model:', error);
    }
);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the drone if it exists
    if (drone) {
        // Add a gentle floating motion
        drone.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
