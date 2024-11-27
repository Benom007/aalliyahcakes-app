function calculateServings() {
    const type = document.getElementById('cakeType').value;
    const size = parseFloat(document.getElementById('cakeSize').value);
    const layers = parseInt(document.getElementById('layers').value);
    
    let servings = 0;
    
    switch(type) {
        case 'round':
            servings = Math.floor((Math.PI * Math.pow(size/2, 2)) / 25) * layers;
            break;
        case 'square':
            servings = Math.floor((size * size) / 25) * layers;
            break;
        case 'rectangle':
            servings = Math.floor((size * (size * 1.5)) / 25) * layers;
            break;
    }
    
    document.getElementById('servings').textContent = servings;
    
    // Calculate ingredients
    const ingredients = calculateIngredients(servings);
    displayIngredients(ingredients);
}

function calculateIngredients(servings) {
    return {
        'Farine': `${servings * 30}g`,
        'Sucre': `${servings * 25}g`,
        'Oeufs': `${Math.ceil(servings / 4)} unités`,
        'Beurre': `${servings * 20}g`,
        'Lait': `${servings * 15}ml`,
        'Levure': `${Math.ceil(servings * 2)}g`
    };
}

function displayIngredients(ingredients) {
    const container = document.getElementById('ingredients');
    container.innerHTML = '<h4>Ingrédients nécessaires:</h4>';
    
    const list = document.createElement('ul');
    for (const [ingredient, amount] of Object.entries(ingredients)) {
        const li = document.createElement('li');
        li.textContent = `${ingredient}: ${amount}`;
        list.appendChild(li);
    }
    
    container.appendChild(list);
}