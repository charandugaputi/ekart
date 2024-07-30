let cart = [];

function addToCart(id, name, price) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        
        let total = 0;
        
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(listItem);
            
            total += item.price * item.quantity;
        });
        
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
}
