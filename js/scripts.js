document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const productName = event.target.dataset.productName;
            const productPrice = event.target.dataset.productPrice;

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productIndex = cart.findIndex(product => product.id === productId);

            if (productIndex > -1) {
                cart[productIndex].quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification(productName);
        });
    });

    const loadCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;

        cartItemsContainer.innerHTML = '';
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="img/product${product.id}.jpg" alt="${product.name}">
                <div class="cart-item-details">
                    <h2 class="cart-item-title">${product.name}</h2>
                    <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <span>Quantity: ${product.quantity}</span>
                        <button class="remove-button" data-product-id="${product.id}">Remove</button>
                    </div>
                </div>
                <div class="cart-item-total">$${(product.price * product.quantity).toFixed(2)}</div>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += product.price * product.quantity;
        });

        cartTotal.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                const newCart = cart.filter(product => product.id !== productId);
                localStorage.setItem('cart', JSON.stringify(newCart));
                loadCartItems();
            });
        });
    };

    if (document.getElementById('cart-items')) {
        loadCartItems();
    }
});

function showNotification(productName) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <p>Product added to cart: ${productName}</p>
        <div class="notification-buttons">
            <button onclick="window.location.href='cart.html'">Go to Cart</button>
            <button onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}