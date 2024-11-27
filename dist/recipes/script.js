function addIngredient() {
    const container = document.getElementById('ingredients-list');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    
    row.innerHTML = `
        <input type="text" placeholder="Nom de l'ingrédient" class="ingredient-name">
        <input type="number" placeholder="Quantité" class="ingredient-amount" min="0" step="0.1">
        <select class="ingredient-unit">
            <option value="g">Grammes (g)</option>
            <option value="kg">Kilogrammes (kg)</option>
            <option value="ml">Millilitres (ml)</option>
            <option value="l">Litres (l)</option>
            <option value="unité">Unité</option>
        </select>
        <input type="number" placeholder="Prix €" class="ingredient-price" min="0" step="0.01">
        <button onclick="deleteIngredient(this)" class="delete-button">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(row);
    attachEventListeners(row);
}

function deleteIngredient(button) {
    button.closest('.ingredient-row').remove();
    calculateTotals();
}

function attachEventListeners(row) {
    const inputs = row.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotals);
    });
}

function calculateTotals() {
    let totalWeight = 0;
    let totalCost = 0;
    
    const rows = document.querySelectorAll('.ingredient-row');
    rows.forEach(row => {
        const amount = parseFloat(row.querySelector('.ingredient-amount').value) || 0;
        const unit = row.querySelector('.ingredient-unit').value;
        const price = parseFloat(row.querySelector('.ingredient-price').value) || 0;
        
        // Convert to grams for weight calculation
        let weightInGrams = 0;
        switch(unit) {
            case 'g':
                weightInGrams = amount;
                break;
            case 'kg':
                weightInGrams = amount * 1000;
                break;
            case 'ml':
                weightInGrams = amount; // Assuming 1ml = 1g for simplicity
                break;
            case 'l':
                weightInGrams = amount * 1000;
                break;
            case 'unité':
                weightInGrams = 0; // Units don't contribute to weight
                break;
        }
        
        totalWeight += weightInGrams;
        totalCost += price;
    });
    
    // Update display
    document.getElementById('totalWeight').textContent = `${totalWeight.toFixed(0)} g`;
    document.getElementById('totalCost').textContent = `${totalCost.toFixed(2)} €`;
    
    // Calculate cost per 100g
    const costPer100g = totalWeight > 0 ? (totalCost * 100) / totalWeight : 0;
    document.getElementById('costPer100g').textContent = `${costPer100g.toFixed(2)} €`;
}

// Add initial ingredient row
window.addEventListener('load', () => {
    addIngredient();
});