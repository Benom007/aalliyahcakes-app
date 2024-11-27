let scene, camera, renderer, cake;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    const container = document.getElementById('cake-viewer');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    
    // Initial cake creation
    createCake();
    
    camera.position.z = 5;
    animate();
}

function createCake() {
    if (cake) scene.remove(cake);
    cake = new THREE.Group();
    
    const layers = parseInt(document.getElementById('layerCount').value);
    const color = document.getElementById('layerColor').value;
    
    for (let i = 0; i < layers; i++) {
        const geometry = new THREE.CylinderGeometry(1 - (i * 0.2), 1 - (i * 0.2), 0.5, 32);
        const material = new THREE.MeshPhongMaterial({ color: color });
        const layer = new THREE.Mesh(geometry, material);
        layer.position.y = i * 0.5;
        cake.add(layer);
    }
    
    scene.add(cake);
}

function animate() {
    requestAnimationFrame(animate);
    cake.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Event listeners
document.getElementById('layerCount').addEventListener('change', createCake);
document.getElementById('layerColor').addEventListener('change', createCake);
document.getElementById('textureSelect').addEventListener('change', createCake);

// Initialize on load
window.addEventListener('load', init);
window.addEventListener('resize', () => {
    const container = document.getElementById('cake-viewer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});