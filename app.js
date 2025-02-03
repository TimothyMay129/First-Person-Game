// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a plane
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// Variables to keep track of the camera movement
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const moveSpeed = 0.1;
let mouseX = 0, mouseY = 0;
let isMouseDown = false;

function onDocumentMouseDown(event) {
    isMouseDown = true;
    console.log('Mouse down');
}

function onDocumentMouseUp(event) {
    isMouseDown = false;
    console.log('Mouse up');
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(`Mouse move: mouseX=${mouseX}, mouseY=${mouseY}`);
}

// Add event listeners for keydown and keyup
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
});

// Add basic animation
function animate() {
    requestAnimationFrame(animate);

    // Move the camera based on the key pressed
    if (moveForward) camera.position.z -= moveSpeed;
    if (moveBackward) camera.position.z += moveSpeed;
    if (moveLeft) camera.position.x -= moveSpeed;
    if (moveRight) camera.position.x += moveSpeed;

    if (isMouseDown) {
        // Calculate target rotation
        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        // Smoothly interpolate camera rotation
        camera.rotation.y += (targetX - camera.rotation.y) * 0.05;
        camera.rotation.x += (targetY - camera.rotation.x) * 0.05;

        // Ensure camera rotation stays within valid ranges
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

        console.log(`Camera rotation: x=${camera.rotation.x}, y=${camera.rotation.y}`);
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
