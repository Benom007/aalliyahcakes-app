const canvas = document.getElementById('decorationCanvas');
const ctx = canvas.getContext('2d');
const decorations = [];

// Load default decorations
const defaultDecorations = Array.from({ length: 90 }, (_, i) => `/images/decorations/deco${i + 1}.png`);

function initializeDecorations() {
    const grid = document.getElementById('decorationGrid');
    defaultDecorations.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'decoration-item';
        item.style.backgroundImage = `url(${src})`;
        item.setAttribute('data-index', index);
        item.onclick = () => selectDecoration(index);
        grid.appendChild(item);
    });
}

function selectDecoration(index) {
    const items = document.querySelectorAll('.decoration-item');
    items.forEach(item => item.classList.remove('selected'));
    items[index].classList.add('selected');
    
    // Add decoration to canvas at center
    const img = new Image();
    img.src = defaultDecorations[index];
    img.onload = () => {
        const x = canvas.width / 2 - img.width / 2;
        const y = canvas.height / 2 - img.height / 2;
        decorations.push({ img, x, y, dragging: false });
        redrawCanvas();
    };
}

function handleCustomDecoration() {
    const input = document.getElementById('customDecoration');
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const x = canvas.width / 2 - img.width / 2;
                    const y = canvas.height / 2 - img.height / 2;
                    decorations.push({ img, x, y, dragging: false });
                    redrawCanvas();
                };
            };
            reader.readAsDataURL(file);
        }
    });
}

function handleCharacterLayer() {
    const shapeSelect = document.getElementById('layerShape');
    const characterInput = document.getElementById('characterInput');
    
    shapeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'character') {
            characterInput.style.display = 'block';
        } else {
            characterInput.style.display = 'none';
        }
    });
    
    document.getElementById('selectedCharacter').addEventListener('input', (e) => {
        const char = e.target.value.toUpperCase();
        if (char) {
            drawCharacterLayer(char);
        }
    });
}

function drawCharacterLayer(char) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '200px Arial';
    ctx.fillStyle = '#ff69b4';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(char, canvas.width / 2, canvas.height / 2);
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    decorations.forEach(deco => {
        ctx.drawImage(deco.img, deco.x, deco.y);
    });
}

// Initialize canvas size
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    redrawCanvas();
}

// Event listeners
window.addEventListener('load', () => {
    resizeCanvas();
    initializeDecorations();
    handleCustomDecoration();
    handleCharacterLayer();
});

window.addEventListener('resize', resizeCanvas);