document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const productId = product.dataset.id;
            const productName = product.querySelector('.product-name').textContent;
            const productPrice = product.querySelector('.product-price').textContent;

            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        const cartContainer = document.querySelector('.cart-items');
        cartContainer.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            total += parseFloat(item.price.replace('$', '')) * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('flex', 'justify-between', 'items-center', 'mb-4');
            cartItem.innerHTML = `
                <img src="img/product1.jpg" alt="${item.name}" class="w-24 h-24 object-cover rounded">
                <div class="flex-1 ml-4">
                    <h2 class="text-xl font-bold">${item.name}</h2>
                    <p class="text-gray-700">${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-from-cart bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        document.querySelector('.total-price').textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const cartIndex = cart.findIndex(item => item.id === productId);
                if (cartIndex > -1) {
                    cart.splice(cartIndex, 1);
                }
                updateCart();
            });
        });
    }
});
